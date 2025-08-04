import { useEffect, useState } from "react";
import { formatImage, trackAdView, trackAdClick } from "../utils/adTracking";
import "./AdCarousel.css";

function AdCarousel({ ads = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselAds = ads.filter((ad) => ad.placement === "carousel");

  // Auto-rotate the carousel
  useEffect(() => {
    if (carouselAds.length > 1) {
      const timer = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % carouselAds.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [carouselAds.length]);

  // Track a view when a new ad becomes visible
  useEffect(() => {
    const activeAdId = carouselAds[activeIndex]?.id;
    if (activeAdId) {
      trackAdView(activeAdId);
    }
  }, [activeIndex, carouselAds]);

  const handleClick = (ad) => {
    trackAdClick(ad.id);
    window.open(ad.link || "#", "_blank", "noopener noreferrer");
  };

  if (!carouselAds.length) return null;

  return (
    <section className="premium-ad-carousel">
      <div className="ad-carousel-inner">
        {carouselAds.map((ad, index) => (
          <div
            key={ad.id}
            className={`ad-slide ${index === activeIndex ? "active" : ""}`}
            onClick={() => handleClick(ad)}
            style={{ cursor: "pointer" }}
          >
            <img src={formatImage(ad.image)} alt={ad.title || "Ad"} />
            <div className="ad-content">
              <span className="ad-badge">Sponsored</span>
              <h3>{ad.title || "Special Offer"}</h3>
              <p>{ad.description || "Limited time only!"}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="ad-controls">
        {carouselAds.map((_, index) => (
          <button
            key={index}
            className={index === activeIndex ? "active" : ""}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default AdCarousel;