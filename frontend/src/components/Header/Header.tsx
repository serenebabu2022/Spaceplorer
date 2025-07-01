import React, { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xl font-semibold">
          🌌<span>Space</span>
          <span className="text-blue-400">plorer</span>
        </div>
        <nav className="space-x-6 hidden md:block">
          <a href="#home" className="hover:text-blue-400">
            Home
          </a>
          <a href="#about" className="hover:text-blue-400">
            About
          </a>
          <a href="#features" className="hover:text-blue-400">
            Features
          </a>
          <a href="#contact" className="hover:text-blue-400">
            Contact
          </a>
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
              <a href="#home" className="block text-white hover:text-blue-400">
                Home
              </a>
              <a href="#about" className="block text-white hover:text-blue-400">
                About
              </a>
              <a
                href="#features"
                className="block text-white hover:text-blue-400"
              >
                Features
              </a>
              <a
                href="#contact"
                className="block text-white hover:text-blue-400"
              >
                Contact
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
