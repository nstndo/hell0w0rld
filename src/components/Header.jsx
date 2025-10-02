import React from 'react';

const Header = ({ theme, onThemeToggle }) => {
  return (
    <header className="header">
      <div className="logo">👋 Hello World</div>
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