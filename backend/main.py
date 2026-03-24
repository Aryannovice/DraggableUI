from fastapi import FastAPI, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, List, Set
import json

app = FastAPI()

# Add CORS middleware to allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

def is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    """
    Check if the graph formed by nodes and edges is a Directed Acyclic Graph (DAG).
    Uses topological sort (Kahn's algorithm) to detect cycles.
    """
    if not edges:
        return True  # No edges means no cycles
    
    # Build adjacency list and in-degree count
    node_ids = {node['id'] for node in nodes}
    adjacency_list: Dict[str, List[str]] = {node_id: [] for node_id in node_ids}
    in_degree: Dict[str, int] = {node_id: 0 for node_id in node_ids}
    
    # Build graph from edges
    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        
        if source in node_ids and target in node_ids:
            adjacency_list[source].append(target)
            in_degree[target] = in_degree.get(target, 0) + 1
    
    # Kahn's algorithm for topological sort
    # Start with nodes that have no incoming edges
    queue = [node_id for node_id in node_ids if in_degree[node_id] == 0]
    processed_count = 0
    
    while queue:
        current = queue.pop(0)
        processed_count += 1
        
        # Remove current node and reduce in-degree of neighbors
        for neighbor in adjacency_list[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we processed all nodes, there are no cycles (it's a DAG)
    # If processed_count < len(node_ids), there's a cycle
    return processed_count == len(node_ids)

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    try:
        # Parse the JSON string
        pipeline_data = json.loads(pipeline)
        
        nodes = pipeline_data.get('nodes', [])
        edges = pipeline_data.get('edges', [])
        
        # Calculate number of nodes and edges
        num_nodes = len(nodes)
        num_edges = len(edges)
        
        # Check if it's a DAG
        is_dag_result = is_dag(nodes, edges)
        
        return {
            'num_nodes': num_nodes,
            'num_edges': num_edges,
            'is_dag': is_dag_result
        }
    
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON in pipeline data")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing pipeline: {str(e)}")