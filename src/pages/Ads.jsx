import React from "react";
import { useAdsQuery } from "../hooks/queries";
import Spinner from "../components/Spinner";
import "./Ads.css";

function Ads() {
  const { data: ads = [], isLoading } = useAdsQuery();
  const CLOUD_NAME = "dco3yxmss"; // 👈 your Cloudinary name

  if (isLoading) return <Spinner />;

  const activeAds = ads.filter((ad) => ad.active);

  return (
    <div className="ads-container">
      <h2 className="ads-heading">Advertisements</h2>

      {activeAds.length === 0 ? (
        <p className="no-ads-text">🚫 No active ads found.</p>
      ) : (
        <div className="ads-grid">
          {activeAds.map((ad) => {
            const imageUrl = ad.image?.startsWith("http")
              ? ad.image
              : `https://res.cloudinary.com/${CLOUD_NAME}/${ad.image}`;

            const adCard = (
              <div className="ad-card" key={ad.id}>
                <img src={imageUrl} alt={ad.title} className="ad-image" />
                <div className="ad-content">
                  <h3>{ad.title}</h3>
                  <p className="ad-dates">
                    🗓 {ad.start_date} – {ad.end_date}
                  </p>
                </div>
              </div>
            );

            return ad.link ? (
              <a
                href={ad.link}
                target="_blank"
                rel="noopener noreferrer"
                className="ad-link-wrapper"
                key={ad.id}
              >
                {adCard}
              </a>
            ) : (
              adCard
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Ads;
