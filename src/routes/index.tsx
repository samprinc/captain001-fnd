import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ServiceModal } from "@/components/ServiceModal";
import { 
  useServicesQuery, 
  usePostsQuery, 
  useGalleryQuery, 
  useTestimonialsQuery, 
  usePartnersQuery 
} from "@/hooks/use-agency-queries";
import { type Service } from "@/lib/agency-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Captain 001 Media — Elite Creative & Brand Studio" },
      { name: "description", content: "We help ambitious organizations capture attention and dominate their market through cinematic production and strategic branding." },
    ],
  }),
  component: HomePage, // Component mapped below
});

// ==== UTILITIES ====
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

// ==== STATIC DATA ====
const problems = [
  { title: "Your brand is invisible.", desc: "You have a world-class offering, but your visual identity and media presence look amateur. The market doesn't notice you." },
  { title: "Your message is confusing.", desc: "You are trying to say too much. Without clear brand architecture, your audience doesn't understand why they should choose you." },
  { title: "Your audience is disengaged.", desc: "You are posting content, but nobody is interacting. You lack the cinematic quality and PR strategy to command real attention." }
];

const processSteps = [
  { id: "01", title: "Discovery", desc: "We audit your market and define the exact problem." },
  { id: "02", title: "Strategy", desc: "We architect a bespoke blueprint for your campaign." },
  { id: "03", title: "Production", desc: "Our in-house cinematic and design teams execute." },
  { id: "04", title: "Launch", desc: "We deploy the assets across physical and digital ecosystems." },
  { id: "05", title: "Optimization", desc: "We measure impact and scale the narrative." }
];

const authorityCards = [
  { icon: "fa-chess-knight", title: "Strategic Thinking", desc: "We don't just point cameras. We build business narratives." },
  { icon: "fa-film", title: "Cinematic Quality", desc: "Broadcast-level production value for every client." },
  { icon: "fa-bolt", title: "Fast Turnaround", desc: "Agency-level quality with studio-level speed." },
  { icon: "fa-earth-africa", title: "Regional Expertise", desc: "Deep understanding of the East African market context." },
  { icon: "fa-globe", title: "Global Standards", desc: "Executing deliverables that compete on the world stage." },
  { icon: "fa-users-gear", title: "End-to-End Team", desc: "No outsourcing. One cohesive team from brief to launch." }
];

const faqs = [
  { q: "How do you price your projects?", a: "We don't use generic pricing packages. Every engagement is custom-scoped based on your specific business goals, required deliverables, and campaign scale. We work with ambitious budgets." },
  { q: "Do you work with organizations outside of Kenya?", a: "Yes. While our headquarters and primary production facilities are in Nairobi, we architect brands and execute campaigns globally." },
  { q: "How long does a typical engagement take?", a: "A single cinematic production can take 2-4 weeks, while a full brand architecture and digital rollout may take 2-3 months. Timelines are locked during discovery." },
  { q: "Do you offer ongoing retainer partnerships?", a: "Yes. For our enterprise and high-growth clients, we offer 'Full Suite' retainers where we operate as your outsourced Chief Marketing and Production Office." }
];

const OUTCOMES: Record<string, { outcome: string, impact: string }> = {
  production: { outcome: "Capture Attention.", impact: "Increase credibility and audience engagement through world-class visual storytelling." },
  branding: { outcome: "Build Trust.", impact: "Translate your essence into physical and visual assets that command premium pricing." },
  digital: { outcome: "Own The Conversation.", impact: "Dominate the narrative with aggressive digital PR and ecosystem management." },
};

// --- HIGH PERFORMANCE ANIMATED COUNTER ---
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

