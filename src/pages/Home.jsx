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
import MobileAd from "../components/MobileAd"
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
    const fetchAllData = async () => {
      startProgress();
      try {
        const [adsRes, newsRes, partnersRes] = await Promise.all([
          fetchAds(),
          fetchPosts(), // ✅ correct: fetchPosts expects an object, not a string
          fetchPartners(),
        ]);

        const news = newsRes.data.results.map((p) =>
          formatPost(p, "Latest News")
        );

        setData({
          ads: adsRes.data.results || [],
          news,
          partners: partnersRes.data.results || [],
        });
      } catch (err) {
        console.error("Error fetching home page data:", err);
      } finally {
        setLoading(false);
        stopProgress();
      }
    };

    fetchAllData();
  }, []);

  const newsPosts = data.news || [];
  const featuredPost = newsPosts[0] || null;
  const trendingPosts = newsPosts.slice(1, 4).sort((a, b) => b.views - a.views);
  const latestNews = newsPosts.slice(4);

  if (loading) {
    return (
      <div className="loading-state">
        <Spinner />
      </div>
    );
  }

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

      <div className="main-content-grid">
        <main className="news-feed">
          <h2 className="section-title">Latest News</h2>
          {latestNews.length > 0 ? (
            <div className="news-feed-grid">
              {latestNews.map((post) => (
                <NewsCard
                  key={`${post.id}-${post.slug || post.title}`}
                  post={post}
                />
              ))}
            </div>
          ) : (
            <p className="no-content-message">
              No news articles found at this time.
            </p>
          )}
        </main>


        <aside className="sidebar">
          {data.ads.length > 0 ? (
            <AdCarousel ads={data.ads} />
          ) : (
            <p>No ads available.</p>
          )}
          <div className="newsletter-card">
            <h3>Stay Updated</h3>
            <p>
              Subscribe to our newsletter for the latest updates from the
              ministry
            </p>
            <NewsletterForm />
          </div>
        
        </aside>


      </div>

       <MobileAd ads={data.ads} />

      {data.partners.length > 0 && (
        <PartnerMarquee partners={shuffleArray(data.partners)} />
      )}
    </div>
  );
}

export default Home;
