import React from 'react';
import './HUD.css';

const HUD = () => (
  <div className="hud-container">
    <div className="hud-avatar">
      <img src={require('../assets/CALL OF DUTY GHOST PC DESKTOP WALLPAPER 4K.jpeg')} alt="Avatar" />
      <div className="hud-avatar-info">
        <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Thilak Aswin</span>
        <span>Level 21</span>
        <span>Class: Frontend Developer</span>
      </div>
    </div>
  </div>
);

export default HUD;
