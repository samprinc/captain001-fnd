import { useEffect } from "react";
import { formatImage, trackAdView, trackAdClick } from "../utils/adTracking";
import "./InlineAd.css";

function InlineAd({ ads = [] }) {
  const inlineAd = ads.find((ad) => ad.placement === "inline");

  // Track a view when the component mounts and the ad is present
  useEffect(() => {
    if (inlineAd) {
      trackAdView(inlineAd.id);
    }
  }, [inlineAd]);

  if (!inlineAd) return null;

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