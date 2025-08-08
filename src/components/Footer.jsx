import "./Footer.css";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaTiktok } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">

        {/* Social Media */}
        <div className="footer-column">
          <h4>Follow Us</h4>
          <ul className="social-links">
            <li><a href="https://www.facebook.com/profile.php?id=100063722293969" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a></li>
            <li><a href="https://www.youtube.com/@ndemojrlive1638" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a></li>
            <li><a href="https://www.tiktok.com/@ndemojrlive" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><FaTiktok /></a></li>
          </ul>
        </div>

        {/* Company */}
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/author">Our Authors</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
           
          </ul>
        </div>

        {/* Legal */}
        <div className="footer-column">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Navigation */}
        <div className="footer-column">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/categories">Categories</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} CaptainMedia. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;