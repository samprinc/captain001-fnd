import { useEffect, useState } from "react";
import { formatImage, trackAdView, trackAdClick } from "../utils/adTracking";
import "./InlineAd.css";

function InlineAd({ ads = [] }) {
  const inlineAd = ads.find((ad) => ad.placement === "inline");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (inlineAd) {
      trackAdView(inlineAd.id);

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 6000); // Hide after 6 seconds

      return () => clearTimeout(timer); // Cleanup
    }
  }, [inlineAd]);

  if (!inlineAd || !isVisible) return null;

  const handleClick = () => {
    trackAdClick(inlineAd.id);
  };

  return (
    <div className="inline-ad-box">
      <a
        href={inlineAd.link || "#"}
        target="_blank"
        rel="noreferrer"
        onClick={handleClick}
      >
        <img
          src={formatImage(inlineAd.image)}
          alt={inlineAd.title || "Ad"}
          className="inline-ad-image"
        />
      </a>
    </div>
  );
}

export default InlineAd;
