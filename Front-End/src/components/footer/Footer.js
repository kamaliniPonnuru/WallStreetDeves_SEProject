import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-white text-center" style={{ position: "relative", bottom: "0", width: "100%" }}>
      <div className="wrapper mt-3">
        <small>
          AlmaMingle<br />
          <strong>University of North Texas</strong>, All Rights Reserved
          © {new Date().getFullYear()}
        </small>
        <nav className="footer-nav">
          <a href="#">Terms of Use</a><br />
          <a href="#">Privacy</a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
