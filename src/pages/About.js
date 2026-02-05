import React, { useState, useEffect, useRef } from 'react';
import './About.css';
import LevelStartLoader from '../components/LevelStartLoader';
import { preloadAssets } from '../utils/assetLoader';

// Asset imports
import myPic from '../assets/mypic.jpg';
import wolfLogo from '../assets/wolf witcher.png';
import parchmentBg from '../assets/vecteezy_the-ancient-script-antique-book-sheet-art_48971019.png';
import godOfWarVideo from '../assets/kratos-vs-dinosaur-god-of-war.3840x2160.mp4';
import bgMusic from '../assets/sfx/01. God of War.mp3';
import acEmblem from '../assets/ac emblem 2.png';

const assetsToLoad = [
  myPic,
  wolfLogo,
  parchmentBg,
  godOfWarVideo,
  bgMusic,
  acEmblem,
];

const useTypingEffect = (text, speed = 30) => {
  const [typedText, setTypedText] = useState('');
  useEffect(() => {
    setTypedText('');
    if (text) {
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          setTypedText(prev => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(timer);
        }
      }, speed);
      return () => clearInterval(timer);
    }
  }, [text, speed]);
  return typedText;
};

const About = () => {
  const [isLoading, setIsLoading] = useState(true);
  const loreText = "In the sprawling digital realms, a new hero emerges. Thilak Aswin, once a mere mortal, found himself drawn to the arcane arts of programming. His journey began with the ancient scrolls of HTML and CSS, leading him to master the incantations of JavaScript and the powerful frameworks of React.";
  const typedLore = useTypingEffect(isLoading ? '' : loreText, 20);
  const audioRef = useRef(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    preloadAssets(assetsToLoad)
      .then(() => {
        console.log("All assets loaded for About page");
        setIsLoading(false)
      })
      .catch(err => {
        console.error("Failed to load assets for About page", err)
        setIsLoading(false);
      });
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isMusicPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  if (isLoading) {
    return <LevelStartLoader loadingText="Deciphering Ancient Scripts..." />;
  }

  return (
    <div className="about-container">
      <audio ref={audioRef} src={bgMusic} loop />
      <video className="background-video" src={godOfWarVideo} autoPlay loop muted />
      <div className="video-overlay"></div>

      <div className="notice-board-wrapper">
        <div className="parchment-sheet" style={{ backgroundImage: `url(${parchmentBg})` }}>
          <img src={wolfLogo} alt="Wolf School" className="witcher-crest" />

          <div className="notice-header">
              <h2>NOTICE</h2>
              <span className="sub-notice">Contract: Full Stack Dev</span>
          </div>

          <hr className="divider-line" />

          <div className="content-grid">
              <div className="profile-row">
                  <div className="img-frame">
                      <img src={myPic} alt="Thilak Aswin" className="profile-pic" />
                  </div>
                  <div className="info-text">
                      <h1>Thilak Aswin</h1>
                      <p><strong>Class:</strong> Witcher (Dev School)</p>
                      <p><strong>Level:</strong> 22</p>
                  </div>
              </div>

              <hr className="divider-line" />

              <div className="lore-section">
                  <h3>Description</h3>
                  <p className="handwritten-text">{typedLore}</p>
              </div>
          </div>
              
          <div className="wax-seal" onClick={toggleMusic}>
              <img src={acEmblem} alt="AC Emblem" className="wax-seal-emblem" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;