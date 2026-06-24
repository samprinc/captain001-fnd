import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Capabilities & Outcomes — Captain 001 Media" },
      {
        name: "description",
        content: "We help organizations and individuals in East Africa become impossible to ignore. Strategic media, cinematic production, and brand architecture.",
      },
    ],
  }),
  component: ServicesPage, // Internal mapping fixes TanStack warning
});

// ==== ENHANCED SERVICE DATA (Outcome-Focused) ====
const agencyServices = [
  {
    id: "production",
    title: "Cinematic Production",
    outcomeHeadline: "Turn your organization into a story people remember.",
    tagline: "Capture Attention.",
    description: "Whether it is a corporate profile, a high-stakes political campaign, a church documentary, or a luxury wedding, we capture broadcast-quality visuals that elevate your narrative. We don't just record events; we engineer emotional connections.",
    icon: "fa-video",
    image: "https://images.pexels.com/photos/2588757/pexels-photo-2588757.jpeg?auto=compress&cs=tinysrgb&w=1200",
    deliverables: ["Documentary Filmmaking", "Corporate & Event Coverage", "High-End Life Events", "4K Drone Cinematography"],
    idealFor: "NGOs, Churches, Politicians, Corporates, Premium Life Events.",
    businessValue: "Commands immediate authority and captures premium attention."
  },
  {
    id: "branding",
    title: "Brand Architecture & Print",
    outcomeHeadline: "Build physical and digital trust at first glance.",
    tagline: "Build Trust.",
    description: "People judge your capability by your presentation. We translate your essence into physical and visual assets. From high-end graphic identity systems to large-scale printing and luxury eulogy booklets, we ensure you look elite in the real world.",
    icon: "fa-pen-nib",
    image: "https://images.pexels.com/photos/1701202/pexels-photo-1701202.jpeg?auto=compress&cs=tinysrgb&w=1200",
    deliverables: ["Visual Identity Systems", "Large Format Printing", "Premium Booklets & Magazines", "Event Branding"],
    idealFor: "Startups, Event Organizers, Institutions, Real Estate, Families.",
    businessValue: "Translates abstract value into undeniable market positioning."
  },
  {
    id: "digital",
    title: "Digital & PR Consultancy",
    outcomeHeadline: "Own the conversation in the modern ecosystem.",
    tagline: "Control The Narrative.",
    description: "Attention is the new currency. We provide strategic media advisory and digital ecosystem management to ensure your voice is consistent, authoritative, and dominant. When people search for you, they find a leader.",
    icon: "fa-globe",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200",
    deliverables: ["Media Consultancy", "Social Media Management", "Website Management", "Digital PR Strategy"],
    idealFor: "Executives, Public Figures, Enterprise Brands, Content Creators.",
    businessValue: "Scales your influence and protects your public reputation."
  }
];

const CTA_COPY: Record<string, string> = {
  production: "Discuss Your Production",
  branding: "Build Your Identity",
  digital: "Scale Your Influence",
};

// ==== STRATEGIC DATA ARRAYS ====
const methodology = [
  { step: "01", title: "Audit", body: "We analyze your audience, context, and objectives to define the core problem." },
  { step: "02", title: "Architect", body: "We build a bespoke media and brand strategy tailored to your exact goals." },
  { step: "03", title: "Execute", body: "World-class production and design execution led by our Nairobi studio team." },
  { step: "04", title: "Launch", body: "Strategic rollout across digital, physical, and PR channels." },
  { step: "05", title: "Scale", body: "Data-driven optimization and ongoing narrative management." },
];

const audienceTags = [
  "Corporate Enterprise", "NGOs & Non-Profits", "Churches & Ministries", 
  "Political Campaigns", "Real Estate Developers", "Educational Institutions", 
  "Startups & SMEs", "Personal Brands", "Event Organizers", "Premium Life Events"
];

