import React, { useState, useEffect, useRef } from 'react';
import './SkillTree.css';

const branches = [
	{
		name: 'Frontend',
		icon: '🎨',
		skills: [
			{ name: 'React.js', icon: '⚛️', level: 'Expert' },
			{ name: 'HTML/CSS/JS', icon: '🖥️', level: 'Expert' },
		],
	},
	{
		name: 'Backend',
		icon: '🛡️',
		skills: [
			{ name: 'Node.js', icon: '🟩', level: 'Advanced' },
			{ name: 'Express.js', icon: '🚀', level: 'Advanced' },
			{ name: 'Spring Boot', icon: '🌱', level: 'Advanced' },
			{ name: 'REST APIs', icon: '🔗', level: 'Advanced' },
		],
	},
	{
		name: 'Database',
		icon: '🗄️',
		skills: [
			{ name: 'MongoDB', icon: '🍃', level: 'Intermediate' },
			{ name: 'MySQL', icon: '🐬', level: 'Intermediate' },
		],
	},
	{
		name: 'DevOps & Cloud',
		icon: '☁️',
		skills: [
			{ name: 'AWS', icon: '☁️', level: 'Intermediate' },
			{ name: 'Git', icon: '🔧', level: 'Advanced' },
			{ name: 'Postman', icon: '📬', level: 'Advanced' },
			{ name: 'ELK Stack', icon: '🦌', level: 'Intermediate' },
		],
	}
];

const SkillTree = () => {
	const [marioLeft, setMarioLeft] = useState(0);
	const [marioState, setMarioState] = useState('run');
	const [branchWidth, setBranchWidth] = useState(0);
	const marioWidth = 80;
	const branchRef = useRef(null);

	useEffect(() => {
		function updateBranchWidth() {
			if (branchRef.current) {
				setBranchWidth(branchRef.current.offsetWidth);
			}
		}
		updateBranchWidth();
		window.addEventListener('resize', updateBranchWidth);
		return () => window.removeEventListener('resize', updateBranchWidth);
	}, []);

	useEffect(() => {
		if (branchWidth === 0) return;
		if (marioState === 'run') {
			const interval = setInterval(() => {
				setMarioLeft(prev => {
					if (prev < branchWidth - marioWidth) {
						return prev + 8;
					} else {
						setMarioState('fall');
						return branchWidth - marioWidth;
					}
				});
			}, 30);
			return () => clearInterval(interval);
		}
		if (marioState === 'fall') {
			const timeout = setTimeout(() => {
				setMarioLeft(0);
				setMarioState('run');
			}, 2000);
			return () => clearTimeout(timeout);
		}
	}, [marioState, branchWidth]);

	return (
		<div className="skills-section">
			<h2 className="section-title">Skill Tree</h2>
			<div className="skill-tree-main">
				<div className="skill-tree-root">
					<div className="mario-runner" ref={branchRef}>
						<img src={require('../assets/8bit-mario-runing.gif')} alt="Mario Running" className={`mario-gif${marioState === 'fall' ? ' mario-fall' : ''}`} style={{ left: marioLeft, transition: 'left 0.03s linear, top 0.5s cubic-bezier(.68,-0.55,.27,1.55)' }} />
					</div>
				</div>
				<div className="skill-tree-branches">
					{branches.map((branch) => (
						<div className="skill-tree-branch" key={branch.name}>
							<div className="branch-node">
								<span className="branch-icon">{branch.icon}</span>
								<span className="branch-label">{branch.name}</span>
							</div>
							<div className="branch-skills">
								{branch.skills.map((skill) => (
									<div className="skill-leaf" key={skill.name}>
										<span className="leaf-icon">{skill.icon}</span>
										<span className="leaf-label">{skill.name}</span>
										<span className="leaf-level">{skill.level}</span>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default SkillTree;
