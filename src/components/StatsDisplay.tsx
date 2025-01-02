import React from 'react';

interface StatsDisplayProps {
  characters: number;
  words: number;
  lines: number;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ characters, words, lines }) => {
  return (
    <div className="stats-container">
  <div className="stats-values">
    <span className="stats-number">{characters}</span>
    <span className="stats-label">chars</span>
    <span className="stats-separator">·</span>
    
    <span className="stats-number">{words}</span>
    <span className="stats-label">words</span>
    <span className="stats-separator">·</span>
    
    <span className="stats-number">{lines}</span>
    <span className="stats-label">lines</span>
  </div>
</div>
  );
};

export default StatsDisplay;