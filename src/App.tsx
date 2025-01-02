import React, { useState } from 'react';
import TextAreaWithStats from './components/TextAreaWithStats';
import Tabs from './components/Tabs';

const App: React.FC = () => {
  const [text, setText] = useState('');
  const [history, setHistory] = useState<string[]>([text]);
  const [index, setIndex] = useState(0);

  const canUndo = index > 0;
  const canRedo = index < history.length - 1;

  const updateText = (newText: string) => {
    setText(newText);
    const newHistory = history.slice(0, index + 1);
    setHistory([...newHistory, newText]);
    setIndex(newHistory.length);
  };

  const undo = () => {
    if (canUndo) {
      setIndex(index - 1);
      setText(history[index - 1]);
    }
  };

  const redo = () => {
    if (canRedo) {
      setIndex(index + 1);
      setText(history[index + 1]);
    }
  };

  return (
    <div className="container">
      <TextAreaWithStats
        text={text}
        setText={updateText}
        undo={undo}
        redo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
      />
      <Tabs text={text} setText={updateText} />
    </div>
  );
};

export default App;