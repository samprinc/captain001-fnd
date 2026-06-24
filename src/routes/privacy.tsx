import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Captain 001 Media" },
      { name: "description", content: "How we collect, use, and protect your data." },
    ],
  }),
  component: PrivacyPage,
});

export function PrivacyPage() {
  const lastUpdated = "June 2026";

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#ff6600] selection:text-white pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-6 sm:px-12">
        
        {/* Header */}
        <div className="mb-16">
          <Link to="/" className="text-[#ff6600] text-sm font-bold uppercase tracking-widest hover:text-white transition-colors mb-8 inline-block">
            <i className="fa-solid fa-arrow-left mr-2" /> Back to Studio
          </Link>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter mb-6">Privacy Policy.</h1>
          <p className="text-neutral-500 font-medium text-sm">Last Updated: {lastUpdated}</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-neutral max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-[#ff6600] hover:prose-a:text-white prose-p:leading-relaxed prose-p:text-neutral-400">
          
          <h2>1. Introduction</h2>
          <p>
            Captain 001 Media ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
          </p>

          <h2>2. The Data We Collect About You</h2>
          <p>
            Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul>
            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier, and title.</li>
            <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
            <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
            <li><strong>Usage Data</strong> includes information about how you use our website and services.</li>
            <li><strong>Marketing and Communications Data</strong> includes your preferences in receiving marketing from us and our third parties.</li>
          </ul>

          <h2>3. How We Use Your Personal Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul>
            <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., executing a media production).</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal or regulatory obligation.</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
          </p>

          <h2>5. Cookies and Analytics</h2>
          <p>
            You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.
          </p>

          <h2>6. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at: <br/>
            <strong>Email:</strong> <a href="mailto:studio@captain001.media">studio@captain001.media</a><br/>
            <strong>Location:</strong> Nairobi, Kenya
          </p>
        </div>
      </div>
    </div>
  );
}