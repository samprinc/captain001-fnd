import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { fetchGallery, fetchTestimonials, fetchCaseStudies } from "../lib/api";
import { CaseStudy, PortfolioImage, Testimonial } from "../lib/agency-data";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "The Work — Captain 001 Media" },
      { name: "description", content: "Proof beats promises. Explore our case studies, outcomes, and the visual architecture of Kenya's elite creative studio." },
    ],
  }),
  component: PortfolioPage, // Maps to the internal function below
});

// ==== UTILITY: Fix Django ImageField URLs ====
// Django prepends a '/' to external URLs saved in ImageFields. This cleans it up.
// ==== UTILITY: Fix Django ImageField URLs ====
function cleanImageUrl(url: string | null | undefined) {
  if (!url) return "";

  // 1. Extract the actual HTTP/HTTPS part, ignoring any Django prefixes (like /media/)
  const match = url.match(/(https?[:%]+.*)/i);

  if (match) {
    // 2. Decode URL encoding (turns %3A back into a colon)
    let clean = decodeURIComponent(match[1]);

    // 3. Fix Django's path normalization (turns https:/ back into https://)
    clean = clean.replace(/^(https?):\/+/i, "$1://");

    return clean;
  }

  // If it's a normal local file, return it as-is
  return url;
}

// --- MICRO-INTERACTION: Animated Counter Component ---
function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end]);
  return <>{count}{suffix}</>;
}

