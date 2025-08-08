import { useEffect, useState } from "react";
import { formatImage, trackAdView, trackAdClick } from "../utils/adTracking";
import "./InlineAd.css";

function InlineAd({ ads = [] }) {
  const inlineAds = ads.filter((ad) => ad.placement === "inline");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (inlineAds.length > 0) {
      const currentAd = inlineAds[currentIndex];
      trackAdView(currentAd.id);

      const rotateTimer = setInterval(() => {
        setIsVisible(false);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % inlineAds.length);
          setIsVisible(true);
        }, 500);
      }, 6000);

      return () => clearInterval(rotateTimer);
    }
  }, [inlineAds, currentIndex]);

  if (inlineAds.length === 0) return null;

  const currentAd = inlineAds[currentIndex];

  // Auto-generate tagline if missing
  const tagline = currentAd.tagline
    ? currentAd.tagline
    : currentAd.description
    ? currentAd.description.split(" ").slice(0, 15).join(" ") + "..."
    : "";

  const handleClick = () => {
    trackAdClick(currentAd.id);
  };

  return (
    <div
      className="inline-ad-box"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.5s ease-in-out"
      }}
    >
      <div className="inline-ad">
        <span className="ad-label">Sponsored</span>
        <a
          href={currentAd.link || "#"}
          target="_blank"
          rel="noreferrer"
          onClick={handleClick}
        >
          <img
            src={formatImage(currentAd.image)}
            alt={currentAd.title || "Ad"}
            className="inline-ad-image"
          />
        </a>
        {currentAd.title && (
          <div className="inline-ad-title">{currentAd.title}</div>
        )}
        {tagline && (
          <div className="inline-ad-tagline">{tagline}</div>
        )}
        <div className="inline-ad-footer">
          <a href="/advertise" className="inline-ad-brand">
            Ad by CaptainMedia
          </a>
        </div>
      </div>
    </div>
  );
}

export default InlineAd;
