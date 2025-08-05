// src/pages/About.jsx

import "./About.css";

function About() {
  return (
    <div className="about-page">
      <section className="company-intro">
        <h1>About <span className="highlight">Captain 001 Media</span></h1>
        <p>
          <strong>Captain 001 Media</strong> is a proactive media, branding, and public relations
          company anchored in creativity and youthful passion. Founded in <strong>2023</strong>, the
          company collaborates with individuals, groups, corporates, and organizations to shape
          narratives, amplify visibility, and create compelling content that resonates with diverse
          audiences.
        </p>
        <p>
          At the heart of Captain 001 is the belief that <strong>every story matters</strong>. Our
          team is driven by curiosity, impact, and a desire to transform ideas into meaningful
          moments through powerful media experiences.
        </p>
      </section>

      <section className="ceo-profile">
        <h2>Meet Our Founder - <span className="highlight">Stephen Ndemo Jr</span></h2>
        <img src="/Ndemo.jpeg" alt="Stephen Ndemo Jr" className="ceo-image" />
        <p>
          <strong>Stephen Ndemo Jr</strong> is a young, passionate media professional and the
          visionary behind Captain 001 Media. A graduate of <em>Multimedia University of Kenya</em>
          (2017–2022), Stephen specialized in <strong>Broadcast Journalism</strong>, where his early
          interest in camera appearances evolved into an all-round mastery of media—on and off the
          screen.
        </p>
        <p>
          He has worked with major TV and radio stations, including vernacular outlets like
          <strong> Getembe TV</strong> and <strong>Ndizi TV</strong> in the Gusii region. Through
          mainstream and independent content creation, Stephen has developed a strong skill set in
          journalism, production, and digital storytelling.
        </p>
        <p>
          His vision for <strong>Captain Media & PR Consultancy</strong> is to offer strategic
          media partnerships, helping brands, sports teams, and personalities grow visibility,
          enhance engagement, and maintain a consistent positive image.
        </p>
      </section>

      <section className="skills">
        <h2>Stephen's Media Expertise</h2>
        <ul>
          <li><strong>Scripting</strong> – Broadcast news, content writing</li>
          <li><strong>Writing</strong> – Articles, opinions, magazines</li>
          <li><strong>Photography</strong> – Events, sports, political sessions</li>
          <li><strong>Presenting</strong> – News anchoring, hosting, podcasting, commentary</li>
          <li><strong>Production</strong> – Livestreams, program producing, technical setups</li>
        </ul>
        <p>
          <strong>Focus areas:</strong> Sports, politics, youth, creativity, talent, and
          current affairs.
        </p>
      </section>

      <section className="contacts">
        <h2>Contact & Platforms</h2>
        <p><strong>Brand Name:</strong> Captain 001</p>
        <p><strong>Phone:</strong> <a href="tel:+254742267006">+254 742 267 006</a></p>
        <p><strong>Email:</strong> <a href="mailto:stephenndemo55@gmail.com">stephenndemo55@gmail.com</a></p>
        <p><strong>Facebook:</strong> Ndemo Stephen - Captain 001</p>
        <p><strong>TikTok:</strong> Ndemo Jr Live 'Captain 0001'</p>
        <p><strong>YouTube:</strong> Captain 001 Media & Gusii Sports TV</p>
      </section>

      <section className="cta-section">
        <h2 className="highlight">Try Us!</h2>
        <p>
          With our experience and passion, Captain 001 Media & PR Consultancy offers powerful
          solutions that help you <strong>grow, connect, and stand out</strong>. Whether you're a
          brand, organization, or individual—we're here to help you tell your story the right way.
        </p>
        <p><em>Let’s journey together — let iron sharpen iron.</em></p>
      </section>
    </div>
  );
}

export default About;
