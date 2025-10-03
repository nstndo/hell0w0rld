import React from 'react';
import { Link } from 'react-router-dom';

const AnimatedLink = ({ to, children, external }) => {
  const letters = children.split('');
  
  if (external) {
    return (
      <a 
        href={to}
        target="_blank" 
        rel="noopener noreferrer" 
        className="footer-link animated-link"
      >
        {letters.map((letter, index) => (
          <span 
            key={index} 
            className="animated-letter"
            style={{ '--delay': `${index * 0.03}s` }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </a>
    );
  }
  
  return (
    <Link to={to} className="footer-link animated-link">
      {letters.map((letter, index) => (
        <span 
          key={index} 
          className="animated-letter"
          style={{ '--delay': `${index * 0.03}s` }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </Link>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Built with ❤️ for the onchain community</p>
        <nav className="footer-nav">
          <AnimatedLink to="/">HOME</AnimatedLink>
          <span className="footer-separator">•</span>
          <AnimatedLink to="/docs">DOCUMENTATION</AnimatedLink>
          <span className="footer-separator">•</span>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;