import React from "react";
import { useEventsQuery } from "../hooks/queries";
import "./Events.css";

function Events() {
  const { data: events = [], isLoading, error } = useEventsQuery();

  // Number of skeleton cards to show while loading
  const skeletonCount = 4;

  return (
    <div className="events-container">
      <h2 className="events-heading">🎉 Upcoming Events</h2>

      {/* Loading State with Skeleton */}
      {isLoading && (
        <div className="event-grid">
          {[...Array(skeletonCount)].map((_, i) => (
            <div key={i} className="event-card skeleton-card">
              <div className="skeleton-banner"></div>
              <div className="skeleton-details">
                <div className="skeleton-title"></div>
                <div className="skeleton-description"></div>
                <div className="skeleton-meta"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <p className="error-message">
          {error?.message || "Failed to load events. Please try again later."}
        </p>
      )}

      {/* Empty State */}
      {!isLoading && !error && events.length === 0 && (
        <p className="error-message">No events available at the moment.</p>
      )}

      {/* Events Grid */}
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
