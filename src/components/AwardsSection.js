import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './AwardsSection.css';

function AwardCard({ icon, label, description, idx }) {
    const [flipped, setFlipped] = useState(false);
    const clipId = `svgPath${idx}`;

    return (
        <motion.svg
            width="180"
            height="286"
            viewBox="0 0 267.3 427.3"
            style={{
                display: 'block',
                cursor: 'pointer',
                margin: '0 6px',
                transition: 'filter 0.4s ease-in-out', // smooth fade-out
            }}
            onClick={() => setFlipped(f => !f)}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{
                scale: 1.08,
                filter: "drop-shadow(0 0 32px #ffd700)",
            }}
            transition={{
                duration: 0.6,
                delay: idx * 0.15,
                type: 'spring',
                stiffness: 120,
            }}
        >
            <defs>
                <clipPath id={clipId}>
                    <path d="M265.3 53.9a33.3 33.3 0 0 1-17.8-5.5 32 32 0 0 1-13.7-22.9c-.2-1.1-.4-2.3-.4-3.4 0-1.3-1-1.5-1.8-1.9a163 163 0 0 0-31-11.6A257.3 257.3 0 0 0 133.7 0a254.9 254.9 0 0 0-67.1 8.7 170 170 0 0 0-31 11.6c-.8.4-1.8.6-1.8 1.9 0 1.1-.2 2.3-.4 3.4a32.4 32.4 0 0 1-13.7 22.9A33.8 33.8 0 0 1 2 53.9c-1.5.1-2.1.4-2 2v293.9c0 3.3 0 6.6.4 9.9a22 22 0 0 0 7.9 14.4c3.8 3.2 8.3 5.3 13 6.8 12.4 3.9 24.8 7.5 37.2 11.5a388.7 388.7 0 0 1 50 19.4 88.7 88.7 0 0 1 25 15.5v.1-.1c7.2-7 16.1-11.3 25-15.5a427 427 0 0 1 50-19.4l37.2-11.5c4.7-1.5 9.1-3.5 13-6.8 4.5-3.8 7.2-8.5 7.9-14.4.4-3.3.4-6.6.4-9.9V231.6 60.5v-4.6c.4-1.6-.3-1.9-1.7-2z" />
                </clipPath>
            </defs>

            <foreignObject width="100%" height="100%" clipPath={`url(#${clipId})`}>
                <div
                    className={`award-card-inner${flipped ? ' flipped' : ''}`}
                    style={{
                        width: '100%',
                        height: '100%',
                        background: flipped
                            ? 'linear-gradient(135deg, #232526 60%, #ffd700 100%)'
                            : 'linear-gradient(135deg, #fdeaa7 0%, #e1c072 100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: "'Press Start 2P', cursive",
                        color: flipped ? '#232526' : '#725b16',
                        fontSize: '1.25rem',
                        transition: 'background 0.3s, filter 0.4s ease-in-out',
                        cursor: 'pointer',
                    }}
                >
                    {!flipped ? (
                        <>
                            <span
                                className="award-icon"
                                style={{
                                    fontSize: '2.7rem',
                                    marginBottom: '0.7rem',
                                }}
                            >
                                {icon}
                            </span>
                            <span
                                className="award-label"
                                style={{
                                    fontWeight: 'bold',
                                    color: '#232526',
                                    textShadow: '1px 1px 0 #bfae6a',
                                    fontSize: '1.35rem',
                                }}
                            >
                                {label}
                            </span>
                        </>
                    ) : (
                        <span
                            className="award-desc"
                            style={{
                                fontSize: '1.15rem',
                                color: '#00ff99',
                                textAlign: 'center',
                                padding: '0.5rem',
                            }}
                        >
                            {description}
                        </span>
                    )}
                </div>
            </foreignObject>
        </motion.svg>
    );
}

export default function AwardsSection() {
    const awards = [
        { icon: "☁️", label: "AWS Cloud Practitioner", description: "Ultimate AWS Certified Cloud Practitioner CLF-C01 & CLFC02" },
        { icon: "🚀", label: "Agile Fundamentals", description: "Agile Fundamentals: Including Scrum & Kanban" },
        { icon: "🖥️", label: "Full Stack Bootcamp", description: "The Complete Full Stack Web Development Bootcamp" },
        { icon: "🥈", label: "Mind Spark Hackathon", description: "Second Prize – Mind Spark Hackathon organized by IUCEE" },
        { icon: "🥉", label: "System Thinking Expo", description: "Third Prize – Intra-College System Thinking Expo" },
        { icon: "🏅", label: "Chennai Tech-Showcase", description: "Regional Finalist – Chennai Tech-Showcase" },
    ];

    return (
        <div className="awards-section">
            <h2 className="section-title">Certifications & Awards</h2>
            <div className="award-card-list">
                {awards.map((award, idx) => (
                    <AwardCard key={idx} idx={idx} {...award} />
                ))}
            </div>
        </div>
    );
}
