import React from 'react';

export default function Navbar({ activePage, setActivePage }) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="navbar-sticky">
      <div className="navbar-container">
        {/* Brand Logo */}
        <div className="brand-logo" onClick={() => setActivePage('home')}>
          <div className="brand-badge">E</div>
          <div className="brand-text">
            <span className="brand-title">Edge Life</span>
            <span className="brand-subtitle">A trust to build a value world..</span>
          </div>
        </div>

        {/* Center Navigation Links */}
        <div className="nav-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => setActivePage(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right CTA Button */}
        <button
          className="btn-donate-nav"
          onClick={() => setActivePage('donate')}
        >
          Donate Now
        </button>
      </div>
    </nav>
  );
}
