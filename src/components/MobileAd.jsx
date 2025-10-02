import { useEffect, useState } from "react";
import { useAdsQuery } from "../hooks/queries";
import { formatImage, trackAdView, trackAdClick } from "../utils/adTracking";
import "./MobileAd.css";

// 📱 Sticky Mobile Ad Component (rotates ads every 6s, hides after 60s)
function MobileAd() {
  const { data: ads = [] } = useAdsQuery();
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  // 🎯 Filter mobile ads only
  const mobileAds = ads.filter(
    (ad) => ad.device_target !== "desktop" && ad.placement === "mobile"
  );

  const ad = mobileAds[currentAdIndex];

  // 🔄 Rotate ads every 6 seconds + track views
  useEffect(() => {
    if (!mobileAds.length) return;

    if (ad) trackAdView(ad.id);

    const rotationTimer = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % mobileAds.length);
    }, 6000);

    return () => clearInterval(rotationTimer);
  }, [mobileAds, ad]);

  // ⏳ Auto-hide after 60s
  useEffect(() => {
    if (!mobileAds.length) return;

    const hideTimer = setTimeout(() => setVisible(false), 60000);
    return () => clearTimeout(hideTimer);
  }, [mobileAds]);

  // 🚫 If no ads or hidden, render nothing
  if (!mobileAds.length || !visible) return null;

  const handleClick = () => trackAdClick(ad.id);

  return (
    <div
      className="mobile-sticky-ad mobile-only"
      role="banner"
      aria-label="Sponsored Advertisement"
    >
      <span className="ad-label">Ad</span>
      <button
        className="close-btn"
        onClick={() => setVisible(false)}
        aria-label="Close advertisement"
      >
        ✖
      </button>
      <a
        href={ad.link || "#"}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label={ad.title ? `Advertisement: ${ad.title}` : "Advertisement link"}
      >
        <img
          src={formatImage(ad.image)}
          alt={ad.title || "Advertisement"}
          onError={(e) => {
            e.target.src = "/placeholder-ad.png"; // fallback image
          }}
        />
      </a>
    </div>
  );
}

export default MobileAd;
