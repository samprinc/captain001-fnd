import React from "react";
import { Helmet } from "react-helmet";
import { FaFacebookF, FaYoutube, FaTiktok, FaEnvelope } from "react-icons/fa";
import "./AdvertiseWithUs.css";

export default function AdvertiseWithUs() {
  return (
    <div className="advertise-with-us">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Premium Advertising Solutions | Captain001 Media Kenya</title>
        <meta
          name="description"
          content="Elevate your brand with Captain001 Media's targeted advertising solutions. Reach engaged audiences across Kenya through our multi-platform digital network."
        />
        <meta
          name="keywords"
          content="Digital advertising Kenya, media partnerships Kenya, brand promotion Nairobi, social media marketing Kenya, news platform advertising"
        />
        <meta property="og:title" content="Premium Advertising Solutions | Captain001 Media" />
        <meta
          property="og:description"
          content="Data-driven advertising solutions to amplify your brand's reach across Kenya's digital landscape."
        />
        <meta property="og:url" content="https://www.captain001media.co.ke/advertise" />
        <meta property="og:type" content="website" />
      </Helmet>

      <header className="hero-sections">
        <div className="hero-contents">
          <h1>Amplify Your Brand with Captain001 Media</h1>
          <p className="subtitle">
            Strategic advertising solutions designed to connect your business with engaged audiences across Kenya's digital landscape.
          </p>
        </div>
      </header>

      <section className="value-proposition">
        <div className="section-container">
          <h2>Why Partner With Us?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <h3>Multi-Platform Reach</h3>
              <p>Seamless integration across our news platform, social channels, and targeted campaigns.</p>
            </div>
            <div className="benefit-card">
              <h3>Audience Insights</h3>
              <p>Data-driven strategies to connect with your ideal customers.</p>
            </div>
            <div className="benefit-card">
              <h3>Creative Excellence</h3>
              <p>High-impact ad designs that capture attention and drive results.</p>
            </div>
            <div className="benefit-card">
              <h3>Flexible Solutions</h3>
              <p>Customizable packages to fit businesses of all sizes.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="section-container">
          <h2>Ready to Grow Your Business?</h2>
          <div className="contact-methods">
            <div className="contact-card">
              <FaEnvelope className="contact-icon" />
              <h3>Email Us</h3>
              <a href="mailto:stephenndemo55@gmail.com" className="contact-link">
                stephenndemo55@gmail.com
              </a>
            </div>
            <div className="contact-card">
              <h3>Connect With Us</h3>
              <div className="social-links">
                <a
                  href="https://www.facebook.com/profile.php?id=100063722293969"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="social-link"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://www.youtube.com/@ndemojrlive1638"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="social-link"
                >
                  <FaYoutube />
                </a>
                <a
                  href="https://www.tiktok.com/@ndemojrlive"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="social-link"
                >
                  <FaTiktok />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}