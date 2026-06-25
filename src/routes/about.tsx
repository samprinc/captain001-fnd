import { createFileRoute } from '@tanstack/react-router'
import { Mail, Phone } from 'lucide-react'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-black pt-32 pb-24">
      <div className="max-w-[75rem] mx-auto px-6 sm:px-12">
        
        {/* INTRO SECTION */}
        <section className="mb-32 max-w-4xl">
          <div className="text-[#ff6600] text-sm font-bold uppercase tracking-widest mb-6">Our Story</div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-tight">
            About <span className="text-[#ff6600]">Captain 001 Media</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-600 leading-relaxed mb-6 font-medium">
            <strong className="text-black">Captain 001 Media</strong> is a proactive media, branding, and public relations company anchored in creativity and youthful passion. Founded in <strong className="text-black">2023</strong>, we collaborate with individuals, groups, corporates, and organizations to shape narratives, amplify visibility, and create compelling content that resonates with diverse audiences.
          </p>
          <p className="text-lg md:text-xl text-neutral-500 leading-relaxed">
            At the heart of Captain 001 is the belief that <strong className="text-black">every story matters</strong>. Our team is driven by curiosity, impact, and a desire to transform ideas into meaningful moments through powerful media experiences.
          </p>
        </section>

        {/* CEO PROFILE */}
        <section className="mb-32">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-12">
            Meet Our Founder - <span className="text-[#ff6600]">Stephen Ndemo Jr.</span>
          </h2>
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="w-full md:w-2/5 shrink-0">
              <img 
                src="/Ndemo.jpeg" 
                alt="Stephen Ndemo Jr" 
                className="w-full aspect-[4/5] object-cover rounded-3xl shadow-2xl" 
              />
            </div>
            <div className="w-full md:w-3/5 space-y-6 text-lg text-neutral-600 leading-relaxed">
              <p>
                <strong className="text-black">Stephen Ndemo Jr</strong> is a young, passionate media professional and the visionary behind Captain 001 Media. A graduate of <em className="text-black font-medium">Multimedia University of Kenya</em> (2017–2022), Stephen specialized in <strong className="text-black">Broadcast Journalism</strong>, where his early interest in camera appearances evolved into an all-round mastery of media on and off the screen.
              </p>
              <p>
                He has worked with major TV and radio stations, including vernacular outlets like <strong className="text-black">Getembe TV</strong> and <strong className="text-black">Ndizi TV</strong> in the Gusii region. Through mainstream and independent content creation, Stephen has developed a strong skill set in journalism, production, and digital storytelling.
              </p>
              <p>
                His vision for <strong className="text-black">Captain Media & PR Consultancy</strong> is to offer strategic media partnerships, helping brands, sports teams, and personalities grow visibility, enhance engagement, and maintain a consistent positive image.
              </p>
            </div>
          </div>
        </section>

        {/* EXPERTISE & SKILLS */}
        <section className="mb-32 bg-neutral-50 rounded-3xl p-8 md:p-16 border border-neutral-100">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-8">Stephen's Media Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2.5 rounded-full bg-[#ff6600] shrink-0" />
              <p className="text-lg"><strong className="text-black">Scripting</strong> – Broadcast news, content writing</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2.5 rounded-full bg-[#ff6600] shrink-0" />
              <p className="text-lg"><strong className="text-black">Writing</strong> – Articles, opinions, magazines</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2.5 rounded-full bg-[#ff6600] shrink-0" />
              <p className="text-lg"><strong className="text-black">Photography</strong> – Events, sports, political sessions</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2.5 rounded-full bg-[#ff6600] shrink-0" />
              <p className="text-lg"><strong className="text-black">Presenting</strong> – News anchoring, hosting, podcasting, commentary</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2.5 rounded-full bg-[#ff6600] shrink-0" />
              <p className="text-lg"><strong className="text-black">Production</strong> – Livestreams, program producing, technical setups</p>
            </div>
          </div>
          <div className="pt-8 border-t border-neutral-200">
            <p className="text-xl">
              <strong className="text-black">Focus areas:</strong> Sports, politics, youth, creativity, talent, and current affairs.
            </p>
          </div>
        </section>

        {/* CONTACT & CTA */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">Contact & Platforms</h2>
            <div className="space-y-4 mb-8">
              <p className="text-lg"><strong className="text-black">Brand Name:</strong> Captain 001</p>
              <a href="tel:+254742267006" className="flex items-center gap-3 text-lg font-medium text-neutral-600 hover:text-[#ff6600] transition-colors">
                <Phone className="w-5 h-5 text-black" />
                +254 742 267 006
              </a>
              <a href="mailto:stephenndemo55@gmail.com" className="flex items-center gap-3 text-lg font-medium text-neutral-600 hover:text-[#ff6600] transition-colors">
                <Mail className="w-5 h-5 text-black" />
                stephenndemo55@gmail.com
              </a>
            </div>
            
            {/* SOCIAL ICONS (Using FontAwesome to match your header) */}
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/profile.php?id=100063722293969" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-black hover:bg-[#ff6600] hover:text-white transition-all">
                <i className="fa-brands fa-facebook-f text-lg" />
              </a>
              <a href="https://www.tiktok.com/@ndemojrlive" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-black hover:bg-[#ff6600] hover:text-white transition-all">
                <i className="fa-brands fa-tiktok text-lg" />
              </a>
              <a href="https://www.youtube.com/@ndemojrlive1638" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-black hover:bg-[#ff6600] hover:text-white transition-all">
                <i className="fa-brands fa-youtube text-lg" />
              </a>
            </div>
          </div>
          
          <div className="bg-black text-white p-10 md:p-12 rounded-3xl shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6 text-[#ff6600]">Try Us!</h2>
            <p className="text-lg text-neutral-300 leading-relaxed mb-8">
              With our experience and passion, Captain 001 Media & PR Consultancy offers powerful solutions that help you <strong className="text-white">grow, connect, and stand out</strong>. Whether you're a brand, organization, or individual we're here to help you tell your story the right way.
            </p>
            <p className="text-xl font-bold italic">
              Let’s journey together let iron sharpen iron.
            </p>
          </div>
        </section>

      </div>
    </div>
  )
}