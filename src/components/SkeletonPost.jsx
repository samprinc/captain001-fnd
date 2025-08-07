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
