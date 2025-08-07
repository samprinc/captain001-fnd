import { useEffect, useState } from "react";
import { fetchServices } from "../api/api";

import ServiceCard from "../components/ServiceCard";
import Spinner from "../components/Spinner";

import "./Services.css";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchServices()
      .then((res) => {
        const results = res?.data?.results;
        if (Array.isArray(results) && results.length > 0) {
          setServices(results);
        } else {
          setError("No services found.");
        }
      })
      .catch((err) => {
        console.error("Failed to fetch services:", err);
        setError("Failed to load services.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="services-page-container">
      <header className="services-header">
        <h1>Our Professional Services</h1>
        <p className="services-intro">
          We provide high-quality media and production services to help your brand shine.
          From captivating visuals to strategic communication, we have you covered.
        </p>
      </header>

      {loading && <Spinner />}

      {!loading && error && (
        <p className="error-message">{error}</p>
      )}

      {!loading && !error && services.length > 0 && (
        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
              to={`/book`} // Link to booking page
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Services;
