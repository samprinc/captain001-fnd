import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./ServiceCard.css";

function ServiceCard({ 
  title, 
  description, 
  icon = null,   // ✅ default value moved here
  to 
}) {
  const isFontAwesome = icon?.startsWith("fa");
  const imageUrl = isFontAwesome ? null : `https://res.cloudinary.com/dco3yxmss/${icon}`;

  return (
    <Link to={to} className="service-card-link">
      <div className="service-card">
        {imageUrl && (
          <div className="service-card-image-container">
            <img src={imageUrl} alt={title} className="service-card-image" />
          </div>
        )}
        <div className="service-card-content">
          <h3 className="service-card-title">{title}</h3>
          <p className="service-card-description">{description}</p>
          <span className="service-card-cta">Book Now →</span>
        </div>
      </div>
    </Link>
  );
}

ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string,
  to: PropTypes.string.isRequired,
};

export default ServiceCard;
