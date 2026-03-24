// frontend/src/nodes/conditionalNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const ConditionalNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || '>');
  const [threshold, setThreshold] = useState(data?.threshold || '0');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleConditionChange = (e) => {
    const value = e.target.value;
    setCondition(value);
    updateNodeField(id, 'condition', value);
  };

  const handleThresholdChange = (e) => {
    const value = e.target.value;
    setThreshold(value);
    updateNodeField(id, 'threshold', value);
  };

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-input`,
      style: { top: '50%' }
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-true`,
      style: { top: '30%' }
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-false`,
      style: { top: '70%' }
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Conditional"
      handles={handles}
      containerStyle={{ height: 120 }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '12px' }}>
          Condition:
          <select value={condition} onChange={handleConditionChange} style={{ width: '100%' }}>
            <option value=">">Greater Than</option>
            <option value="<">Less Than</option>
            <option value="==">Equal To</option>
            <option value="!=">Not Equal</option>
          </select>
        </label>
        <label style={{ fontSize: '12px' }}>
          Threshold:
          <input 
            type="text" 
            value={threshold} 
            onChange={handleThresholdChange}
            style={{ width: '100%' }}
          />
        </label>
      </div>
    </BaseNode>
  );
};