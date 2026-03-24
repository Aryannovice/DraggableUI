// frontend/src/nodes/mathNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');
  const [value, setValue] = useState(data?.value || '0');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleOperationChange = (e) => {
    const val = e.target.value;
    setOperation(val);
    updateNodeField(id, 'operation', val);
  };

  const handleValueChange = (e) => {
    const val = e.target.value;
    setValue(val);
    updateNodeField(id, 'value', val);
  };

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-input`
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-output`
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Math"
      handles={handles}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '12px' }}>
          Operation:
          <select value={operation} onChange={handleOperationChange} style={{ width: '100%' }}>
            <option value="add">Add (+)</option>
            <option value="subtract">Subtract (-)</option>
            <option value="multiply">Multiply (×)</option>
            <option value="divide">Divide (÷)</option>
            <option value="power">Power (^)</option>
          </select>
        </label>
        <label style={{ fontSize: '12px' }}>
          Value:
          <input 
            type="number" 
            value={value} 
            onChange={handleValueChange}
            style={{ width: '100%' }}
          />
        </label>
      </div>
    </BaseNode>
  );
};