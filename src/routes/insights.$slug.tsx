// src/routes/insights.$slug.tsx
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { usePostQuery, usePostsQuery } from "@/hooks/use-agency-queries";
import { EditorialCard } from "@/components/EditorialCard";

export const Route = createFileRoute("/insights/$slug")({
  head: () => ({
    meta: [
      { title: "Dispatch — The Captain Journal" },
      { name: "description", content: "Strategic insights and field notes from East Africa's creative frontlines." },
    ],
  }),
  component: ArticleReader,
  notFoundComponent: NotFound,
});

// ==== PREMIUM 404 EXPERIENCE ====
function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 bg-[#f9fafb]">
      <div className="text-[10px] font-bold uppercase tracking-widest text-[#ff6600] mb-6">Archive Error</div>
      <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-black mb-6">Dispatch Not Found.</h1>
      <p className="text-neutral-500 font-medium max-w-md text-center mb-10">
        The field note you are looking for has been moved, archived, or is currently undergoing editorial review.
      </p>
      <Link
        to="/insights"
        className="px-8 py-4 rounded-full bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 hover:scale-105 transition-all shadow-xl"
      >
        Return to the Journal
      </Link>
    </div>
  );
}

// ==== EDITORIAL SKELETON LOADER ====
function SkeletonLoader() {
  return (
    <div className="animate-pulse bg-white min-h-screen">
      <div className="h-[60vh] bg-neutral-900 w-full" />
      <div className="mx-auto max-w-[90rem] px-6 sm:px-12 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="hidden lg:block col-span-3 space-y-6">
          <div className="h-4 bg-neutral-200 rounded w-1/2" />
          <div className="h-4 bg-neutral-200 rounded w-3/4" />
          <div className="h-4 bg-neutral-200 rounded w-2/3" />
        </div>
        <div className="col-span-1 lg:col-span-9 space-y-6 max-w-3xl">
          <div className="h-6 bg-neutral-200 rounded w-full" />
          <div className="h-6 bg-neutral-200 rounded w-full" />
          <div className="h-6 bg-neutral-200 rounded w-5/6" />
          <div className="h-40 bg-neutral-100 rounded-3xl w-full mt-10" />
        </div>
      </div>
    </div>
  );
}

