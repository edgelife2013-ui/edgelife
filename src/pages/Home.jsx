import React, { useState } from 'react';
import { BookOpen, Stethoscope, Sprout, ArrowRight, QrCode, Building2 } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import about1 from '../assets/Homepage/About1.png';
import about2 from '../assets/Homepage/About2.jpeg';
import educationcard from '../assets/Homepage/Educationcard.png';
import medicalcamp from '../assets/Homepage/medicalcamp.jpeg';
import weaving from '../assets/Homepage/weaving.png';
import community1 from '../assets/Homepage/community1.jpeg';
import community2 from '../assets/Homepage/community2.jpeg';
import community3 from '../assets/Homepage/community3.jpeg';
import community4 from '../assets/Homepage/community4.jpeg';


export default function Home({ setActivePage }) {
  const [selectedAmount, setSelectedAmount] = useState('1000');
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const presetAmounts = ['500', '1000', '2500', '5000'];

  const galleryItems = [
    { id: 1, img: community1, alt: 'Community Event 1' },
    { id: 2, img: community2, alt: 'Community Event 2' },
    { id: 3, img: community3, alt: 'Community Event 3' },
    { id: 4, img: community4, alt: 'Community Event 4' },
  ];

  return (
    <div className="home-page">
      {/* 1. HERO SECTION */}
      <HeroSection setActivePage={setActivePage} />

      {/* 2. ABOUT US SECTION */}
      <section className="about-section">
        <div className="container">
          <div className="section-label-wrapper">
            <div className="section-label-line"></div>
            <span className="section-label-text">ABOUT US</span>
          </div>

          <div className="about-grid">
            {/* Left Image Composite */}
            <div className="about-image-composite">
              <div className="about-main-img-box" style={{ border: '7px solid var(--bg-cream)', borderRadius: '15px', overflow: 'hidden' }}>
                <img
                  src={about2}
                  alt="Childrens"
                  style={{ width: '103%', height: '100%', marginLeft: '-3%', objectFit: 'fill', objectPosition: 'center', display: 'block' }}
                />
              </div>

              {/* Red Stat Badge Overlay */}
              <div className="about-badge-overlay">
                <div className="about-badge-num">2013</div>
                <div className="about-badge-txt">Founded in Manipur</div>
              </div>

              {/* Sub Image Overlay */}
              <div className="about-sub-img-box">
                <img
                  src={about1}
                  alt="Edge Life Community Work"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#ffffff', objectPosition: 'center', display: 'block', borderRadius: '10px', border: '2px solid var(--bg-cream)' }}
                />
              </div>
            </div>

            {/* Right Text Content */}
            <div className="about-content-right">
              <h2 className="section-title">A trust to build a value world..</h2>

              <div className="about-paragraphs">
                <p>
                  Founded in 2013 by Okram Romita, Edge Life was inspired by the touching sight of nurses sleeping on the floor due to financial hardships. This ignited our mission to promote social and economic sustainability and revive fading social values across Manipur.
                </p>
                <p>
                  We assist destitute elderly and children with food and clothing, empower women through handloom handicrafts, and run mobile medical camps & the Edge Life Healthcare Institute.
                </p>
              </div>

              {/* 3 Pillars */}
              <div className="about-features-grid">
                <div className="feature-pill-card">
                  <div className="feature-pill-icon health">
                    <Stethoscope size={18} />
                  </div>
                  <div className="feature-pill-title">Healthcare Institute</div>
                  <div className="feature-pill-desc">Free medicine & affordable clinic launched July 2024</div>
                </div>

                <div className="feature-pill-card">
                  <div className="feature-pill-icon health">
                    <Stethoscope size={18} />
                  </div>
                  <div className="feature-pill-title">Mobile Camps</div>
                  <div className="feature-pill-desc">2,000+ patients treated in relief camps since July 2023</div>
                </div>

                <div className="feature-pill-card">
                  <div className="feature-pill-icon live">
                    <Sprout size={18} />
                  </div>
                  <div className="feature-pill-title">Women Livelihood</div>
                  <div className="feature-pill-desc">240+ women empowered in handloom handicrafts</div>
                </div>
              </div>

              <button className="btn-green" onClick={() => setActivePage('about')}>
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR PROJECTS SECTION */}
      <section className="projects-section">
        <div className="container">
          <div className="section-label-wrapper">
            <div className="section-label-line"></div>
            <span className="section-label-text">OUR PROJECTS</span>
          </div>

          <div className="section-header-flex">
            <h2 className="section-title" style={{ margin: 0 }}>Making a Real Difference</h2>
            <button className="header-link" onClick={() => setActivePage('projects')}>
              View All Projects →
            </button>
          </div>

          <div className="projects-grid">
            {/* Project Card 1 */}
            <div className="project-card">
              <div className="project-img-wrapper">
                <span className="project-tag-badge health">Healthcare</span>
                <div className="image-placeholder" style={{ width: '100%', height: '100%', backgroundColor: '#D9C4AB' }}>
                  <img
                    src={medicalcamp}
                    alt="Healthcare Institute"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', borderRadius: '15px', border: '7px solid var(--bg-cream)' }}
                  />
                </div>
              </div>
              <div className="project-card-body">
                <h3 className="project-card-title">Healthcare & Hygiene Institute</h3>
                <p className="project-card-desc">
                  Providing free medicine, health consultations, and doorstep clinics for marginalized communities in Manipur.
                </p>
                <button className="project-card-link" onClick={() => setActivePage('projects')}>
                  Read more <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="project-card">
              <div className="project-img-wrapper">
                <span className="project-tag-badge health">Relief</span>
                <div className="image-placeholder" style={{ width: '100%', height: '100%', backgroundColor: '#CBBBA7' }}>
                  <img
                    src={educationcard}
                    alt="Mobile Health Camps"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', borderRadius: '15px', border: '7px solid var(--bg-cream)' }}
                  />
                </div>
              </div>
              <div className="project-card-body">
                <h3 className="project-card-title">Mobile Medical Camps & Relief</h3>
                <p className="project-card-desc">
                  Treating over 2,000 inmates in relief camps, distributing free medicine, food supplements, sanitary pads and innerwear.
                </p>
                <button className="project-card-link" onClick={() => setActivePage('projects')}>
                  Read more <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Project Card 3 */}
            <div className="project-card">
              <div className="project-img-wrapper">
                <span className="project-tag-badge live">Livelihood</span>
                <div className="image-placeholder" style={{ width: '100%', height: '100%', backgroundColor: '#BFB19E' }}>
                  <img
                    src={weaving}
                    alt="Women Weaving Handicrafts"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', borderRadius: '15px', border: '7px solid var(--bg-cream)' }}
                  />
                </div>
              </div>
              <div className="project-card-body">
                <h3 className="project-card-title">Women Handloom Handicrafts</h3>
                <p className="project-card-desc">
                  Empowering 240+ women through handloom weaving skills and economic sustainability for their livelihood.
                </p>
                <button className="project-card-link" onClick={() => setActivePage('projects')}>
                  Read more <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GALLERY / MOMENTS OF IMPACT */}
      <section className="gallery-section">
        <div className="container">
          <div className="section-label-wrapper">
            <div className="section-label-line"></div>
            <span className="section-label-text">GALLERY</span>
          </div>

          <div className="section-header-flex">
            <h2 className="section-title" style={{ margin: 0 }}>Moments of Impact</h2>
            <button className="header-link" onClick={() => setActivePage('gallery')}>
              View Full Gallery →
            </button>
          </div>

          <div className="gallery-grid">
            {galleryItems.map((item) => (
              <div key={item.id} className="gallery-item" onClick={() => setActivePage('gallery')}>
                <img src={item.img} alt={item.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. IMPACT STATS */}
      <section className="stats-counter-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-card-num">2013</div>
              <div className="stat-card-lbl">Founded Year</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-num">2,000+</div>
              <div className="stat-card-lbl">Patients Treated in Camps</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-num">240+</div>
              <div className="stat-card-lbl">Women Empowered</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-num">5</div>
              <div className="stat-card-lbl">UN SDGs Targeted</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION / DONATE PROMPT */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner-card">
            <div className="cta-banner-content">
              <h2 className="cta-title">Help Us Build a Value World</h2>
              <p className="cta-desc">
                Your support enables Edge Life to expand free medical clinics, supply relief essentials, and empower women with sustainable handloom livelihoods in Manipur.
              </p>
            </div>
            <button className="btn-cta-gold" onClick={() => setActivePage('donate')}>
              Donate Now
            </button>
          </div>
        </div>
      </section>

      {/* 7. FOOTER SECTION */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top-grid">
            {/* Brand Col */}
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
              <div className="social-icons-row">
                <button className="social-btn">FB</button>
                <button className="social-btn">TW</button>
                <button className="social-btn">IG</button>
              </div>
            </div>

            {/* Navigate Col */}
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

            {/* Programs Col */}
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

            {/* Contact Col */}
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
            <span>© 2025 Edge Life. A trust to build a value world.. All rights reserved.</span>
            <div className="footer-bottom-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Use</a>
              <a href="#80g" onClick={(e) => e.preventDefault()}>80G Certificate</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
