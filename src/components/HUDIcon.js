import React from 'react';
import './HUDIcon.css';

const HUDIcon = ({ onClick, active }) => (
  <button
    className={`hud-icon-btn${active ? ' active' : ''}`}
    onClick={onClick}
    aria-label="Toggle HUD"
  >
    <span role="img" aria-label="controller" style={{fontSize: '2rem'}}>🎮</span>
  </button>
);

export default HUDIcon;
