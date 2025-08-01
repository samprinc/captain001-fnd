import { useEffect, useState } from "react";
import { fetchServices } from "../api/api";
import ServiceCard from "../components/ServiceCard";
import Spinner from "../components/Spinner";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchServices()
      .then((res) => {
        // ✅ Extract actual services array from paginated `results`
        setServices(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch services:", err);
        setError("Failed to load services.");
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Our Services</h2>
      <div className="services-grid">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.description}
            icon={service.icon}
          />
        ))}
      </div>
    </div>
  );
}

export default Services;
