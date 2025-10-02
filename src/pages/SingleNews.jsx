import React from "react";

import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPost, fetchAuthor, submitComment } from "../api/api";
import CommentBox from "../components/CommentBox";
import { formatImage } from "../utils/formatImage";
import "./SingleNews.css";

// Skeleton for loading state
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

function SingleNews() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  // Fetch post
  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id).then((res) => res.data),
  });

  // Fetch author only if post has one
  const { data: author } = useQuery({
    queryKey: ["author", post?.author],
    queryFn: () => fetchAuthor(post.author).then((res) => res.data),
    enabled: !!post?.author,
  });

  // Mutation for submitting comments
  const commentMutation = useMutation({
    mutationFn: submitComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["post", id]); // Refetch post with comments
    },
  });

  // Form state
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    content: "",
    post: id,
  });
  const [formErrors, setFormErrors] = React.useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    commentMutation.mutate(formData, {
      onSuccess: () => {
        setFormData({ name: "", email: "", content: "", post: id });
      },
    });
  };

  // Image URL
  const imageUrl = post?.image?.startsWith("http")
    ? post.image
    : post?.image
    ? `https://res.cloudinary.com/dco3yxmss/${post.image}`
    : "";

  // Loading & error states
  if (isLoading) return <SkeletonPost />;
  if (isError) return <p className="error-message">{error.message}</p>;
  if (!post) return <p className="not-found-message">Post not found.</p>;

  return (
    <article className="single-post-container">
      <header className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          <div className="post-author-section">
            {author && (
              <Link to={`/authors/${author.id}`} className="author-link">
                <img
                  src={formatImage(author.profile_pic)}
                  alt={author.name}
                  className="author-avatar"
                />
                <div>
                  <span className="post-author-name">{author.name}</span>
                  {author.bio && <p className="post-author-bio">{author.bio}</p>}
                </div>
              </Link>
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
          <img src={imageUrl} alt={post.title} className="post-image" />
          {post.image_caption && (
            <figcaption className="image-caption">
              {post.image_caption}
            </figcaption>
          )}
        </figure>
      )}

      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <section className="comments-section">
        <h2 className="section-title">Comments ({post.comments?.length || 0})</h2>

        {post.comments?.length === 0 ? (
          <p className="no-comments">Be the first to comment!</p>
        ) : (
          <div className="comments-list">
            {post.comments.map((comment) => (
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

          {commentMutation.isSuccess && (
            <div className="alert success">
              <span className="icon">✅</span> Your comment has been posted!
            </div>
          )}

          {commentMutation.isError && (
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
                disabled={commentMutation.isLoading}
              />
              {formErrors.name && (
                <span className="error-message">{formErrors.name}</span>
              )}
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email *"
                value={formData.email}
                onChange={handleChange}
                className={formErrors.email ? "error" : ""}
                disabled={commentMutation.isLoading}
              />
              {formErrors.email && (
                <span className="error-message">{formErrors.email}</span>
              )}
            </div>

            <div className="form-group">
              <textarea
                name="content"
                placeholder="Your Comment *"
                rows="5"
                value={formData.content}
                onChange={handleChange}
                className={formErrors.content ? "error" : ""}
                disabled={commentMutation.isLoading}
              />
              {formErrors.content && (
                <span className="error-message">{formErrors.content}</span>
              )}
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={commentMutation.isLoading}
            >
              {commentMutation.isLoading ? (
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
