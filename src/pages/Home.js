import React, { useState } from 'react';
// Import AnimatePresence from framer-motion
import { motion, AnimatePresence } from 'framer-motion';
// Assuming Home.css is in the root 'src' folder like App.css
import './Home.css';
import AwardsSection from '../components/AwardsSection';
import SkillTree from '../components/SkillTree';
import HUDIcon from '../components/HUDIcon';
import HUD from '../components/HUD';

const Home = () => {
  const [showHUD, setShowHUD] = useState(false);
  // State to manage if the accordion is open or closed
  const [isBioExpanded, setIsBioExpanded] = useState(false);

  return (
    <div className="home-container">
      {/* Removed name heading */}
      <motion.div
        className="dialogue-box" // This class is now the main container
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Clickable Header */}
        <div
          className="dialogue-header"
          onClick={() => setIsBioExpanded(!isBioExpanded)}
        >
          {/* The arrow now rotates based on the 'expanded' class */}
          <span className={`dialogue-arrow ${isBioExpanded ? 'expanded' : ''}`}>
            ▶
          </span>
        </div>

        {/* Collapsible Content Area */}
        <AnimatePresence>
          {isBioExpanded && (
            <motion.section
              className="dialogue-content-wrapper"
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              variants={{
                expanded: { opacity: 1, height: 'auto', marginTop: '1.5rem' },
                collapsed: { opacity: 0, height: 0, marginTop: '0rem' },
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {/* This is your original content, now inside the collapsible section */}
              <div className="dialogue-content">
                <span>
                  I am a passionate software developer with expertise in
                  full-stack web development, cloud technologies, and modern
                  DevOps practices.<br />
                  With a strong foundation in React, Node.js, and AWS, I build
                  scalable, user-centric applications that blend creativity and
                  technical excellence.<br />
                  My portfolio showcases a diverse range of projects, from
                  interactive web apps to robust backend systems, all inspired
by my love for video games and innovative design.<br />
                  I thrive in collaborative environments, continuously learning
                  and pushing boundaries to deliver impactful solutions.
                </span>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </motion.div>

      <AwardsSection />

      <SkillTree />
      <HUDIcon onClick={() => setShowHUD(v => !v)} active={showHUD} />
      {showHUD && <HUD />}
    </div>
  );
};

export default Home;