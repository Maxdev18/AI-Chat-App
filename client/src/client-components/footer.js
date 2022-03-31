import * as React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/footer.css';

export const Footer = () => {
  return (
    <footer className="footer-container">
      <h1 className="logo footer-logo">Chatting AI</h1>
        <div className="footer-link-container">
          <div className="footer-links footer-links-prod">
            <h3 className="footer-title footer-title-products">Product</h3>
            <Link to="/about" className="footer-link">About</Link>
            <Link to="/guidelines" className="footer-link">Guidelines</Link>
            <Link to="/blog" className="footer-link">How was it made</Link>
          </div>
          <div className="footer-links">
            <h3 className="footer-title footer-title-resources">Resources</h3>
            <Link to="/contact" className="footer-link">Contact</Link>
            <Link to="/learn-ai-commands" className="footer-link">AI Commands</Link>
          </div>
        </div>
    </footer>
  )
}