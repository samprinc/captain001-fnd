import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { subscribeNewsletter } from "../lib/api"; // Adjust import path if needed

// Helper for animated metrics
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

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      await subscribeNewsletter(email);
      setStatus("success");
      setMessage("Welcome to the list.");
      setEmail("");
    } catch (error: any) {
      setStatus("error");
      if (error.status === 400 && error.data?.email) {
        setMessage("You're already on the list.");
      } else {
        setMessage("Something went wrong. Try again.");
      }
    }
  };

  return (
    <footer className="bg-black text-white font-sans selection:bg-[#ff6600] selection:text-white border-t border-white/10">
      
      <div className="mx-auto max-w-[90rem] px-6 py-24 grid md:grid-cols-2 lg:grid-cols-4 gap-16">
        
        {/* Brand */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#ff6600] text-white font-black">C</span>
            <span className="text-lg font-black tracking-tight">Captain 001.</span>
          </div>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Captain 001 Media helps ambitious organizations capture attention, build authority, and dominate conversations through cinematic production and strategic growth systems.
          </p>
        </div>

        {/* Company Nav */}
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-bold mb-8">Company</h3>
          <ul className="space-y-4 text-sm font-medium text-neutral-300">
            <li><Link to="/" className="hover:text-[#ff6600] transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-[#ff6600] transition-colors">About Us</Link></li>
            <li><Link to="/gallery" className="hover:text-[#ff6600] transition-colors">Portfolio</Link></li>
            <li><Link to="/insights" className="hover:text-[#ff6600] transition-colors">Insights</Link></li>
          </ul>
        </div>

        {/* Services Nav - FIXED TO USE HASHES */}
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-bold mb-8">Capabilities</h3>
          <ul className="space-y-4 text-sm font-medium text-neutral-300">
            <li><Link to="/services" className="hover:text-[#ff6600] transition-colors">All Services</Link></li>
            {/* Using the hash prop to scroll to the specific ID on the services page */}
            <li><Link to="/services" hash="service-production" className="hover:text-[#ff6600] transition-colors">Cinematic Production</Link></li>
            <li><Link to="/services" hash="service-branding" className="hover:text-[#ff6600] transition-colors">Branding & Print</Link></li>
            <li><Link to="/services" hash="service-digital" className="hover:text-[#ff6600] transition-colors">Digital & Consultancy</Link></li>
          </ul>
        </div>

        {/* Contact/Newsletter */}
        <div className="space-y-6">
          <h3 className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-bold mb-8">Get In Touch</h3>
          <a href="mailto:stephenndemo55@gmail.com" className="block text-sm font-semibold hover:text-[#ff6600] break-all">stephenndemo55@gmail.com</a>
          <div className="text-sm text-neutral-400">Nairobi, Kenya  Global Commissions</div>
          
          <form className="relative mt-4" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading" || status === "success"}
              placeholder="Subscribe to field notes" 
              className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#ff6600] disabled:opacity-50" 
              required
            />
            <button 
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="absolute right-2 top-2 bg-[#ff6600] text-white px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black disabled:opacity-50 transition-colors"
            >
              {status === "loading" ? "..." : status === "success" ? "Done" : "Join"}
            </button>
          </form>
          {message && (
            <p className={`text-xs ${status === "success" ? "text-green-500" : "text-[#ff6600]"}`}>
              {message}
            </p>
          )}
        </div>
      </div>

      {/* LEGAL & SOCIAL */}
      <div className="mx-auto max-w-[90rem] px-6 py-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 text-[11px] font-bold text-neutral-500 uppercase tracking-widest">
        <div>© {new Date().getFullYear()} Captain 001 Media. Built in Nairobi.</div>
        
        <div className="flex gap-6 items-center">
          {/* Real profiles from Stephen's Brand */}
          <a href="https://www.facebook.com/profile.php?id=100063722293969" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff6600] transition-colors">
            <i className="fa-brands fa-facebook-f text-lg" />
          </a>
          <a href="https://www.tiktok.com/@ndemojrlive" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff6600] transition-colors">
            <i className="fa-brands fa-tiktok text-lg" />
          </a>
          <a href="https://www.youtube.com/@ndemojrlive1638" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff6600] transition-colors">
            <i className="fa-brands fa-youtube text-lg" />
          </a>
          
          <span className="h-4 w-[1px] bg-neutral-800 mx-2" />
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
}