import React from 'react';
import './RadarChart.css';

const RadarChart = ({ stats }) => {
  const size = 300;
  const center = size / 2;
  const numLevels = 5;
  const angleSlice = (Math.PI * 2) / stats.length;

  // Function to calculate the coordinates of a point on the chart
  const calculatePoint = (value, angle) => {
    const x = center + (value / 100) * (center * 0.8) * Math.cos(angle - Math.PI / 2);
    const y = center + (value / 100) * (center * 0.8) * Math.sin(angle - Math.PI / 2);
    return `${x},${y}`;
  };

  // Generate the points string for the stats polygon
  const statPoints = stats
    .map((stat, i) => calculatePoint(stat.value, angleSlice * i))
    .join(' ');

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="radar-chart">
      <g className="grid-group">
        {/* Render grid lines and levels */}
        {[...Array(numLevels)].map((_, level) => (
          <polygon
            key={`level-${level}`}
            points={stats
              .map((_, i) => calculatePoint(((level + 1) * 100) / numLevels, angleSlice * i))
              .join(' ')}
            className="grid-level"
          />
        ))}
        {/* Render axes */}
        {stats.map((_, i) => (
          <line
            key={`axis-${i}`}
            x1={center}
            y1={center}
            x2={parseFloat(calculatePoint(100, angleSlice * i).split(',')[0])}
            y2={parseFloat(calculatePoint(100, angleSlice * i).split(',')[1])}
            className="grid-axis"
          />
        ))}
      </g>
      <g className="labels-group">
        {/* Render stat labels */}
        {stats.map((stat, i) => {
          const point = calculatePoint(115, angleSlice * i).split(',');
          const x = parseFloat(point[0]);
          const y = parseFloat(point[1]);
          return (
            <text
              key={`label-${i}`}
              x={x}
              y={y}
              dy="0.35em"
              className="stat-label"
              textAnchor={x > center + 5 ? 'start' : x < center - 5 ? 'end' : 'middle'}
            >
              {stat.name}
            </text>
          );
        })}
      </g>
      <g className="stats-group">
        {/* Render the main stats polygon */}
        <polygon points={statPoints} className="stat-shape" />
        {/* Render points on the stats polygon */}
        {stats.map((stat, i) => (
          <circle
            key={`point-${i}`}
            cx={parseFloat(calculatePoint(stat.value, angleSlice * i).split(',')[0])}
            cy={parseFloat(calculatePoint(stat.value, angleSlice * i).split(',')[1])}
            r="4"
            className="stat-point"
          />
        ))}
      </g>
    </svg>
  );
};

export default RadarChart;
