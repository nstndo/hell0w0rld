import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const ScrambleLogo = () => {
  const [displayText, setDisplayText] = useState('HELLO WORLD');
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef(null);
  const originalText = 'HELLO WORLD';
  
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
  useEffect(() => {
    if (isHovering) {
      const textLength = originalText.length;
      const revealOrder = Array.from({ length: textLength }, (_, i) => i)
        .filter(i => originalText[i] !== ' ')
        .sort(() => Math.random() - 0.5);
      
      const revealed = new Array(textLength).fill(false);
      // Mark spaces as already revealed
      originalText.split('').forEach((char, i) => {
        if (char === ' ') revealed[i] = true;
      });
      
      let revealIndex = 0;
      
      clearInterval(intervalRef.current);
      
      intervalRef.current = setInterval(() => {
        if (revealIndex < revealOrder.length) {
          const lettersToReveal = Math.floor(Math.random() * 1.5) + 1;
          for (let i = 0; i < lettersToReveal && revealIndex < revealOrder.length; i++) {
            revealed[revealOrder[revealIndex]] = true;
            revealIndex++;
          }
        }
        
        setDisplayText(
          originalText
            .split('')
            .map((letter, index) => {
              if (letter === ' ') return ' ';
              if (revealed[index]) {
                return originalText[index];
              }
              return letters[Math.floor(Math.random() * letters.length)];
            })
            .join('')
        );
        
        if (revealIndex >= revealOrder.length) {
          clearInterval(intervalRef.current);
        }
      }, 60);
    } else {
      clearInterval(intervalRef.current);
      setDisplayText(originalText);
    }
    
    return () => clearInterval(intervalRef.current);
  }, [isHovering]);
  
  return (
    <Link 
      to="/" 
      className="logo"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {displayText}
    </Link>
  );
};

const Header = ({ theme, onThemeToggle }) => {
  return (
    <header className="header">
      <ScrambleLogo />
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