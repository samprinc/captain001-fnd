import { Link, useRouterState, useNavigate} from "@tanstack/react-router";
import { useEffect, useState, useCallback, useRef } from "react";

// Main Nav Links
const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/insights", label: "Insights" },
];

// 1. Add this interface
interface MegaItem {
  label: string;
  to: string;
  hash?: string;
  isScroll?: boolean;
}

// 2. Update the MEGA array to use the interface
const MEGA: { title: string; items: MegaItem[] }[] = [
  {
    title: "Studio",
    items: [
      { label: "About Captain 001", to: "/about" },
      { label: "Founder  Stephen Ndemo Jr.", to: "/about" },
      { label: "Our Portfolio", to: "/gallery" },
      { label: "Contact Us", to: "/about" },
    ],
  },
  {
    title: "Capabilities",
    items: [
      { label: "Cinematic Production", to: "/services", hash: "service-production" },
      { label: "Branding & Print", to: "/services", hash: "service-branding" },
      { label: "Digital & Consultancy", to: "/services", hash: "service-digital" },
      { label: "View All Services", to: "/services" },
    ],
  },
  {
    title: "Editorial",
    items: [
      { label: "Latest Insights", to: "/insights" },
      { label: "The Magazine", to: "/insights" },
      { label: "Field Notes", to: "/insights" },
      { label: "Subscribe", to: "", isScroll: true },
    ],
  },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const headerRef = useRef<HTMLElement>(null);

  // 1. Premium Scroll Physics (Optimized)
  const onScroll = useCallback(() => setScrolled(window.scrollY > 20), []);
  
  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  // 2. Route Change Cleanup
  useEffect(() => {
    setMoreOpen(false);
    setSearchOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  // 3. Accessibility & UX: Escape Key & Click Outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMoreOpen(false);
        setMobileOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
        setSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Helper to scroll to footer for the Subscribe button
  const scrollToFooter = () => {
    setMoreOpen(false);
    setMobileOpen(false); // Close mobile menu too
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // This navigates to the insights page with your search term as a query param
      navigate({ 
        to: "/insights", 
        search: { search: searchQuery } 
      });
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          scrolled || moreOpen || searchOpen || mobileOpen
            ? "bg-white/95 backdrop-blur-xl border-b border-black/5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.03)]"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto max-w-[90rem] px-6 sm:px-12">
          <div className="flex items-center justify-between gap-8">
            
            {/* BRANDING */}
            <Link to="/" className="flex flex-col gap-1 group z-50 relative" onClick={() => setMobileOpen(false)}>
              <span className="text-xl font-black tracking-tighter uppercase text-black leading-none group-hover:text-neutral-600 transition-colors">
                Captain 001
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-500 font-medium hidden sm:block">
                Media • Strategy • Storytelling
              </span>
            </Link>

            {/* NAVIGATION: Tablet/Desktop */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV.map((n) => {
                const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    className={`relative py-2 text-sm font-semibold transition-colors duration-300 group ${
                      active ? "text-black" : "text-neutral-500 hover:text-black"
                    }`}
                  >
                    {n.label}
                    <span className={`absolute bottom-0 left-0 h-[2px] bg-black transition-all duration-300 ease-out ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
                  </Link>
                );
              })}
              
              <button
                onClick={() => { setMoreOpen(!moreOpen); setSearchOpen(false); }}
                className={`relative py-2 text-sm font-semibold transition-colors duration-300 flex items-center gap-2 group ${
                  moreOpen ? "text-black" : "text-neutral-500 hover:text-black"
                }`}
                aria-expanded={moreOpen}
              >
                Explore
                <i className={`fa-solid fa-chevron-down text-[10px] transition-transform duration-300 ${moreOpen ? "rotate-180" : ""}`} />
                <span className={`absolute bottom-0 left-0 h-[2px] bg-black transition-all duration-300 ease-out ${moreOpen ? "w-full" : "w-0 group-hover:w-full"}`} />
              </button>
            </nav>

            {/* GLOBAL ACTIONS */}
            <div className="flex items-center gap-2 z-50">
              <button
                aria-label="Search"
                onClick={() => { setSearchOpen(!searchOpen); setMoreOpen(false); setMobileOpen(false); }}
                className="h-11 w-11 grid place-items-center rounded-full text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors"
              >
                <i className={`fa-solid ${searchOpen ? "fa-xmark" : "fa-magnifying-glass"} text-sm`} />
              </button>
              
              <Link
                to="/services"
                className="hidden sm:inline-flex items-center gap-2 px-6 h-11 rounded-full bg-black text-white text-xs font-bold shadow-lg shadow-black/20 hover:shadow-black/40 hover:-translate-y-0.5 transition-all duration-300 group"
              >
                Start Your Project
                <i className="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Mobile Hamburger */}
              <button
                aria-label="Toggle Menu"
                aria-expanded={mobileOpen}
                onClick={() => { setMobileOpen(!mobileOpen); setSearchOpen(false); }}
                className="md:hidden h-11 w-11 grid place-items-center text-black"
              >
                <div className="w-5 h-4 flex flex-col justify-between overflow-hidden">
                  <span className={`w-full h-[2px] bg-black transition-all duration-300 ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
                  <span className={`w-full h-[2px] bg-black transition-all duration-300 ${mobileOpen ? "opacity-0 translate-x-4" : ""}`} />
                  <span className={`w-full h-[2px] bg-black transition-all duration-300 ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Search Palette */}
    {searchOpen && (
      <div className="absolute left-0 w-full top-full pt-4 px-6 animate-in slide-in-from-top-2 fade-in duration-300">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white shadow-2xl border border-neutral-100 overflow-hidden">
          {/* Wrapped in a form to handle the Enter key */}
          <form onSubmit={handleSearch} className="flex items-center gap-4 px-6 py-5 border-b border-neutral-100">
            <i className="fa-solid fa-magnifying-glass text-neutral-400" />
            <input
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, insights, capabilities..."
              className="flex-1 bg-transparent outline-none text-base sm:text-lg font-medium text-black placeholder:text-neutral-400"
            />
          </form>
        </div>
      </div>
    )}

        {/* Mega Menu (Desktop Only) */}
        {moreOpen && (
          <div className="hidden md:block absolute left-0 w-full top-full pt-4 animate-in slide-in-from-top-2 fade-in duration-300 shadow-2xl pb-6">
            <div className="mx-auto max-w-[90rem] px-12">
              <div className="rounded-2xl bg-white border border-neutral-100 p-8 grid grid-cols-12 gap-8 shadow-xl">
                <div className="col-span-4 bg-neutral-50 rounded-xl p-8">
                  <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-black text-lg mb-6">C</div>
                  <h3 className="text-xl font-black tracking-tight mb-2">We build brands that move culture.</h3>
                  <p className="text-sm text-neutral-500">Nairobi-based studio, global impact. We bridge the gap between creative strategy and commercial performance.</p>
                </div>
                <div className="col-span-8 grid grid-cols-3 gap-8">
                  {MEGA.map((col) => (
                    <div key={col.title}>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-6">{col.title}</div>
                      <ul className="space-y-4">
                        {col.items.map((item) => (
                          <li key={item.label}>
                            {item.isScroll ? (
                              <button 
                                onClick={scrollToFooter}
                                className="text-sm font-semibold text-neutral-600 hover:text-[#ff6600] transition-colors"
                              >
                                {item.label}
                              </button>
                            ) : (
                              <Link 
                                to={item.to} 
                                hash={item.hash}
                                onClick={() => setMoreOpen(false)}
                                className="text-sm font-semibold text-neutral-600 hover:text-[#ff6600] transition-colors"
                              >
                                {item.label}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Takeover (Responsive Redesign) */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white pt-24 pb-8 flex flex-col animate-in fade-in duration-300 overflow-y-auto">
          <div className="px-6 flex-1 flex flex-col gap-8 pb-12">
            
            {/* Main Links */}
            <div className="flex flex-col gap-6 pt-4">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setMobileOpen(false)}
                  className="text-4xl font-black tracking-tighter text-black hover:text-[#ff6600] transition-colors"
                >
                  {n.label}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-neutral-100" />

            {/* Explore Section (Mobile Mega Menu) */}
            <div className="flex flex-col gap-8">
              {MEGA.map((col) => (
                <div key={col.title} className="flex flex-col gap-4">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#ff6600]">
                    {col.title}
                  </div>
                  <ul className="space-y-4 pl-2 border-l border-neutral-100">
                    {col.items.map((item) => (
                      <li key={item.label}>
                        {item.isScroll ? (
                          <button 
                            onClick={scrollToFooter}
                            className="text-xl font-bold tracking-tight text-neutral-600 hover:text-black"
                          >
                            {item.label}
                          </button>
                        ) : (
                          <Link 
                            to={item.to} 
                            hash={item.hash}
                            onClick={() => setMobileOpen(false)}
                            className="text-xl font-bold tracking-tight text-neutral-600 hover:text-black"
                          >
                            {item.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          {/* Sticky CTA Bottom */}
          <div className="px-6 pt-6 bg-white/95 backdrop-blur-md border-t border-neutral-100 mt-auto shrink-0 sticky bottom-0">
            <Link 
              to="/services" 
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-full bg-black text-white text-base font-bold"
            >
              Start Your Project
              <i className="fa-solid fa-arrow-right text-xs" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}