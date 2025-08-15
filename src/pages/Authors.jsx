import { useEffect, useState } from "react";
import { fetchAuthors } from "../api/api";
import "./Author.css";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/dco3yxmss/";

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAuthors = async () => {
      try {
        const res = await fetchAuthors();

        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.results)
          ? res.data.results
          : [];

        setAuthors(data);
      } catch (err) {
        console.error("Error fetching authors:", err);
        setError("Failed to load authors.");
      } finally {
        setLoading(false);
      }
    };

    loadAuthors();
  }, []);

  if (loading) {
    return (
      <div className="authors-section">
        <div className="authors-header">
          <h1>Meet Our Authors</h1>
          <p>Passionate storytellers bringing you the latest and best from CaptainMedia.</p>
        </div>
        <div className="authors-list">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="author-card skeleton">
              <div className="skeleton-img"></div>
              <div className="skeleton-text short"></div>
              <div className="skeleton-text long"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) return <p className="error-message">{error}</p>;

  return (
    <section className="authors-section">
      <header className="authors-header">
        <h1>Meet Our Authors</h1>
        <p>Passionate storytellers bringing you the latest and best from CaptainMedia.</p>
      </header>

      <div className="authors-list">
        {authors.map((author) => (
          <article key={author.id} className="author-card">
            <img
              src={author.profile_pic ? `${CLOUDINARY_BASE_URL}${author.profile_pic}` : "/default-profile.png"}
              alt={author.name}
            />
            <h3>{author.name}</h3>
            <p>{author.bio}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Authors;
