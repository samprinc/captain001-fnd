import { useEffect, useState } from "react";
import { formatImage, trackAdView, trackAdClick } from "../utils/adTracking";
import "./MobileAd.css";

// Tagline: This component displays and rotates mobile ads at the bottom of the screen.
function MobileAd({ ads = [] }) {
  // State to keep track of which ad is currently visible.
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  // State to control the visibility of the entire ad component.
  const [visible, setVisible] = useState(true);

  // Filter the list of all ads to get only the ones for mobile devices.
  const mobileAds = ads.filter(
    (ad) => ad.device_target !== "desktop" && ad.placement === "mobile"
  );

  // Get the ad object for the current index.
  const ad = mobileAds[currentAdIndex];

  // ---

  // Tagline: This effect handles ad rotation and view tracking.
  // It sets a timer to change the ad every 6 seconds.
  useEffect(() => {
    // Exit if there are no ads to display.
    if (!mobileAds.length) return;

    // Track the initial ad view when the component first mounts.
    if (ad) {
      trackAdView(ad.id);
    }

    // Set up a timer to rotate the ad.
    const rotationTimer = setInterval(() => {
      // Move to the next ad in the array.
      // The modulo operator (%) ensures the index wraps around to 0 at the end.
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % mobileAds.length);
    }, 6000); // Rotate every 6000 milliseconds (6 seconds).

    // Clean up the timer when the component unmounts.
    return () => clearInterval(rotationTimer);
  }, [mobileAds, ad]);

  // ---

  // Tagline: This effect automatically hides the entire ad block after 60 seconds.
  useEffect(() => {
    // Exit if there are no ads.
    if (!mobileAds.length) return;

    // Set a timer to make the ad block disappear.
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 60000); // The ad block will disappear after 60 seconds.

    // Clean up the timer when the component unmounts.
    return () => clearTimeout(hideTimer);
  }, [mobileAds]);

  // ---

  // Tagline: Conditional rendering. Don't show anything if there are no ads or if the ad is set to be hidden.
  if (!mobileAds.length || !visible) return null;

  // Function to track ad clicks when the user interacts with the ad.
  const handleClick = () => trackAdClick(ad.id);

  // ---

  // Tagline: The JSX structure for the ad component.
  return (
    <div className="mobile-sticky-ad mobile-only" role="banner" aria-label="Sponsored Advertisement">
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
            // Fallback image if the ad image fails to load.
            e.target.src = "/placeholder-ad.png";
          }}
        />
      </a>
    </div>
  );
}

export default MobileAd;