// REMOVED 'export' to fix TanStack Router Code-Splitting Warnings
function PortfolioPage() {
  // ==== STATE MANAGEMENT ====
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(null);
  
  // Data State
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [gallery, setGallery] = useState<PortfolioImage[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Lock background scrolling when modal is open
  useEffect(() => {
    if (selectedProject) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  // Escape key for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ==== API DATA FETCHING ====
  useEffect(() => {
    window.scrollTo(0, 0);
    
    async function loadData() {
      setIsLoading(true);
      try {
        const [csData, galData, testData] = await Promise.all([
          fetchCaseStudies(),
          fetchGallery(),
          fetchTestimonials()
        ]);
        
        setCaseStudies(csData);
        setGallery(galData);
        setTestimonials(testData);
      } catch (error) {
        console.error("Failed to load portfolio data", error);
      } finally {
        setTimeout(() => setIsLoading(false), 800);
      }
    }
    
    loadData();
  }, []);

  // Filter Logic - Using safe strings to prevent React Key warnings
  const rawCategories = gallery.map(item => item.category?.name || item.category || "Uncategorized");
  const categories = ["All", ...Array.from(new Set(rawCategories))];
  
  const filteredGallery = activeFilter === "All" 
    ? gallery 
    : gallery.filter(item => (item.category?.name || item.category) === activeFilter);

  const featuredStudy = caseStudies.find(cs => cs.featured) || caseStudies[0];
  const gridStudies = caseStudies.filter(cs => cs.id !== featuredStudy?.id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white space-y-4 pt-24">
        <div className="w-12 h-12 border-4 border-neutral-800 border-t-[#ff6600] rounded-full animate-spin" />
        <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Loading Portfolio</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-black font-sans selection:bg-[#ff6600] selection:text-white">
      
      {/* ==== PHASE 2: REBUILT HERO ==== */}
      <section className="relative bg-black text-white pt-32 pb-24 sm:pt-48 sm:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#ff6600] opacity-10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="relative mx-auto max-w-[90rem] px-6 sm:px-12 z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-neutral-400 hover:text-[#ff6600] transition-colors mb-8">
            <i className="fa-solid fa-arrow-left" /> Back to Studio
          </Link>
          
          <h1 className="text-5xl sm:text-7xl lg:text-[7rem] font-black tracking-tighter leading-[0.9] max-w-5xl mb-8">
            Proof beats <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-600">
              promises.
            </span>
          </h1>
          
          <p className="text-lg sm:text-2xl text-neutral-400 max-w-3xl leading-relaxed font-medium mb-16">
            The work behind the reputation. We build brands for clients who expect measurable outcomes, undeniable authority, and flawless execution.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pt-12 border-t border-white/10">
            <div>
              <div className="text-3xl sm:text-5xl font-black tracking-tighter text-white mb-1"><AnimatedCounter end={150} />+</div>
              <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Projects Delivered</div>
            </div>
            <div>
              <div className="text-3xl sm:text-5xl font-black tracking-tighter text-white mb-1"><AnimatedCounter end={12} />+</div>
              <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Industries Served</div>
            </div>
            <div>
              <div className="text-3xl sm:text-5xl font-black tracking-tighter text-white mb-1"><AnimatedCounter end={50} />+</div>
              <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Brands Scaled</div>
            </div>
            <div>
              <div className="text-3xl sm:text-5xl font-black tracking-tighter text-white mb-1">E.A <i className="fa-solid fa-arrow-right text-2xl text-[#ff6600] mx-2" /> Global</div>
              <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Execution Reach</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==== PHASE 3: FEATURED CASE STUDY ==== */}
      {featuredStudy && (
        <section className="py-24 sm:py-32 bg-neutral-50">
          <div className="mx-auto max-w-[90rem] px-6 sm:px-12">
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff6600] mb-8">Featured Case Study</div>
            
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-0 bg-white rounded-[40px] overflow-hidden border border-neutral-200 shadow-xl">
              <div className="lg:col-span-7 h-[400px] lg:h-auto relative">
                {/* APPLIED IMAGE FIX HERE */}
                <img src={cleanImageUrl(featuredStudy.hero_image)} alt={featuredStudy.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-black shadow-lg">
                  {featuredStudy.client_name}
                </div>
              </div>
              
              <div className="lg:col-span-5 p-10 lg:p-16 flex flex-col justify-center">
                <div className="flex gap-3 mb-6 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                  <span>{featuredStudy.industry}</span>
                  <span className="text-neutral-300">•</span>
                  <span>{featuredStudy.project_type}</span>
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-black tracking-tighter mb-8">{featuredStudy.title}</h2>
                
                <div className="space-y-6 mb-12">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#ff6600] mb-2">The Challenge</h3>
                    <p className="text-neutral-600 leading-relaxed font-medium">{featuredStudy.challenge}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#ff6600] mb-2">The Outcome</h3>
                    <p className="text-neutral-600 leading-relaxed font-medium">{featuredStudy.outcome}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-12 py-6 border-y border-neutral-100">
                  {featuredStudy.metrics.map((metric, idx) => (
                    <div key={`metric-${idx}`}>
                      <div className="text-3xl font-black tracking-tighter text-black">{metric.value}</div>
                      <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mt-1">{metric.label}</div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setSelectedProject(featuredStudy)}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform duration-300 w-full sm:w-auto"
                >
                  View Full Case Study <i className="fa-solid fa-arrow-right" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ==== PHASE 4: CASE STUDY GRID ==== */}
      {gridStudies.length > 0 && (
        <section className="py-24 bg-white border-t border-neutral-200">
          <div className="mx-auto max-w-[90rem] px-6 sm:px-12">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-16 text-black">More Impact.</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridStudies.map((study) => (
                <div key={study.id} className="group cursor-pointer flex flex-col" onClick={() => setSelectedProject(study)}>
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-neutral-100 mb-6 relative">
                    {/* APPLIED IMAGE FIX HERE */}
                    <img src={cleanImageUrl(study.hero_image)} alt={study.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="px-6 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        View Project
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 mb-3 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                    <span>{study.client_name}</span>
                    <span className="text-neutral-300">•</span>
                    <span>{study.project_type}</span>
                  </div>
                  <h3 className="text-2xl font-black tracking-tight text-black group-hover:text-[#ff6600] transition-colors mb-4">
                    {study.title}
                  </h3>
                  
                  {study.metrics.length > 0 && (
                    <div className="flex gap-4 mt-auto border-t border-neutral-100 pt-4">
                      {study.metrics.slice(0, 2).map((m, i) => (
                        <div key={`grid-metric-${i}`} className="flex-1">
                          <div className="text-lg font-black text-black">{m.value}</div>
                          <div className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ==== PHASE 6: VISUAL SHOWCASE (The Gallery) ==== */}
      <section className="py-24 bg-neutral-50 border-t border-neutral-200">
        <div className="mx-auto max-w-[90rem] px-6 sm:px-12 mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#ff6600] mb-4">Visual Architecture</h2>
              <p className="text-4xl sm:text-5xl font-black tracking-tighter text-black">The Studio Archive.</p>
            </div>
            
            {categories.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {categories.map((cat, idx) => (
                  <button
                    key={`cat-${idx}`}
                    onClick={() => setActiveFilter(String(cat))}
                    className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${
                      activeFilter === String(cat)
                        ? "bg-black text-white border-black"
                        : "bg-transparent text-neutral-500 border-neutral-300 hover:border-black hover:text-black"
                    }`}
                  >
                    {String(cat)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mx-auto max-w-[90rem] px-6 sm:px-12">
          {filteredGallery.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {filteredGallery.map((item) => (
                <div key={item.id} className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-neutral-200 border border-neutral-200">
                  {/* APPLIED IMAGE FIX HERE */}
                  <img src={cleanImageUrl(item.image)} alt={item.title} className="w-full h-auto object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                    <div className="text-[10px] uppercase tracking-widest text-[#ff6600] font-bold mb-1">{item.category?.name || item.category}</div>
                    <div className="text-white font-bold text-lg mb-1 leading-snug">{item.title}</div>
                    <div className="text-neutral-300 text-xs font-medium"><i className="fa-solid fa-building mr-1"></i> {item.client_name}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border border-neutral-200">
              <i className="fa-solid fa-folder-open text-4xl text-neutral-300 mb-4"></i>
              <h3 className="text-xl font-black text-black">No visuals loaded.</h3>
            </div>
          )}
        </div>
      </section>

      {/* ==== PHASE 7: REAL TESTIMONIALS ==== */}
      {testimonials.length > 0 && (
        <section className="py-24 bg-white border-y border-neutral-200">
          <div className="mx-auto max-w-[90rem] px-6 sm:px-12">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-black mb-16 text-center">The Verdict.</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((test) => (
                <div key={test.id} className="p-8 bg-neutral-50 rounded-3xl border border-neutral-200 flex flex-col">
                  <i className="fa-solid fa-quote-left text-2xl text-[#ff6600] mb-6" />
                  <p className="text-lg text-black font-medium leading-relaxed mb-8 flex-grow">"{test.quote}"</p>
                  <div className="flex items-center gap-4">
                    {test.image ? (
                      <img src={cleanImageUrl(test.image)} alt={test.author} className="w-12 h-12 rounded-full object-cover grayscale" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold">{test.author.charAt(0)}</div>
                    )}
                    <div>
                      <div className="font-bold text-black text-sm">{test.author}</div>
                      <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">{test.role}, {test.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ==== PHASE 9: PROJECT DETAIL MODAL ==== */}
      <div 
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-lg transition-all duration-300 ${
          selectedProject ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setSelectedProject(null)}
      >
        {selectedProject && (
          <div className="relative w-full max-w-6xl max-h-[90vh] mx-4 bg-white rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-2xl" onClick={e => e.stopPropagation()}>
            
            <button 
              className="absolute top-6 right-6 z-50 h-10 w-10 bg-white shadow-lg hover:bg-black hover:text-white rounded-full flex items-center justify-center text-black transition-colors"
              onClick={() => setSelectedProject(null)}
            >
              <i className="fa-solid fa-times"></i>
            </button>

            <div className="md:w-1/2 h-64 md:h-[90vh] relative">
              {/* APPLIED IMAGE FIX HERE */}
              <img src={cleanImageUrl(selectedProject.hero_image)} alt={selectedProject.title} className="w-full h-full object-cover" />
            </div>

            <div className="md:w-1/2 h-full max-h-[90vh] overflow-y-auto p-8 md:p-16 hide-scrollbar">
              <div className="flex gap-3 mb-6 text-[10px] font-bold uppercase tracking-widest text-[#ff6600]">
                <span>{selectedProject.client_name}</span>
                <span className="text-neutral-300">•</span>
                <span>{selectedProject.industry}</span>
              </div>
              
              <h2 className="text-4xl font-black tracking-tighter mb-8 text-black">{selectedProject.title}</h2>
              
              <div className="space-y-8 mb-12">
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2 border-b border-neutral-100 pb-2">The Challenge</h3>
                  <p className="text-neutral-600 font-medium leading-relaxed">{selectedProject.challenge}</p>
                </div>
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2 border-b border-neutral-100 pb-2">Our Solution</h3>
                  <p className="text-neutral-600 font-medium leading-relaxed">{selectedProject.solution}</p>
                </div>
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2 border-b border-neutral-100 pb-2">The Outcome</h3>
                  <p className="text-neutral-600 font-medium leading-relaxed">{selectedProject.outcome}</p>
                </div>
              </div>

              {selectedProject.metrics.length > 0 && (
                <div className="grid grid-cols-2 gap-6 bg-neutral-50 p-6 rounded-2xl mb-12 border border-neutral-200">
                  {selectedProject.metrics.map((m, i) => (
                    <div key={`modal-metric-${i}`}>
                      <div className="text-2xl font-black tracking-tighter text-black">{m.value}</div>
                      <div className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold mt-1">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}

              <Link 
                to="/book"
                className="w-full block text-center px-8 py-5 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#ff6600] transition-colors duration-300"
              >
                Start A Similar Project
              </Link>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}