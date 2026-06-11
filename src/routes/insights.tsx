import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { EditorialCard } from "@/components/EditorialCard";
import { usePostsQuery } from "@/hooks/use-agency-queries";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — Captain 001 Media" },
      {
        name: "description",
        content:
          "Field notes from the studio. Editorial thinking on brand, production, and press.",
      },
      { property: "og:title", content: "Insights — Captain 001 Media" },
      {
        property: "og:description",
        content: "Field notes from the studio on brand, production, and press.",
      },
    ],
  }),
  component: InsightsPage,
});

const safeCategory = (c: unknown) =>
  typeof c === "string" ? c : (c as any)?.name ?? "Editorial";

const PAGE_SIZE = 12;

function InsightsPage() {
  const { data: posts = [] } = usePostsQuery();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [category, setCategory] = useState<string>("All");
  const [page, setPage] = useState(1);
  const gridTop = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => set.add(safeCategory(p.category)));
    return ["All", ...Array.from(set)];
  }, [posts]);

  const filtered = useMemo(() => {
    let list = posts.filter((p) => {
      const cat = safeCategory(p.category);
      const matchCat = category === "All" || cat === category;
      const q = query.trim().toLowerCase();
      const matchQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        cat.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
    list = [...list].sort((a, b) => {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      return sort === "newest" ? db - da : da - db;
    });
    return list;
  }, [posts, query, sort, category]);

  const searching = query.trim().length > 0 || category !== "All";
  const showFeatured = page === 1 && !searching && filtered.length > 0;
  const featured = showFeatured ? filtered[0] : null;
  const rest = showFeatured ? filtered.slice(1) : filtered;

  const totalPages = Math.max(1, Math.ceil(rest.length / PAGE_SIZE));
  const pageItems = rest.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goToPage = (p: number) => {
    setPage(Math.min(Math.max(1, p), totalPages));
    requestAnimationFrame(() => {
      gridTop.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const resetPage = () => setPage(1);

  return (
    <div className="bg-white text-gray-900">
      {/* HERO */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28">
          <div className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-6">
            The Magazine · Issue 014
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] max-w-5xl">
            Insights from a{" "}
            <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
              working studio.
            </span>
          </h1>
          <p className="mt-8 text-xl text-gray-400 max-w-2xl">
            Field notes, essays, and unreleased thinking on brand, production, and press —
            written between shoots.
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <section className="border-b border-gray-100 sticky top-20 z-30 bg-white/85 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-5">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            <div className="flex-1 flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-5 h-12">
              <i className="fa-solid fa-magnifying-glass text-gray-500 text-sm" />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  resetPage();
                }}
                placeholder="Search essays, field notes, tags…"
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as "newest" | "oldest")}
                className="h-12 px-5 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-900 outline-none"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
              <div className="hidden sm:flex items-center gap-1 p-1 rounded-full border border-gray-200">
                {(["grid", "list"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={`h-10 w-10 grid place-items-center rounded-full text-sm ${
                      view === v
                        ? "bg-gray-900 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <i className={`fa-solid ${v === "grid" ? "fa-grip" : "fa-list"}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Category pills with mobile horizontal scroll */}
          <div className="mt-4 -mx-5 sm:mx-0 overflow-x-auto snap-x scrollbar-hide">
            <div className="flex gap-2 px-5 sm:px-0 min-w-max">
              {categories.map((c) => {
                const cat = typeof c === "string" ? c : "Editorial";
                const active = category === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setCategory(cat);
                      resetPage();
                    }}
                    className={`snap-start whitespace-nowrap px-5 h-10 rounded-full text-sm font-semibold transition-colors ${
                      active
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div ref={gridTop} />

      {/* FEATURED + GRID */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        {featured && (
          <Link
            to="/insights/$id"
            params={{ id: featured.id }}
            className="group grid lg:grid-cols-2 gap-8 rounded-[32px] overflow-hidden border border-gray-200 hover:border-gray-900 transition-colors mb-16 bg-white"
          >
            <div className="aspect-[4/3] lg:aspect-auto overflow-hidden bg-gray-100">
              <img
                src={featured.cover}
                alt={featured.title}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-8 sm:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-gray-900" />
                Featured · {safeCategory(featured.category)}
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.02] group-hover:text-gray-600 transition-colors">
                {featured.title}
              </h2>
              <p className="mt-5 text-lg text-gray-600 leading-relaxed">{featured.excerpt}</p>
              <div className="mt-8 flex items-center gap-3 text-sm text-gray-500">
                <span className="font-semibold text-gray-900">{featured.author}</span>
                <span>·</span>
                <span>{featured.date}</span>
                <span>·</span>
                <span>{featured.readTime}</span>
              </div>
            </div>
          </Link>
        )}

        <div className="flex items-end justify-between mb-8">
          <div className="text-sm text-gray-500">
            {filtered.length} {filtered.length === 1 ? "essay" : "essays"}
            {searching && " · filtered"}
          </div>
        </div>

        {pageItems.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 p-16 text-center">
            <div className="text-3xl font-black tracking-tight">Nothing matches.</div>
            <p className="mt-2 text-gray-500">Try a different search or reset the filters.</p>
          </div>
        ) : view === "grid" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageItems.map((p) => (
              <EditorialCard key={p.id} post={p} view="grid" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4">
            {pageItems.map((p) => (
              <EditorialCard key={p.id} post={p} view="list" />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-2">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className="h-11 w-11 grid place-items-center rounded-full border border-gray-200 disabled:opacity-30 hover:bg-gray-100"
            >
              <i className="fa-solid fa-arrow-left text-xs" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => goToPage(p)}
                className={`h-11 min-w-[44px] px-4 rounded-full text-sm font-semibold ${
                  p === page
                    ? "bg-gray-900 text-white"
                    : "border border-gray-200 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              className="h-11 w-11 grid place-items-center rounded-full border border-gray-200 disabled:opacity-30 hover:bg-gray-100"
            >
              <i className="fa-solid fa-arrow-right text-xs" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
