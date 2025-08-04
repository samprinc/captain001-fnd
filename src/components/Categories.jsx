import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchCategories } from "../api/api";
import "./Categories.css";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeCategory = searchParams.get("category");

  useEffect(() => {
    fetchCategories()
      .then((res) => setCategories(res.data.results))
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories.");
      });
  }, []);

  return (
    <div className="categories-container">
      <h2 className="categories-title">Explore Categories</h2>
      {error && <p className="error-message">{error}</p>}

      <div className="category-links">
        <Link
          to="/news"
          className={`category-link ${!activeCategory ? "active" : ""}`}
        >
          All
        </Link>

        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/news?category=${category.id}`}
            className={`category-link ${
              activeCategory === String(category.id) ? "active" : ""
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;
