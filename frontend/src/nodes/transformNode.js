// frontend/src/nodes/transformNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const TransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(data?.transformType || 'uppercase');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleTransformTypeChange = (e) => {
    const val = e.target.value;
    setTransformType(val);
    updateNodeField(id, 'transformType', val);
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
      title="Transform"
      handles={handles}
      containerStyle={{ backgroundColor: '#fff8dc' }}
    >
      <div>
        <label style={{ fontSize: '12px' }}>
          Transform:
          <select value={transformType} onChange={handleTransformTypeChange} style={{ width: '100%' }}>
            <option value="uppercase">Uppercase</option>
            <option value="lowercase">Lowercase</option>
            <option value="capitalize">Capitalize</option>
            <option value="reverse">Reverse</option>
            <option value="trim">Trim</option>
            <option value="replace">Replace</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};