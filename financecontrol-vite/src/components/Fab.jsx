import React from 'react';
import './Fab.css';

const Fab = ({ onClick }) => {
  return (
    <button 
      className="fab" 
      onClick={onClick} 
      title="Adicionar lançamento"
      aria-label="Adicionar novo lançamento"
    >
      <i className="fas fa-plus"></i>
    </button>
  );
};

export default Fab; 