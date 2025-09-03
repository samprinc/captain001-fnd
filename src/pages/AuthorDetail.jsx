import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchAuthor, fetchPosts } from "../api/api";
import { formatImage } from "../utils/formatImage";
import "./AuthorDetail.css";

function AuthorDetail() {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Fetch author
        const authorRes = await fetchAuthor(id);
        setAuthor(authorRes.data);

        // Fetch posts by this author
        const postsRes = await fetchPosts({ author: id });
        const postData = Array.isArray(postsRes.data.results)
          ? postsRes.data.results
          : postsRes.data;
        setPosts(postData);
      } catch (err) {
        console.error("Error loading author detail:", err);
        setError("Failed to load author profile.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) {
    return (
      <section className="author-detail">
        {/* ===== Skeleton for Author Header ===== */}
        <header className="author-header skeleton">
          <div className="skeleton-avatar"></div>
          <div className="skeleton-lines">
            <div className="skeleton-text short"></div>
            <div className="skeleton-text long"></div>
          </div>
        </header>

        {/* ===== Skeleton for Posts ===== */}
        <section className="author-posts">
          <h2>Loading Articles...</h2>
          <ul className="author-post-list">
            {[...Array(3)].map((_, i) => (
              <li key={i} className="author-post-item skeleton">
                <div className="skeleton-post-img"></div>
                <div className="skeleton-post-info">
                  <div className="skeleton-text short"></div>
                  <div className="skeleton-text long"></div>
                  <div className="skeleton-text tiny"></div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </section>
    );
  }

  if (error) return <p className="error-message">{error}</p>;
  if (!author) return <p>Author not found.</p>;

  return (
    <section className="author-detail">
      <header className="author-header">
        <img
          src={formatImage(author.profile_pic)}
          alt={author.name}
          className="author-detail-avatar"
        />
        <div>
          <h1>{author.name}</h1>
          {author.bio && <p className="author-bio">{author.bio}</p>}
          {author.social_links && (
            <div className="author-socials">
              {author.social_links.twitter && (
                <a href={author.social_links.twitter} target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              )}
              {author.social_links.linkedin && (
                <a href={author.social_links.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              )}
            </div>
          )}
        </div>
      </header>

      <section className="author-posts">
        <h2>Articles by {author.name}</h2>
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          <ul className="author-post-list">
            {posts.map((post) => (
              <li key={post.id} className="author-post-item">
                <Link to={`/news/${post.id}`} className="author-post-link">
                  <img src={formatImage(post.image)} alt={post.title} className="author-post-image" />
                  <div className="author-post-info">
                    <h3>{post.title}</h3>
                   <p
  className="author-post-excerpt"
  dangerouslySetInnerHTML={{
    __html: post.excerpt || post.content?.slice(0, 120) + "..."
  }}
></p>

                    <span className="author-post-date">
                      {new Date(post.published_at).toLocaleDateString()}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}

export default AuthorDetail;
