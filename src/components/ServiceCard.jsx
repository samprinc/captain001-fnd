import React from "react";
import PropTypes from "prop-types";
import { FaArrowRight } from "react-icons/fa";
import Spinner from "../components/Spinner";
import "./ServiceCard.css";

function ServiceCard({ title, description, icon, loading }) {
  if (loading) return <Spinner />;

  const imageUrl = icon?.startsWith("http")
    ? icon
    : `https://res.cloudinary.com/dco3yxmss/${icon}`;

  return (
    <div className="service-card">
      <div className="icon-wrapper">
        {icon && <img src={imageUrl} alt={title} className="service-icon" />}
      </div>

      <h3>{title}</h3>
      <p>{description}</p>

      <button className="learn-more-btn">
        Learn More <FaArrowRight className="arrow-icon" />
      </button>
    </div>
  );
}

ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string, // <- Now it's a string
  loading: PropTypes.bool,
};

ServiceCard.defaultProps = {
  icon: null,
  loading: false,
};


export default ServiceCard;
