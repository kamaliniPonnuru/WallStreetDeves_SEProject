import React from "react";
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        AlmaMingle <strong>University of North Texas</strong>, All Rights Reserved
        © {new Date().getFullYear()}
      </div>
      
      <div className="nav">
        <a href="/terms-of-use">Terms of Use</a>
        <a href="/privacy">Privacy</a>
      </div>
      
    </footer>
  );
}

export default Footer;