import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatImage } from "../utils/formatImage";
import { formatTimeAgo } from "../utils/dateFormatter";
import "./PostCard.css";

function NewsCard({ post, layout = "horizontal" }) {
  const [currentLayout, setCurrentLayout] = useState(layout);

  // Detect screen width to adjust layout
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setCurrentLayout("vertical");
      } else {
        setCurrentLayout(layout); // default horizontal on large screens
      }
    };

    handleResize(); // set initial layout
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [layout]);

  const fullImageUrl = formatImage(post?.image);
  const timeAgo = formatTimeAgo(post.publish_at);

  const postUrl = `${window.location.origin}/news/${post.id}`; // Shareable URL

  // Snippet for preview
  const snippet = post?.content
    ? post.content.slice(0, 200) + "..."
    : post?.excerpt || "";

  const copyLink = () => {
    navigator.clipboard.writeText(postUrl);
    alert("Link copied to clipboard!");
  };

  return (
    <div className={`news-card ${currentLayout}`}>
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

        <p className="news-snippet" dangerouslySetInnerHTML={{ __html: snippet }} />

        <div className="share-container">
          {/* Copy link button */}
          <button onClick={copyLink} className="share-btn">
            Copy Link
          </button>

          {/* Social share buttons */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn"
          >
            Facebook
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn"
          >
            Twitter
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(postUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn"
          >
            WhatsApp
          </a>
        </div>

        <Link to={`/news/${post.id}`} className="read-more">
          Read More →
        </Link>
      </div>
    </div>
  );
}

export default NewsCard;
