// components/ActiveOffers.jsx
import { useEffect, useState } from "react";
import "./ActiveOffers.css";

function ActiveOffers() {
  const [offers, setOffers] = useState([]);

 useEffect(() => {
  const fetchOffers = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/active-offers/");
      const data = await response.json();
      console.log("Fetched offers:", data); // should be an object with "results"
      setOffers(data.results); // FIXED: access the actual array
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };
  fetchOffers();
}, []);


  return (
    <section className="offers-section">
      <h2>Active Offers</h2>
      <div className="offers-list">
        {offers.map((offer) => (
          <a href={offer.link} className="offer-card" key={offer.id}>
            <h3>{offer.title}</h3>
            <p className="offer-expiry">Expires: {new Date(offer.expires).toDateString()}</p>
            <span className="offer-cta">Claim Offer →</span>
          </a>
        ))}
      </div>
    </section>
  );
} 

export default ActiveOffers;
