import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const ScrambleText = ({ children, to, external }) => {
  const [displayText, setDisplayText] = useState(children);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef(null);
  const originalText = children;
  
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
  useEffect(() => {
    if (isHovering) {
      const textLength = originalText.length;
      const revealOrder = Array.from({ length: textLength }, (_, i) => i)
        .filter(i => originalText[i] !== ' ')
        .sort(() => Math.random() - 0.5);
      
      const revealed = new Array(textLength).fill(false);
      let revealIndex = 0;
      
      clearInterval(intervalRef.current);
      
      intervalRef.current = setInterval(() => {
        if (revealIndex < revealOrder.length) {
          const lettersToReveal = Math.floor(Math.random() * 1.5) + 1; // 1 letter at once, sometimes 2
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
      }, 60); // transformation's time
    } else {
      clearInterval(intervalRef.current);
      setDisplayText(originalText);
    }
    
    return () => clearInterval(intervalRef.current);
  }, [isHovering, originalText]);
  
  const linkProps = {
    className: "footer-link scramble-link",
    onMouseEnter: () => setIsHovering(true),
    onMouseLeave: () => setIsHovering(false)
  };
  
  if (external) {
    return (
      <a 
        href={to}
        target="_blank" 
        rel="noopener noreferrer"
        {...linkProps}
      >
        {displayText}
      </a>
    );
  }
  
  return (
    <Link to={to} {...linkProps}>
      {displayText}
    </Link>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Built with ❤️ for the onchain community</p>
        <nav className="footer-nav">
          <ScrambleText to="/">HOME</ScrambleText>
          <span className="footer-separator">•</span>
          <ScrambleText to="/docs">DOCUMENTATION</ScrambleText>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;