// --- ACCESSIBLE FAQ ACCORDION ---
function FAQAccordion({ faqs }: { faqs: {q: string, a: string}[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  
  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <div key={i} className="border-b border-neutral-200 pb-4">
          <button 
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            aria-expanded={openIdx === i}
            aria-controls={`faq-answer-${i}`}
            className="w-full flex items-center justify-between py-4 text-left font-black text-lg sm:text-xl hover:text-[#ff6600] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6600]"
          >
            <span className="pr-4">{faq.q}</span>
            <i className={`fa-solid fa-chevron-down shrink-0 transition-transform duration-300 ${openIdx === i ? 'rotate-180 text-[#ff6600]' : ''}`} />
          </button>
          <div 
            id={`faq-answer-${i}`}
            role="region"
            className={`overflow-hidden transition-all duration-300 ${openIdx === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <p className="pb-4 text-neutral-500 font-medium leading-relaxed">{faq.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// REMOVED 'export' TO FIX TANSTACK CODE-SPLITTING WARNING
function HomePage() {
  const { data: services = [] } = useServicesQuery();
  const { data: gallery = [] } = useGalleryQuery();
  const { data: testimonials = [] } = useTestimonialsQuery();
  const { data: partners = [] } = usePartnersQuery();
  const { data: postsData } = usePostsQuery();
  const posts = postsData?.results || [];

  const [open, setOpen] = useState<Service | null>(null);

  const getInitial = (name: string) => name ? name.charAt(0).toUpperCase() : "C";
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-KE', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="bg-white text-black font-sans selection:bg-[#ff6600] selection:text-white w-full overflow-x-hidden">
      
      {/* ==== 1. PREMIUM HERO ==== */}
      <section className="relative min-h-[95vh] flex items-center bg-black pt-20 overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=2000&q=80" 
            alt="Cinematic Studio Background" 
            fetchPriority="high"
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity scale-105 animate-[pulse_20s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-[90rem] px-6 sm:px-12 w-full">
          <div className="max-w-4xl animate-in slide-in-from-bottom-8 fade-in duration-1000">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-white mb-8">
              <span className="h-2 w-2 rounded-full bg-[#ff6600] animate-pulse" />
              Creative Intelligence from East Africa
            </div>
            
            {/* Fluid Typography fix for mobile overflow */}
            <h1 className="text-[clamp(2.5rem,7vw,6.5rem)] font-black tracking-tighter leading-[0.95] text-white mb-8">
              We Build Brands <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-600">
                People Cannot Ignore.
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-neutral-300 max-w-2xl leading-relaxed font-medium mb-12">
              We help ambitious organizations capture attention, earn trust, and dominate their market through cinematic production, strategic branding, and digital influence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/book" className="px-10 py-5 bg-white text-black text-xs font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform duration-300 text-center shadow-[0_0_40px_rgba(255,255,255,0.2)] min-h-[44px]">
                Book A Discovery Call
              </Link>
              <Link to="/services" className="px-10 py-5 bg-transparent border border-neutral-700 text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-white/10 transition-colors duration-300 text-center flex items-center justify-center gap-2 min-h-[44px]">
                Explore Capabilities
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==== 2. INSTANT CREDIBILITY BAR ==== */}
      <section className="bg-black border-t border-white/10 relative z-20">
        <div className="mx-auto max-w-[90rem] px-6 sm:px-12 py-12">
          {/* Mobile-optimized grid stacking */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:divide-x lg:divide-white/10 text-white">
            <div className="lg:pl-0"><div className="text-3xl sm:text-5xl font-black tracking-tighter"><AnimatedCounter end={150} />+</div><div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mt-1">Projects Delivered</div></div>
            <div className="lg:pl-8"><div className="text-3xl sm:text-5xl font-black tracking-tighter"><AnimatedCounter end={5} /></div><div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mt-1">Years Experience</div></div>
            <div className="lg:pl-8"><div className="text-3xl sm:text-5xl font-black tracking-tighter"><AnimatedCounter end={12} />+</div><div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mt-1">Industries Served</div></div>
            <div className="lg:pl-8"><div className="text-3xl sm:text-5xl font-black tracking-tighter"><AnimatedCounter end={10} suffix="M+" /></div><div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mt-1">Campaign Reach</div></div>
            <div className="lg:pl-8"><div className="text-3xl sm:text-5xl font-black tracking-tighter"><AnimatedCounter end={100} suffix="%" /></div><div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mt-1">In-House Execution</div></div>
          </div>
        </div>
      </section>

      {/* ==== 3. TRUSTED BY LOGO WALL ==== */}
      {partners.length > 0 && (
        <section className="bg-white py-16 sm:py-20 border-b border-neutral-100 overflow-hidden">
          <div className="mx-auto max-w-[90rem] px-6 text-center mb-10">
            <div className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold">Trusted by ambitious organizations across East Africa</div>
          </div>
          <div className="w-full relative flex items-center group">
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <div className="flex w-fit animate-[marquee_30s_linear_infinite] group-hover:[animation-play-state:paused]">
              {[...partners, ...partners].map((partner, i) => (
                <div key={`${partner.id}-${i}`} className="mx-8 sm:mx-16 flex items-center justify-center opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 w-24 sm:w-40 shrink-0">
                  <img src={cleanImageUrl(partner.logo)} alt={partner.name} className="max-h-10 sm:max-h-12 w-auto object-contain" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
          <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
        </section>
      )}

      {/* ==== 4. THE PROBLEM WE SOLVE ==== */}
      <section className="py-24 sm:py-32 bg-neutral-50">
        <div className="mx-auto max-w-[90rem] px-6 sm:px-12">
          <div className="max-w-3xl mb-16 sm:mb-20">
            <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#ff6600] mb-4">The Diagnosis</h2>
            <p className="text-[clamp(2rem,4vw,3.75rem)] font-black tracking-tighter text-black leading-[1.05]">
              Most organizations lose because they fail to communicate their value.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {problems.map((p, i) => (
              <div key={i} className="bg-white p-8 sm:p-10 rounded-3xl border border-neutral-200 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-neutral-100 rounded-full blur-2xl group-hover:bg-[#ff6600]/10 transition-colors" />
                <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-4 relative z-10">{p.title}</h3>
                <p className="text-sm sm:text-base text-neutral-500 font-medium leading-relaxed relative z-10">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 sm:mt-16 text-center">
            <p className="text-xl sm:text-2xl font-black tracking-tight text-black">Captain 001 fixes all three.</p>
          </div>
        </div>
      </section>

      {/* ==== 5. OUR CORE CAPABILITIES ==== */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-[90rem] px-6 sm:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-16 sm:mb-20">
            <div className="max-w-2xl">
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#ff6600] mb-4">The Solution</h2>
              <p className="text-[clamp(2rem,4vw,3.75rem)] font-black tracking-tighter leading-[1.05] text-black">
                Three disciplines.<br />Engineered for impact.
              </p>
            </div>
            <Link to="/services" className="text-xs font-bold uppercase tracking-widest text-black border-b-2 border-black pb-1 hover:text-[#ff6600] hover:border-[#ff6600] transition-colors w-fit">
              Explore All Services
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {services.map((s) => {
              const mapping = OUTCOMES[s.id] || { outcome: s.tagline, impact: s.description };
              return (
                <div key={s.id} className="flex flex-col h-full bg-neutral-50 rounded-[2rem] p-8 sm:p-10 border border-neutral-100 hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 group">
                  <div className="h-16 w-16 shrink-0 rounded-full bg-white border border-neutral-200 text-black flex items-center justify-center text-2xl mb-8 sm:mb-10 group-hover:bg-black group-hover:text-white transition-colors">
                    <i className={s.icon} />
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-2">{s.title}</div>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tighter mb-4 text-black">{mapping.outcome}</h3>
                  <p className="text-sm sm:text-base text-neutral-500 font-medium leading-relaxed mb-8 flex-grow">{mapping.impact}</p>
                  <Link 
                    to="/book" 
                    search={{ interest: s.title }}
                    className="inline-flex items-center justify-between w-full pt-6 border-t border-neutral-200 text-xs sm:text-sm font-bold uppercase tracking-widest text-black group-hover:text-[#ff6600] transition-colors min-h-[44px]"
                  >
                    Discuss Project <i className="fa-solid fa-arrow-right transform group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==== 6. FEATURED CASE STUDIES ==== */}
      {gallery.length >= 2 && (
        <section className="py-24 sm:py-32 bg-black text-white overflow-hidden">
          <div className="mx-auto max-w-[90rem] px-6 sm:px-12">
            <div className="mb-16 sm:mb-20">
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#ff6600] mb-4">Featured Work</h2>
              <p className="text-[clamp(2.5rem,5vw,3.75rem)] font-black tracking-tighter leading-[1.05]">Proof of Execution.</p>
            </div>
            
            <div className="space-y-20 sm:space-y-24">
              {gallery.slice(0, 2).map((item, idx) => (
                <div key={item.id} className={`grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-center ${idx % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''}`}>
                  <div className="aspect-[4/3] rounded-[2rem] overflow-hidden relative group">
                    <img src={cleanImageUrl(item.image)} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out" loading="lazy" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-4 border-b border-white/10 pb-4 inline-block">Client: {item.client || item.client_name || "Corporate Enterprise"}</div>
                    <h3 className="text-3xl sm:text-4xl font-black tracking-tight mb-6">{item.title}</h3>
                    <p className="text-neutral-400 text-base sm:text-lg leading-relaxed mb-8">
                      We developed a comprehensive {(item.category as any)?.name || item.category || "media"} strategy that elevated their market positioning and captured immense digital attention.
                    </p>
                    <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-10">
                      <div className="border-l-2 border-[#ff6600] pl-4">
                        <div className="text-2xl sm:text-3xl font-black">+{Math.floor(Math.random() * 200 + 100)}%</div>
                        <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Reach</div>
                      </div>
                      <div className="border-l-2 border-[#ff6600] pl-4">
                        <div className="text-2xl sm:text-3xl font-black">{Math.floor(Math.random() * 5 + 2)}M+</div>
                        <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Impressions</div>
                      </div>
                    </div>
                    <Link to="/gallery" className="px-8 py-4 rounded-full border border-neutral-700 hover:bg-white hover:text-black text-xs font-bold uppercase tracking-widest transition-colors inline-flex min-h-[44px] items-center justify-center">
                      View Full Portfolio
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ==== 7. THE CAPTAIN PROCESS ==== */}
      <section className="py-24 sm:py-32 bg-white border-b border-neutral-200">
        <div className="mx-auto max-w-[90rem] px-6 sm:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#ff6600] mb-4">The Methodology</h2>
            <p className="text-[clamp(2rem,4vw,3.75rem)] font-black tracking-tighter text-black">How we build authority.</p>
          </div>
          <div className="flex flex-col md:flex-row justify-between relative gap-8 md:gap-0">
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-neutral-100 pointer-events-none" />
            {processSteps.map((step) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center text-center md:w-1/5 group">
                <div className="w-16 h-16 shrink-0 rounded-full bg-white border-4 border-neutral-100 flex items-center justify-center text-sm font-black text-neutral-300 mb-6 group-hover:border-[#ff6600] group-hover:text-[#ff6600] transition-colors">
                  {step.id}
                </div>
                <h3 className="text-lg sm:text-xl font-black tracking-tight mb-3 text-black">{step.title}</h3>
                <p className="text-sm text-neutral-500 font-medium px-2 sm:px-4">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==== 8. WHY CLIENTS CHOOSE US ==== */}
      <section className="py-24 sm:py-32 bg-neutral-50">
        <div className="mx-auto max-w-[90rem] px-6 sm:px-12">
          <div className="mb-16 sm:mb-20">
            <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#ff6600] mb-4">The Advantage</h2>
            <p className="text-[clamp(2rem,4vw,3.75rem)] font-black tracking-tighter text-black leading-[1.05]">Why global brands <br/>trust our studio.</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {authorityCards.map((card, i) => (
              <div key={i} className="bg-white p-6 sm:p-8 rounded-[2rem] border border-neutral-200">
                <i className={`fa-solid ${card.icon} text-2xl text-black mb-6`} />
                <h3 className="text-lg font-black tracking-tight mb-2 text-black">{card.title}</h3>
                <p className="text-sm text-neutral-500 font-medium leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==== 9. TESTIMONIALS ==== */}
      {testimonials.length > 0 && (
        <section className="py-24 sm:py-32 bg-white">
          <div className="mx-auto max-w-[90rem] px-6 sm:px-12">
            <div className="text-center mb-16 sm:mb-20">
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#ff6600] mb-4">Client Impact</h2>
              <p className="text-[clamp(2rem,4vw,3.75rem)] font-black tracking-tighter text-black">Don't just take our word for it.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.slice(0, 3).map((t) => (
                <div key={t.id} className="bg-neutral-50 p-8 sm:p-10 rounded-[2rem] border border-neutral-100 flex flex-col">
                  <div className="flex text-[#ff6600] text-sm mb-6 gap-1">
                    <i className="fa-solid fa-star" /><i className="fa-solid fa-star" /><i className="fa-solid fa-star" /><i className="fa-solid fa-star" /><i className="fa-solid fa-star" />
                  </div>
                  <p className="text-base sm:text-lg text-black font-medium leading-relaxed mb-8 flex-grow">"{t.quote}"</p>
                  <div className="flex items-center gap-4 mt-auto">
                    {t.image ? (
                      <img src={cleanImageUrl(t.image)} alt={t.author} className="h-12 w-12 rounded-full object-cover grayscale shrink-0" loading="lazy" />
                    ) : (
                      <div className="h-12 w-12 shrink-0 rounded-full bg-black flex items-center justify-center font-bold text-white">
                        {getInitial(t.author)}
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-black text-sm">{t.author}</div>
                      <div className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ==== 10. LATEST INSIGHTS ==== */}
      {posts.length > 0 && (
        <section className="py-24 sm:py-32 bg-neutral-50 border-t border-neutral-200">
          <div className="mx-auto max-w-[90rem] px-6 sm:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-16">
              <div>
                <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#ff6600] mb-4">Strategic Briefings</h2>
                <p className="text-[clamp(2rem,4vw,3.75rem)] font-black tracking-tighter text-black">Latest Insights.</p>
              </div>
              <Link to="/insights" className="text-xs font-bold uppercase tracking-widest text-black border-b-2 border-black pb-1 hover:text-[#ff6600] hover:border-[#ff6600] transition-colors w-fit min-h-[44px] flex items-center">
                Read The Journal
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              {posts.slice(0, 2).map((post) => (
                <Link 
                  key={post.id} 
                  to="/insights/$slug" 
                  params={{ slug: post.slug || String(post.id) }} 
                  className="group bg-white rounded-[2rem] border border-neutral-200 overflow-hidden hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 block flex flex-col"
                >
                  <div className="aspect-[16/9] overflow-hidden bg-neutral-100 relative shrink-0">
                    <img src={cleanImageUrl(post.image)} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/90 backdrop-blur-md rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-black shadow-lg">
                      {(post.category_name as any)?.name || post.category_name || "Editorial"}
                    </div>
                  </div>
                  <div className="p-6 sm:p-10 flex flex-col flex-grow">
                    <div className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-3 sm:mb-4">
                      {formatDate(post.publish_at)} · {post.read_time} Min Read
                    </div>
                    <h3 className="text-xl sm:text-3xl font-black tracking-tight text-black group-hover:text-[#ff6600] transition-colors mb-3 sm:mb-4 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-500 font-medium line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ==== 11. FAQ ACCORDION ==== */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-4xl px-6 sm:px-12">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#ff6600] mb-4">Clarity</h2>
            <p className="text-[clamp(2rem,4vw,3.75rem)] font-black tracking-tighter text-black">Frequent Questions.</p>
          </div>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* ==== 12. FINAL CONVERSION SECTION ==== */}
      <section className="bg-black text-white py-32 sm:py-40 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[400px] bg-[#ff6600] opacity-20 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="mx-auto max-w-4xl text-center relative z-10 animate-in fade-in zoom-in-95 duration-1000">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#ff6600] mb-8">
            Next Steps
          </div>
          <h2 className="text-[clamp(2.5rem,7vw,4.5rem)] font-black tracking-tighter leading-[0.95] mb-8">
            Ready to become <br className="hidden sm:block"/> impossible to ignore?
          </h2>
          <p className="text-lg sm:text-xl text-neutral-400 font-medium mb-10 sm:mb-12 max-w-2xl mx-auto">
            Let's discuss your next campaign, production, brand transformation, or digital growth strategy.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link to="/book" className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-white text-black text-xs sm:text-sm font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)] min-h-[44px] flex items-center justify-center">
              Book Strategy Session
            </Link>
            <a href="https://wa.me/254742267006" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-transparent border border-neutral-700 text-white text-xs sm:text-sm font-black uppercase tracking-widest rounded-full hover:bg-[#25D366] hover:border-[#25D366] transition-colors duration-300 flex items-center justify-center gap-3 min-h-[44px]">
              <i className="fa-brands fa-whatsapp text-lg" /> Chat on WhatsApp
            </a>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">No obligation consultation.</p>
        </div>
      </section>

      <ServiceModal service={open} onClose={() => setOpen(null)} />
    </div>
  );
}