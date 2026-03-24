// frontend/src/nodes/filterNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const FilterNode = ({ id, data }) => {
  const [filterType, setFilterType] = useState(data?.filterType || 'contains');
  const [filterValue, setFilterValue] = useState(data?.filterValue || '');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleFilterTypeChange = (e) => {
    const val = e.target.value;
    setFilterType(val);
    updateNodeField(id, 'filterType', val);
  };

  const handleFilterValueChange = (e) => {
    const val = e.target.value;
    setFilterValue(val);
    updateNodeField(id, 'filterValue', val);
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
      title="Filter"
      handles={handles}
      containerStyle={{ backgroundColor: '#f0f8ff' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '12px' }}>
          Filter Type:
          <select value={filterType} onChange={handleFilterTypeChange} style={{ width: '100%' }}>
            <option value="contains">Contains</option>
            <option value="startsWith">Starts With</option>
            <option value="endsWith">Ends With</option>
            <option value="equals">Equals</option>
            <option value="regex">Regex</option>
          </select>
        </label>
        <label style={{ fontSize: '12px' }}>
          Filter Value:
          <input 
            type="text" 
            value={filterValue} 
            onChange={handleFilterValueChange}
            placeholder="Enter filter..."
            style={{ width: '100%' }}
          />
        </label>
      </div>
    </BaseNode>
  );
};