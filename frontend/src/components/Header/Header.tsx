import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  // Update active section on hash change (for in-page scrolling)
  useEffect(() => {
    if (!isHomePage) return;
    const handleHashChange = () => {
      const hash = window.location.hash;
      setActiveSection(hash || "#home");
    };
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [isHomePage]);

  const linkClass = (hash: string) =>
    `hover:text-sky-400 ${
      activeSection === hash ? "text-sky-400 font-bold" : "text-white"
    }`;

  return (
    <header
      className="bg-black bg-opacity-70 backdrop-blur-sm shadow-lg text-white fixed w-full z-50"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent black
        backdropFilter: "blur(10px)", // stronger blur
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.7)", // soft shadow
      }}
    >
      <div className="max-w-7xl mx-auto px-1 py-4 flex items-center justify-between">
        <div className="flex items-center gap-1 text-xl font-semibold">
          🌌<span>Space</span>
          <span className="text-sky-400">plorer</span>
        </div>
        <nav className="space-x-6 hidden md:block">
          <Link to="/" className={linkClass("/")}>
            Home
          </Link>
          {isHomePage ? (
            <>
              <a href="#about" className={linkClass("#about")}>
                About
              </a>
              <a href="#features" className={linkClass("#features")}>
                Features
              </a>
              <a href="#contact" className={linkClass("#contact")}>
                Contact
              </a>
            </>
          ) : (
            <>
              <Link to="/#about" className={linkClass("#about")}>
                About
              </Link>
              <Link to="/#features" className={linkClass("#features")}>
                Features
              </Link>
              <Link to="/#contact" className={linkClass("#contact")}>
                Contact
              </Link>
            </>
          )}
        </nav>
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="white"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {menuOpen && (
            <div className="md:hidden px-4 pb-4 space-y-2">
              <Link to="/" className="block hover:text-sky-400">
                Home
              </Link>
              {isHomePage ? (
                <>
                  <a href="#about" className="block hover:text-sky-400">
                    About
                  </a>
                  <a href="#features" className="block hover:text-sky-400">
                    Features
                  </a>
                  <a href="#contact" className="block hover:text-sky-400">
                    Contact
                  </a>
                </>
              ) : (
                <>
                  <Link to="/#about" className="block hover:text-sky-400">
                    About
                  </Link>
                  <Link to="/#features" className="block hover:text-sky-400">
                    Features
                  </Link>
                  <Link to="/#contact" className="block hover:text-sky-400">
                    Contact
                  </Link>
                </>
              )}
              <Link to="/exploreAPOD" className="block hover:text-sky-400">
                APOD Gallery
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
