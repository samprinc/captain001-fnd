import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPost, submitComment } from "../api/api";
import CommentBox from "../components/CommentBox";
import Spinner from "../components/Spinner";
import "./SingleNews.css";

function SingleNews() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
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
  const [submissionState, setSubmissionState] = useState("idle"); // 'idle', 'submitting', 'success', 'error'

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        const response = await fetchPost(id);
        setPost(response.data);
        setComments(Array.isArray(response.data.comments) ? response.data.comments : []);
        setError(null);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  // Update post ID in form data when ID changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, post: id }));
  }, [id]);

  useEffect(() => {
    if (submissionState === "success") {
      const timer = setTimeout(() => setSubmissionState("idle"), 4000);
      return () => clearTimeout(timer);
    }
  }, [submissionState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      errors.email = "Please enter a valid email address";
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
      console.error("Failed to submit comment:", err);
      setSubmissionState("error");
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p className="error-message">{error}</p>;
  if (!post) return <p className="not-found-message">Post not found.</p>;

  const imageUrl = post.image?.startsWith("http")
    ? post.image
    : post.image
    ? `https://res.cloudinary.com/dco3yxmss/${post.image}`
    : "";

  return (
    <article className="single-post-container">
      <header className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          <span className="post-author">By {post.author?.name || "Unknown Author"}</span>
          <span className="post-date">
            {new Date(post.publish_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          {post.category && (
            <span className="post-category">{post.category.name}</span>
          )}
        </div>
      </header>

      {post.image && (
        <figure className="post-image-container">
          <img
            src={imageUrl}
            alt={post.title}
            className="post-image"
            loading="lazy"
          />
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
              <span className="icon">✅</span> Your comment has been posted successfully!
            </div>
          )}

          {submissionState === "error" && (
            <div className="alert error">
              <span className="icon">⚠️</span> Failed to submit comment. Please try again.
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
