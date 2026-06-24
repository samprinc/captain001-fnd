import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Start a Project — Captain 001 Media" },
      { name: "description", content: "Submit your project brief. Creative intelligence and execution for ambitious organizations." },
    ],
  }),
  component: BookPage,
});

// ==== CONFIGURATION & DATA ====
const serviceOptions = [
  { id: "Cinematic Production", title: "Cinematic Production", icon: "fa-video", desc: "Commercials, docs, and event coverage." },
  { id: "Branding & Print", title: "Brand Architecture", icon: "fa-pen-nib", desc: "Identity systems and premium print." },
  { id: "Digital & Consultancy", title: "Digital PR & Strategy", icon: "fa-globe", desc: "Narrative control and ecosystem management." },
  { id: "Full Suite", title: "Full Suite Retainer", icon: "fa-bolt", desc: "End-to-end studio partnership." },
];

const scaleOptions = [
  { label: "Small Engagement", desc: "Single execution or audit.", dbValue: "Ksh 5k - 20k" },
  { label: "Growing Brand", desc: "Multi-channel campaign.", dbValue: "Ksh 20k - 50k" },
  { label: "Established Org", desc: "Comprehensive production.", dbValue: "Ksh 50k - 150k" },
  { label: "Enterprise Initiative", desc: "Large-scale brand rollout.", dbValue: "Ksh 150k - 500k" },
  { label: "Custom Scope", desc: "Bespoke retainer or massive scale.", dbValue: "Ksh 500k+" },
];

const goalOptions = [
  "Launch a campaign", "Build brand authority", "Document an event", 
  "Improve digital presence", "Generate qualified leads", "Corporate restructuring"
];

const faqs = [
  { q: "How soon do you respond?", a: "Our strategy team reviews briefs daily. You will hear back within 24 hours to schedule a discovery call." },
  { q: "Do you work outside Nairobi?", a: "Yes. While our studio is based in Nairobi, we deploy crews and execute campaigns across East Africa and globally." },
  { q: "Can you work with NGOs?", a: "Absolutely. We have extensive experience translating complex NGO impact data into compelling visual narratives." }
];

