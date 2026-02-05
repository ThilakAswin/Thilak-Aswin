import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Home.css';
import AwardsSection from '../components/AwardsSection';
import SkillTree from '../components/SkillTree';
import HUDIcon from '../components/HUDIcon';
import HUD from '../components/HUD';
import LevelStartLoader from '../components/LevelStartLoader';
import { preloadAssets } from '../utils/assetLoader';

// Import the large background image to be preloaded
import bgImage from '../assets/among_us_video_game-wallpaper-5120x3840.jpg';

const assetsToLoad = [bgImage];

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showHUD, setShowHUD] = useState(false);
  const [isBioExpanded, setIsBioExpanded] = useState(false);

  useEffect(() => {
    preloadAssets(assetsToLoad)
      .then(() => setIsLoading(false))
      .catch(err => {
        console.error("Failed to load assets for Home page", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <LevelStartLoader loadingText="Initializing Core Systems..." />;
  }

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