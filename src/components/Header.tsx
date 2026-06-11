import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/insights", label: "Insights" },
];

const MEGA = [
  {
    title: "Studio",
    items: ["About Captain 001", "Founder — Stephen Ndemo Jr.", "Press Kit", "Careers"],
  },
  {
    title: "Capabilities",
    items: ["Cinematic Production", "Brand Architecture", "Digital PR", "Editorial Publishing"],
  },
  {
    title: "Editorial",
    items: ["The Magazine", "Newsletter", "Field Notes", "Subscribe"],
  },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMoreOpen(false);
    setSearchOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-gray-200"
          : "bg-white border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex h-20 items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-black text-white font-black tracking-tight">
              C
            </span>
            <span className="hidden sm:flex flex-col leading-none">
              <span className="text-[15px] font-black tracking-tight text-gray-900">
                Captain 001
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-gray-500">
                Media Studio
              </span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => {
              const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    active
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
            <button
              onClick={() => {
                setMoreOpen((v) => !v);
                setSearchOpen(false);
              }}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors flex items-center gap-2 ${
                moreOpen ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              More
              <i className={`fa-solid fa-chevron-down text-[10px] transition-transform ${moreOpen ? "rotate-180" : ""}`} />
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <button
              aria-label="Search"
              onClick={() => {
                setSearchOpen((v) => !v);
                setMoreOpen(false);
              }}
              className="h-11 w-11 grid place-items-center rounded-full border border-gray-200 hover:bg-gray-100 transition-colors text-gray-700"
            >
              <i className={`fa-solid ${searchOpen ? "fa-xmark" : "fa-magnifying-glass"} text-sm`} />
            </button>
            <Link
              to="/services"
              className="hidden sm:inline-flex items-center gap-2 px-5 h-11 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-black transition-colors"
            >
              Book a Call
              <i className="fa-solid fa-arrow-right text-[10px]" />
            </Link>
            <button
              aria-label="Menu"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden h-11 w-11 grid place-items-center rounded-full border border-gray-200 text-gray-700"
            >
              <i className={`fa-solid ${mobileOpen ? "fa-xmark" : "fa-bars"} text-sm`} />
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="pb-6">
            <div className="flex items-center gap-3 rounded-3xl border border-gray-200 bg-gray-50 px-5 py-4">
              <i className="fa-solid fa-magnifying-glass text-gray-500" />
              <input
                autoFocus
                placeholder="Search the studio — projects, essays, press…"
                className="flex-1 bg-transparent outline-none text-base text-gray-900 placeholder:text-gray-500"
              />
              <kbd className="hidden sm:inline-flex text-[10px] uppercase tracking-widest text-gray-500 border border-gray-300 rounded px-2 py-1">
                Esc
              </kbd>
            </div>
          </div>
        )}

        {moreOpen && (
          <div className="hidden md:block pb-8">
            <div className="rounded-3xl bg-gray-50 border border-gray-200 p-8 grid grid-cols-3 gap-8">
              {MEGA.map((col) => (
                <div key={col.title}>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4">
                    {col.title}
                  </div>
                  <ul className="space-y-3">
                    {col.items.map((it) => (
                      <li key={it}>
                        <a
                          href="#"
                          className="text-[15px] font-medium text-gray-900 hover:text-gray-500 transition-colors flex items-center gap-2 group"
                        >
                          {it}
                          <i className="fa-solid fa-arrow-right text-[10px] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {mobileOpen && (
          <div className="md:hidden pb-6 space-y-2">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="block px-5 py-4 rounded-2xl bg-gray-50 text-gray-900 font-semibold"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/services"
              className="block text-center px-5 py-4 rounded-2xl bg-gray-900 text-white font-semibold"
            >
              Book a Call
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
