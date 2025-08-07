import { useEffect, useState } from "react";
import { fetchEvents } from "../api/api";
import "./Events.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents()
      .then((res) => {
        const results = res?.data?.results || [];
        setEvents(results);
        if (results.length === 0) {
          setError("No events available at the moment.");
        }
      })
      .catch((err) => {
        console.error("Failed to fetch events", err);
        setError("Failed to load events. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="events-container">
      <h2 className="events-heading">🎉 Upcoming Events</h2>

      {loading && <p className="loading-message">Loading events...</p>}

      {!loading && error && <p className="error-message">{error}</p>}

      {!loading && !error && events.length > 0 && (
        <div className="event-grid">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              {event.image && (
                <img
                  src={event.image}
                  alt={event.title}
                  className="event-banner"
                />
              )}
              <div className="event-details">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>
                <p className="event-meta">
                  <strong>📅</strong>{" "}
                  {new Date(event.date).toLocaleDateString()} &nbsp;|&nbsp;
                  <strong>📍</strong> {event.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;
