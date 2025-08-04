export function formatPost(post, fallbackTitle = "Untitled") {
  const cloudinaryBase = "https://res.cloudinary.com/dco3yxmss/";

  return {
    id: post.id,
    title: post.title || fallbackTitle,
    content: post.content || "",
    image: post.image
      ? post.image.startsWith("http")
        ? post.image
        : post.image.startsWith("image/")
        ? cloudinaryBase + post.image
        : "/default-news-image.jpg"
      : "/default-news-image.jpg",
    excerpt:
      post.excerpt?.substring(0, 100) ||
      post.description?.substring(0, 100) ||
      stripHtml(post.content)?.substring(0, 100) + "..." ||
      "Read this story",
    time: formatSmartTime(post.publish_at),
    category:
      typeof post.category === "string"
        ? post.category
        : post.category?.name || "General",
    views: post.views || 0,
    slug: post.slug || post.id,
  };
}

function stripHtml(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

// This function combines the "time ago" and "smart time" logic.
function formatSmartTime(isoString) {
  if (!isoString) return "Unknown time";

  const date = new Date(isoString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  // If it's within 24 hours, show the "time ago" format.
  if (seconds < 86400) {
    let interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return `${interval} hours ago`;
    } else if (interval === 1) {
      return "1 hour ago";
    }

    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return `${interval} minutes ago`;
    } else if (interval === 1) {
      return "1 minute ago";
    }

    return "just now";
  }

  // If it's older than 24 hours, use the "smart time" format.
  const isToday = date.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const timePart = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (isToday) return `Today at ${timePart}`;
  if (isYesterday) return `Yesterday at ${timePart}`;

  const datePart = date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  return `${datePart} at ${timePart}`;
}