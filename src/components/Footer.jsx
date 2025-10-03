import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const ScrambleText = ({ children, to, external }) => {
  const [displayText, setDisplayText] = useState(children);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef(null);
  const originalText = children;
  
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  
  useEffect(() => {
    if (isHovering) {
      let iteration = 0;
      const textLength = originalText.length;
      
      clearInterval(intervalRef.current);
      
      intervalRef.current = setInterval(() => {
        setDisplayText(prevText => 
          originalText
            .split('')
            .map((letter, index) => {
              if (letter === ' ') return ' ';
              if (index < iteration) {
                return originalText[index];
              }
              return letters[Math.floor(Math.random() * letters.length)];
            })
            .join('')
        );
        
        iteration += 1 / 3;
        
        if (iteration >= textLength) {
          clearInterval(intervalRef.current);
        }
      }, 30);
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