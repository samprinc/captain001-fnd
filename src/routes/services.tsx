import { createFileRoute } from "@tanstack/react-router";
import { useServicesQuery } from "@/hooks/use-agency-queries";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Captain 001 Media" },
      {
        name: "description",
        content:
          "Cinematic production, brand architecture, and digital PR. The full studio capability set.",
      },
      { property: "og:title", content: "Services — Captain 001 Media" },
      {
        property: "og:description",
        content: "Cinematic production, brand architecture, and digital PR.",
      },
    ],
  }),
  component: ServicesPage,
});

const workflow = [
  {
    step: "01",
    title: "Discovery",
    body: "A two-week immersion. We audit the brand, the market, and the founder. Strategy on paper before a single frame is shot.",
  },
  {
    step: "02",
    title: "Execution",
    body: "Production sprints with cinema-grade crews. Design systems built in parallel. Weekly screenings, no ghosting.",
  },
  {
    step: "03",
    title: "Delivery",
    body: "Master files, brand books, and a press rollout plan. We hand off the keys — and the headlines.",
  },
];

function ServicesPage() {
  const { data: services = [] } = useServicesQuery();

  return (
    <div className="bg-white text-gray-900">
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pt-16 sm:pt-24 pb-20">
        <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-6">
          The Capabilities
        </div>
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] max-w-5xl">
          Three disciplines.{" "}
          <span className="text-gray-400">Engineered to compound.</span>
        </h1>
        <p className="mt-8 text-xl text-gray-600 max-w-2xl">
          Every engagement runs on the same studio operating system: strategy, production,
          and press — shipped as one body of work.
        </p>
      </section>

      {/* ALTERNATING SERVICES */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 space-y-24 sm:space-y-32 pb-32">
        {services.map((s, i) => (
          <div
            key={s.id}
            className={`grid lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
              i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div className="lg:col-span-6">
              <div className="aspect-[4/5] rounded-[32px] overflow-hidden bg-gray-100">
                <img src={s.image} alt={s.title} className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-[11px] uppercase tracking-[0.2em] text-gray-700 mb-6">
                <i className={s.icon} />
                {`0${i + 1} · ${s.tagline}`}
              </div>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.02]">
                {s.title}
              </h2>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">{s.description}</p>

              <ul className="mt-8 grid sm:grid-cols-2 gap-3">
                {s.deliverables.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100"
                  >
                    <span className="mt-0.5 h-5 w-5 grid place-items-center rounded-full bg-gray-900 text-white text-[10px] shrink-0">
                      <i className="fa-solid fa-check" />
                    </span>
                    <span className="text-sm font-medium text-gray-900">{d}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#"
                  className="inline-flex items-center gap-3 px-7 h-14 rounded-full bg-gray-900 text-white font-semibold hover:bg-black"
                >
                  Book a Discovery Call
                  <i className="fa-solid fa-arrow-right text-xs" />
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-3 px-7 h-14 rounded-full border border-gray-300 text-gray-900 font-semibold hover:bg-gray-50"
                >
                  Download Capabilities Deck
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* WORKFLOW */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-24">
          <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4">
            The Workflow
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight max-w-3xl">
            Three steps. <span className="text-gray-400">No theater.</span>
          </h2>

          <div className="relative mt-16">
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-px bg-gray-300" />
            <div className="grid md:grid-cols-3 gap-10 relative">
              {workflow.map((w) => (
                <div key={w.step} className="text-center md:text-left">
                  <div className="mx-auto md:mx-0 h-16 w-16 rounded-2xl bg-gray-900 text-white grid place-items-center font-black text-lg relative z-10">
                    {w.step}
                  </div>
                  <h3 className="mt-6 text-2xl font-black tracking-tight">{w.title}</h3>
                  <p className="mt-3 text-gray-600 leading-relaxed">{w.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
