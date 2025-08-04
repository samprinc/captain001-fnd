// src/components/FeaturedCard.jsx
import { Link } from "react-router-dom";
import "./FeaturedCard.css";

function FeaturedCard({ post }) {
  const { id, title, image, excerpt } = post || {};

  const fullImageUrl = image?.startsWith("http")
    ? image
    : `https://res.cloudinary.com/dco3yxmss/${image}`;

  return (
    <div className="featured-card">
      <Link to={`/news/${id}`} className="featured-link">
        <div className="featured-image-wrapper">
          <img src={fullImageUrl} alt={title} className="featured-image" />
          <div className="featured-overlay" />
        </div>
        <div className="featured-content">
          <span className="featured-badge">Top Story</span>
          <h2 className="featured-title">{title}</h2>
          {excerpt && <p className="featured-excerpt">{excerpt}</p>}
          <span className="featured-read-more">Read Full Story →</span>
        </div>
      </Link>
    </div>
  );
}

export default FeaturedCard;
