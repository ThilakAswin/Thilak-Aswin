import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Keyboard } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './Projects.css';
import LevelStartLoader from '../components/LevelStartLoader';
import { preloadAssets } from '../utils/assetLoader';

import projectImage1 from '../assets/red_dead_redemption_2_cowboy_western_video_game-wallpaper-2880x1800.jpg';
import projectImage2 from '../assets/elden ring.jpg';
import projectImage3 from '../assets/among_us_video_game-wallpaper-5120x3840.jpg';
import projectImage4 from '../assets/for-honor-prince-of-5120x2880-22259.jpg';
import projectImage5 from '../assets/Breaking-Bad-pizza.jpg';
import bgImage from '../assets/neon-cyberpunk-corridor-jpg-aelixar6kbi1c2he.jpg';
import navigationSound from '../assets/sfx/04. Src11 Decide Refine D.mp3';

const assetsToLoad = [
  projectImage1,
  projectImage2,
  projectImage3,
  projectImage4,
  projectImage5,
  bgImage,
  navigationSound,
];

const projectsData = [
  {
    "id": 1, "title": "Top Movies of Tamil Cinema", "description": "A collection of the best movies from Tamil cinema.", "image": projectImage1,
    "githubUrl": "https://github.com/ThilakAswin/TopMovies", "liveUrl": "https://thilakaswin.github.io/TopMovies/html/Tamil/tamil.html",
    "performance": 88, "ux": 92, "devTime": "30 hours", "engine": "Vanilla JS Engine"
  },
  {
    "id": 2, "title": "Hand Cricket Game", "description": "A simple and fun hand cricket game to play in your browser.", "image": projectImage2,
    "githubUrl": "https://github.com/ThilakAswin/Hand-Cricket-Game", "liveUrl": "https://hand-cricket-hzuw.onrender.com/",
    "performance": 95, "ux": 85, "devTime": "50 hours", "engine": "Node.js Turbo"
  },
  {
    "id": 3, "title": "Funny Quiz Game", "description": "Test your knowledge with this entertaining quiz game.", "image": projectImage3,
    "githubUrl": "https://github.com/ThilakAswin/Quiz-App", "liveUrl": "https://quiz-app-l20g.onrender.com/",
    "performance": 91, "ux": 90, "devTime": "45 hours", "engine": "V8 React Engine"
  },
  {
    "id": 4, "title": "Weather App", "description": "Get real-time weather updates for any location.", "image": projectImage4,
    "githubUrl": "https://github.com/ThilakAswin/Weather-App", "liveUrl": "https://weather-app-vu9c.onrender.com/",
    "performance": 94, "ux": 88, "devTime": "40 hours", "engine": "React & API Boost"
  },
  {
    "id": 5, "title": "Pizza Hunt", "description": "A Domino's-like pizza ordering application.", "image": projectImage5,
    "githubUrl": "https://github.com/ThilakAswin/Pizza-Hunt", "liveUrl": "#",
    "performance": 85, "ux": 80, "devTime": "120 hours", "engine": "Full-Stack Fusion"
  }
];

const StatBar = ({ label, value, maxValue, color }) => (
    <div className="stat-bar" style={{ marginBottom: '8px' }}>
        <div className="stat-label" style={{ color: '#ccc', fontSize: '0.8rem', marginBottom: '2px', textAlign: 'left' }}>{label}</div>
        <div className="bar-container" style={{ width: '100%', height: '6px', backgroundColor: '#333', borderRadius: '3px', overflow: 'hidden' }}>
            <div className="bar-value" style={{ width: `${(value / maxValue) * 100}%`, height: '100%', backgroundColor: color || '#00ffcc', boxShadow: `0 0 8px ${color || '#00ffcc'}` }}></div>
        </div>
    </div>
);

const Projects = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const isInitialMount = useRef(true);

  useEffect(() => {
    preloadAssets(assetsToLoad)
      .then(() => setIsLoading(false))
      .catch(err => {
        console.error("Failed to load assets for Projects page", err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (isLoading || isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const audio = new Audio(navigationSound);
      audio.play();
    }
  }, [activeIndex, isLoading]);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  const handleLinkClick = (url, index, e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (isLoading) {
    return <LevelStartLoader loadingText="Entering the Project Garage..." />;
  }

  return (
    <div className="projects-container supercar-theme">
      <img src={bgImage} alt="background" className="bg-image" />
      <div className="dark-overlay"></div>

      <div className="content-overlay">
        <motion.h1 
          className="supercar-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Project Garage
        </motion.h1>

        <Swiper
            centeredSlides={true}
            slidesPerView={3}
            spaceBetween={30}
            pagination={{ 
                clickable: true
            }}
            navigation={true}
            keyboard={{
                enabled: true,
            }}
            modules={[Pagination, Navigation, Keyboard]}
            className="mySwiper"
            onSlideChange={handleSlideChange}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30
              }
            }}
        >
          {projectsData.map((project, index) => (
            <SwiperSlide key={project.id}>
                <div className={`project-card ${index === activeIndex ? 'active-card' : ''}`}>
                    <img src={project.image} alt={project.title} className="project-image" />
                    
                    <h2 className="project-title">{project.title}</h2>
                    
                    <div className="stats-panel">
                        <StatBar label="Top Speed (Perf)" value={project.performance} maxValue={100} color="#ff0055" />
                        <StatBar label="Handling (UX)" value={project.ux} maxValue={100} color="#00ccff" />
                        
                        <div className="stat-row">
                            <span><strong>0-60:</strong> {project.devTime}</span>
                            <span><strong>Engine:</strong> {project.engine}</span>
                        </div>
                    </div>
                    
                    <div className="project-links">
                        {project.liveUrl && project.liveUrl !== '#' ? (
                            <button 
                                onClick={(e) => handleLinkClick(project.liveUrl, index, e)}
                                className="btn-garage btn-drive"
                            >
                                Test Drive
                            </button>
                        ) : (
                            <span className="btn-garage btn-disabled">In Garage</span>
                        )}
                        <button 
                            onClick={(e) => handleLinkClick(project.githubUrl, index, e)}
                            className="btn-garage btn-hood"
                        >
                            Pop Hood
                        </button>
                    </div>
                </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};


export default Projects;