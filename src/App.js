import React from 'react';
import './App.css';
import Home from './pages/Home';
import StartScreen from './components/StartScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import About from './pages/About';

const App = () => {
  const [showApp, setShowApp] = React.useState(false);

  const handleStart = () => {
    setShowApp(true);
  };

  // If showApp is false, only render the StartScreen
  if (!showApp) {
    return <StartScreen onStart={handleStart} />;
  }

  // When showApp is true, render the main app with the router
  return (
    <div className="App">
      <BrowserRouter>
        {/* Navbar is outside <Routes> so it stays on every page */}
        <Navbar />
        
        <Routes>
          {/* Your main page is now the "path" / */}
          <Route path="/" element={<Home />} />
          
          {/* Add routes for your other pages */}
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;