// components/HeroSection.jsx
import { Link } from "react-router-dom";
import "./HeroSection.css";

function HeroSection() {
  return (
    <section className="hero-marketing">
      <div className="hero-content">
        <h1>Empowering Visibility, Driving Engagement</h1>
        <p>Your trusted media & advertising partner.</p>
        <div className="hero-subtitle">
          We craft compelling narratives and strategic campaigns that connect your brand 
          with the right audience at the perfect moment. From digital marketing to traditional 
          advertising, we deliver measurable results that drive growth.
        </div>
        
        <div className="hero-buttons">
          <Link to="/services" className="hero-btn primary">Our Services</Link>
          <Link to="/contact" className="hero-btn secondary">Contact Us</Link>
        </div>

     
      </div>
    </section>
  );
}

export default HeroSection;