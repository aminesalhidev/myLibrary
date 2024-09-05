// src/components/ButtonGroup.tsx
import React from 'react';

interface ButtonGroupProps {
  onAddBookClick: () => void;
  onMyLibraryClick: () => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ onAddBookClick, onMyLibraryClick }) => {
  return (
    <div id="button-container">
      <input
        type="submit"
        value="Aggiungi Libro"
        onClick={onAddBookClick}
      />
      <input
        type="submit"
        value="My library;)"
        style={{ backgroundColor: 'rgb(0, 191, 255)' }}
        onClick={onMyLibraryClick}
      />
    </div>
  );
};

export default ButtonGroup;
