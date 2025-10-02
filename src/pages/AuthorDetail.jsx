import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAuthor, fetchPosts } from "../api/api";
import { formatImage } from "../utils/formatImage";
import "./AuthorDetail.css";

// Skeletons
function AuthorHeaderSkeleton() {
  return (
    <header className="author-header skeleton">
      <div className="skeleton-avatar"></div>
      <div className="skeleton-lines">
        <div className="skeleton-text short"></div>
        <div className="skeleton-text long"></div>
      </div>
    </header>
  );
}

function PostSkeleton() {
  return (
    <li className="author-post-item skeleton">
      <div className="skeleton-post-img"></div>
      <div className="skeleton-post-info">
        <div className="skeleton-text short"></div>
        <div className="skeleton-text long"></div>
        <div className="skeleton-text tiny"></div>
      </div>
    </li>
  );
}

export default function AuthorDetail() {
  const { id } = useParams();

  // Fetch author
  const {
    data: author,
    isLoading: loadingAuthor,
    isError: errorAuthor,
  } = useQuery({
    queryKey: ["author", id],
    queryFn: () => fetchAuthor(id).then(res => res.data),
    staleTime: 1000 * 60 * 10,
    keepPreviousData: true,
  });

  // Fetch posts
  const {
    data: posts = [],
    isLoading: loadingPosts,
    isError: errorPosts,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: async () => {
      const res = await fetchPosts();
      const allPosts = Array.isArray(res.data.results)
        ? res.data.results
        : res.data;
      return allPosts.filter(
        (post) => post.author && String(post.author.id) === String(id)
      );
    },
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
    placeholderData: [],
  });

  if (loadingAuthor) return <AuthorHeaderSkeleton />;
  if (errorAuthor) return <p className="error-message">Failed to load author.</p>;
  if (!author) return <p>Author not found.</p>;

  return (
    <section className="author-detail">
      {/* Author Header */}
      <header className="author-header">
        {author.profile_pic && (
          <img
            src={formatImage(author.profile_pic)}
            alt={author.name}
            className="author-detail-avatar"
          />
        )}
        <div className="author-header-info">
          <h1>{author.name}</h1>
          {author.bio && <p className="author-bio">{author.bio}</p>}
          {author.social_links && (
            <div className="author-socials">
              {author.social_links.twitter && (
                <a
                  href={author.social_links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              )}
              {author.social_links.linkedin && (
                <a
                  href={author.social_links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Author Posts */}
      <section className="author-posts">
        <h2>Articles by {author.name}</h2>

        {loadingPosts ? (
          <ul className="author-post-list">
            {[...Array(3)].map((_, i) => (
              <PostSkeleton key={i} />
            ))}
          </ul>
        ) : errorPosts ? (
          <p className="error-message">Failed to load posts.</p>
        ) : posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          <ul className="author-post-list news-feed">
            {posts.map((post) => (
              <li key={post.id} className="news-card vertical">
                <Link to={`/news/${post.id}`} className="author-post-link">
                  {post.image && (
                    <div className="news-thumb">
                      <img
                        src={formatImage(post.image)}
                        alt={post.title}
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="news-body">
                    <h3 className="news-title">{post.title}</h3>
                    <p
                      className="news-snippet"
                      dangerouslySetInnerHTML={{
                        __html:
                          post.excerpt || post.content?.slice(0, 150) + "...",
                      }}
                    />
                    <span className="post-meta">
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
