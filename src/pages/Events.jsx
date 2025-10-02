import React from "react";
import { useEventsQuery } from "../hooks/queries"; // create this query hook
import "./Events.css";

function Events() {
  // Use query hook for fetching events
  const { data: events = [], isLoading, error } = useEventsQuery();

  return (
    <div className="events-container">
      <h2 className="events-heading">🎉 Upcoming Events</h2>

      {isLoading && <p className="loading-message">Loading events...</p>}

      {!isLoading && error && (
        <p className="error-message">
          {error?.message || "Failed to load events. Please try again later."}
        </p>
      )}

      {!isLoading && !error && events.length === 0 && (
        <p className="error-message">No events available at the moment.</p>
      )}

      {!isLoading && !error && events.length > 0 && (
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
