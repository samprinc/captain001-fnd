import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Header.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const navigate = useNavigate();

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isSearchVisible) setIsSearchVisible(false);
  };

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/news?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchVisible(false);
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mainLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "News", path: "/news" },
    { name: "Events", path: "/events" },
    { name: "Categories", path: "/categories" },
  ];

  const dropdownLinks = [
    {
      name: "Media",
      items: [
        { name: "Ads", path: "/ads" },
        { name: "Bookings", path: "/bookings" },
      ],
    },
    {
      name: "Company",
      items: [
        { name: "About Us", path: "/about" },
        { name: "Partners", path: "/partners" },
        { name: "Privacy Policy", path: "/privacy" },
      ],
    },
    {
      name: "Connect",
      items: [
        { name: "Contact", path: "/contact" },
        { name: "Feedback", path: "/feedback" },
        { name: "Book", path: "/book" },
      ],
    },
  ];

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-top">
        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <div className="logo-container">
          <Link to="/" className="logo">
            <img
              src="/captain001-logo.jpeg"
              alt="Captain001 Logo"
              className="logo-image"
            />
          </Link>
        </div>

        <div className="header-right">
          <button
            className={`search-toggle ${isSearchVisible ? "active" : ""}`}
            onClick={toggleSearch}
            aria-label="Toggle search"
          >
            🔍
          </button>
        </div>
      </div>

      <div className={`search-container ${isSearchVisible ? "visible" : ""}`}>
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search latest posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">Go</button>
        </form>
      </div>

      <nav className={`main-nav ${isMenuOpen ? "open" : ""}`}>
        <div className="main-nav-content">
          {mainLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="nav-link"
              onClick={toggleMenu}
            >
              {link.name}
            </Link>
          ))}

          {dropdownLinks.map((group, index) => (
            <div
              key={group.name}
              className={`dropdown ${activeDropdown === index ? "active" : ""}`}
            >
              <button
                className="dropdown-toggle"
                onClick={() => toggleDropdown(index)}
              >
                {group.name} ▼
              </button>
              <div className={`dropdown-menu ${activeDropdown === index ? "open" : ""}`}>
                {group.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="dropdown-item"
                    onClick={() => {
                      toggleMenu();
                      setActiveDropdown(null);
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Header;
