import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Contact.css';

import { ReactComponent as GithubIcon } from '../assets/github.svg';
import { ReactComponent as EmailIcon } from '../assets/email.svg';
import { ReactComponent as LinkedinIcon } from '../assets/linkedin.svg';
import mypic from '../assets/mypic.jpg';
import backgroundVideo from '../assets/red-deads-epic-journey.3840x2160.mp4';

const items = [
  {
    name: 'GitHub',
    icon: <GithubIcon />,
    url: 'https://github.com/ThilakAswin',
  },
  {
    name: 'Email',
    icon: <EmailIcon />,
    url: 'mailto:thilakaswin33@gmail.com',
  },
  {
    name: 'LinkedIn',
    icon: <LinkedinIcon />,
    url: 'https://www.linkedin.com/in/thilak-aswin-thiruvalur-a4b165176',
  },
];

const radius = 160;

const itemVariants = {
  initial: (index) => {
    const angle = (index / items.length) * 2 * Math.PI - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return {
      x,
      y,
    };
  },
  hover: {
    scale: 1.2,
    backgroundColor: 'rgba(176, 141, 87, 0.5)',
    boxShadow: '0 0 20px rgba(255, 165, 0, 0.8)',
  },
};

const Contact = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="contact-container">
      <video autoPlay loop muted className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div className="weapon-wheel">
        <motion.div
          className="wheel-center"
          whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(255, 255, 255, 1)' }}
          onTap={() => navigate('/about')}
        >
          <img src={mypic} alt="Avatar" />
        </motion.div>

        <div className="rotating-items-container">
          {items.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="wheel-item"
              custom={index}
              variants={itemVariants}
              initial="initial"
              whileHover="hover"
              onHoverStart={() => setHoveredItem(item.name)}
              onHoverEnd={() => setHoveredItem(null)}
            >
              <div className="icon-container">{item.icon}</div>
            </motion.a>
          ))}
        </div>

        {hoveredItem && (
          <motion.div
            className="platform-name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {hoveredItem}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Contact;

