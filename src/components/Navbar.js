import React from 'react';
import './Navbar.css';
// --- Import Link from react-router-dom ---
import { Link } from 'react-router-dom';
import hoverSound from '../assets/sfx/gta-san-andreas-menu-sound-1.mp3';

const Navbar = () => {
  const playSound = () => {
    new Audio(hoverSound).play();
  };

  return (
    <nav className="navbar-floating">
      <ul className="navbar-list">
        <li className="navbar-item" onMouseEnter={playSound}><Link to="/">Home</Link></li>
        <li className="navbar-item" onMouseEnter={playSound}><Link to="/about">About</Link></li>
        <li className="navbar-item" onMouseEnter={playSound}><Link to="/projects">Projects</Link></li>
        <li className="navbar-item" onMouseEnter={playSound}><Link to="/contact" >Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;