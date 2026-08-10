import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ activePage, setActivePage }) {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setIsOpen(false);
  };

  return (
    <nav className="navbar-sticky">
      <div className="navbar-container">
        {/* Brand Logo */}
        <div className="brand-logo" onClick={() => handleNavClick('home')}>
          <div className="brand-badge">E</div>
          <div className="brand-text">
            <span className="brand-title">Edge Life</span>
            <span className="brand-subtitle">A trust to build a value world..</span>
          </div>
        </div>

        {/* Center Navigation Links (Desktop) */}
        <div className="nav-links desktop-only">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right CTA Button (Desktop) */}
        <button
          className="btn-donate-nav desktop-only"
          onClick={() => handleNavClick('donate')}
        >
          Donate Now
        </button>

        {/* Mobile Toggle Button */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-nav-drawer ${isOpen ? 'open' : ''}`}>
        <div className="mobile-nav-items">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`mobile-nav-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </button>
          ))}
          <button
            className="btn-donate-mobile"
            onClick={() => handleNavClick('donate')}
          >
            Donate Now
          </button>
        </div>
      </div>
    </nav>
  );
}
