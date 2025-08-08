import React from "react";
import { Helmet } from "react-helmet";
import { FaFacebookF, FaYoutube, FaTiktok } from "react-icons/fa";
import "./AdvertiseWithUs.css";

export default function AdvertiseWithUs() {
  return (
    <div className="advertise-container">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Advertise with Us | Captain001 Media Kenya</title>
        <meta
          name="description"
          content="Promote your business with Captain001 Media. Reach thousands across Kenya through our news platform, social media, and targeted campaigns."
        />
        <meta
          name="keywords"
          content="Advertise in Kenya, Captain001 Media, Digital Marketing Kenya, Social Media Ads Kenya, News Advertising Kenya"
        />
        <meta property="og:title" content="Advertise with Captain001 Media" />
        <meta
          property="og:description"
          content="Expand your reach with Captain001 Media. Affordable, impactful advertising solutions for your business."
        />
        <meta property="og:url" content="https://www.captain001media.co.ke/advertise" />
        <meta property="og:type" content="website" />
      </Helmet>

      <header className="advertise-header">
        <h1>Advertise with Captain001 Media</h1>
        <p>
          Expand your reach, grow your brand, and connect with your audience in Kenya and beyond.
        </p>
      </header>

      <section className="advertise-content">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>✅ Wide audience reach across Kenya</li>
          <li>✅ Affordable packages tailored to your needs</li>
          <li>✅ Presence on Facebook, YouTube, and TikTok</li>
          <li>✅ Creative and engaging advertising campaigns</li>
        </ul>
      </section>

      <section className="contact-section">
        <h2>Get Started</h2>
        <p>
          Email us today at{" "}
          <a href="mailto:stephenndemo55@gmail.com">
            stephenndemo55@gmail.com
          </a>{" "}
          to discuss your advertising needs.
        </p>
        <ul className="social-links">
          <li>
            <a
              href="https://www.facebook.com/profile.php?id=100063722293969"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/@ndemojrlive1638"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
          </li>
          <li>
            <a
              href="https://www.tiktok.com/@ndemojrlive"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <FaTiktok />
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
