import React from 'react';
import './LevelStartLoader.css';
import wolfLogo from '../assets/wolf witcher.png';

const LevelStartLoader = ({ loadingText = 'Forging the Digital Realm...' }) => {
  return (
    <div className="level-loader-overlay">
      <div className="loader-content">
        <img src={wolfLogo} alt="Loading Emblem" className="loader-emblem" />
        <p className="loader-text">{loadingText}</p>
        <div className="particle-container">
          {/* Generate a number of particles for the animation */}
          {[...Array(20)].map((_, i) => (
            <div className="particle" key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelStartLoader;
