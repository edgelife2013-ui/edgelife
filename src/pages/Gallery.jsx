import React, { useState, useEffect } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import gallery1 from '../assets/Gallery/gallery1.jpeg';
import gallery2 from '../assets/Gallery/gallery2.jpeg';
import gallery13 from '../assets/Gallery/gallery13.jpeg';
import gallery3 from '../assets/Gallery/gallery3.png';
import gallery4 from '../assets/Gallery/gallery4.jpeg';
import gallery5 from '../assets/Gallery/gallery5.jpeg';
import gallery6 from '../assets/Gallery/gallery6.jpeg';
import gallery7 from '../assets/Gallery/gallery7.png';
import gallery8 from '../assets/Gallery/gallery8.png';
import gallery9 from '../assets/Gallery/gallery9.png';
import gallery10 from '../assets/Gallery/gallery10.png';
import gallery11 from '../assets/Gallery/gallery11.png';
import gallery12 from '../assets/Gallery/gallery12.png';

export default function Gallery({ setActivePage }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const galleryItems = [
    { id: 1, tag: 'COMMUNITY', title: 'Community Medicine Distribution', class: 'bento-tall', image: gallery1 },
    { id: 2, tag: 'CULTURE', title: 'Manipuri Culture', class: '', image: gallery2 },
    { id: 3, tag: 'HEALTH', title: 'Traditional Textile Weaving Workshop', class: 'bento-tall', image: gallery3 },
    { id: 4, tag: 'LIVELIHOOD', title: 'Mobile Medical Health Checkup', class: '', image: gallery4 },
    { id: 5, tag: 'EDUCATION', title: 'Children Community Learning & Art Activity', class: 'bento-tall', image: gallery5 },
    { id: 6, tag: 'WOMEN', title: 'Women Self Help Group Circle Meeting', class: '', image: gallery6 },
    { id: 7, tag: 'RELIEF', title: 'Emergency Food & Relief Distribution', class: '', image: gallery7 },
    { id: 8, tag: 'HEALTH', title: 'Medicine Distribution', class: '', image: gallery8 },
    { id: 9, tag: 'HEALTH', title: 'Rural Community Health Drive', class: '', image: gallery9 },
    { id: 10, tag: 'COMMUNITY', title: 'Educatating People over Health & Hygiene', class: 'bento-tall', image: gallery10 },
    { id: 11, tag: 'ARTICLE', title: 'Newspaper Colunm', class: '', image: gallery11 },
    { id: 12, tag: 'EDUCATION', title: 'Digital Literacy & Resource Distribution', class: '', image: gallery12 },
    { id: 13, tag: 'HEALTH', title: 'Health Camp Organized by Edge Foundation', class: '', image: gallery13 },

  ];

  // Handle Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : galleryItems.length - 1));
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev < galleryItems.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const activeItem = lightboxIndex !== null ? galleryItems[lightboxIndex] : null;

  return (
    <div className="gallery-page">
      {/* 1. HERO BANNER */}
      <section className="hero-wrapper" style={{ minHeight: '400px' }}>
        <div className="hero-bg-overlay"></div>
        <div className="hero-placeholder-bg">
          <img src={gallery1} alt="Gallery Cover" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} />
        </div>

        <div className="container hero-content-container" style={{ gridTemplateColumns: '1fr', paddingTop: '60px', paddingBottom: '60px' }}>
          <div className="hero-main" style={{ maxWidth: '800px' }}>
            <div className="hero-tagline" style={{ justifyContent: 'flex-end' }}>
              <span>PHOTO STORIES</span>
            </div>
            <h1 className="hero-title" style={{ fontSize: '3.4rem' }}>
              Moments of Hope & Change
            </h1>
            <p className="hero-description" style={{ fontSize: '1.15rem' }}>
              Visual stories from our communities — celebrating resilience, progress, and the human connections that drive our work.
            </p>
          </div>
        </div>
      </section>

      {/* 2. GALLERY GRID WITH HOVER & LIGHTBOX */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-cream)' }}>
        <div className="container">
          <div className="section-label-wrapper">
            <div className="section-label-line"></div>
            <span className="section-label-text">FULL GALLERY</span>
          </div>

          <div className="bento-gallery-grid">
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                className={`bento-item ${item.class} gallery-card-container`}
                onClick={() => setLightboxIndex(index)}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="gallery-card-img"
                />

                {/* Hover Overlay with Zoom Icon & Title */}
                <div className="gallery-card-overlay">
                  <div className="gallery-zoom-icon">
                    <ZoomIn size={16} />
                  </div>
                  <div className="gallery-overlay-text">
                    <span className="gallery-overlay-title">{item.title}</span>
                    <span className="gallery-overlay-cat">{item.tag}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. LIGHTBOX MODAL */}
      {lightboxIndex !== null && activeItem && (
        <div className="lightbox-backdrop" onClick={() => setLightboxIndex(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button className="lightbox-close-btn" onClick={() => setLightboxIndex(null)}>
              <X size={20} />
            </button>

            {/* Prev Button */}
            <button
              className="lightbox-nav-btn prev"
              onClick={() =>
                setLightboxIndex((prev) => (prev > 0 ? prev - 1 : galleryItems.length - 1))
              }
            >
              <ChevronLeft size={24} />
            </button>

            {/* Main Image View Container */}
            <div className="lightbox-main-img-box">
              <img
                key={activeItem.id}
                src={activeItem.image}
                alt={activeItem.title}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              />
            </div>

            {/* Next Button */}
            <button
              className="lightbox-nav-btn next"
              onClick={() =>
                setLightboxIndex((prev) => (prev < galleryItems.length - 1 ? prev + 1 : 0))
              }
            >
              <ChevronRight size={24} />
            </button>

            {/* Footer Bar */}
            <div className="lightbox-footer-bar">
              <div>
                <h4 className="lightbox-footer-title">{activeItem.title}</h4>
                <span className="lightbox-footer-badge">{activeItem.tag}</span>
              </div>
              <span className="lightbox-counter">
                {lightboxIndex + 1} / {galleryItems.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top-grid">
            <div className="footer-brand">
              <div className="brand-logo" onClick={() => setActivePage('home')}>
                <div className="brand-badge">E</div>
                <div className="brand-text">
                  <span className="brand-title">Edge Life</span>
                </div>
              </div>
              <p className="footer-brand-desc">
                A trust to build a value world.. Empowering communities across Manipur through healthcare, hygiene, and women livelihood programs since 2013.
              </p>

            </div>

            <div>
              <h4 className="footer-col-title">NAVIGATE</h4>
              <ul className="footer-links-list">
                <li><a href="#home" onClick={(e) => { e.preventDefault(); setActivePage('home'); }}>Home</a></li>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); setActivePage('about'); }}>About Us</a></li>
                <li><a href="#projects" onClick={(e) => { e.preventDefault(); setActivePage('projects'); }}>Projects</a></li>
                <li><a href="#gallery" onClick={(e) => { e.preventDefault(); setActivePage('gallery'); }}>Gallery</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); setActivePage('contact'); }}>Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-col-title">PROGRAMS</h4>
              <ul className="footer-links-list">
                <li><a href="#projects" onClick={(e) => { e.preventDefault(); setActivePage('projects'); }}>Healthcare Institute</a></li>
                <li><a href="#projects" onClick={(e) => { e.preventDefault(); setActivePage('projects'); }}>Mobile Medical Camps</a></li>
                <li><a href="#projects" onClick={(e) => { e.preventDefault(); setActivePage('projects'); }}>Women Handloom Handicrafts</a></li>
                <li><a href="#projects" onClick={(e) => { e.preventDefault(); setActivePage('projects'); }}>Emergency Relief Support</a></li>
                <li><a href="#projects" onClick={(e) => { e.preventDefault(); setActivePage('projects'); }}>Youth Skill Development</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-col-title">CONTACT</h4>
              <div className="footer-contact-info">
                <p>Singjamei Okram Leikai</p>
                <p>Imphal West, Manipur – 795001</p>
                <p>edgelifemanipur05@gmail.com</p>
                <p>+91 9436231759</p>

              </div>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <span>© 2026 Edge Life. A trust to build a value world.. All rights reserved.</span>
            <div className="footer-bottom-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
