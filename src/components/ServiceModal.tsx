import { useEffect } from "react";
import type { Service } from "@/lib/agency-data";

export function ServiceModal({
  service,
  onClose,
}: {
  service: Service | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!service) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-3xl bg-white rounded-t-[32px] sm:rounded-[32px] overflow-hidden shadow-2xl max-h-[92vh] flex flex-col">
        <div className="relative h-56 sm:h-72 overflow-hidden">
          <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-5 right-5 h-11 w-11 grid place-items-center rounded-full bg-white/90 backdrop-blur text-gray-900 hover:bg-white"
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark" />
          </button>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-[11px] uppercase tracking-[0.18em] mb-3">
              <i className={service.icon} />
              {service.tagline}
            </div>
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight">{service.title}</h3>
          </div>
        </div>

        <div className="p-8 overflow-y-auto">
          <p className="text-gray-700 text-lg leading-relaxed">{service.description}</p>
          <div className="mt-8">
            <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4">
              Deliverables
            </div>
            <ul className="grid sm:grid-cols-2 gap-3">
              {service.deliverables.map((d) => (
                <li
                  key={d}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100"
                >
                  <span className="mt-0.5 h-5 w-5 grid place-items-center rounded-full bg-gray-900 text-white text-[10px]">
                    <i className="fa-solid fa-check" />
                  </span>
                  <span className="text-sm font-medium text-gray-900">{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="#"
              className="flex-1 text-center px-6 py-4 rounded-full bg-gray-900 text-white font-semibold hover:bg-black"
            >
              Book a Discovery Call
            </a>
            <button
              onClick={onClose}
              className="px-6 py-4 rounded-full border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
