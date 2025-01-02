import React from 'react';

interface CleanupToolsProps {
  text: string;
  setText: (text: string) => void;
}

const CleanupTools: React.FC<CleanupToolsProps> = ({ text, setText }) => {
  const cleanupTools = {
    removeExtraSpaces: (text: string) => {
      return text.replace(/[ \t]+/g, ' ').trim();
    },
    removeLineBreaks: (text: string) => {
      return text.replace(/\n+/g, ' ');
    },
    fixPunctuation: (text: string) => {
      return text
        .replace(/[ \t]+([.,!?:;])/g, '$1')
        .replace(/([.,!?:;])[ \t]*/g, '$1 ')
        .trim();
    },
    normalizeQuotes: (text: string) => {
      return text
        .replace(/(^|[-\u2014\s(\["])'/g, "$1‘")
        .replace(/'/g, "’")
        .replace(/(^|[-\u2014/\[(\s])"/g, '$1“')
        .replace(/"/g, '”');
    },
    removeExtraLineBreaks: (text: string) => {
      return text.replace(/\n{2,}/g, '\n');
    },
    trimLines: (text: string) => {
      return text
        .split('\n')
        .map((line) => line.trim())
        .join('\n');
    },
  };

  const handleCleanup = (cleaner: keyof typeof cleanupTools) => {
    setText(cleanupTools[cleaner](text));
  };

  return (
    <div className="cleanup-tools">
      <button className="cleanup-button" onClick={() => handleCleanup('removeExtraSpaces')}>
        Remove Extra Spaces
      </button>
      <button className="cleanup-button" onClick={() => handleCleanup('removeLineBreaks')}>
        Remove Line Breaks
      </button>
      <button className="cleanup-button" onClick={() => handleCleanup('fixPunctuation')}>
        Fix Punctuation
      </button>
      <button className="cleanup-button" onClick={() => handleCleanup('normalizeQuotes')}>
        Normalize Quotes
      </button>
      <button className="cleanup-button" onClick={() => handleCleanup('removeExtraLineBreaks')}>
        Remove Extra Line Breaks
      </button>
      <button className="cleanup-button" onClick={() => handleCleanup('trimLines')}>
        Trim Lines
      </button>
    </div>
  );
};

export default CleanupTools;