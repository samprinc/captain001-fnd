// src/components/Header.jsx
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSearch, FaChevronDown } from "react-icons/fa";
import "./Header.css";

function Header() {
  const [uiState, setUiState] = useState({
    isMenuOpen: false,
    isScrolled: false,
    isSearchVisible: false,
    activeDropdown: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const toggleState = (key, value) => {
    setUiState((prevState) => ({
      ...prevState,
      [key]: value !== undefined ? value : !prevState[key],
      ...(key === "isMenuOpen" && { isSearchVisible: false }),
      ...(key === "isSearchVisible" && { isMenuOpen: false }),
      ...((key === "isMenuOpen" || key === "isSearchVisible") && {
        activeDropdown: null,
      }),
    }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/news?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setUiState((prevState) => ({
        ...prevState,
        isSearchVisible: false,
        isMenuOpen: false,
      }));
    }
  };

  useEffect(() => {
  let lastScrollTop = window.scrollY || 0;

  const handleScroll = () => {
    const currentScrollTop = window.scrollY || 0;
    const isScrollingDown = currentScrollTop > lastScrollTop;

    setUiState(prev => ({
      ...prev,
      isScrolled: currentScrollTop > 50,
      isHidden: isScrollingDown && currentScrollTop > 50,
    }));

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  const menuLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "News", path: "/news" },
    { name: "Events", path: "/events" },
    {
      name: "More",
      dropdown: true,
      items: [
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
      ],
    },
  ];

  const handleLinkClick = () => {
    setUiState({
      isMenuOpen: false,
      isScrolled: uiState.isScrolled,
      isSearchVisible: false,
      activeDropdown: null,
    });
  };

  const handleDropdownToggle = (dropdownName) => {
    setUiState(prevState => ({
      ...prevState,
      activeDropdown: prevState.activeDropdown === dropdownName ? null : dropdownName
    }));
  };

  return (
    <header className={`header ${uiState.isScrolled ? "scrolled" : ""} ${uiState.isHidden ? "hide-on-scroll" : ""}`}>

      <div className="header-container">
        <div className="header-left">
          <Link to="/" className="logo-link" onClick={handleLinkClick}>
            <img src="/logo.svg" alt="Captain001" className="logo-image" />
          </Link>

          {/* Mobile Title */}
          <div className="mobile-title">
            <strong>Captain 001 Media</strong>
          </div>


          <nav className="main-nav">
            <ul className="nav-list">
              {menuLinks.map((link) => (
                <li key={link.name} className="nav-item">
                  {link.dropdown ? (
                    <div className={`dropdown ${uiState.activeDropdown === link.name ? 'open' : ''}`}>
                      <button 
                        className="dropdown-toggle" 
                        onClick={() => handleDropdownToggle(link.name)}
                        aria-expanded={uiState.activeDropdown === link.name}
                      >
                        {link.name}
                        <FaChevronDown className="dropdown-icon" />
                      </button>
                      <div className="dropdown-menu">
                        {link.items.map((group) => (
                          <div key={group.name} className="dropdown-group">
                            <h4 className="dropdown-group-title">{group.name}</h4>
                            {group.items.map((item) => (
                              <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                  `dropdown-item ${isActive ? "active-link" : ""}`
                                }
                                onClick={handleLinkClick}
                              >
                                {item.name}
                              </NavLink>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `nav-link ${isActive ? "active-link" : ""}`
                      }
                      onClick={handleLinkClick}
                    >
                      {link.name}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="header-right">
          <button
            className={`search-toggle ${uiState.isSearchVisible ? "active" : ""}`}
            onClick={() => toggleState("isSearchVisible")}
            aria-label="Toggle search"
          >
            <FaSearch className="search-icon" />
          </button>
          <button
            className={`hamburger ${uiState.isMenuOpen ? "active" : ""}`}
            onClick={() => toggleState("isMenuOpen")}
            aria-label="Toggle menu"
          >
            {uiState.isMenuOpen ? (
              <FaTimes className="close-icon" />
            ) : (
              <FaBars className="menu-icon" />
            )}
          </button>
        </div>
      </div>
      <div className={`mobile-menu-container ${uiState.isMenuOpen ? "open" : ""}`}>
        <nav className="mobile-nav">
          <ul className="mobile-nav-list">
            {menuLinks.map((link) => (
              <li key={link.name} className="mobile-nav-item">
                {link.dropdown ? (
                  <>
                    <button
                      className={`mobile-dropdown-toggle ${
                        uiState.activeDropdown === link.name ? "active" : ""
                      }`}
                      onClick={() => handleDropdownToggle(link.name)}
                    >
                      {link.name}
                      <FaChevronDown className={`mobile-dropdown-icon ${
                        uiState.activeDropdown === link.name ? "rotate" : ""
                      }`} />
                    </button>
                    <div
                      className={`mobile-dropdown-menu ${
                        uiState.activeDropdown === link.name ? "open" : ""
                      }`}
                    >
                      {link.items.map((group) => (
                        <div key={group.name} className="mobile-dropdown-group">
                          <h4 className="mobile-dropdown-group-title">{group.name}</h4>
                          {group.items.map((item) => (
                            <NavLink
                              key={item.path}
                              to={item.path}
                              className={({ isActive }) =>
                                `mobile-dropdown-item ${isActive ? "active-link" : ""}`
                              }
                              onClick={handleLinkClick}
                            >
                              {item.name}
                            </NavLink>
                          ))}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `mobile-nav-link ${isActive ? "active-link" : ""}`
                    }
                    onClick={handleLinkClick}
                  >
                    {link.name}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className={`search-bar-container ${uiState.isSearchVisible ? "open" : ""}`}>
        <form onSubmit={handleSearchSubmit} className="search-form">
          <label htmlFor="search-input" className="visually-hidden">
            Search
          </label>
          <input
            type="text"
            id="search-input"
            placeholder="Search all content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            aria-label="Search field"
          />
          <button type="submit" className="search-button">
            <FaSearch className="search-submit-icon" />
          </button>
        </form>
      </div>
    </header>
  );
}

export default Header;