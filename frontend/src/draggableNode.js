// draggableNode.js

import './styles/DraggableNode.css';

export const DraggableNode = ({ type, label, icon, iconColor }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={`draggable-node draggable-node-${type}`}
        onDragStart={(event) => {
          onDragStart(event, type);
          event.target.style.opacity = '0.6';
        }}
        onDragEnd={(event) => {
          event.target.style.opacity = '1';
        }}
        draggable
      >
        {icon && (
          <span 
            className="draggable-node-icon" 
            style={{ 
              fontSize: '32px',
              filter: iconColor ? `drop-shadow(0 0 8px ${iconColor}40)` : 'none'
            }}
          >
            {icon}
          </span>
        )}
        <span className="draggable-node-label">{label}</span>
      </div>
    );
};