import React from 'react';
import education from '../assets/Project/education.png';
import mobilemedical from '../assets/Project/mobilemedical.jpeg';
import weaving from '../assets/Project/weaving.png';


export default function Projects({ setActivePage }) {
  return (
    <div className="projects-page">
      {/* 1. HERO BANNER */}
      <section className="donate-banner-section" style={{ minHeight: '340px', padding: '60px 0' }}>
        <div className="donate-banner-bg-shape"></div>
        <div className="container">
          <div className="section-label-wrapper left">
            <span className="section-label-text gold">OUR IMPACT</span>
            <div className="section-label-line" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}></div>
          </div>

          <div style={{ maxWidth: '720px' }}>
            <h1 className="donate-banner-title" style={{ fontSize: '3.4rem', marginBottom: '16px' }}>
              Programs Creating Change
            </h1>
            <p className="donate-banner-desc" style={{ fontSize: '1.1rem' }}>
              Every project is designed, implemented, and monitored with our communities to ensure real, lasting impact.
            </p>
          </div>
        </div>
      </section>

      {/* 2. PROJECT DETAIL ROWS */}
      <section className="projects-detail-section">
        <div className="container">

          {/* Project 1: Healthcare Institute */}
          <div className="project-detail-row">
            <div className="project-detail-img-box">
              <div className="image-placeholder" style={{ width: '100%', height: '100%', backgroundColor: '#D9C4AB' }}>
                <img
                  src={mobilemedical}
                  alt="Edge Life Healthcare & Hygiene Institute"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', borderRadius: '15px', border: '7px solid var(--bg-cream)' }}
                />
              </div>
            </div>

            <div className="project-detail-content">
              <div className="section-label-wrapper left">
                <div className="section-label-line" style={{ maxWidth: '120px' }}></div>
                <span className="section-label-text">HEALTHCARE</span>
              </div>

              <h2 className="project-detail-title">Edge Life Healthcare & Hygiene Institute</h2>
              <p className="project-detail-subtitle">
                Inaugurated on July 10, 2024, providing free medicine and affordable medical treatments.
              </p>

              <ul className="yellow-bullet-list">
                <li>Free medicine and consultation for underprivileged families</li>
                <li>Doorstep clinic access for marginalized communities</li>
                <li>Maternal, health & hygiene awareness sessions</li>
                <li>Specialized support for local community wellness</li>
              </ul>
            </div>
          </div>

          {/* Project 2: Mobile Medical Camps & Relief (Reversed layout) */}
          <div className="project-detail-row reverse">
            <div className="project-detail-content">
              <div className="section-label-wrapper left">
                <div className="section-label-line" style={{ maxWidth: '120px' }}></div>
                <span className="section-label-text">RELIEF & HEALTH</span>
              </div>

              <h2 className="project-detail-title">Mobile Medical Camps & Relief</h2>
              <p className="project-detail-subtitle">
                Organized free mobile health camps treating over 2,000 inmates in Manipur relief camps since July 2023.
              </p>

              <ul className="yellow-bullet-list">
                <li>Free medicine & nutritional food supplements</li>
                <li>Innerwear and sanitary pad distribution for girls & women</li>
                <li>Targeted aid for Internally Displaced Persons (IDP)</li>
                <li>Continuous emergency healthcare relief in camp areas</li>
              </ul>
            </div>

            <div className="project-detail-img-box">
              <div className="image-placeholder" style={{ width: '100%', height: '100%', backgroundColor: '#CBBBA7' }}>
                <img
                  src={education}
                  alt="Mobile Health Camps"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', borderRadius: '15px', border: '7px solid var(--bg-cream)' }}
                />
              </div>
            </div>
          </div>

          {/* Project 3: Women Handloom Handicrafts */}
          <div className="project-detail-row" style={{ marginBottom: '20px' }}>
            <div className="project-detail-img-box">
              <div className="image-placeholder" style={{ width: '100%', height: '100%', backgroundColor: '#BFB19E' }}>
                <img
                  src={weaving}
                  alt="Handloom Weaving Workshop"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', borderRadius: '15px', border: '7px solid var(--bg-cream)' }}
                />
              </div>
            </div>

            <div className="project-detail-content">
              <div className="section-label-wrapper left">
                <div className="section-label-line" style={{ maxWidth: '120px' }}></div>
                <span className="section-label-text">LIVELIHOOD</span>
              </div>

              <h2 className="project-detail-title">Women Handloom & Handicrafts Program</h2>
              <p className="project-detail-subtitle">
                Empowering women through skill development and economic sustainability since 2017.
              </p>

              <ul className="yellow-bullet-list">
                <li>Established 40 women directly & 200 indirectly in handloom work</li>
                <li>Micro-entrepreneurship programs for youth and women</li>
                <li>Traditional Manipuri weaving skill training</li>
                <li>Market linkage and fair-income support for artisans</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

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
