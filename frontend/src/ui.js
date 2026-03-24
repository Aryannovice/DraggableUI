// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { ConditionalNode } from './nodes/conditionalNode';
import { MathNode } from './nodes/MathNode';
import { FilterNode } from './nodes/filterNode';
import { TransformNode } from './nodes/transformNode';
import { MergeNode } from './nodes/mergeNode';
import { ColorPalette } from './ColorPalette';
import './styles/PipelineUI.css';
import 'reactflow/dist/style.css';

console.log(ConditionalNode, MathNode, FilterNode, TransformNode);
console.log({
  InputNode,
  TextNode,
  ConditionalNode,
  MathNode,
  FilterNode,
  TransformNode,
});
const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  conditional: ConditionalNode,
  math: MathNode,
  filter: FilterNode,
  transform: TransformNode,
  merge: MergeNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [canvasColor, setCanvasColor] = useState('#fef9e7'); // Cream default
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          const rawData = event.dataTransfer.getData('application/reactflow');
    if (!rawData) return;

    const { nodeType } = JSON.parse(rawData);
    console.log('Drop attempt:', nodeType, nodeTypes[nodeType]);
    if (!nodeType || !nodeTypes[nodeType]) {
      console.warn('Unknown node type');
      return;
    }

          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance]
    );
    
    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const handleColorChange = (color) => {
      setCanvasColor(color);
    };

    // Calculate a darker shade for the background dots
    const getDarkerColor = (hex) => {
      // Simple function to darken color for dots
      const num = parseInt(hex.replace("#", ""), 16);
      const r = Math.max(0, ((num >> 16) & 0xff) - 30);
      const g = Math.max(0, ((num >> 8) & 0xff) - 30);
      const b = Math.max(0, (num & 0xff) - 30);
      return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
    };

    return (
      <>
      <div className="pipeline-ui-wrapper">
        <div className="pipeline-ui-controls">
          <ColorPalette onColorChange={handleColorChange} currentColor={canvasColor} />
        </div>
        <div 
          ref={reactFlowWrapper} 
          className="pipeline-ui-container"
          style={{ 
            backgroundColor: canvasColor,
            transition: 'background-color 0.3s ease'
          }}
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                className="react-flow-container"
                style={{ backgroundColor: canvasColor }}
            >
                <Background 
                    color={getDarkerColor(canvasColor)}
                    gap={20}
                    size={1}
                    variant="dots"
                    style={{ opacity: 0.25 }}
                />
                <Controls 
                    className="react-flow-controls"
                />
                <MiniMap 
                    className="react-flow-minimap"
                    nodeColor={(node) => {
                        if (node.type === 'customInput') return '#10b981';
                        if (node.type === 'customOutput') return '#ef4444';
                        if (node.type === 'llm') return '#3b82f6';
                        return '#6b7280';
                    }}
                />
            </ReactFlow>
        </div>
      </div>
        </>
    )
}