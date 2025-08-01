import { Link } from "react-router-dom";

function FeaturedCard({ post }) {
  return (
    <div className="featured-card">
      <Link to={`/news/${post.id}`}>
        <img src={post.image} alt={post.title} className="featured-image" />
        <div className="featured-content">
          <span className="featured-badge">Featured</span>
          <h2 className="featured-title">{post.title}</h2>
          {/* Ensure excerpt is a string, not an object */}
          <p className="featured-excerpt">{typeof post.excerpt === 'string' ? post.excerpt : ''}</p>
          <span className="featured-read-more">Read Story →</span>
        </div>
      </Link>
    </div>
  );
}

export default FeaturedCard;