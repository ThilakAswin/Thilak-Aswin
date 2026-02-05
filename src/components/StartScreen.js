import React, { useEffect } from 'react';
import './StartScreen.css';

const StartScreen = ({ onStart }) => {
  const audioRef = React.useRef(null);

  const playSfxAndStart = React.useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    setTimeout(() => {
      onStart();
    }, 1000);
  }, [onStart]);

  useEffect(() => {
    const handleKeyDown = () => {
      playSfxAndStart();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [playSfxAndStart]);

  const handleStart = () => {
    playSfxAndStart();
  };

  return (
    <div
      className="start-screen-overlay"
      onClick={handleStart}
      onTouchStart={handleStart}
      role="button"
      tabIndex={0}
    >
      <video
        className="start-screen-video-bg"
        src={require('../assets/ghost-modern-warfare-from-call-of-duty.3840x2160.mp4')}
        autoPlay
        loop
        muted
        playsInline
      />
      <audio
        ref={audioRef}
        src={require('../assets/cod_mobile_matchup.mp3')}
        preload="auto"
      />
      <div className="start-screen-content">
        <p className="start-screen-blink">Click to Begin</p>
      </div>
    </div>
  );
};

export default StartScreen;
