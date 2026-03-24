// Alert.js

import './styles/Alert.css';

export const Alert = ({ message, type = 'info', onClose }) => {
  if (!message) return null;

  return (
    <div className={`alert alert-${type}`}>
      <div className="alert-content">
        <div className="alert-message">{message}</div>
        <button className="alert-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};