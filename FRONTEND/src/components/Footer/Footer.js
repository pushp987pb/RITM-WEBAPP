// Footer.js
import { Link } from 'react-router-dom';
import React from 'react';
import './Footer.css'; // Import your CSS file

const Footer = () => {
  return (
    <footer className="tm-footer">
      <div className="tm-footer-content">
        <div className="tm-footer-logo">
          <img src="https://logo.com/image-cdn/images/kts928pd/production/80891627307dbfdb8f936bc7706beff68c7d5667-326x336.png?w=1080&q=72" alt="Temple Logo" />
        </div>
        <div className="tm-footer-links">
          <Link to="">Home</Link>
          <Link to="">About</Link>
          <Link to="view-temples">View Tamples</Link>
          <Link to="">Contact</Link> 
        </div>
        <div className="tm-footer-social">
          <a href="#"><img src="https://png.pngtree.com/png-clipart/20190613/original/pngtree-facebook-icon-png-image_3584837.jpg" alt="Facebook" /></a>
          <a href="#"><img src="https://toppng.com/uploads/preview/twitter-logo-11549680523gyu1fhgduu.png" alt="Twitter" /></a>
          <a href="#"><img src="https://i.pinimg.com/originals/72/9f/77/729f7798561be2cb67f39e916a22eb6a.png" alt="Instagram" /></a>
        </div>
      </div>
      <p className="tm-footer-copyright mb-0">© 2024 Temple Management System</p>
    </footer>
  );
};

export default Footer;
