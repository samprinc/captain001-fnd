import React from "react";
import { useServicesQuery } from "../hooks/queries"; // Your React Query hook
import ServiceCard from "../components/ServiceCard";
import "./Services.css";

// Skeleton card for loading state
function ServiceSkeleton() {
  return (
    <div className="service-card skeleton">
      <div className="icon-placeholder" />
      <h3 className="title-placeholder">&nbsp;</h3>
      <p className="desc-placeholder">&nbsp;</p>
    </div>
  );
}

function Services() {
  // Use React Query hook with staleTime and optional initialData
  const { data: services = [], isLoading, isError, error } = useServicesQuery({
    staleTime: 1000 * 60 * 10, // 10 minutes
    initialData: [
      // Optional static fallback for instant load
      { id: 1, title: "Photography", description: "Capture memories", icon: "camera" },
      { id: 2, title: "Videography", description: "Professional videos", icon: "video" },
      { id: 3, title: "Graphic Design", description: "Creative visuals", icon: "design" },
    ],
  });

  return (
    <div className="services-page-container">
      <header className="services-header">
        <h1>Our Professional Services</h1>
        <p className="services-intro">
          We provide high-quality media and production services to help your brand shine.
          From captivating visuals to strategic communication, we have you covered.
        </p>
      </header>

      {/* Error State */}
      {isError && <p className="error-message">{error?.message || "Failed to load services."}</p>}

      {/* Services Grid */}
      <div className="services-grid">
        {isLoading
          ? Array(3)
              .fill(0)
              .map((_, idx) => <ServiceSkeleton key={idx} />)
          : services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
                to={`/book`}
              />
            ))}
      </div>
    </div>
  );
}

export default Services;