const faqs = [
  { q: "Do you only work with large corporations?", a: "No. We partner with anyone who refuses to look average. Our clients range from multinational NGOs and government agencies to individual politicians, growing churches, and families needing premium coverage for important life events." },
  { q: "Do you execute projects outside of Nairobi?", a: "Absolutely. While our creative headquarters is rooted in Nairobi, we understand the East African context deeply and deploy production teams across the entire region and globally." },
  { q: "How much does an engagement cost?", a: "Every project is custom-architected. A luxury wedding requires a different deployment than a national political campaign or an NGO documentary. We scope the budget to match the magnitude of the outcome you need." },
  { q: "Do you handle the strategy or just the execution?", a: "Both. We are an end-to-end studio. Execution without strategy is a waste of capital, and strategy without execution is just a PDF. We do both at a world-class level." }
];

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
            className="w-full flex items-center justify-between py-4 text-left font-black text-lg sm:text-xl hover:text-[#ff6600] transition-colors focus:outline-none min-h-[44px]"
          >
            <span className="pr-4">{faq.q}</span>
            <i className={`fa-solid fa-chevron-down shrink-0 transition-transform duration-300 ${openIdx === i ? 'rotate-180 text-[#ff6600]' : ''}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${openIdx === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <p className="pb-4 text-neutral-500 font-medium leading-relaxed">{faq.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ServicesPage() {
  const [activeSection, setActiveSection] = useState<string>("");

  const scrollToService = (id: string) => {
    const element = document.getElementById(`service-${id}`);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0.2 }
    );

    agencyServices.forEach((s) => {
      const el = document.getElementById(`service-${s.id}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white text-[#111827] font-sans selection:bg-[#ff6600] selection:text-white w-full overflow-x-hidden">
      
      {/* ==== 1. ICONIC HERO: The Authority Statement ==== */}
      <section className="relative bg-black text-white pt-32 pb-16 sm:pt-48 sm:pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#ff6600] opacity-[0.08] blur-[150px] rounded-full pointer-events-none" />
        
        <div className="relative mx-auto max-w-[90rem] px-6 sm:px-12 z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-neutral-300 mb-8">
            <span className="h-2 w-2 rounded-full bg-[#ff6600] animate-pulse" />
            Strategic Execution • Nairobi, Kenya
          </div>
          
          <h1 className="text-[clamp(2.5rem,7vw,7rem)] font-black tracking-tighter leading-[0.95] max-w-6xl mb-8">
            We help organizations and individuals become <br className="hidden lg:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-600">
              impossible to ignore.
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-neutral-400 max-w-3xl leading-relaxed font-medium mb-12">
            Creative intelligence that commands attention. From high-stakes political campaigns and NGO documentaries to enterprise branding and premium life events, we execute at global standards.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link to="/book" className="px-10 py-5 bg-white text-black text-xs font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform duration-300 text-center shadow-[0_0_40px_rgba(255,255,255,0.2)] min-h-[44px] flex items-center justify-center">
              Consult With Our Team
            </Link>
            <a href="https://wa.me/254742267006" target="_blank" rel="noreferrer" className="px-10 py-5 bg-transparent border border-neutral-700 text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-white/10 transition-colors duration-300 text-center flex items-center justify-center gap-2 min-h-[44px]">
              <i className="fa-brands fa-whatsapp text-lg text-[#25D366]" /> Direct Inquiry
            </a>
          </div>
        </div>

        {/* Target Audience Marquee - Validates every user immediately */}
        <div className="mt-20 w-full relative flex items-center border-t border-white/10 pt-10">
          <div className="absolute left-0 top-10 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-10 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
          <div className="flex w-fit animate-[marquee_40s_linear_infinite]">
            {[...audienceTags, ...audienceTags].map((tag, i) => (
              <div key={i} className="mx-6 sm:mx-10 flex items-center justify-center text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 whitespace-nowrap shrink-0">
                <i className="fa-solid fa-check text-[#ff6600] mr-3 opacity-50" /> {tag}
              </div>
            ))}
          </div>
        </div>
        <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
      </section>

      {/* ==== 2. INSTANT CREDIBILITY / METRICS ==== */}
      <section className="border-b border-neutral-100 bg-neutral-50 py-16">
        <div className="mx-auto max-w-[90rem] px-6 sm:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 lg:divide-x lg:divide-neutral-200">
            <div className="lg:pl-0 text-center lg:text-left">
              <div className="text-4xl sm:text-5xl font-black tracking-tighter text-black mb-1"><AnimatedCounter end={150} />+</div>
              <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Missions Executed</div>
            </div>
            <div className="lg:pl-12 text-center lg:text-left">
              <div className="text-4xl sm:text-5xl font-black tracking-tighter text-black mb-1"><AnimatedCounter end={12} />+</div>
              <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Industries Conquered</div>
            </div>
            <div className="lg:pl-12 text-center lg:text-left">
              <div className="text-4xl sm:text-5xl font-black tracking-tighter text-black mb-1">Global</div>
              <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Execution Standard</div>
            </div>
            <div className="lg:pl-12 text-center lg:text-left">
              <div className="text-4xl sm:text-5xl font-black tracking-tighter text-black mb-1"><AnimatedCounter end={100} suffix="%" /></div>
              <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">In-House Studio Control</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==== 3. THE PSYCHOLOGICAL SHIFT (The Client Journey) ==== */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-[90rem] px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch text-center lg:text-left">
            <div className="p-8 sm:p-10 rounded-3xl bg-neutral-50 border border-neutral-100 flex flex-col justify-center">
              <div className="text-neutral-400 mb-4"><i className="fa-solid fa-eye-slash text-3xl" /></div>
              <h3 className="text-xl font-black tracking-tight text-black mb-2">You Are Unseen</h3>
              <p className="text-sm text-neutral-500 font-medium">You have a world-class offering or story, but poor visuals and weak messaging hide your true value.</p>
            </div>
            
            <div className="hidden lg:flex items-center justify-center text-neutral-200"><i className="fa-solid fa-arrow-right text-3xl" /></div>
            
            <div className="p-8 sm:p-10 rounded-3xl bg-black text-white shadow-2xl relative overflow-hidden group flex flex-col justify-center transform lg:scale-110 z-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff6600] opacity-20 blur-[50px] group-hover:opacity-40 transition-opacity" />
              <div className="relative z-10">
                <div className="text-[#ff6600] mb-4"><i className="fa-solid fa-chess-knight text-3xl" /></div>
                <h3 className="text-xl font-black tracking-tight mb-2">We Architect Authority</h3>
                <p className="text-sm text-neutral-400 font-medium">We deploy elite production, design, and PR strategies tailored to your exact audience.</p>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center justify-center text-neutral-200"><i className="fa-solid fa-arrow-right text-3xl" /></div>
            
            <div className="p-8 sm:p-10 rounded-3xl bg-neutral-50 border border-neutral-100 flex flex-col justify-center">
              <div className="text-[#ff6600] mb-4"><i className="fa-solid fa-flag-checkered text-3xl" /></div>
              <h3 className="text-xl font-black tracking-tight text-black mb-2">You Dominate</h3>
              <p className="text-sm text-neutral-500 font-medium">You command premium attention, build undeniable trust, and own your narrative in the market.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==== 4. OUTCOME-LED CAPABILITIES ==== */}
      <section className="bg-neutral-50 border-t border-neutral-200 pt-24 pb-32">
        <div className="mx-auto max-w-[90rem] px-6 sm:px-12 mb-12 sm:mb-16 text-center">
          <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#ff6600] mb-4">Strategic Execution</h2>
          <p className="text-[clamp(2.5rem,5vw,4.5rem)] font-black tracking-tighter text-black leading-tight">We don't sell services.<br className="hidden sm:block" />We engineer outcomes.</p>
        </div>

        {/* Sticky Services Nav */}
        <div className="sticky top-20 sm:top-24 z-40 bg-neutral-50/90 backdrop-blur-md py-4 mb-16 border-y border-neutral-200">
          <div className="mx-auto max-w-[90rem] px-6 sm:px-12 flex gap-3 overflow-x-auto scrollbar-hide items-center">
            {agencyServices.map((s) => (
              <button
                key={`nav-${s.id}`}
                onClick={() => scrollToService(s.id)}
                className={`whitespace-nowrap px-6 py-3 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 border min-h-[44px] ${
                  activeSection === `service-${s.id}`
                    ? "bg-black text-white border-black shadow-lg"
                    : "bg-white text-neutral-500 border-neutral-200 hover:border-black hover:text-black"
                }`}
              >
                {s.tagline}
              </button>
            ))}
          </div>
        </div>

        {/* Services Render */}
        <div className="mx-auto max-w-[90rem] px-6 sm:px-12 space-y-24 sm:space-y-32">
          {agencyServices.map((s, i) => (
            <div id={`service-${s.id}`} key={s.id} className={`grid lg:grid-cols-2 gap-12 lg:gap-24 items-center group ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              
              {/* Image Block */}
              <div className="relative">
                <div className="absolute inset-0 bg-[#ff6600]/10 rounded-[2rem] sm:rounded-[3rem] transform translate-x-4 translate-y-4 sm:translate-x-6 sm:translate-y-6 -z-10 transition-transform duration-700 group-hover:translate-x-6 group-hover:translate-y-6 sm:group-hover:translate-x-8 sm:group-hover:translate-y-8" />
                <div className="aspect-[4/5] rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border border-neutral-200 bg-white">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out" loading="lazy" />
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6 px-4 py-2 bg-white/95 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-black shadow-lg">
                    {s.title}
                  </div>
                </div>
              </div>

              {/* Content Block */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff6600] mb-4 sm:mb-6 flex items-center gap-3">
                  <span>Phase 0{i + 1}</span>
                  <span className="h-[1px] w-8 bg-[#ff6600]" />
                  <span>{s.tagline}</span>
                </div>
                
                <h3 className="text-[clamp(2.5rem,4vw,4rem)] font-black tracking-tighter leading-[1.05] text-black mb-6">
                  {s.outcomeHeadline}
                </h3>
                
                <p className="text-base sm:text-xl text-neutral-500 font-medium leading-relaxed mb-10">
                  {s.description}
                </p>

                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm mb-10">
                  {/* Business Value Highlight */}
                  <div className="mb-6 pb-6 border-b border-neutral-100">
                    <div className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-2">The ROI</div>
                    <div className="text-sm sm:text-base font-black text-black">{s.businessValue}</div>
                  </div>
                  
                  {/* Ideal For Highlight */}
                  <div className="mb-6 pb-6 border-b border-neutral-100">
                    <div className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-2">Who this is for</div>
                    <div className="text-sm font-semibold text-neutral-600 leading-relaxed">{s.idealFor}</div>
                  </div>

                  <div className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-4">The Arsenal</div>
                  <ul className="grid sm:grid-cols-2 gap-y-3 gap-x-6">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-3">
                        <i className="fa-solid fa-check text-[#ff6600] text-sm mt-0.5" />
                        <span className="text-sm font-semibold text-black leading-tight">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/book"
                  search={{ interest: s.title }}
                  className="inline-flex items-center justify-between w-full sm:w-auto gap-6 px-8 py-4 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform duration-300 shadow-xl min-h-[44px]"
                >
                  {CTA_COPY[s.id]} <i className="fa-solid fa-arrow-right" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==== 5. EAST AFRICAN ROOTS, GLOBAL STANDARDS ==== */}
      <section className="py-24 sm:py-32 bg-black text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full max-w-[600px] h-[600px] bg-[#ff6600] opacity-10 blur-[120px] rounded-full pointer-events-none" />
        <div className="mx-auto max-w-[90rem] px-6 sm:px-12 relative z-10">
          <div className="max-w-3xl mb-16">
            <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#ff6600] mb-4">The Captain Advantage</h2>
            <p className="text-[clamp(2.5rem,5vw,4.5rem)] font-black tracking-tighter leading-[1.05]">
              World-class execution,<br /> deeply rooted in Kenya.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <div className="p-8 sm:p-12 rounded-[2rem] bg-neutral-900 border border-white/10 hover:border-white/30 transition-colors">
              <i className="fa-solid fa-earth-africa text-3xl text-[#ff6600] mb-6" />
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-4">Local Nuance, Global Standard.</h3>
              <p className="text-neutral-400 font-medium leading-relaxed">Headquartered in Nairobi, we intimately understand the cultural and political pulse of the East African market. Yet, we execute deliverables that compete visually and strategically on the global stage. No compromises.</p>
            </div>
            <div className="p-8 sm:p-12 rounded-[2rem] bg-neutral-900 border border-white/10 hover:border-white/30 transition-colors">
              <i className="fa-solid fa-layer-group text-3xl text-[#ff6600] mb-6" />
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-4">End-To-End Architecture.</h3>
              <p className="text-neutral-400 font-medium leading-relaxed">We do not outsource your trust. We architect the brand, shoot the film, build the digital ecosystem, and launch it natively. One cohesive studio team from the initial brief to final global deployment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==== 6. THE STUDIO METHODOLOGY ==== */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-[90rem] px-6 sm:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
            <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#ff6600] mb-4">How We Work</h2>
            <p className="text-[clamp(2.5rem,5vw,4.5rem)] font-black tracking-tighter text-black leading-[1.05]">The framework for building authority.</p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between relative gap-8 md:gap-0">
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-[2px] bg-neutral-100 pointer-events-none" />
            {methodology.map((m) => (
              <div key={m.step} className="relative z-10 flex flex-col items-center text-center md:w-1/5 group">
                <div className="w-16 h-16 shrink-0 rounded-full bg-white border-4 border-neutral-100 flex items-center justify-center text-sm font-black text-neutral-300 mb-6 group-hover:border-[#ff6600] group-hover:text-[#ff6600] transition-colors shadow-sm">
                  {m.step}
                </div>
                <h3 className="text-lg sm:text-xl font-black tracking-tight mb-3 text-black">{m.title}</h3>
                <p className="text-sm text-neutral-500 font-medium px-2 sm:px-4 leading-relaxed">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==== 7. FAQS (Reducing Hesitation) ==== */}
      <section className="py-24 sm:py-32 bg-neutral-50 border-y border-neutral-200">
        <div className="mx-auto max-w-4xl px-6 sm:px-12">
          <div className="text-center mb-16">
            <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#ff6600] mb-4">Clarity & Expectations</h2>
            <p className="text-[clamp(2.5rem,5vw,4.5rem)] font-black tracking-tighter text-black leading-[1.05]">Frequent Questions.</p>
          </div>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* ==== 8. THE PREMIUM CTA ==== */}
      <section className="bg-black text-white py-32 sm:py-48 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[400px] bg-[#ff6600] opacity-20 blur-[150px] rounded-full pointer-events-none" />
        <div className="mx-auto max-w-4xl text-center relative z-10 animate-in fade-in zoom-in-95 duration-1000">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#ff6600] mb-8">
            The Final Step
          </div>
          <h2 className="text-[clamp(3rem,8vw,6rem)] font-black tracking-tighter leading-[0.95] mb-8">
            Ready to command <br className="hidden sm:block"/> the conversation?
          </h2>
          <p className="text-lg sm:text-xl text-neutral-400 font-medium mb-12 max-w-2xl mx-auto">
            Our calendar is highly selective. Connect with our strategic team to see if we are the right architects for your next move.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/book"
              className="w-full sm:w-auto px-10 py-5 bg-white text-black text-sm font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)] min-h-[44px] flex items-center justify-center"
            >
              Request A Consultation
            </Link>
            <a
              href="https://wa.me/254742267006"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-10 py-5 bg-transparent border border-neutral-700 text-white text-sm font-black uppercase tracking-widest rounded-full hover:bg-[#25D366] hover:border-[#25D366] transition-colors duration-300 flex items-center justify-center gap-3 min-h-[44px]"
            >
              <i className="fa-brands fa-whatsapp text-lg" /> Connect on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}