import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useRef, useState, useEffect } from "react";
import { usePostsQuery } from "@/hooks/use-agency-queries";
import { fetchTestimonials, subscribeNewsletter } from "../lib/api";
import { Testimonial } from "../lib/agency-data";

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: "The Journal — Captain 001 Media" },
      {
        name: "description",
        content: "Field notes from the intersection of media, culture, business, and growth in East Africa.",
      },
      { property: "og:title", content: "The Journal — Captain 001 Media" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: InsightsPage,
});

// ==== UTILITIES ====
const safeCategory = (c: unknown) =>
  typeof c === "string" ? c : (c as any)?.name ?? "Editorial";

function cleanImageUrl(url: string | null | undefined) {
  if (!url) return "";
  const match = url.match(/(https?[:%]+.*)/i);
  if (match) {
    let clean = decodeURIComponent(match[1]);
    clean = clean.replace(/^(https?):\/+/i, "$1://");
    return clean;
  }
  return url;
}

// ==== MICRO-INTERACTION: High-Performance Counter ====
function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let startTimestamp: number;
    const duration = 2000;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(ease * end));
      if (progress < 1) animationFrameId = window.requestAnimationFrame(step);
    };

    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [end]);

  return <>{count}{suffix}</>;
}

// ==== COMPONENT: Enhanced Editorial Card ====
// Upgrades the standard card to a premium magazine experience without touching external files
function EnhancedEditorialCard({ post }: { post: any }) {
  const authorInitials = post.author_name ? post.author_name.charAt(0) : "C";
  const cat = safeCategory(post.category_name);
  
  return (
    <Link
      to="/insights/$slug"
      params={{ slug: post.slug || String(post.id) }}
      className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-500"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        <img
          src={cleanImageUrl(post.image)}
          alt={post.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-4 left-4 px-3 py-1 bg-white/95 backdrop-blur-sm text-[9px] font-black uppercase tracking-widest text-black rounded-sm shadow-sm">
          {cat}
        </div>
      </div>
      
      <div className="flex flex-col flex-grow p-6 sm:p-8">
        <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug mb-3 group-hover:text-[#ff6600] transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed mb-6 flex-grow">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between pt-5 border-t border-neutral-100 mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold">
              {authorInitials}
            </div>
            <div>
              <div className="text-xs font-bold text-black">{post.author_name || "Editorial Team"}</div>
              <div className="text-[9px] uppercase tracking-widest text-neutral-400 font-semibold">
                {new Date(post.publish_at).toLocaleDateString('en-KE', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
          </div>
          <div className="text-[10px] font-bold text-neutral-300 group-hover:text-[#ff6600] transition-colors flex items-center gap-1">
            {post.read_time} Min <i className="fa-solid fa-arrow-right -rotate-45 group-hover:rotate-0 transition-transform duration-300 ml-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}

// ==== MAIN COMPONENT ====
function InsightsPage() {
  // ==== State Management ====
  const [searchInput, setSearchInput] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [page, setPage] = useState(1);
  const gridTop = useRef<HTMLDivElement>(null);
  
  // Newsletter State
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Testimonials State (For Social Proof Injection)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchInput), 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch Testimonials independently for the injection section
  useEffect(() => {
    fetchTestimonials().then(setTestimonials).catch(() => {});
  }, []);

  // ==== API Data Fetching ====
  const { data, isLoading, isFetching } = usePostsQuery(page, debouncedQuery, category);
  const posts = data?.results || [];
  const totalPages = data?.total_pages || 1;
  const totalCount = data?.count || 0;

  // ==== Advanced Editorial Categories ====
  const categoryData = useMemo(() => {
    const map = new Map<string, number>();
    posts.forEach((p) => {
      const c = safeCategory(p.category_name);
      map.set(c, (map.get(c) || 0) + 1);
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]); // Sort by count
  }, [posts]);

  // ==== Section Logic ====
  const searching = debouncedQuery.trim().length > 0 || category !== "All";
  const showFeatured = page === 1 && !searching && posts.length > 0;
  
  const featured = showFeatured ? posts[0] : null;
  const trendingStrips = showFeatured ? posts.slice(1, 5) : [];
  const gridItems = showFeatured ? posts.slice(5) : posts;

  // ==== Handlers ====
  const goToPage = (p: number) => {
    setPage(Math.min(Math.max(1, p), totalPages));
    requestAnimationFrame(() => {
      gridTop.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const resetAndFilter = (newCat: string) => {
    setCategory(newCat);
    setSearchInput("");
    setDebouncedQuery("");
    setPage(1);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setNewsletterStatus('loading');
    try {
      await subscribeNewsletter(email);
      setNewsletterStatus('success');
      setEmail("");
    } catch (err) {
      setNewsletterStatus('error');
    }
  };

  return (
    <div className="bg-neutral-50 text-[#111827] selection:bg-[#ff6600] selection:text-white font-sans w-full overflow-x-hidden">
      
      {/* ==== PHASE 1: THE AUTHORITY HERO ==== */}
      <section className="relative overflow-hidden bg-black text-white pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute top-0 right-0 w-full max-w-[800px] h-[500px] bg-[#ff6600] opacity-[0.07] blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative mx-auto max-w-[90rem] px-6 sm:px-12 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
          <div className="max-w-4xl">
            <div className="inline-flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold mb-8">
              <span className="bg-[#ff6600] text-white px-3 py-1.5 rounded-sm">Official Publication</span>
              <span className="text-neutral-400 flex items-center gap-2"><i className="fa-solid fa-location-dot" /> Nairobi, Kenya</span>
              <span className="hidden sm:inline text-neutral-600">•</span>
              <span className="text-neutral-400">{totalCount} Intelligence Briefs</span>
            </div>
            
            <h1 className="text-[clamp(2.5rem,6vw,6rem)] font-black tracking-tighter leading-[0.9] mb-6">
              Where East African <br className="hidden sm:block" />
              brands learn how modern <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-500">
                influence is built.
              </span>
            </h1>
          </div>

          <div className="lg:max-w-xs w-full pb-2 border-b border-white/20">
            <p className="text-sm text-neutral-400 font-medium leading-relaxed mb-6">
              Field notes from the intersection of media, culture, business, and growth. Edited by the strategists at Captain 001.
            </p>
            {posts.length > 0 && (
              <div className="text-[10px] uppercase tracking-widest text-[#ff6600] font-bold">
                Latest Update: {new Date(posts[0].publish_at).toLocaleDateString('en-KE', { month: 'long', year: 'numeric' })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ==== PHASE 5 & 6: PREMIUM SEARCH & EDITORIAL NAVIGATION ==== */}
<section className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-100 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
  <div className="mx-auto max-w-[90rem] px-6 sm:px-12 py-3">
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
      
      {/* Search Input */}
      <div className="w-full md:w-[320px] relative group">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <i className="fa-solid fa-magnifying-glass text-neutral-400 text-xs" />
        </div>
        <input
          aria-label="Search publication"
          value={searchInput}
          onChange={(e) => { setSearchInput(e.target.value); setPage(1); }}
          placeholder="Search articles..."
          className="w-full h-10 pl-9 pr-4 rounded-full bg-neutral-100 text-sm font-medium text-black placeholder:text-neutral-500 focus:bg-white focus:ring-2 focus:ring-[#ff6600]/20 outline-none transition-all"
        />
      </div>

      {/* Editorial Categories */}
      <div className="w-full md:w-auto overflow-x-auto scrollbar-hide flex gap-2">
        <button
          onClick={() => resetAndFilter("All")}
          className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all ${category === "All" ? "bg-black text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"}`}
        >
          All
        </button>
        {categoryData.map(([catName]) => (
          <button
            key={catName}
            onClick={() => resetAndFilter(catName)}
            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all whitespace-nowrap ${category === catName ? "bg-black text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"}`}
          >
            {catName}
          </button>
        ))}
      </div>
    </div>
  </div>
</section>

      <div ref={gridTop} className="scroll-mt-40" aria-hidden="true" />

      {/* ==== EMPTY / LOADING STATES ==== */}
      <section className="mx-auto max-w-[90rem] px-6 sm:px-12 py-12">
        {isLoading && posts.length === 0 && (
          <div className="py-32 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-neutral-200 border-t-black rounded-full animate-spin mb-4" />
            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Loading Publication...</div>
          </div>
        )}

        {!isLoading && posts.length === 0 && (
          <div className="py-32 text-center bg-white border border-neutral-200 rounded-2xl">
            <i className="fa-regular fa-newspaper text-4xl text-neutral-300 mb-4" />
            <h3 className="text-2xl font-black tracking-tight mb-2">No stories found.</h3>
            <p className="text-neutral-500 text-sm max-w-md mx-auto mb-6">We couldn't find any intelligence briefs matching "{searchInput}".</p>
            <button onClick={() => resetAndFilter("All")} className="px-6 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#ff6600] transition-colors">
              Reset Filters
            </button>
          </div>
        )}

        {/* ==== PHASE 2 & 4: THE MAGAZINE COVER (Featured) ==== */}
        {featured && (
          <div className="mb-16 animate-in fade-in duration-1000">
            <Link
              to="/insights/$slug"
              params={{ slug: featured.slug || String(featured.id) }}
              className="group block relative bg-black rounded-[2rem] sm:rounded-[3rem] overflow-hidden"
            >
              <div className="absolute inset-0">
                <img
                  src={cleanImageUrl(featured.image)}
                  alt={featured.title}
                  fetchPriority="high"
                  loading="eager"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>
              
              <div className="relative z-10 flex flex-col justify-end min-h-[60vh] sm:min-h-[70vh] p-8 sm:p-16 lg:p-24 max-w-5xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-white text-black px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-sm">
                    Editor's Selection
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff6600]">
                    {safeCategory(featured.category_name)}
                  </span>
                </div>
                
                <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black tracking-tighter leading-[1] text-white mb-6 group-hover:text-neutral-300 transition-colors">
                  {featured.title}
                </h2>
                
                <p className="text-base sm:text-xl text-neutral-300 font-medium leading-relaxed max-w-3xl mb-10 hidden sm:block">
                  {featured.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-6 border-t border-white/20 pt-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-black text-sm">
                      {featured.author_name ? featured.author_name.charAt(0) : "C"}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{featured.author_name || "Captain Staff"}</div>
                      <div className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Author</div>
                    </div>
                  </div>
                  <div className="hidden sm:block w-px h-8 bg-white/20" />
                  <div>
                    <div className="text-sm font-bold text-white">{featured.read_time} Min</div>
                    <div className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Read Time</div>
                  </div>
                  <div className="hidden sm:block w-px h-8 bg-white/20" />
                  <div>
                    <div className="text-sm font-bold text-white">{new Date(featured.publish_at).toLocaleDateString('en-KE', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                    <div className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Published</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* ==== PHASE 3: TRENDING STORIES STRIP (Forbes Style) ==== */}
        {trendingStrips.length > 0 && (
          <div className="mb-24">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Trending Now
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingStrips.map((post) => (
                <Link
                  key={`trending-${post.id}`}
                  to="/insights/$slug"
                  params={{ slug: post.slug || String(post.id) }}
                  className="group flex flex-col gap-4 border-t-2 border-black pt-4 hover:-translate-y-1 transition-transform"
                >
                  <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-neutral-100">
                    <img src={cleanImageUrl(post.image)} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-[#ff6600] mb-2">{safeCategory(post.category_name)}</div>
                    <h4 className="text-sm font-black leading-tight text-black group-hover:underline decoration-2 underline-offset-4">{post.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ==== SEARCH RESULTS HEADER ==== */}
        {searching && posts.length > 0 && (
          <div className="flex items-end justify-between mb-10 border-b border-neutral-200 pb-6">
            <h3 className="text-3xl font-black tracking-tighter text-black">
              Showing results for "{debouncedQuery || category}"
            </h3>
            <div className="text-xs font-bold tracking-widest uppercase text-neutral-400 bg-white px-3 py-1 rounded-full border border-neutral-200">
              {totalCount} Found
            </div>
          </div>
        )}

       {/* ==== PHASE 8: THE MAGAZINE GRID ==== */}
<div className="grid gap-6 lg:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-24">
  {gridItems.map((p, index) => (
    <div key={`grid-${p.id}`} className="min-w-0 flex flex-col"> {/* Added min-w-0 */}
      <EnhancedEditorialCard post={p} />
      
      {/* Breaker Cards - Ensure full width and clean alignment */}
      {index === 1 && !searching && (
        <div className="col-span-full my-8 bg-black text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="relative z-10 flex-1 min-w-0">
            <h3 className="text-2xl sm:text-3xl font-black mb-3">Need execution?</h3>
            <p className="text-sm text-neutral-400 max-w-md">Our strategies build market-dominating brands. Let's talk.</p>
          </div>
          <Link to="/services" className="shrink-0 px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-[#ff6600] hover:text-white transition-colors">
            View Services
          </Link>
        </div>
      
              )}

              {/* ==== PHASE 7: MONOTONY BREAKER 2 (API Client Proof) ==== */}
              {index === 4 && !searching && testimonials.length > 0 && (
                <div className="col-span-full my-12 py-12 border-y border-neutral-200 flex flex-col items-center text-center">
                  <i className="fa-solid fa-quote-left text-3xl text-[#ff6600] mb-6" />
                  <p className="text-2xl sm:text-3xl font-black tracking-tighter max-w-4xl leading-tight mb-8">
                    "{testimonials[0].quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    {testimonials[0].image ? (
                      <img src={cleanImageUrl(testimonials[0].image)} alt={testimonials[0].author} className="w-10 h-10 rounded-full object-cover grayscale" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">{testimonials[0].author.charAt(0)}</div>
                    )}
                    <div className="text-left">
                      <div className="text-sm font-bold text-black">{testimonials[0].author}</div>
                      <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">{testimonials[0].role}, {testimonials[0].company}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ==== PAGINATION ==== */}
        {totalPages > 1 && (
          <nav aria-label="Pagination" className="pt-12 border-t border-neutral-200 flex flex-wrap items-center justify-center gap-4">
            <button
              aria-label="Previous Page"
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className="h-10 w-10 grid place-items-center rounded-full border border-neutral-200 bg-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-black hover:text-black transition-colors text-neutral-400"
            >
              <i className="fa-solid fa-arrow-left text-xs" />
            </button>
            
            <div className="flex flex-wrap justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={`page-${p}`}
                  aria-current={p === page ? "page" : undefined}
                  onClick={() => goToPage(p)}
                  className={`h-10 min-w-[40px] px-3 rounded-full text-xs font-bold transition-all ${
                    p === page
                      ? "bg-black text-white"
                      : "text-neutral-500 bg-transparent hover:bg-neutral-100 hover:text-black"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              aria-label="Next Page"
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              className="h-10 w-10 grid place-items-center rounded-full border border-neutral-200 bg-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-black hover:text-black transition-colors text-neutral-400"
            >
              <i className="fa-solid fa-arrow-right text-xs" />
            </button>
          </nav>
        )}
      </section>

      {/* ==== PHASE 10: THE CAPTAIN DISPATCH (Premium Newsletter) ==== */}
      <section className="bg-white border-t border-neutral-200 py-24 sm:py-32">
        <div className="mx-auto max-w-[90rem] px-6 sm:px-12">
          <div className="bg-neutral-50 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-16 lg:p-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-24 border border-neutral-200 shadow-xl relative overflow-hidden">
            {/* Design Accent */}
            <div className="absolute top-0 left-0 w-2 h-full bg-[#ff6600]" />
            
            <div className="flex-1 w-full text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#ff6600] bg-[#ff6600]/10 px-3 py-1.5 rounded-full mb-6">
                <i className="fa-regular fa-envelope" /> The Captain Dispatch
              </div>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black tracking-tighter leading-tight text-black mb-6">
                Intelligence for the modern brand builder.
              </h2>
              <p className="text-base text-neutral-500 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                Join founders, creatives, and strategists receiving our monthly breakdown of media trends, production secrets, and brand architecture. No spam. Just signal.
              </p>
            </div>

            <div className="flex-1 w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-4">
                <div>
                  <label htmlFor="email" className="sr-only">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full h-14 px-5 rounded-lg border border-neutral-200 bg-neutral-50 outline-none text-sm font-semibold text-black placeholder:text-neutral-400 focus:bg-white focus:border-[#ff6600] transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={newsletterStatus === 'loading' || newsletterStatus === 'success'}
                  className="w-full h-14 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-[#ff6600] disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {newsletterStatus === 'loading' && <i className="fa-solid fa-circle-notch animate-spin" />}
                  {newsletterStatus === 'success' && <i className="fa-solid fa-check" />}
                  {newsletterStatus === 'idle' && "Subscribe"}
                  {newsletterStatus === 'error' && "Try Again"}
                  {newsletterStatus === 'success' ? "Subscribed" : ""}
                </button>
                {newsletterStatus === 'success' && (
                  <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest text-center mt-2">Welcome to the inner circle.</p>
                )}
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest text-center mt-2">
                  <i className="fa-solid fa-lock mr-1" /> Unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}