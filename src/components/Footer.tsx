import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-black text-gray-300">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-6">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-black font-black">
                C
              </span>
              <span className="text-white font-black tracking-tight">Captain 001 Media</span>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              A creative media studio building cinematic brands, editorial press, and the
              quiet kind of work that outlasts the feed.
            </p>
            <div className="flex gap-3 mt-8">
              {["instagram", "x-twitter", "linkedin", "youtube"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="h-11 w-11 grid place-items-center rounded-full border border-gray-800 hover:bg-white hover:text-black transition-colors"
                >
                  <i className={`fa-brands fa-${s} text-sm`} />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4">Studio</div>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/services" className="hover:text-white">Services</Link></li>
              <li><Link to="/insights" className="hover:text-white">Insights</Link></li>
              <li><a href="#" className="hover:text-white">Press Kit</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4">Contact</div>
            <p className="text-white font-semibold text-lg">studio@captain001.media</p>
            <p className="text-gray-400 mt-2">Nairobi, Kenya — Worldwide commissions</p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-gray-500">
          <div>© {new Date().getFullYear()} Captain 001 Media. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Colophon</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
