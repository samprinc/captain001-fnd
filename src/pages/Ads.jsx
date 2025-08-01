import React, { useEffect, useState } from "react";
import { fetchAds } from "../api/api";
import Spinner from "../components/Spinner";
import "./Ads.css";

function Ads() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const CLOUD_NAME = "dco3yxmss"; // 👈 your Cloudinary name

  useEffect(() => {
    fetchAds()
      .then((res) => {
        const filtered = res.data.results.filter((ad) => ad.active);
        setAds(filtered);
      })
      .catch((err) => {
        console.error("Failed to load ads:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="ads-container">
      <h2 className="ads-heading">Advertisements</h2>

      {ads.length === 0 ? (
        <p className="no-ads-text">🚫 No active ads found.</p>
      ) : (
        <div className="ads-grid">
          {ads.map((ad) => {
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
