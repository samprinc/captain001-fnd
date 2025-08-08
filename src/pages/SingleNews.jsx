import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPost, fetchAuthor, submitComment } from "../api/api";
import CommentBox from "../components/CommentBox";
import Spinner from "../components/Spinner";

import "./SingleNews.css";

function SingleNews() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
    post: id,
  });
  const [formErrors, setFormErrors] = useState({});
  const [submissionState, setSubmissionState] = useState("idle"); // 'idle' | 'submitting' | 'success' | 'error'

  // Load post and comments
  useEffect(() => {
    const loadPost = async () => {
  setLoading(true);
  try {
    const res = await fetchPost(id);
    const postData = res?.data;

    if (postData) {
      setPost(postData);
      setComments(Array.isArray(postData.comments) ? postData.comments : []);

      if (postData.author) {
        // If it's just an ID
        const authorRes = await fetchAuthor(postData.author);
        setAuthor(authorRes.data);
      }
    } else {
      setError("Post not found.");
    }
  } catch (err) {
    console.error("Error fetching post:", err);
    setError("Failed to load post. Please try again later.");
  } finally {
    setLoading(false);
  }
};


    loadPost();
  }, [id]);

  // Keep `post` ID synced in form
  useEffect(() => {
    setFormData((prev) => ({ ...prev, post: id }));
  }, [id]);

  // Auto-reset submission success state
  useEffect(() => {
    if (submissionState === "success") {
      const timer = setTimeout(() => setSubmissionState("idle"), 4000);
      return () => clearTimeout(timer);
    }
  }, [submissionState]);

  // Form handling
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear errors as user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }
    if (!formData.content.trim()) errors.content = "Comment cannot be empty";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    try {
      setSubmissionState("submitting");
      const newComment = await submitComment(formData);
      setSubmissionState("success");

      setFormData({ name: "", email: "", content: "", post: id });

      setComments((prev) => [
        ...prev,
        newComment.data || {
          id: Date.now(),
          name: formData.name,
          content: formData.content,
          createdAt: new Date().toISOString(),
        },
      ]);
    } catch (err) {
      console.error("Comment submission failed:", err);
      setSubmissionState("error");
    }
  };

  // Image logic
  const imageUrl = post?.image?.startsWith("http")
    ? post.image
    : post?.image
    ? `https://res.cloudinary.com/dco3yxmss/${post.image}`
    : "";

  // UI Rendering
 if (loading) return <SkeletonPost />;
  if (error) return <p className="error-message">{error}</p>;
  if (!post) return <p className="not-found-message">Post not found.</p>;
   function SkeletonPost() {
  return (
    <article className="single-post-container skeleton">
      <header className="post-header">
        <div className="skeleton-title shimmer"></div>
        <div className="skeleton-meta shimmer"></div>
      </header>

      <div className="post-image-container">
        <div className="skeleton-image shimmer"></div>
      </div>

      <div className="skeleton-content shimmer"></div>
      <div className="skeleton-content short shimmer"></div>
    </article>
  );
}

  return (
    <article className="single-post-container">
      <header className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
         <div className="post-author-section">
  {author && (
    <>
      <img
        src={author.profile_picture}
        alt={author.name}
        className="author-avatar"
      />
      <div>
        <span className="post-author-name">{author.name}</span>
        {author.bio && <p className="post-author-bio">{author.bio}</p>}
      </div>
    </>
  )}
</div>

          <span className="post-date">
            {new Date(post.publish_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          {post.category?.name && (
            <span className="post-category">{post.category.name}</span>
          )}
        </div>
      </header>

      {imageUrl && (
        <figure className="post-image-container">
          <img src={imageUrl} alt={post.title} className="post-image" loading="lazy" />
          {post.image_caption && (
            <figcaption className="image-caption">{post.image_caption}</figcaption>
          )}
        </figure>
      )}

      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <section className="comments-section">
        <h2 className="section-title">Comments ({comments.length})</h2>

        {comments.length === 0 ? (
          <p className="no-comments">Be the first to comment!</p>
        ) : (
          <div className="comments-list">
            {comments.map((comment) => (
              <CommentBox
                key={comment.id}
                name={comment.name}
                content={comment.content}
                date={comment.createdAt}
              />
            ))}
          </div>
        )}

        <div className="comment-form-container">
          <h3 className="form-title">Leave a Comment</h3>
          <p className="form-subtitle">Required fields are marked *</p>

          {submissionState === "success" && (
            <div className="alert success">
              <span className="icon">✅</span> Your comment has been posted!
            </div>
          )}

          {submissionState === "error" && (
            <div className="alert error">
              <span className="icon">⚠️</span> Failed to submit comment.
            </div>
          )}

          <form onSubmit={handleSubmit} className="comment-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                value={formData.name}
                onChange={handleChange}
                className={formErrors.name ? "error" : ""}
                disabled={submissionState === "submitting"}
              />
              {formErrors.name && <span className="error-message">{formErrors.name}</span>}
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email *"
                value={formData.email}
                onChange={handleChange}
                className={formErrors.email ? "error" : ""}
                disabled={submissionState === "submitting"}
              />
              {formErrors.email && <span className="error-message">{formErrors.email}</span>}
            </div>

            <div className="form-group">
              <textarea
                name="content"
                placeholder="Your Comment *"
                rows="5"
                value={formData.content}
                onChange={handleChange}
                className={formErrors.content ? "error" : ""}
                disabled={submissionState === "submitting"}
              />
              {formErrors.content && <span className="error-message">{formErrors.content}</span>}
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={submissionState === "submitting"}
            >
              {submissionState === "submitting" ? (
                <>
                  <span className="button-spinner"></span> Submitting...
                </>
              ) : (
                "Post Comment"
              )}
            </button>
          </form>
        </div>
      </section>
    </article>
  );
}

export default SingleNews;
