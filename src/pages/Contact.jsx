import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact({ setActivePage }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    agree: false,
    _honey: '',
  });

  const [formStatus, setFormStatus] = useState({ submitting: false, success: false, error: '' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, success: false, error: '' });

    try {
      // Post to FormSubmit free API for direct email forwarding to edgelifemanipur05@gmail.com
      const response = await fetch('https://formsubmit.co/ajax/edgelifemanipur05@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          _subject: formData.subject || 'New Contact Form Submission',
          message: formData.message,
          _honey: formData._honey,
          _autoresponder: "Thank you for reaching out to Edge Life. We have received your message and our team will get back to you shortly. Edge Life · A trust to build a value world..",
        }),
      });

      const res = await response.json();
      if (response.ok || res.success === 'true') {
        setFormStatus({ submitting: false, success: true, error: '' });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '', agree: false });
      } else {
        setFormStatus({ submitting: false, success: false, error: res.message || 'Something went wrong.' });
      }
    } catch (err) {
      setFormStatus({ submitting: false, success: false, error: 'Failed to send message. Please check your connection and try again.' });
    }
  };

  return (
    <div className="contact-page">
      {/* 1. HERO SECTION */}
      <section className="hero-wrapper" style={{ backgroundColor: '#2E6B4F', minHeight: '360px', padding: '60px 0' }}>
        <div className="donate-banner-bg-shape"></div>
        <div className="container">
          <div className="section-label-wrapper left">
            <span className="section-label-text gold">GET IN TOUCH</span>
            <div className="section-label-line" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}></div>
          </div>

          <div style={{ maxWidth: '720px' }}>
            <h1 className="hero-title" style={{ fontSize: '3.4rem', marginBottom: '16px' }}>
              We'd Love to Hear From You
            </h1>
            <p className="hero-description" style={{ fontSize: '1.1rem', color: '#E2F0EA' }}>
              Questions about our work? Want to partner or volunteer? Reach out — we're always happy to connect.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CONTACT INFORMATION & FORM SECTION */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Left Column: Contact Information */}
            <div className="contact-info-col">
              <h2 className="contact-info-title">Contact Information</h2>

              {/* Addresses */}
              <div className="contact-item-group">
                <div className="contact-item-header">
                  <MapPin size={18} className="contact-item-icon" />
                  <span>Registered Address</span>
                </div>
                <div className="contact-item-text">
                  <p>Singjamei Okram Leikai</p>
                  <p>Imphal West, Manipur – 795001</p>
                </div>
              </div>

              <div className="contact-item-group">
                <div className="contact-item-header">
                  <MapPin size={18} className="contact-item-icon" />
                  <span>Office Address</span>
                </div>
                <div className="contact-item-text">
                  <p>Singjamei Sograkpam Leikai</p>
                  <p>Imphal West, Manipur – 795001</p>
                </div>
              </div>

              {/* Phone */}
              <div className="contact-item-group">
                <div className="contact-item-header">
                  <Phone size={18} className="contact-item-icon" />
                  <span>Phone & Contact Person</span>
                </div>
                <div className="contact-item-text">
                  <p><strong>Okram Romita</strong></p>
                  <p>+91 9436231759</p>
                </div>
              </div>

              {/* Email & Web */}
              <div className="contact-item-group">
                <div className="contact-item-header">
                  <Mail size={18} className="contact-item-icon" />
                  <span>Email & Website</span>
                </div>
                <div className="contact-item-text">
                  <p>edgelifemanipur05@gmail.com</p>

                </div>
              </div>

              {/* Office Hours */}
              <div className="contact-item-group">
                <div className="contact-item-header">
                  <Clock size={18} className="contact-item-icon" />
                  <span>Office Hours</span>
                </div>
                <div className="contact-item-text">
                  <p>Monday – Saturday: 9 AM – 5 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>

              {/* Connect with us */}
              <div style={{ marginTop: '10px' }}>
                <span className="form-label" style={{ display: 'block', marginBottom: '12px' }}>Connect with us</span>
                <div className="social-icons-row">
                  <button className="social-btn" style={{ borderColor: '#E5DDCF', color: '#3A352F' }}>FB</button>
                  <button className="social-btn" style={{ borderColor: '#E5DDCF', color: '#3A352F' }}>TW</button>
                  <button className="social-btn" style={{ borderColor: '#E5DDCF', color: '#3A352F' }}>IG</button>
                  <button className="social-btn" style={{ borderColor: '#E5DDCF', color: '#3A352F' }}>YT</button>
                </div>
              </div>
            </div>

            {/* Right Column: Send us a Message */}
            <div className="contact-form-card">
              <div>
                <h3 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '6px' }}>Send us a Message</h3>
                <p className="section-subtitle" style={{ fontSize: '0.88rem' }}>
                  Fill out the form below and we'll respond within 24 hours.
                </p>
              </div>

              {formStatus.success ? (
                <div style={{ backgroundColor: '#E6F4EA', color: '#1E4620', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                  <h4 style={{ fontWeight: '700', marginBottom: '6px' }}>Message Sent Successfully!</h4>
                  <p style={{ fontSize: '0.88rem' }}>Thank you for reaching out via email.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Honeypot Spam Protection */}
                  <input
                    type="text"
                    name="_honey"
                    style={{ display: 'none' }}
                    value={formData._honey}
                    onChange={handleChange}
                  />

                  <div className="form-field-group">
                    <label className="form-label">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Full name"
                      className="form-input"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-field-group">
                    <label className="form-label">Your Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="your@email.com"
                      className="form-input"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-field-group">
                    <label className="form-label">Phone (Optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 9436231759"
                      className="form-input"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-field-group">
                    <label className="form-label">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      placeholder="How can we help?"
                      className="form-input"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-field-group">
                    <label className="form-label">Message *</label>
                    <textarea
                      name="message"
                      required
                      placeholder="Tell us what's on your mind..."
                      className="form-textarea"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="agree"
                      required
                      checked={formData.agree}
                      onChange={handleChange}
                    />
                    <span>I agree to the privacy policy of Edge Life. *</span>
                  </label>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ width: '100%', marginTop: '6px' }}
                    disabled={formStatus.submitting}
                  >
                    {formStatus.submitting ? 'Sending...' : 'Send Message'}
                  </button>

                  <p style={{ fontSize: '0.72rem', color: '#989087', textAlign: 'center', marginTop: '4px' }}>
                    Powered by FormSubmit. Your message is secure and private.
                  </p>
                </form>
              )}
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
            <span>© 2025 Edge Life. A trust to build a value world.. All rights reserved.</span>
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
