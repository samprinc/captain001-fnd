import React from "react";
import { useAdsQuery, usePostsQuery } from "../hooks/queries";
import { formatPost } from "../utils/postFormatter";

import HeroSection from "../components/HeroSection";
import RecentEngagements from "../components/RecentEngagements";
import ActiveOffers from "../components/ActiveOffers";
import NewsCard from "../components/NewsCard";
import NewsletterForm from "../components/NewsletterForm";
import PartnerMarquee from "../components/PartnerMarquee";
import MobileAd from "../components/MobileAd";
import AdCarousel from "../components/AdCarousel";
import InlineAd from "../components/InlineAd";

import "./Home.css";

const partnerData = [
  { id: 1, name: "Tesh Football Academy", logo: "teshdp.jpg", link: "https://www.facebook.com/profile.php?id=61570923477067" },
  { id: 2, name: "Global Connections Football Club", logo: "glb.jpg", link: "https://www.facebook.com/profile.php?id=100083233507159" },
  { id: 3, name: "Gucha Stars Fc", logo: "gucha.jpg", link: "https://www.facebook.com/groups/944274730630542" },
  { id: 4, name: "Tabaka Ward Uongozi Wa Utu (TAWUWU)", logo: "default-partner", link: null },
];

function Home() {
  const { data: ads = [], isLoading: adsLoading } = useAdsQuery();
  const { data: news = [], isLoading: newsLoading } = usePostsQuery();

  const latestNews = news.slice(0, 6);
  const mostPopular = [...news]
    .sort((a, b) => b.views - a.views)
    .filter((post) => !latestNews.some((n) => n.id === post.id))
    .slice(0, 3);

  return (
    <div className="home-container">
      {/* Marketing Sections */}
      <HeroSection />
      <RecentEngagements />
      <ActiveOffers />

      {/* Partners */}
      <PartnerMarquee partners={partnerData} />

      {/* Ad Carousel */}
      {adsLoading ? (
        <div className="skeleton ad-skeleton">Loading Ads...</div>
      ) : (
        <AdCarousel ads={Array.isArray(ads) ? ads : []} />
      )}

      {/* Latest News Section */}
      {!newsLoading && (
        <section className="news-section">
          <h2>Latest News</h2>
          <InlineAd ads={Array.isArray(ads) ? ads : []} />

          <div className="content-grid">
            <div className="news-feed">
              {/* Horizontal layout by default */}
              {latestNews.map((post) => (
                <NewsCard key={post.id} post={formatPost(post, "Latest News")} layout="horizontal" />
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
                {/* Vertical/compact layout for sidebar */}
                {mostPopular.map((post) => (
                  <NewsCard key={post.id} post={formatPost(post, "Popular")} layout="vertical" />
                ))}
              </div>
            </aside>
          </div>
        </section>
      )}

      {/* Mobile Sticky Ad */}
      {!adsLoading && <MobileAd ads={Array.isArray(ads) ? ads : []} />}
    </div>
  );
}

export default Home;
