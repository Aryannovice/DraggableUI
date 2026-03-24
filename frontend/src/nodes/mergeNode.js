// frontend/src/nodes/mergeNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const MergeNode = ({ id, data }) => {
  const [mergeType, setMergeType] = useState(data?.mergeType || 'average');
  const [separator, setSeparator] = useState(data?.separator || ', ');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleMergeTypeChange = (e) => {
    const val = e.target.value;
    setMergeType(val);
    updateNodeField(id, 'mergeType', val);
  };

  const handleSeparatorChange = (e) => {
    const val = e.target.value;
    setSeparator(val);
    updateNodeField(id, 'separator', val);
  };

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-input1`,
      style: { top: '25%' }
    },
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-input2`,
      style: { top: '50%' }
    },
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-input3`,
      style: { top: '75%' }
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-output`,
      style: { top: '50%' }
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Merge"
      handles={handles}
      containerStyle={{ height: 140 }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '12px' }}>
          Merge Type:
          <select value={mergeType} onChange={handleMergeTypeChange} style={{ width: '100%' }}>
            <option value="concat">Concatenate</option>
            <option value="sum">Sum</option>
            <option value="average">Average</option>
            <option value="max">Maximum</option>
            <option value="min">Minimum</option>
          </select>
        </label>
        {mergeType === 'concat' && (
  <label style={{ fontSize: '12px' }}>
    Separator:
    <input
      type="text"
      value={separator}
      onChange={handleSeparatorChange}
      style={{ width: '100%' }}
      spellCheck={false}
      autoComplete="off"
    />
  </label>
)}
      </div>
    </BaseNode>
  );
};