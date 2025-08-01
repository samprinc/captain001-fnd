import { useEffect, useState } from "react";
import { fetchAds, fetchPosts, fetchPartners } from "../api/api";
import { formatPost } from "../utils/postFormatter";
import { startProgress, stopProgress } from "../utils/nprogress";
import NewsCard from "../components/NewsCard";
import FeaturedCard from "../components/FeaturedCard";
import TrendingItem from "../components/TrendingItem";
import NewsletterForm from "../components/NewsletterForm";
import PartnerMarquee from "../components/PartnerMarquee";

import "./Home.css";

function Home() {
  const [ads, setAds] = useState([]);
  const [news, setNews] = useState([]);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeAdIndex, setActiveAdIndex] = useState(0);

  useEffect(() => {
    startProgress();
    Promise.all([fetchAds(), fetchPosts(), fetchPartners()])
      .then(([adsRes, newsRes, partnersRes]) => {
        setAds(adsRes.data.results || []);
        setNews(newsRes.data.results.map(p => formatPost(p, "Latest News")));
        setPartners(partnersRes.data.results || []);
      })
      .catch(err => console.error("Error fetching homepage data:", err))
      .finally(() => {
        setLoading(false);
        stopProgress();
      });
  }, []);

  useEffect(() => {
    if (ads.length > 1) {
      const interval = setInterval(() => {
        setActiveAdIndex((prev) => (prev + 1) % ads.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [ads.length]);

  if (loading) return <div>Loading...</div>;

  const featuredPost = news[0] || null;

  const trendingPosts = [...news]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  const renderCategorySection = (category) => {
    const categoryPosts = news
      .filter(post => post.category.toLowerCase() === category.toLowerCase())
      .slice(0, 3);

    return categoryPosts.length > 0 ? (
      <div className="category-column" key={category}>
        <h3>{category}</h3>
        {categoryPosts.map(post => (
          <NewsCard key={post.id} post={post} layout="vertical" />
        ))}
      </div>
    ) : null;
  };

  return (
    <div className="home-container">
      {featuredPost && (
        <section className="hero-section">
          <div className="hero-featured">
            <FeaturedCard post={featuredPost} />
          </div>
          <div className="hero-trending">
            <h2>Trending Now</h2>
            <div className="trending-list">
              {trendingPosts.map((post, index) => (
                <TrendingItem key={post.id} post={post} rank={index + 1} />
              ))}
            </div>
          </div>
        </section>
      )}

      {ads.length > 0 && (
        <section className="premium-ad-carousel">
          <div className="ad-carousel-inner">
            {ads.slice(0, 3).map((ad, index) => (
              <div
                key={ad.id}
                className={`ad-slide ${index === activeAdIndex ? "active" : ""}`}
              >
                <a href={ad.link || "#"} target="_blank" rel="noreferrer">
                  <img
                    src={ad.image || "/default-news-image.jpeg"}
                    alt={ad.title || "Advertisement"}
                  />
                  <div className="ad-content">
                    <span className="ad-badge">Sponsored</span>
                    <h3>{ad.title || "Special Offer"}</h3>
                    <p>{ad.description || "Limited time only!"}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
          <div className="ad-controls">
            {ads.slice(0, 3).map((_, index) => (
              <button
                key={index}
                className={index === activeAdIndex ? "active" : ""}
                onClick={() => setActiveAdIndex(index)}
                aria-label={`View ad ${index + 1}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* Main News Feed */}
      <div className="content-grid">
        <main className="news-feed">
          <h2 className="section-title">Latest Updates</h2>
          {news.map((post, index) => (
            <div key={post.id} className="news-item">
              <NewsCard post={post} layout="horizontal" />
              {(index + 1) % 3 === 0 && ads[index % ads.length] && (
                <div className="inline-ad">
                  <a
                    href={ads[index % ads.length].link || "#"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={ads[index % ads.length].image || "/default-ad.jpg"}
                      alt="Advertisement"
                    />
                    <div className="ad-label">Sponsored Content</div>
                  </a>
                </div>
              )}
            </div>
          ))}
        </main>
      </div>

      {/* Standalone Sidebar below */}
      <aside className="sidebar standalone-sidebar">
        <div className="newsletter-card">
          <h3>Stay Updated</h3>
          <p>Subscribe to our newsletter for daily updates</p>
          <NewsletterForm />
        </div>

        <div className="popular-posts">
          <h3>Most Popular</h3>
          {[...news]
            .sort((a, b) => b.views - a.views)
            .slice(0, 4)
            .map((post) => (
              <NewsCard key={post.id} post={post} layout="compact" />
            ))}
        </div>
      </aside>

      {/* Category Sections */}
      <section className="category-sections">
        {["Technology", "Business", "Entertainment"].map(renderCategorySection)}
      </section>

      {/* Partner Marquee */}
      {partners.length > 0 && <PartnerMarquee partners={partners} />}
    </div>
  );
}

export default Home;
