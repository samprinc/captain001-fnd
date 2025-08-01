import { Link } from "react-router-dom";

function TrendingItem({ post, rank }) {
  // Add this temporary console.log to inspect the post object
  console.log('TrendingItem post data:', post);

  return (
    <div className="trending-item">
      <span className="trending-rank">{rank}</span>
      <Link to={`/news/${post.id}`} className="trending-link">
        <h3 className="trending-title">{post.title || 'Untitled Post'}</h3>
        {/* Make sure we're only rendering strings in the p tag */}
        <p className="trending-meta">
          {post.category || 'General'} • {post.date || new Date().toLocaleDateString()}
        </p>
      </Link>
    </div>
  );
}

export default TrendingItem;