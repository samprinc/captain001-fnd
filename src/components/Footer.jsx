import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">

        {/* Social Media */}
        <div className="footer-column">
          <h4>Follow Us</h4>
          <ul>
            <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter / X</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a></li>
            <li><a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a></li>
          </ul>
        </div>

        {/* Company */}
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/author">Our Authors</a></li>
            <li><a href="/experts">Our Experts</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/media-mentions">Media Mentions</a></li>
            <li><a href="/manifesto">Our Manifesto</a></li>
            <li><a href="/careers">Work for Us</a></li>
            <li><a href="/advertise">Advertise with Us</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="footer-column">
          <h4>Legal</h4>
          <ul>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
            <li><a href="/policies">Policies & Standards</a></li>
            <li><a href="/cookie-policy">Cookie Policy</a></li>
          </ul>
        </div>

        {/* Navigation */}
        <div className="footer-column">
          <h4>Explore</h4>
          <ul>
            <li><a href="/tags">Tags</a></li>
            <li><Link to="/categories">Categories</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CaptainMedia. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
