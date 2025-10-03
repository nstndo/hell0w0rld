import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Built with ❤️ for the onchain community</p>
        <nav className="footer-nav">
          <Link to="/" className="footer-link">Home</Link>
          <span className="footer-separator">•</span>
          <Link to="/docs" className="footer-link">Documentation</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;