// ==== MAIN ARTICLE COMPONENT ====
function ArticleReader() {
  const { slug } = Route.useParams();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  
  const { data, isLoading, error } = usePostQuery(slug);
  const { data: allPostsData } = usePostsQuery(1, "", "All"); 
  const posts = allPostsData?.results || [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('en-KE', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  if (isLoading) return <SkeletonLoader />;

  const post = Array.isArray(data) ? data[0] : data;

  if (error || !post) return <NotFound />;

  const related = posts.filter((p) => p.id !== post.id).slice(0, 3);
  const category = post.category_name || "Strategic Briefing";

  return (
    <article className="bg-white text-black selection:bg-[#ff6600] selection:text-white font-sans w-full overflow-x-hidden">
      
      {/* ==== 1. CINEMATIC HERO COVER ==== */}
      <header className="relative w-full h-[70vh] min-h-[600px] flex items-end justify-center bg-black overflow-hidden animate-in fade-in duration-1000">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="relative z-10 w-full max-w-[90rem] px-6 sm:px-12 pb-20 sm:pb-32 flex flex-col items-start">
          <button
            onClick={() => router.history.back()}
            className="mb-12 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold text-white uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
          >
            <i className="fa-solid fa-arrow-left" /> The Journal
          </button>

          <div className="flex flex-wrap items-center gap-4 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#ff6600] mb-6">
            <span className="bg-[#ff6600]/20 px-3 py-1 rounded-full text-white backdrop-blur-sm border border-[#ff6600]/30">
              {category}
            </span>
            <span className="text-neutral-400">Dispatched from Nairobi, KE</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.95] text-white max-w-5xl mb-6">
            {post.title}
          </h1>
          
          <p className="text-lg sm:text-2xl text-neutral-300 font-medium max-w-3xl leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </header>

      {/* ==== 2. ASYMMETRICAL EDITORIAL LAYOUT ==== */}
      <div className="mx-auto max-w-[90rem] px-6 sm:px-12 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* --- STICKY EDITORIAL SIDEBAR --- */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-32 flex flex-col gap-10">
            {/* Meta Block */}
            <div className="pb-8 border-b border-neutral-200">
              <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Published</div>
              <div className="text-sm font-semibold text-black">{formatDate(post.publish_at)}</div>
            </div>
            
            <div className="pb-8 border-b border-neutral-200">
              <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Briefing Length</div>
              <div className="text-sm font-semibold text-black">{post.read_time} Minutes</div>
            </div>

            {/* Share Block */}
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-4">Distribute</div>
              <div className="flex items-center gap-3">
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`} target="_blank" rel="noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full border border-neutral-200 hover:border-black hover:bg-black hover:text-white transition-all">
                  <i className="fa-brands fa-linkedin-in text-sm" />
                </a>
                <a href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${post.title}`} target="_blank" rel="noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full border border-neutral-200 hover:border-black hover:bg-black hover:text-white transition-all">
                  <i className="fa-brands fa-x-twitter text-sm" />
                </a>
                <button onClick={copyToClipboard} className="h-10 w-auto px-4 flex items-center justify-center gap-2 rounded-full border border-neutral-200 hover:border-black hover:bg-neutral-50 transition-all text-xs font-bold uppercase tracking-widest">
                  {copied ? "Copied!" : "Copy Link"}
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* --- MAIN PROSE CONTENT --- */}
        <main className="lg:col-span-9 max-w-4xl">
          {/* Mobile Meta (Hidden on Desktop) */}
          <div className="flex lg:hidden flex-wrap items-center gap-4 py-6 mb-8 border-b border-neutral-200 text-xs font-semibold text-neutral-500">
            <span>{formatDate(post.publish_at)}</span>
            <span>·</span>
            <span>{post.read_time} Min Read</span>
            <span>·</span>
            <button onClick={copyToClipboard} className="text-black underline">{copied ? "Copied!" : "Share Article"}</button>
          </div>

          {/* Premium Tailwind Prose Configuration */}
          <div 
            className="prose prose-lg sm:prose-xl max-w-none 
              prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-black prose-headings:mt-16 prose-headings:mb-6
              prose-p:text-neutral-600 prose-p:leading-relaxed prose-p:mb-8
              prose-a:text-[#ff6600] prose-a:no-underline hover:prose-a:underline hover:prose-a:underline-offset-4
              prose-img:rounded-3xl prose-img:shadow-xl prose-img:my-16
              prose-blockquote:border-l-[6px] prose-blockquote:border-[#ff6600] prose-blockquote:bg-neutral-50 prose-blockquote:py-8 prose-blockquote:px-8 prose-blockquote:my-16 prose-blockquote:rounded-r-3xl prose-blockquote:text-2xl prose-blockquote:font-black prose-blockquote:tracking-tight prose-blockquote:text-black prose-blockquote:not-italic
              prose-li:text-neutral-600 prose-ul:mb-8 prose-ol:mb-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-16 pt-8 border-t border-neutral-200">
              <div className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-4">Strategic Vectors</div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span key={tag} className="px-4 py-2 bg-neutral-100 text-neutral-600 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-neutral-200 cursor-default transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ==== 3. EDITORIAL CONTRIBUTOR PROFILE ==== */}
          <div className="mt-20 p-10 sm:p-14 rounded-[40px] bg-neutral-50 border border-neutral-100 flex flex-col sm:flex-row gap-10 items-start hover:shadow-xl hover:shadow-black/5 transition-all duration-500 group">
            <div className="h-32 w-32 rounded-full bg-black text-white flex items-center justify-center text-5xl font-black shrink-0 shadow-2xl group-hover:scale-105 transition-transform duration-500">
              {post.author_name ? post.author_name.charAt(0) : "C"}
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[#ff6600] font-bold mb-2">
                Editorial Contributor
              </div>
              <div className="text-3xl font-black tracking-tight text-black mb-4">{post.author_name}</div>
              <p className="text-base text-neutral-500 leading-relaxed font-medium">
                Founder and Creative Director at Captain 001 Media. Advising East African enterprises and global brands on cinematic production, brand architecture, and digital PR strategy from our studio in Nairobi.
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* ==== 4. FROM INSIGHT TO EXECUTION (Conversion Bridge) ==== */}
      <section className="bg-black text-white py-32 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#ff6600] opacity-20 blur-[120px] rounded-full pointer-events-none" />
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#ff6600] mb-8">
            Turn Insights Into Results
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter leading-tight mb-8">
            You've read how we think.<br className="hidden sm:block"/> Now see how we work.
          </h2>
          <p className="text-lg sm:text-xl text-neutral-400 font-medium mb-12 max-w-2xl mx-auto">
            Discuss how these editorial strategies apply to your brand's growth, narrative, and upcoming campaigns.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            
            {/* 🚀 FIX: Now routes directly to the booking pipeline */}
            <Link to="/book" className="w-full sm:w-auto px-10 py-5 bg-white text-black text-sm font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              Book a Strategy Session
            </Link>
            
            <Link to="/services" className="w-full sm:w-auto px-10 py-5 bg-transparent border border-neutral-700 text-white text-sm font-black uppercase tracking-widest rounded-full hover:bg-white/10 transition-colors duration-300">
              Explore Capabilities
            </Link>
          </div>
        </div>
      </section>

      {/* ==== 5. EDITORIAL PICKS (Keep Reading) ==== */}
      {related.length > 0 && (
        <section className="mx-auto max-w-[90rem] px-6 sm:px-12 py-24 sm:py-32 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 border-b border-neutral-200 pb-8">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#ff6600] mb-3">Further Reading</div>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-black">
                Editorial Picks.
              </h2>
            </div>
            <Link
              to="/insights"
              className="text-sm font-bold uppercase tracking-widest text-neutral-500 hover:text-black transition-colors flex items-center gap-2"
            >
              View the Archive <i className="fa-solid fa-arrow-right" />
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {related.map((p, i) => (
              <div key={p.id} className="animate-in slide-in-from-bottom-8 fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <EditorialCard post={p} view="grid" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ==== 6. TRUST SIGNALS (Footer Cap) ==== */}
      <section className="border-t border-neutral-100 bg-neutral-50 py-12 px-6">
        <div className="mx-auto max-w-[90rem] flex flex-wrap justify-center sm:justify-between items-center gap-8 opacity-60 grayscale">
          <span className="text-sm font-black tracking-tighter uppercase text-black">Creative Strategy</span>
          <span className="hidden sm:block text-neutral-300">•</span>
          <span className="text-sm font-black tracking-tighter uppercase text-black">Media Production</span>
          <span className="hidden sm:block text-neutral-300">•</span>
          <span className="text-sm font-black tracking-tighter uppercase text-black">Editorial Publishing</span>
          <span className="hidden sm:block text-neutral-300">•</span>
          <span className="text-sm font-black tracking-tighter uppercase text-black">Brand Storytelling</span>
        </div>
      </section>

    </article>
  );
}