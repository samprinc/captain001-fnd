import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./ServiceCard.css";

function ServiceCard({ title, description, icon, to }) {
  const isFontAwesome = icon?.startsWith("fa");
  const imageUrl = isFontAwesome ? null : `https://res.cloudinary.com/dco3yxmss/${icon}`;

  return (
    <Link to={to} className="service-card-link">
      <div className="service-card">
        <div className="service-card-icon">
          {isFontAwesome ? (
            <i className={`${icon}`}></i>
          ) : (
            <img src={imageUrl} alt={`${title} icon`} />
          )}
        </div>

        <h3 className="service-card-title">{title}</h3>
        <p className="service-card-description">{description}</p>
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

ServiceCard.defaultProps = {
  icon: "fas fa-cogs",
};

export default ServiceCard;