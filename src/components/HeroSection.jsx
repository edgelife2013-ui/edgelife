import React from 'react';
import { Heart } from 'lucide-react';
import homepageImage from '../assets/Homepage/HomepageImage.jpg';

export default function HeroSection({ setActivePage }) {
  return (
    <section id="home" className="hero-section-container">
      <div className="hero-shimmer-box hero-shimmer" style={{ minHeight: '580px' }} data-component="@components/HeroSection.jsx">
        {/* Animated Background Image */}
        <div
          className="hero-bg-img anim-scale-up"
          style={{
            backgroundImage: `url(${homepageImage})`,
            animationDuration: '1.2s'
          }}
        ></div>

        {/* Dark Gradient Overlay */}
        <div
          className="hero-overlay-gradient anim-fade-in"
          style={{
            background: 'linear-gradient(to right, rgba(26,18,8,0.90) 50%, rgba(26,18,8,0.45) 100%)',
            animationDuration: '1s'
          }}
        ></div>

        {/* Left Decorative Accent Border */}
        <div className="hero-left-bar anim-fade-in anim-delay-4"></div>

        {/* Main Content Layout: text left, card right */}
        <div className="hero-content-wrapper">
          <div className="hero-inner-layout">

            {/* LEFT: Text Content */}
            <div className="hero-text-col">
              {/* Subtitle / Tagline */}
              <div className="hero-tag-row anim-slide-left anim-delay-2">
                <div className="accent-line"></div>
                <span className="hero-tag-text">
                  Edge Life · A trust to build a value world.
                </span>
              </div>

              {/* Heading */}
              <h1 className="hero-main-title anim-fade-up anim-delay-3">
                Building Value &amp; Uplifting Lives in{' '}
                <span className="text-secondary">Manipur</span>
              </h1>

              {/* Description */}
              <p className="hero-subtext anim-fade-up anim-delay-4">
                Founded in 2013, Edge Life works tirelessly to empower women through handloom handicrafts, provide mobile healthcare &amp; hygiene institutes, and support destitute children and elderly across Imphal and relief camps in Manipur.
              </p>

              {/* Action Buttons */}
              <div className="hero-cta-group anim-fade-up anim-delay-5">
                <button
                  onClick={() => setActivePage ? setActivePage('projects') : null}
                  className="btn-hero-primary"
                >
                  Explore Our Work
                </button>
                <button
                  onClick={() => setActivePage ? setActivePage('donate') : null}
                  className="btn-hero-secondary"
                >
                  Make a Donation
                </button>
              </div>

              {/* Counter Stats Bar */}
              <div className="hero-stats-row">
                <div className="stat-col anim-bounce-in anim-delay-4">
                  <span className="stat-num text-secondary">2013</span>
                  <span className="stat-lbl">Founded Year</span>
                </div>
                <div className="stat-col anim-bounce-in anim-delay-5">
                  <span className="stat-num text-secondary">2,000+</span>
                  <span className="stat-lbl">Patients Treated</span>
                </div>
                <div className="stat-col anim-bounce-in anim-delay-6">
                  <span className="stat-num text-secondary">240+</span>
                  <span className="stat-lbl">Women Empowered</span>
                </div>
                <div className="stat-col anim-bounce-in anim-delay-7">
                  <span className="stat-num text-secondary">5</span>
                  <span className="stat-lbl">UN SDGs Targeted</span>
                </div>
              </div>
            </div>

            {/* RIGHT: Floating Donation Card */}
            <div className="hero-floating-card-box">
              <div className="hero-floating-icon">
                <Heart size={18} className="heart-icon" />
              </div>
              <p className="hero-floating-title">Be the Change</p>
              <p className="hero-floating-desc">
                Your support directly funds education and healthcare for underprivileged families across Manipur.
              </p>
              <button
                onClick={() => setActivePage ? setActivePage('donate') : null}
                className="btn-hero-floating"
              >
                Donate Today
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
