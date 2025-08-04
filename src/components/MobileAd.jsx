import { useEffect, useState } from "react";
import { formatImage, trackAdView, trackAdClick } from "../utils/adTracking";
import "./MobileAd.css";

function MobileAd({ ads = [] }) {
  const [visible, setVisible] = useState(true);
  
  // Filter for ads intended for mobile devices with "mobile" placement
  const mobileAds = ads.filter(
    (ad) => ad.device_target !== "desktop" && ad.placement === "mobile"
  );
  const ad = mobileAds[0];

  // Track a view when the ad is first shown
  useEffect(() => {
    if (ad) {
      trackAdView(ad.id);
    }
  }, [ad]);

  if (!ad || !visible) return null;

  const handleClick = () => {
    trackAdClick(ad.id);
  };

  return (
    <div className="mobile-sticky-ad mobile-only">
      <button className="close-btn" onClick={() => setVisible(false)}>
        ✖
      </button>
      <a
        href={ad.link || "#"}
        target="_blank"
        rel="noreferrer"
        onClick={handleClick}
      >
        <img src={formatImage(ad.image)} alt={ad.title || "Ad"} />
      </a>
    </div>
  );
}

export default MobileAd;