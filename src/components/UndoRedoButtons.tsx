import React from 'react';

interface UndoRedoButtonsProps {
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const UndoRedoButtons: React.FC<UndoRedoButtonsProps> = ({ undo, redo, canUndo, canRedo }) => {
  return (
    <div className="stats-buttons">
      <button className="undo-button" onClick={undo} disabled={!canUndo} title="Undo">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" style={{ color: 'var(--figma-color-icon)' }}><rect width="256" height="256" fill="none"/><polyline points="24 56 24 104 72 104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M67.59,192A88,88,0,1,0,65.77,65.77L24,104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
      </button>
      <button className="redo-button" onClick={redo} disabled={!canRedo} title="Redo">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" style={{ color: 'var(--figma-color-icon)' }}><rect width="256" height="256" fill="none"/><polyline points="184 104 232 104 232 56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M188.4,192a88,88,0,1,1,1.83-126.23L232,104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
      </button>
    </div>
  );
};

export default UndoRedoButtons;