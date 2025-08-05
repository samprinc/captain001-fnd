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
        if (res?.data?.results) {
          setServices(res.data.results);
        } else {
          setError("No services found.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch services:", err);
        setError("Failed to load services.");
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner />;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="services-page-container">
      <header className="services-header">
        <h1>Our Professional Services</h1>
        <p className="services-intro">
          We provide high-quality media and production services to help your brand shine. From
          captivating visuals to strategic communication, we have you covered.
        </p>
      </header>

      <div className="services-grid">
        {services.length > 0 ? (
          services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
              to={`/book`} // Direct booking
            />
          ))
        ) : (
          <p className="no-services-message">No services are currently available.</p>
        )}
      </div>
    </div>
  );
}

export default Services;
