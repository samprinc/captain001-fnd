import { Link } from "@tanstack/react-router";
import type { Post } from "@/lib/agency-data";

// Helper for clean, localized date formatting
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString('en-KE', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export function EditorialCard({ post, view = "grid" }: { post: Post; view?: "grid" | "list" }) {
  // We use category_name directly since we flattened it in Django serializers
  const category = post.category_name || "Editorial";
  
  // Safe slug fallback (prevents TypeScript/Router crashes if a slug is missing)
  const safeSlug = post.slug || String(post.id);

  if (view === "list") {
    return (
      <Link
        to="/insights/$slug"
        params={{ slug: safeSlug }}
        className="group grid grid-cols-[140px_1fr] sm:grid-cols-[220px_1fr] gap-5 sm:gap-8 p-4 sm:p-6 rounded-3xl border border-gray-200 hover:border-[#1e3a8a] transition-colors bg-white shadow-sm hover:shadow-md"
      >
        <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 relative">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="min-w-0 flex flex-col justify-center">
          <div className="text-[10px] uppercase tracking-[0.2em] text-[#ff6600] mb-2 font-bold">
            {category} · {post.read_time} Min
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 leading-tight group-hover:text-[#1e3a8a] transition-colors">
            {post.title}
          </h3>
          <p className="hidden sm:block mt-2 text-gray-600 line-clamp-2">{post.excerpt}</p>
          <div className="mt-4 text-xs text-gray-500 font-semibold">
            {post.author_name} · {formatDate(post.publish_at)}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to="/insights/$slug"
      params={{ slug: safeSlug }}
      preload="intent"
      className="group flex flex-col rounded-3xl overflow-hidden bg-white border border-gray-200 hover:border-[#1e3a8a] transition-all hover:-translate-y-1 duration-300 shadow-sm hover:shadow-xl"
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Category Pill Over Image */}
        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-[10px] uppercase tracking-widest font-bold text-[#1e3a8a]">
          {category}
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="text-[10px] uppercase tracking-[0.2em] text-[#ff6600] mb-3 font-bold">
          {formatDate(post.publish_at)} · {post.read_time} Min
        </div>
        <h3 className="text-xl font-black tracking-tight text-gray-900 leading-tight group-hover:text-[#1e3a8a] transition-colors">
          {post.title}
        </h3>
        <p className="mt-3 text-sm text-gray-600 font-medium line-clamp-2 flex-1">{post.excerpt}</p>
      </div>
    </Link>
  );
}