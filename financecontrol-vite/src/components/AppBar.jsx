import React from 'react';
import './AppBar.css';

const AppBar = ({ onThemeToggle, isDarkMode }) => {
  return (
    <header className="appbar">
      <div className="appbar-left">
        <img src="/assets/logo.svg" alt="Logo" className="logo" />
        <span className="app-title">FinanceControl</span>
      </div>
      
      <div className="appbar-right">
        <button 
          className="theme-toggle" 
          onClick={onThemeToggle}
          title="Alternar tema" 
          aria-label="Alternar tema"
        >
          <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
        </button>
      </div>
    </header>
  );
};

export default AppBar; 