import { useEffect, useState } from "react";
import { fetchEvents } from "../api/api";
import "./Events.css";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents()
      .then((res) => {
        console.log("Events response:", res.data);
        setEvents(res.data.results);
      })
      .catch((err) => console.error("Failed to fetch events", err));
  }, []);

  return (
    <div className="events-container">
      <h2 className="events-heading">🎉 Upcoming Events</h2>
      {events.length === 0 ? (
        <p className="no-events">No events available at the moment.</p>
      ) : (
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
