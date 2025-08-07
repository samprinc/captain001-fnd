import { useEffect, useState } from "react";
import { FaRegCalendarAlt, FaRegHandshake } from "react-icons/fa";
import "./RecentEngagements.css";

function RecentEngagements() {
  const [engagements, setEngagements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEngagements = async () => {
      try {
        const response = await fetch("https://captain001-bnd.onrender.com/api/engagements/");
        if (!response.ok) {
          throw new Error("Failed to fetch engagements");
        }

        const data = await response.json();
        console.log("Fetched engagements:", data);

        if (Array.isArray(data.results)) {
          setEngagements(data.results);
        } else {
          setError("Unexpected response format");
        }
      } catch (err) {
        console.error("Error fetching engagements:", err);
        setError("Could not load recent engagements.");
      } finally {
        setLoading(false);
      }
    };

    fetchEngagements();
  }, []);

  return (
    <section className="engagements-section">
      <h2><FaRegHandshake /> Recent Engagements</h2>

      {loading && <p>Loading engagements...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        engagements.length > 0 ? (
          <div className="engagements-list">
            {engagements.map((item, index) => (
              <div className="engagement-card" key={index}>
                <div className="engagement-header">
                  <h3>{item.title}</h3>
                  <p className="engagement-date">
                    <FaRegCalendarAlt /> {item.date}
                  </p>
                </div>
                <p className="engagement-description">{item.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No engagements available at the moment.</p>
        )
      )}
    </section>
  );
}

export default RecentEngagements;
