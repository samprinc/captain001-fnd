import { Link } from "react-router-dom";
import "./TrendingItem.css";

// Assuming you have this utility function in a separate file
// or you can add it directly here if not already available.
const IMAGE_BASE_URL = "https://res.cloudinary.com/dco3yxmss/";
const formatImage = (img) =>
  img?.startsWith("http") ? img : `${IMAGE_BASE_URL}${img}`;

function TrendingItem({ post, rank }) {
  return (
    <Link to={`/news/${post.slug}`} className="trending-link">
      <div className="trending-item">
        <span className="trending-rank">#{rank}</span>
        <img
          src={formatImage(post.image)}
          alt={post.title}
          className="trending-thumbnail"
        />
        <div className="trending-details">
          <h3 className="trending-title">{post.title}</h3>
          <p className="trending-meta">{post.category} • {post.time}</p>
        </div>
      </div>
    </Link>
  );
}

export default TrendingItem;