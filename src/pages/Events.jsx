import { useEffect, useState } from "react";
import { fetchEvents } from "../api/api";
import "./Events.css";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents()
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Failed to fetch events", err));
  }, []);

  return (
    <div className="events-container">
      <h2>Upcoming Events</h2>
      {events.length === 0 ? (
        <p>No events available at the moment.</p>
      ) : (
        <ul className="event-list">
          {events.map((event) => (
            <li key={event.id} className="event-item">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p><strong>📅 {new Date(event.date).toLocaleString()}</strong></p>
              <p>📍 {event.location}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Events;
