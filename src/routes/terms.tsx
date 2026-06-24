import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Captain 001 Media" },
      { name: "description", content: "The rules and guidelines for using our studio services." },
    ],
  }),
  component: TermsPage, // Maps to the internal function below
});

// REMOVED 'export' TO FIX TANSTACK CODE-SPLITTING WARNING
function TermsPage() {
  const lastUpdated = "June 2026";

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#ff6600] selection:text-white pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-6 sm:px-12">
        
        {/* Header */}
        <div className="mb-16">
          <Link to="/" className="text-[#ff6600] text-sm font-bold uppercase tracking-widest hover:text-white transition-colors mb-8 inline-block">
            <i className="fa-solid fa-arrow-left mr-2" /> Back to Studio
          </Link>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter mb-6">Terms of Service.</h1>
          <p className="text-neutral-500 font-medium text-sm">Last Updated: {lastUpdated}</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-neutral max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-[#ff6600] hover:prose-a:text-white prose-p:leading-relaxed prose-p:text-neutral-400">
          
          <h2>1. Agreement to Terms</h2>
          <p>
            These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Captain 001 Media ("Company," "we," "us," or "our"), concerning your access to and use of the website as well as any other media form, media channel, mobile website, or mobile application related, linked, or otherwise connected thereto.
          </p>

          <h2>2. Intellectual Property Rights</h2>
          <p>
            Unless otherwise indicated, the website and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the website (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us.
          </p>
          <p>
            For client production work, Intellectual Property ownership is transferred solely based on the specific terms outlined in the individual Master Services Agreement (MSA) signed prior to project commencement.
          </p>

          <h2>3. Agency Services & Deliverables</h2>
          <p>
            Captain 001 Media provides strategy, cinematic production, brand architecture, and digital growth services. By booking a strategy session or initiating a project, you agree that:
          </p>
          <ul>
            <li>All timelines provided are estimates and depend heavily on client feedback loops.</li>
            <li>Project scopes are strictly defined in official proposals. Scope creep will be billed at our standard agency rates.</li>
            <li>We reserve the right to display completed non-NDA work in our digital portfolio and agency marketing materials.</li>
          </ul>

          <h2>4. User Representations</h2>
          <p>
            By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information; (3) you have the legal capacity and you agree to comply with these Terms of Service.
          </p>

          <h2>5. Prohibited Activities</h2>
          <p>
            You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
          </p>

          <h2>6. Modifications and Interruptions</h2>
          <p>
            We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. We also reserve the right to modify or discontinue all or part of the Site without notice at any time.
          </p>

          <h2>7. Contact Information</h2>
          <p>
            To resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
            <br/><br/>
            <strong>Captain 001 Media</strong><br/>
            Nairobi, Kenya<br/>
            <a href="mailto:studio@captain001.media">studio@captain001.media</a>
          </p>
        </div>
      </div>
    </div>
  );
}