// frontend/src/nodes/inputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setCurrName(value);
    updateNodeField(id, 'inputName', value);
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setInputType(value);
    updateNodeField(id, 'inputType', value);
  };

  const handles = [
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-value`
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      handles={handles}
      nodeType="customInput"
    >
      <div>
        <label>
          Name:
          <input 
            type="text" 
            value={currName} 
            onChange={handleNameChange}
            placeholder="Enter name..."
          />
        </label>
        <label>
          Type:
          <select value={inputType} onChange={handleTypeChange}>
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};