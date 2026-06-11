import { Link } from "@tanstack/react-router";
import type { Post } from "@/lib/agency-data";

const safeCategory = (c: unknown) => (typeof c === "string" ? c : (c as any)?.name ?? "Editorial");

export function EditorialCard({ post, view = "grid" }: { post: Post; view?: "grid" | "list" }) {
  const category = safeCategory(post.category);

  if (view === "list") {
    return (
      <Link
        to="/insights/$id"
        params={{ id: post.id }}
        className="group grid grid-cols-[140px_1fr] sm:grid-cols-[220px_1fr] gap-5 sm:gap-8 p-4 sm:p-6 rounded-3xl border border-gray-200 hover:border-gray-900 transition-colors bg-white"
      >
        <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
          <img
            src={post.cover}
            alt={post.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="min-w-0 flex flex-col justify-center">
          <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">
            {category} · {post.readTime}
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 leading-tight group-hover:text-gray-600 transition-colors">
            {post.title}
          </h3>
          <p className="hidden sm:block mt-2 text-gray-600 line-clamp-2">{post.excerpt}</p>
          <div className="mt-3 text-xs text-gray-500">
            {post.author} · {post.date}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to="/insights/$id"
      params={{ id: post.id }}
      className="group flex flex-col rounded-3xl overflow-hidden bg-white border border-gray-200 hover:border-gray-900 transition-all hover:-translate-y-1 duration-300"
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={post.cover}
          alt={post.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">
          {category} · {post.readTime}
        </div>
        <h3 className="text-xl font-black tracking-tight text-gray-900 leading-tight group-hover:text-gray-600 transition-colors">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2 flex-1">{post.excerpt}</p>
        <div className="mt-4 text-xs text-gray-500">{post.date}</div>
      </div>
    </Link>
  );
}
