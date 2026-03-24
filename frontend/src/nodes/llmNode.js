// frontend/src/nodes/llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-system`,
      style: { top: `${100/3}%` }
    },
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-prompt`,
      style: { top: `${200/3}%` }
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-response`
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      handles={handles}
      nodeType="llm"
    >
      <div>
        <span>🤖 Large Language Model</span>
        <div style={{ 
          marginTop: '8px', 
          padding: '8px', 
          background: 'rgba(59, 130, 246, 0.1)', 
          borderRadius: '8px',
          fontSize: '12px',
          color: '#1e40af'
        }}>
          Ready to process inputs
        </div>
      </div>
    </BaseNode>
  );
};