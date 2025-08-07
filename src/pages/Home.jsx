import { useEffect, useState } from "react";
import {
  fetchAds,
  fetchPosts,
  fetchPartners
} from "../api/api";

import { formatPost } from "../utils/postFormatter";
import { startProgress, stopProgress } from "../utils/nprogress";

import HeroSection from "../components/HeroSection";
import RecentEngagements from "../components/RecentEngagements";
import ActiveOffers from "../components/ActiveOffers";

import FeaturedCard from "../components/FeaturedCard";
import TrendingItem from "../components/TrendingItem";
import NewsCard from "../components/NewsCard";
import NewsletterForm from "../components/NewsletterForm";
import PartnerMarquee from "../components/PartnerMarquee";
import MobileAd from "../components/MobileAd";
import AdCarousel from "../components/AdCarousel";
import InlineAd from "../components/InlineAd";

import "./Home.css";

function Home() {
  const [ads, setAds] = useState([]);
  const [news, setNews] = useState([]);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    startProgress();
    Promise.all([fetchAds(), fetchPosts(), fetchPartners()])
      .then(([adsRes, newsRes, partnersRes]) => {
        setAds(adsRes.data.results || []);
        const formattedNews = newsRes.data.results.map((p) => formatPost(p, "Latest News"));
        setNews(formattedNews);
        setPartners(partnersRes.data.results || []);
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
        stopProgress();
      });
  }, []);

  const latestNews = news.slice(1, 7);
  const mostPopular = [...news]
    .sort((a, b) => b.views - a.views)
    .filter((post) => !latestNews.some((n) => n.id === post.id)) // ✅ Avoid duplicates
    .slice(0, 3);

  return (
    <div className="home-container">

      {/* 🎯 Static Marketing Sections */}
      <HeroSection />
      <RecentEngagements />
      <ActiveOffers />

      {/* 🤝 Partners */}
      {loading ? (
        <div className="skeleton partner-skeleton">Loading Partners...</div>
      ) : (
        partners.length > 0 && <PartnerMarquee partners={partners} />
      )}

      {/* 🎞️ Ad Carousel */}
      {loading ? (
        <div className="skeleton ad-skeleton">Loading Ads...</div>
      ) : (
        <AdCarousel ads={ads} />
      )}

      {/* 📰 Latest News Section */}
      {!loading && (
        <section className="news-section">
          <h2>Latest News</h2>
          <InlineAd ads={ads} />
          <div className="content-grid">
            <div className="news-feed">
              {latestNews.map((post) => (
                <NewsCard key={post.id} post={post} />
              ))}
            </div>
            <aside className="sidebar standalone-sidebar">
              <div className="newsletter-card">
                <h3>Stay Updated</h3>
                <p>Subscribe to our newsletter for updates</p>
                <NewsletterForm />
              </div>
              <div className="popular-posts">
                <h3>Most Popular</h3>
                {mostPopular.map((post) => (
                  <NewsCard key={post.id} post={post} layout="compact" />
                ))}
              </div>
            </aside>
          </div>
        </section>
      )}

      {/* 📱 Mobile Ad */}
      {!loading && <MobileAd ads={ads} />}
    </div>
  );
}

export default Home;
