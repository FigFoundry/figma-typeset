import React, { useState, useEffect } from 'react';
import CopyButton from './CopyButton';
import StatsDisplay from './StatsDisplay';
import UndoRedoButtons from './UndoRedoButtons';

interface TextStats {
  characters: number;
  words: number;
  lines: number;
}

interface TextAreaWithStatsProps {
  text: string;
  setText: (text: string) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const TextAreaWithStats: React.FC<TextAreaWithStatsProps> = ({
  text,
  setText,
  undo,
  redo,
  canUndo,
  canRedo,
}) => {
  const [textStats, setTextStats] = useState<TextStats>({ characters: 0, words: 0, lines: 0 });

  useEffect(() => {
    setTextStats({
      characters: text.length,
      words: text.trim() === '' ? 0 : text.trim().split(/\s+/).length,
      lines: text.split('\n').length,
    });
  }, [text]);

  return (
    <div className="textarea-container">
      {text && <CopyButton text={text} />}
      <textarea
        className="text-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text and choose the case you want to convert it to ..."
      />
      <div className="text-stats">
        <StatsDisplay characters={textStats.characters} words={textStats.words} lines={textStats.lines} />
        <UndoRedoButtons undo={undo} redo={redo} canUndo={canUndo} canRedo={canRedo} />
      </div>
    </div>
  );
};

export default TextAreaWithStats;