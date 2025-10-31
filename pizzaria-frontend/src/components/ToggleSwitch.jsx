import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './ToggleSwitch.css';

export default function ToggleSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={theme === 'dark'}
        onChange={toggleTheme}
      />
      <span className="slider">
        <span className="icon">{theme === 'dark' ? '🌙' : '☀️'}</span>
      </span>
    </label>
  );
}
