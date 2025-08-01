// src/utils/postFormatter.js

export function formatPost(post, fallbackTitle = "Untitled") {
  return {
    id: post.id,
    title: post.title || fallbackTitle,
    image: post.image || "/default-news-image.jpg",
    excerpt:
      typeof post.excerpt === "string"
        ? post.excerpt
        : typeof post.description === "string"
        ? post.description.substring(0, 100) + "..."
        : "Read this story",
    date: post.date || new Date().toLocaleDateString(),
    category:
      typeof post.category === "string"
        ? post.category
        : post.category?.name || "General",
    views: post.views || 0,
  };
}
