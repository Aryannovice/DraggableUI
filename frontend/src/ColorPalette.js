// ColorPalette.js (Enhanced version with react-color)

import { useState } from 'react';
import { SketchPicker } from 'react-color';
import './styles/ColorPalette.css';

const colorOptions = [
  { name: 'Cream', value: '#fef9e7', label: '🥛' },
  { name: 'Lavender', value: '#f3e8ff', label: '💜' },
  { name: 'Mint', value: '#f0fdf4', label: '🌿' },
  { name: 'Sky', value: '#f0f9ff', label: '☁️' },
  { name: 'Peach', value: '#fff7ed', label: '🍑' },
  { name: 'Rose', value: '#fff1f2', label: '🌹' },
  { name: 'Sand', value: '#fefce8', label: '🏖️' },
  { name: 'Ocean', value: '#ecfeff', label: '🌊' },
];

export const ColorPalette = ({ onColorChange, currentColor }) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="color-palette-container">
      <div className="color-palette-label">Canvas Color</div>
      <div className="color-palette-options">
        {colorOptions.map((color) => (
          <button
            key={color.value}
            className={`color-palette-item ${currentColor === color.value ? 'active' : ''}`}
            style={{ 
              backgroundColor: color.value,
              borderColor: currentColor === color.value ? '#6366f1' : 'transparent'
            }}
            onClick={() => onColorChange(color.value)}
            title={color.name}
          >
            <span className="color-palette-emoji">{color.label}</span>
          </button>
        ))}
        <button
          className="color-palette-custom"
          onClick={() => setShowPicker(!showPicker)}
          title="Custom Color"
        >
          🎨
        </button>
      </div>
      {showPicker && (
        <div className="color-picker-popup">
          <div className="color-picker-cover" onClick={() => setShowPicker(false)} />
          <SketchPicker
            color={currentColor}
            onChangeComplete={(color) => {
              onColorChange(color.hex);
            }}
          />
        </div>
      )}
    </div>
  );
};