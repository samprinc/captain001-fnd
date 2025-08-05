import { useEffect, useState } from "react";
import { fetchAds, fetchPosts, fetchPartners } from "../api/api";
import { formatPost } from "../utils/postFormatter";
import { startProgress, stopProgress } from "../utils/nprogress";
import NewsCard from "../components/NewsCard";
import FeaturedCard from "../components/FeaturedCard";
import TrendingItem from "../components/TrendingItem";
import NewsletterForm from "../components/NewsletterForm";
import PartnerMarquee from "../components/PartnerMarquee";
import AdCarousel from "../components/AdCarousel";
import InlineAd from "../components/InlineAd";
import Spinner from "../components/Spinner";
import "./Home.css";

// Helper function to shuffle an array
const shuffleArray = (array) => {
  if (!Array.isArray(array)) return [];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function Home() {
  const [data, setData] = useState({
    ads: [],
    news: [],
    partners: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    startProgress();
    const fetchData = async () => {
      const results = await Promise.allSettled([
        fetchAds(),
        fetchPosts(),
        fetchPartners(),
      ]);

      const [adsRes, newsRes, partnersRes] = results;

      const allNews =
        newsRes.status === "fulfilled" && newsRes.value.data.results
          ? newsRes.value.data.results.map((p) => formatPost(p, "Latest News"))
          : [];

      setData({
        ads: adsRes.status === "fulfilled" ? adsRes.value.data.results || [] : [],
        news: allNews,
        partners: partnersRes.status === "fulfilled" ? partnersRes.value.data.results || [] : [],
      });

      setLoading(false);
      stopProgress();
    };

    fetchData();
  }, []);

// ... (rest of the code)

 // --- 📰 More Flexible Slicing Logic ---
   const newsPosts = data.news || [];
   const featuredPost = newsPosts[0] || null;

  // Use up to 3 posts for trending.
     const trendingPosts = newsPosts
      .slice(1, 4) // Indices 1, 2, 3
     .sort((a, b) => b.views - a.views);

 // The remaining posts, from index 4 onwards, are the latest news.
     const latestNews = newsPosts.slice(4);

  // ... (rest of the code)
  if (loading) {
    return (
      <div className="loading-state">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Hero Section with Featured and Trending */}
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

      {/* Main Content Grid */}
      <div className="main-content-grid">
        <main className="news-feed">
          <h2 className="section-title">Latest News</h2>
          {latestNews.length > 0 ? (
            <div className="news-feed-grid">
              {latestNews.map((post) => (
                <NewsCard key={`${post.id}-${post.slug || post.title}`} post={post} />

              ))}
            </div>
          ) : (
            <p className="no-content-message">No news articles found at this time.</p>
          )}
        </main>

        {/* Sidebar */}
        <aside className="sidebar">
          {data.ads.length > 0 ? <AdCarousel ads={data.ads} /> : <p>No ads available.</p>}
          <div className="newsletter-card">
            <h3>Stay Updated</h3>
            <p>Subscribe to our newsletter for the latest updates from the ministry</p>
            <NewsletterForm />
          </div>
          {data.ads.length > 0 ? <InlineAd ads={data.ads} /> : <p>No inline ads available.</p>}
        </aside>
      </div>

      {/* Partners Marquee */}
      {data.partners.length > 0 && <PartnerMarquee partners={shuffleArray(data.partners)} />}
    </div>
  );
}

export default Home;