import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-heading">
          <h2>Marche Trekking</h2>
        </div>
        <div className="footer-content">
          <div className="footer-section">
            <h4>Social Media</h4>
            <ul>
              <li>
                <a href="#">
                  <i className="fab fa-linkedin"></i> Facebook
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-twitter"></i> X
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-instagram"></i> Instagram
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Link veloci</h4>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Blogs</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contattaci</h4>
            <p>
              Mobile: <a href="tel:+9112233445">+12 123 456 7890</a>
            </p>
            <p>
              Email:{" "}
              <a href="mailto:christian.olivieri93@gmail.com">
                christian.olivieri93@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <hr />
        <p>&copy; 2024 Marche Trekking. Tutti i diritti riservati.</p>
      </div>
    </footer>
  );
};

export default Footer;