export function BookPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Advanced Qualification State
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "",
    company: "", industry: "", size: "",
    goals: [] as string[], service: "", scale: "", details: "",
  });

  // Auto-select service from URL parameters
  useEffect(() => {
    window.scrollTo(0, 0);
    const searchParams = new URLSearchParams(window.location.search);
    const interest = searchParams.get("interest");
    if (interest) {
      const matchedOption = serviceOptions.find(opt => interest.includes(opt.id) || opt.id.includes(interest));
      if (matchedOption) setFormData(prev => ({ ...prev, service: matchedOption.id }));
    }
  }, []);

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoalToggle = (goal: string) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal) ? prev.goals.filter(g => g !== goal) : [...prev.goals, goal]
    }));
  };

  const nextStep = () => {
    if (step < 5) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const prevStep = () => setStep(step - 1);

  // ==== REAL API SUBMISSION ====
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    // ARCHITECT TRICK: Bundle the advanced qualification data into the Django "details" text field
    // This gives the agency rich data without breaking the existing backend model.
    const richDetails = `
COMPANY CONTEXT:
Company: ${formData.company || 'N/A'}
Industry: ${formData.industry || 'N/A'}
Size: ${formData.size || 'N/A'}

STRATEGIC GOALS:
${formData.goals.length > 0 ? formData.goals.join(", ") : 'None selected'}

PROJECT VISION:
${formData.details}
    `.trim();

    // Map to Django Booking Model Fields
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service_requested: formData.service || "Unspecified",
      budget: scaleOptions.find(s => s.label === formData.scale)?.dbValue || "Ksh 20k - 50k",
      details: richDetails,
    };

    try {
      const response = await fetch("http://localhost:8000/api/bookings/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Server rejected the request.");
      
      setSubmitStatus("success");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage("There was a network issue transmitting your brief. Please try again or contact us via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step Validation logic
  const isStep1Valid = formData.name.trim() && formData.email.trim();
  const isStep2Valid = formData.company.trim() && formData.industry.trim();
  const isStep3Valid = formData.service && formData.goals.length > 0;
  const isStep4Valid = formData.scale && formData.details.trim();

  return (
    <div className="min-h-screen bg-[#f9fafb] text-[#111827] font-sans pb-24 selection:bg-black selection:text-white">
      
      {/* ==== FLOATING WHATSAPP CTA ==== */}
      <a href="https://wa.me/254742267006" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-50 h-14 px-6 rounded-full bg-[#25D366] text-white flex items-center justify-center gap-3 shadow-2xl hover:scale-105 hover:shadow-[#25D366]/30 transition-all duration-300 font-bold group">
        <i className="fa-brands fa-whatsapp text-2xl group-hover:animate-bounce" />
        <span className="hidden sm:inline">Need it faster? Chat with us.</span>
      </a>

      {/* ==== HERO SECTION ==== */}
      <section className="bg-black text-white pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ff6600] opacity-10 blur-[120px] rounded-full pointer-events-none" />
        <div className="mx-auto max-w-[90rem] relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors mb-10">
            <i className="fa-solid fa-arrow-left" /> Return to Studio
          </Link>
          <div className="grid lg:grid-cols-2 gap-16 items-end">
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-white mb-6">
                <span className="h-2 w-2 rounded-full bg-[#ff6600] animate-pulse" /> Partner With Us
              </div>
              <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.95]">
                Ready to become <br className="hidden sm:block"/>
                <span className="text-neutral-400">impossible to ignore?</span>
              </h1>
            </div>
            <div className="flex gap-8 lg:justify-end pb-2">
              <div>
                <div className="text-sm font-black uppercase tracking-widest mb-1">Nairobi, KE</div>
                <div className="text-xs text-neutral-400 font-medium">Headquarters</div>
              </div>
              <div>
                <div className="text-sm font-black uppercase tracking-widest mb-1">East Africa</div>
                <div className="text-xs text-neutral-400 font-medium">Primary Market</div>
              </div>
              <div>
                <div className="text-sm font-black uppercase tracking-widest mb-1">&lt; 24 Hrs</div>
                <div className="text-xs text-neutral-400 font-medium">Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==== MAIN LAYOUT ==== */}
      <section className="mx-auto max-w-[90rem] px-6 -mt-12 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* --- LEFT: DYNAMIC FORM --- */}
          <div className="w-full lg:w-3/5 bg-white rounded-3xl border border-neutral-200 shadow-2xl p-8 sm:p-12 overflow-hidden">
            {submitStatus === "success" ? (
              /* SUCCESS STATE */
              <div className="py-16 text-center animate-in zoom-in-95 duration-500">
                <div className="h-24 w-24 bg-black text-white rounded-full flex items-center justify-center text-4xl mx-auto mb-8 shadow-2xl">
                  <i className="fa-solid fa-check" />
                </div>
                <h2 className="text-4xl font-black tracking-tighter mb-4">Brief successfully transmitted.</h2>
                <p className="text-neutral-500 font-medium max-w-md mx-auto mb-10 leading-relaxed">
                  Thank you, {formData.name.split(' ')[0]}. Our strategy team is reviewing your requirements and will reach out within 24 hours to schedule a discovery call.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/" className="px-8 py-4 rounded-full bg-neutral-100 text-black font-bold uppercase tracking-widest text-xs hover:bg-neutral-200 transition-colors">
                    Return to Studio
                  </Link>
                  <a href="https://wa.me/254742267006" className="px-8 py-4 rounded-full bg-black text-white font-bold uppercase tracking-widest text-xs hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2">
                    Message Director <i className="fa-brands fa-whatsapp text-lg" />
                  </a>
                </div>
              </div>
            ) : (
              /* PROGRESSIVE FORM */
              <div className="animate-in fade-in duration-500">
                
                {/* Error Banner */}
                {submitStatus === "error" && (
                  <div className="mb-8 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm font-semibold flex items-start gap-3">
                    <i className="fa-solid fa-triangle-exclamation mt-1" /> {errorMessage}
                  </div>
                )}

                {/* Progress Bar */}
                <div className="mb-10">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-3">
                    <span>Step 0{step} of 05</span>
                    <span>{step === 5 ? "Review & Submit" : "Next Step"}</span>
                  </div>
                  <div className="h-1 w-full bg-neutral-100 rounded-full overflow-hidden flex">
                    <div className="h-full bg-black transition-all duration-500 ease-out" style={{ width: `${(step / 5) * 100}%` }} />
                  </div>
                </div>

                {/* STEPS */}
                <form onSubmit={handleSubmit}>
                  {step === 1 && (
                    <div className="space-y-6 animate-in slide-in-from-right-4 fade-in">
                      <h3 className="text-2xl font-black tracking-tight mb-8">Who are we partnering with?</h3>
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Full Name *</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-5 py-4 text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all font-semibold" placeholder="Jane Doe" />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Email Address *</label>
                          <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-5 py-4 text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all font-semibold" placeholder="jane@company.com" />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Direct Phone</label>
                          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-5 py-4 text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all font-semibold" placeholder="+254 700 000 000" />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6 animate-in slide-in-from-right-4 fade-in">
                      <h3 className="text-2xl font-black tracking-tight mb-8">Tell us about the organization.</h3>
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Company / Organization Name *</label>
                        <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-5 py-4 text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all font-semibold" placeholder="Acme Corp" />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Industry *</label>
                          <input type="text" name="industry" value={formData.industry} onChange={handleChange} className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-5 py-4 text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all font-semibold" placeholder="Real Estate, NGO, Tech..." />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Org Size</label>
                          <select name="size" value={formData.size} onChange={handleChange} className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-5 py-4 text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all font-semibold appearance-none">
                            <option value="">Select Size</option>
                            <option value="1-10">1-10 Employees</option>
                            <option value="11-50">11-50 Employees</option>
                            <option value="51-200">51-200 Employees</option>
                            <option value="200+">200+ Employees</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-8 animate-in slide-in-from-right-4 fade-in">
                      <h3 className="text-2xl font-black tracking-tight mb-6">What are we solving?</h3>
                      
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-widest mb-4">Primary Discipline Needed *</label>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {serviceOptions.map((opt) => (
                            <div key={opt.id} onClick={() => setFormData(p => ({ ...p, service: opt.id }))} className={`cursor-pointer p-4 rounded-2xl border-2 transition-all ${formData.service === opt.id ? "border-black bg-neutral-50 shadow-md" : "border-neutral-100 hover:border-neutral-300"}`}>
                              <i className={`fa-solid ${opt.icon} mb-3 text-lg ${formData.service === opt.id ? "text-[#ff6600]" : "text-neutral-400"}`} />
                              <h4 className="font-bold text-sm mb-1">{opt.title}</h4>
                              <p className="text-xs text-neutral-500 font-medium">{opt.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-widest mb-4">Strategic Goals (Select Multiple) *</label>
                        <div className="flex flex-wrap gap-3">
                          {goalOptions.map(goal => (
                            <div key={goal} onClick={() => handleGoalToggle(goal)} className={`cursor-pointer px-4 py-2 rounded-full border text-xs font-bold transition-all ${formData.goals.includes(goal) ? "bg-black text-white border-black" : "bg-white text-neutral-500 border-neutral-200 hover:border-black hover:text-black"}`}>
                              {goal}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-8 animate-in slide-in-from-right-4 fade-in">
                      <h3 className="text-2xl font-black tracking-tight mb-6">Scope & Vision</h3>
                      
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-widest mb-4">Project Scale *</label>
                        <div className="flex flex-wrap gap-3">
                          {scaleOptions.map((scale) => (
                            <div key={scale.label} onClick={() => setFormData(p => ({ ...p, scale: scale.label }))} className={`cursor-pointer px-5 py-3 rounded-full border-2 transition-all ${formData.scale === scale.label ? "bg-black text-white border-black" : "bg-white text-neutral-500 border-neutral-200 hover:border-black"}`}>
                              <div className="font-bold text-sm">{scale.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-widest mb-2">The Vision *</label>
                        <textarea name="details" value={formData.details} onChange={handleChange} rows={5} required className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-5 py-4 text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all font-semibold resize-none" placeholder="Describe your current situation, the desired outcome, and any specific timelines..." />
                      </div>
                    </div>
                  )}

                  {step === 5 && (
                    <div className="space-y-8 animate-in slide-in-from-right-4 fade-in">
                      <h3 className="text-2xl font-black tracking-tight mb-6">Review your brief.</h3>
                      <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 space-y-4">
                        <div className="grid grid-cols-3 border-b border-neutral-200 pb-4">
                          <span className="text-xs uppercase tracking-widest font-bold text-neutral-400">Identity</span>
                          <span className="col-span-2 font-semibold">{formData.name} ({formData.email})</span>
                        </div>
                        <div className="grid grid-cols-3 border-b border-neutral-200 pb-4">
                          <span className="text-xs uppercase tracking-widest font-bold text-neutral-400">Org</span>
                          <span className="col-span-2 font-semibold">{formData.company} · {formData.industry}</span>
                        </div>
                        <div className="grid grid-cols-3 border-b border-neutral-200 pb-4">
                          <span className="text-xs uppercase tracking-widest font-bold text-neutral-400">Discipline</span>
                          <span className="col-span-2 font-semibold">{formData.service}</span>
                        </div>
                        <div className="grid grid-cols-3 pb-2">
                          <span className="text-xs uppercase tracking-widest font-bold text-neutral-400">Scale</span>
                          <span className="col-span-2 font-semibold">{formData.scale}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Form Footer / Navigation */}
                  <div className="mt-12 flex items-center justify-between pt-6 border-t border-neutral-100">
                    {step > 1 ? (
                      <button type="button" onClick={prevStep} className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-neutral-500 hover:bg-neutral-100 transition-colors">
                        Go Back
                      </button>
                    ) : <div />}

                    {step < 5 ? (
                      <button type="button" onClick={nextStep} disabled={ (step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid) || (step === 3 && !isStep3Valid) || (step === 4 && !isStep4Valid) } className="px-8 py-4 rounded-full bg-black text-white text-xs font-bold uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-800 transition-colors shadow-xl">
                        Continue to Step 0{step + 1}
                      </button>
                    ) : (
                      <button type="submit" disabled={isSubmitting} className="px-10 py-4 rounded-full bg-[#ff6600] text-white text-xs font-black uppercase tracking-widest hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-xl shadow-[#ff6600]/20 flex items-center gap-3">
                        {isSubmitting ? <><i className="fa-solid fa-circle-notch fa-spin" /> Processing...</> : "Transmit Brief"}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* --- RIGHT: TRUST & EXPECTATIONS --- */}
          <div className="w-full lg:w-2/5 space-y-8">
            
            {/* Social Proof Widget */}
            <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm">
              <div className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-6 border-b border-neutral-100 pb-3">The Studio by the numbers</div>
              <div className="grid grid-cols-2 gap-y-6">
                <div>
                  <div className="text-3xl font-black tracking-tighter">150+</div>
                  <div className="text-xs font-bold text-neutral-500">Projects Shipped</div>
                </div>
                <div>
                  <div className="text-3xl font-black tracking-tighter">12</div>
                  <div className="text-xs font-bold text-neutral-500">Industries Served</div>
                </div>
                <div>
                  <div className="text-3xl font-black tracking-tighter">100%</div>
                  <div className="text-xs font-bold text-neutral-500">In-House Execution</div>
                </div>
                <div>
                  <div className="text-3xl font-black tracking-tighter">5.0</div>
                  <div className="text-xs font-bold text-neutral-500">Client Rating</div>
                </div>
              </div>
            </div>

            {/* Process Widget */}
            <div className="bg-neutral-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff6600] opacity-20 blur-[50px] pointer-events-none" />
              <div className="relative z-10">
                <div className="text-[10px] uppercase tracking-widest text-[#ff6600] font-bold mb-6 border-b border-white/10 pb-3">What happens next?</div>
                <ul className="space-y-6">
                  <li className="flex gap-4 opacity-100">
                    <i className="fa-solid fa-circle-check text-[#ff6600] mt-1 text-sm" />
                    <div>
                      <h4 className="font-bold text-sm mb-1">1. Brief Review</h4>
                      <p className="text-xs text-neutral-400 font-medium">Our directors analyze your submission.</p>
                    </div>
                  </li>
                  <li className="flex gap-4 opacity-70">
                    <i className="fa-regular fa-calendar text-white mt-1 text-sm" />
                    <div>
                      <h4 className="font-bold text-sm mb-1">2. Discovery Session</h4>
                      <p className="text-xs text-neutral-400 font-medium">A strategic call to define exact parameters.</p>
                    </div>
                  </li>
                  <li className="flex gap-4 opacity-50">
                    <i className="fa-solid fa-file-signature text-white mt-1 text-sm" />
                    <div>
                      <h4 className="font-bold text-sm mb-1">3. Proposal & Architecture</h4>
                      <p className="text-xs text-neutral-400 font-medium">Custom execution blueprint delivered.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Client Trust Widget */}
            <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm">
              <div className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-6 border-b border-neutral-100 pb-3">Why Captain 001?</div>
              <div className="space-y-4 text-sm font-semibold text-black">
                <div className="flex items-center gap-3"><i className="fa-solid fa-arrow-right text-[#ff6600]" /> Strategy-First Approach</div>
                <div className="flex items-center gap-3"><i className="fa-solid fa-arrow-right text-[#ff6600]" /> World-Class Production Value</div>
                <div className="flex items-center gap-3"><i className="fa-solid fa-arrow-right text-[#ff6600]" /> Fast, Transparent Communication</div>
                <div className="flex items-center gap-3"><i className="fa-solid fa-arrow-right text-[#ff6600]" /> Deep East African Market Nuance</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==== FAQS ==== */}
      <section className="mx-auto max-w-[90rem] px-6 mt-24 mb-12">
        <h2 className="text-2xl font-black tracking-tight mb-8 text-center">Frequent Questions</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm">
              <h3 className="text-sm font-black tracking-tight mb-3">{faq.q}</h3>
              <p className="text-neutral-500 text-sm font-medium leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}