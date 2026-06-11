import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ServiceModal } from "@/components/ServiceModal";
import { useServicesQuery } from "@/hooks/use-agency-queries";
import { portfolio, type Service } from "@/lib/agency-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Captain 001 Media — Cinematic Brand & Editorial Studio" },
      {
        name: "description",
        content:
          "A high-end creative media studio. Cinematic production, brand architecture, and digital PR. Founded by Stephen Ndemo Jr.",
      },
      { property: "og:title", content: "Captain 001 Media" },
      {
        property: "og:description",
        content: "Cinematic production, brand architecture, and digital PR.",
      },
    ],
  }),
  component: HomePage,
});

const stats = [
  { value: "50+", label: "Brands Built" },
  { value: "4K", label: "Cinematic Spec" },
  { value: "12", label: "Tier-1 Features" },
  { value: "9", label: "Countries Shot" },
];

function HomePage() {
  const { data: services = [] } = useServicesQuery();
  const [open, setOpen] = useState<Service | null>(null);

  return (
    <div className="bg-white text-gray-900">
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pt-12 sm:pt-20 pb-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 text-white text-[11px] uppercase tracking-[0.2em] mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              Studio Issue 014 · Now Open
            </div>
            <h1 className="text-[44px] sm:text-7xl lg:text-[88px] font-black tracking-tight leading-[0.95]">
              A media studio for{" "}
              <span className="bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent">
                brands worth filming.
              </span>
            </h1>
            <p className="mt-8 text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed">
              Captain 001 builds cinematic identities, earns the press, and publishes the
              editorial work that turns founders into household names.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/services"
                className="inline-flex items-center gap-3 px-7 h-14 rounded-full bg-gray-900 text-white font-semibold hover:bg-black transition-colors"
              >
                Start a Project
                <i className="fa-solid fa-arrow-right text-xs" />
              </Link>
              <Link
                to="/insights"
                className="inline-flex items-center gap-3 px-7 h-14 rounded-full border border-gray-300 text-gray-900 font-semibold hover:bg-gray-50 transition-colors"
              >
                Read the Magazine
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden bg-gray-100">
              <img
                src="https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="Cinematic studio still"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-white/85 backdrop-blur text-[11px] uppercase tracking-[0.2em] font-semibold">
                Cover · Vol. 014
              </div>
            </div>
          </div>
        </div>

        {/* AUTHORITY STATS overlap */}
        <div className="relative -mt-12 sm:-mt-16">
          <div className="rounded-3xl bg-black text-white p-8 sm:p-10 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-800">
            {stats.map((s, i) => (
              <div key={s.label} className={`px-2 sm:px-6 ${i < 2 ? "pb-6 md:pb-0" : "pt-6 md:pt-0"}`}>
                <div className="text-4xl sm:text-5xl font-black tracking-tight">{s.value}</div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-gray-400">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE SERVICES */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-24 border-t border-gray-100">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4">
              Core Capabilities
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight">
              Three disciplines.
              <br />
              <span className="text-gray-400">One studio.</span>
            </h2>
          </div>
          <Link
            to="/services"
            className="text-sm font-semibold text-gray-900 hover:text-gray-500 inline-flex items-center gap-2"
          >
            Full capabilities <i className="fa-solid fa-arrow-right text-[10px]" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <button
              key={s.id}
              onClick={() => setOpen(s)}
              className="text-left group rounded-3xl border border-gray-200 bg-white p-8 hover:-translate-y-2 hover:shadow-2xl hover:border-gray-900 transition-all duration-300"
            >
              <div className="h-14 w-14 rounded-2xl bg-gray-900 text-white grid place-items-center text-lg mb-6 group-hover:bg-black">
                <i className={s.icon} />
              </div>
              <h3 className="text-2xl font-black tracking-tight mb-2">{s.title}</h3>
              <p className="text-gray-600 leading-relaxed">{s.tagline}</p>
              <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-900">
                See deliverables
                <i className="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-24 border-t border-gray-100">
        <div className="mb-14">
          <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4">
            Selected Visuals
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight">
            Work that prints.
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {portfolio.map((src, i) => (
            <div
              key={src}
              className={`relative overflow-hidden rounded-3xl bg-gray-100 ${
                i % 5 === 0 ? "aspect-[3/4]" : "aspect-square"
              }`}
            >
              <img
                src={src}
                alt={`Portfolio still ${i + 1}`}
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-32 border-t border-gray-100">
        <div className="max-w-5xl">
          <i className="fa-solid fa-quote-left text-5xl text-gray-200 mb-8" />
          <p className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-gray-900">
            “Captain 001 didn't just rebrand us. They put us on the cover.
            <span className="text-gray-400"> Six months later, the entire category was copying the work.”</span>
          </p>
          <div className="mt-10 flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-gray-200 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=200"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="font-semibold">Amani Otieno</div>
              <div className="text-sm text-gray-500">Founder, Northbound Coffee Co.</div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-24">
        <div className="rounded-[32px] bg-black text-white p-10 sm:p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-4">
                The Magazine · Monthly
              </div>
              <h3 className="text-4xl sm:text-5xl font-black tracking-tight">
                A quiet dispatch from the studio.
              </h3>
              <p className="mt-4 text-gray-400 text-lg max-w-md">
                One letter a month. Field notes, unreleased stills, and the occasional
                cover story before it ships.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="you@studio.com"
                className="flex-1 px-6 py-5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-gray-500 outline-none focus:bg-white/15"
              />
              <button className="px-7 py-5 rounded-full bg-white text-black font-semibold hover:bg-gray-100">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      <ServiceModal service={open} onClose={() => setOpen(null)} />
    </div>
  );
}
