import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ theme, onThemeToggle }) => {
  return (
    <header className="header">
      <Link to="/" className="logo">Hello World</Link>
      <div className="header-actions">
        <button className="theme-toggle" onClick={onThemeToggle} title="Toggle theme">
          <span>{theme === 'light' ? '🌙' : '☀️'}</span>
        </button>
        <w3m-button />
      </div>
    </header>
  );
};

export default Header; 