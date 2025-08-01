import { useEffect, useState } from "react";
import { fetchPartners } from "../api/api";
import "./Partners.css";
import Spinner from "../components/Spinner";

function Partners() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPartners()
      .then((res) => {
        setPartners(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load partners:", err);
        setError("Failed to fetch partners.");
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner />;
;
  if (error) return <p>{error}</p>;

  return (
    <div className="partners-container">
      <h2>Our Partners</h2>
      <div className="partners-grid">
        {partners.map((partner) => (
          <a key={partner.id} href={partner.link} target="_blank" rel="noopener noreferrer">
            <img src={partner.logo} alt="Partner Logo" />
          </a>
        ))}
      </div>
    </div>
  );
}

export default Partners;
