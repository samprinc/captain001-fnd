import { Link } from "react-router-dom";
import { formatImage } from "../utils/formatImage";
import { formatTimeAgo } from "../utils/dateFormatter";
import "./PostCard.css";

function NewsCard({ post, layout = "horizontal" }) {
  const fullImageUrl = formatImage(post?.image);
  const timeAgo = formatTimeAgo(post.publish_at);

  const snippet = post?.content
    ? post.content.replace(/<[^>]+>/g, "").slice(0, 130) + "..."
    : post?.excerpt || "";

  return (
    <div className={`news-card ${layout}`}>
      {fullImageUrl && (
        <div className="news-thumb">
          <img src={fullImageUrl} alt={post.title} loading="lazy" />
        </div>
      )}
      <div className="news-body">
        <h3 className="news-title">
          <Link to={`/news/${post.id}`}>{post.title}</Link>
        </h3>
        {timeAgo && (
          <span className="post-meta">
            <i className="fas fa-clock"></i>
            <span className="post-date">{timeAgo}</span>
          </span>
        )}
        <p className="news-snippet">{snippet}</p>
        <Link to={`/news/${post.id}`} className="read-more">
          Read More →
        </Link>
      </div>
    </div>
  );
}

export default NewsCard;
