// Enhanced BaseNode.js with icon support

import { Handle, Position } from 'reactflow';
import '../styles/BaseNode.css';

const nodeIcons = {
  text: '📝',
  llm: '🤖',
  customInput: '📥',
  customOutput: '📤',
  conditional: '🔀',
  math: '🔢',
  filter: '🔍',
  transform: '🔄',
  merge: '🔗',
};

export const BaseNode = ({ 
  id, 
  data, 
  title, 
  handles = [], 
  containerStyle = {},
  children,
  nodeType 
}) => {
  // Merge containerStyle with important flags for width/height
  const defaultContainerStyle = {
    ...containerStyle,
    // Ensure width and height from containerStyle take precedence
    ...(containerStyle.width && { width: containerStyle.width }),
    ...(containerStyle.height && { height: containerStyle.height }),
    ...(containerStyle.minHeight && { minHeight: containerStyle.minHeight }),
  };

  const icon = nodeIcons[nodeType || data?.nodeType] || '⚙️';

  return (
    <div 
      className="base-node" 
      style={defaultContainerStyle}
      data-node-type={nodeType || data?.nodeType}
    >
      {/* Render handles */}
      {handles.map((handle, index) => (
        <Handle
          key={handle.id || `${id}-handle-${index}`}
          type={handle.type}
          position={handle.position}
          id={handle.id || `${id}-handle-${index}`}
          style={handle.style || {}}
          className="react-flow__handle-base-node"
        />
      ))}
      
      {/* Title section with icon */}
      {title && (
        <div className="base-node-header">
          <span className="base-node-icon">{icon}</span>
          <span className="base-node-title">{title}</span>
        </div>
      )}
      
      {/* Custom content */}
      <div className="base-node-content">
        {typeof children === 'function' ? children({ id, data }) : children}
      </div>
    </div>
  );
};