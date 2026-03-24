// submit.js (with Alert component)

import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { Alert } from './Alert';
import './styles/SubmitButton.css';

export const SubmitButton = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const [alertType, setAlertType] = useState('info');
    
    const { nodes, edges } = useStore(
        (state) => ({
            nodes: state.nodes,
            edges: state.edges,
        }),
        shallow
    );

    const handleSubmit = async () => {
        if (nodes.length === 0) {
            setAlertType('warning');
            setAlertMessage('Please add at least one node to the pipeline before submitting.');
            setTimeout(() => setAlertMessage(null), 5000);
            return;
        }

        setIsSubmitting(true);
        setAlertMessage(null);

        try {
            const pipelineData = {
                nodes: nodes.map(node => ({
                    id: node.id,
                    type: node.type,
                    position: node.position,
                    data: node.data,
                })),
                edges: edges.map(edge => ({
                    id: edge.id,
                    source: edge.source,
                    target: edge.target,
                    sourceHandle: edge.sourceHandle,
                    targetHandle: edge.targetHandle,
                })),
            };

            const formData = new FormData();
            formData.append('pipeline', JSON.stringify(pipelineData));

            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            // Format message
            const message = `Pipeline Analysis Results:\n\n• Number of Nodes: ${result.num_nodes}\n• Number of Edges: ${result.num_edges}\n• Is DAG: ${result.is_dag ? 'Yes ✓' : 'No ✗'}\n\n${result.is_dag 
                ? 'Your pipeline is a valid Directed Acyclic Graph!' 
                : 'Warning: Your pipeline contains cycles and is not a valid DAG.'}`;

            setAlertType(result.is_dag ? 'success' : 'warning');
            setAlertMessage(message);
            
            // Auto-close after 8 seconds
            setTimeout(() => setAlertMessage(null), 8000);

        } catch (error) {
            console.error('Error submitting pipeline:', error);
            setAlertType('error');
            setAlertMessage(`Error submitting pipeline: ${error.message}\n\nMake sure the backend server is running on http://localhost:8000`);
            setTimeout(() => setAlertMessage(null), 8000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="submit-container">
                <button 
                    className="submit-button" 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    <span className="submit-button-text">
                        {isSubmitting ? 'Submitting...' : 'Submit Pipeline'}
                    </span>
                    <span className="submit-button-icon">→</span>
                </button>
            </div>
            {alertMessage && (
                <Alert 
                    message={alertMessage} 
                    type={alertType}
                    onClose={() => setAlertMessage(null)}
                />
            )}
        </>
    );
}