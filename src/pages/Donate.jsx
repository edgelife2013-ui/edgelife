import React, { useState, useEffect, useRef } from 'react';
import { Check, ArrowRight, ArrowLeft, Heart, Smartphone, AlertCircle, Sparkles, ShieldCheck } from 'lucide-react';

const PRESET_AMOUNTS = [500, 1000, 2500, 5000, 10000];

// Dynamic Confetti Component
function Confetti() {
  const colors = ["#C83E2B", "#D4953B", "#2E6B4F", "#B93322", "#FFFFFF"];
  const particles = Array.from({ length: 60 });

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 3000, overflow: 'hidden' }}>
      {particles.map((_, i) => {
        const color = colors[i % colors.length];
        const left = Math.random() * 100;
        const delay = Math.random() * 0.8;
        const size = 6 + Math.random() * 8;
        const duration = 2 + Math.random() * 2;
        return (
          <div
            key={i}
            style={{
              position: 'fixed',
              top: 0,
              left: `${left}vw`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              animation: `fall ${duration}s ease-in ${delay}s infinite`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(105vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// Step Progress Bar
function StepIndicator({ step }) {
  const steps = [
    { num: 1, label: "Choose Amount" },
    { num: 2, label: "Pay via UPI" },
    { num: 3, label: "Confirm UTR" },
  ];

  return (
    <div className="step-indicator-wrapper">
      {steps.map((s, i) => (
        <div key={s.num} className="step-item">
          <div className="step-col">
            <div className={`step-circle ${step === s.num ? 'active' : step > s.num ? 'completed' : ''}`}>
              {step > s.num ? <Check size={18} /> : s.num}
            </div>
            <span className={`step-label ${step === s.num ? 'active' : ''}`}>{s.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`step-connector-line ${step > s.num ? 'completed' : ''}`} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function Donate({ setActivePage }) {
  const [step, setStep] = useState(1);
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Form Fields for Step 3
  const [auditForm, setAuditForm] = useState({
    name: '',
    email: '',
    phone: '',
    utr: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const topRef = useRef(null);

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [step]);

  const effectiveAmount = isCustom ? parseInt(customAmount || '0', 10) : selectedAmount;
  const canProceed = effectiveAmount >= 100;

  const upiId = "ngoplaceholder@upi";
  const upiPayLink = `upi://pay?pa=${upiId}&pn=NGO+Placeholder&am=${effectiveAmount}&cu=INR&tn=Donation+for+Manipur+Programs`;
  // Dynamic QR Code generation using API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiPayLink)}`;

  const handleSelectPreset = (val) => {
    setSelectedAmount(val);
    setIsCustom(false);
    setCustomAmount('');
  };

  const handleSelectCustom = () => {
    setIsCustom(true);
    setSelectedAmount(null);
  };

  // Form validation & submission
  const validateForm = () => {
    const errors = {};
    if (!auditForm.name || auditForm.name.trim().length < 2) {
      errors.name = 'Full name is required';
    }
    if (!auditForm.email || !/\S+@\S+\.\S+/.test(auditForm.email)) {
      errors.email = 'Enter a valid email address';
    }
    if (!auditForm.phone || !/^[6-9]\d{9}$/.test(auditForm.phone)) {
      errors.phone = 'Enter a valid 10-digit Indian mobile number';
    }
    if (!auditForm.utr || !/^\d{12}$/.test(auditForm.utr)) {
      errors.utr = 'UTR must be exactly 12 digits';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Post to free Web3Forms / Google Sheets Web app endpoint for UTR receipt verification
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'YOUR_FREE_WEB3FORMS_ACCESS_KEY',
          form_type: 'Donation UTR Verification Receipt Request',
          amount: `₹${effectiveAmount}`,
          name: auditForm.name,
          email: auditForm.email,
          phone: auditForm.phone,
          utr: auditForm.utr,
          message: auditForm.message,
        }),
      });
    } catch (err) {
      // Fallback
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfetti(true);
      setStep(4);
      setTimeout(() => setShowConfetti(false), 4500);
    }, 1200);
  };

  return (
    <div className="donate-page" ref={topRef}>
      {showConfetti && <Confetti />}

      {/* 1. HERO SECTION */}
      <section className="hero-wrapper" style={{ backgroundColor: '#B93322', minHeight: '360px', padding: '60px 0' }}>
        <div className="donate-banner-bg-shape"></div>
        <div className="container">
          <div className="section-label-wrapper left">
            <span className="section-label-text gold">GIVE WITH PURPOSE</span>
            <div className="section-label-line" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}></div>
          </div>

          <div style={{ maxWidth: '720px' }}>
            <h1 className="hero-title" style={{ fontSize: '3.4rem', marginBottom: '16px' }}>
              Your Generosity, <span className="gold-text">Their Future</span>
            </h1>
            <p className="hero-description" style={{ fontSize: '1.1rem', color: '#F5D9D5' }}>
              A transparent, 3-step process to ensure your contribution reaches Manipuri families directly without friction or doubt.
            </p>
          </div>
        </div>
      </section>

      {/* 2. 3-STEP DONATION FLOW CONTAINER */}
      <section className="donate-flow-section">
        <div className="container">
          {step < 4 && <StepIndicator step={step} />}

          <div className="donate-card-box">
            {/* STEP 1: CHOOSE AMOUNT */}
            {step === 1 && (
              <div>
                <h2 className="section-title" style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '8px' }}>
                  How much would you like to give?
                </h2>
                <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto 28px', fontSize: '0.9rem' }}>
                  Minimum donation: ₹100. 100% of your contribution goes to active programs in Manipur.
                </p>

                {/* Presets */}
                <div className="preset-amount-grid">
                  {PRESET_AMOUNTS.map((val) => (
                    <button
                      key={val}
                      className={`donate-amount-btn ${!isCustom && selectedAmount === val ? 'active' : ''}`}
                      onClick={() => handleSelectPreset(val)}
                    >
                      ₹{val.toLocaleString()}
                      {val === 1000 && <span className="popular-badge">Popular</span>}
                    </button>
                  ))}
                  <button
                    className={`donate-amount-btn ${isCustom ? 'active' : ''}`}
                    onClick={handleSelectCustom}
                  >
                    Other
                  </button>
                </div>

                {/* Custom Amount Input */}
                {isCustom && (
                  <div style={{ position: 'relative', marginBottom: '20px' }}>
                    <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontWeight: '800', fontSize: '1.2rem', color: '#8A7060' }}>
                      ₹
                    </span>
                    <input
                      type="number"
                      value={customAmount}
                      min={100}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="Enter custom amount"
                      className="form-input"
                      style={{ paddingLeft: '36px', fontSize: '1.2rem', fontWeight: '700', minHeight: '52px' }}
                    />
                  </div>
                )}

                {/* Impact Preview */}
                {canProceed && (
                  <div className="impact-preview-banner">
                    ✨ <strong>₹{effectiveAmount.toLocaleString()}</strong> can fund{' '}
                    <span>
                      {effectiveAmount >= 5000
                        ? 'a full month of scholarship tuition for a student'
                        : effectiveAmount >= 2500
                          ? 'materials for 5 women weaving skill sessions'
                          : effectiveAmount >= 1000
                            ? 'a mobile medical clinic camp in a remote village'
                            : 'a school stationery kit for a child'}
                    </span>
                  </div>
                )}

                <button
                  className="btn-primary"
                  style={{ width: '100%', padding: '16px', fontSize: '1.05rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  disabled={!canProceed}
                  onClick={() => setStep(2)}
                >
                  Continue to Payment <ArrowRight size={18} />
                </button>
              </div>
            )}

            {/* STEP 2: DYNAMIC UPI QR & PAYMENT BRIDGE */}
            {step === 2 && (
              <div>
                <h2 className="section-title" style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '8px' }}>
                  Make Your Payment
                </h2>
                <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto 28px', fontSize: '0.9rem' }}>
                  Pay <strong>₹{effectiveAmount.toLocaleString()}</strong> via UPI — scan the dynamic QR or tap the deep link.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                  {/* Dynamic QR Box */}
                  <div className="qr-box-card">
                    <span style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#5A4A3A' }}>
                      Dynamic UPI QR Code
                    </span>

                    <div className="qr-image-wrapper">
                      <img src={qrCodeUrl} alt={`UPI QR Code for ₹${effectiveAmount}`} />
                    </div>

                    <span style={{ fontSize: '0.75rem', color: '#8A7060', marginBottom: '4px' }}>UPI ID:</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--primary-red)', backgroundColor: '#FDF0EE', padding: '4px 12px', borderRadius: '6px' }}>
                      {upiId}
                    </span>
                  </div>

                  {/* One-Tap UPI Deep Link */}
                  <div
                    style={{
                      backgroundColor: '#E2F0EA',
                      border: '2px solid #B8DCCE',
                      borderRadius: 'var(--radius-md)',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      gap: '12px',
                    }}
                  >
                    <Smartphone size={42} style={{ color: 'var(--green-accent)' }} />
                    <h4 style={{ fontWeight: '700', fontSize: '1.05rem', color: '#1A1816' }}>One-Tap Mobile UPI</h4>
                    <p style={{ fontSize: '0.82rem', color: '#4A443D', lineHeight: '1.4' }}>
                      Opens Google Pay, PhonePe, Paytm, or BHIM directly with <strong>₹{effectiveAmount}</strong> pre-filled.
                    </p>

                    <a
                      href={upiPayLink}
                      className="btn-green"
                      style={{ width: '100%', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px' }}
                    >
                      <Smartphone size={16} /> Pay ₹{effectiveAmount.toLocaleString()} via UPI
                    </a>
                  </div>
                </div>

                {/* UTR Notice Box */}
                <div style={{ backgroundColor: '#FAF2E6', border: '1px solid #E5D5BC', borderRadius: '8px', padding: '12px 16px', marginBottom: '24px', textAlign: 'center' }}>
                  <p style={{ fontSize: '0.85rem', color: '#5A4A3A' }}>
                    💡 <strong style={{ color: 'var(--primary-red)' }}>After paying:</strong> Note down your 12-digit UTR transaction number from your UPI app history to confirm your receipt in the next step.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    className="btn-outline-gold"
                    style={{ color: 'var(--text-dark)', borderColor: '#D4C4B0' }}
                    onClick={() => setStep(1)}
                  >
                    <ArrowLeft size={16} /> Back
                  </button>

                  <button
                    className="btn-primary"
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                    onClick={() => setStep(3)}
                  >
                    I've Made the Payment <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: AUDIT FORM / UTR CONFIRMATION */}
            {step === 3 && (
              <div>
                <h2 className="section-title" style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '8px' }}>
                  Verify Your Contribution
                </h2>
                <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto 24px', fontSize: '0.9rem' }}>
                  Enter your UTR transaction number so our NGO team can match and issue your <strong>80G Tax Exemption Receipt</strong> for ₹{effectiveAmount.toLocaleString()}.
                </p>

                <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    {/* Name */}
                    <div className="form-field-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        className="form-input"
                        value={auditForm.name}
                        onChange={(e) => setAuditForm({ ...auditForm, name: e.target.value })}
                      />
                      {formErrors.name && <span style={{ fontSize: '0.75rem', color: '#C83E2B' }}>{formErrors.name}</span>}
                    </div>

                    {/* Email */}
                    <div className="form-field-group">
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        className="form-input"
                        value={auditForm.email}
                        onChange={(e) => setAuditForm({ ...auditForm, email: e.target.value })}
                      />
                      {formErrors.email && <span style={{ fontSize: '0.75rem', color: '#C83E2B' }}>{formErrors.email}</span>}
                    </div>

                    {/* Phone */}
                    <div className="form-field-group">
                      <label className="form-label">Mobile Number *</label>
                      <input
                        type="tel"
                        placeholder="10-digit mobile number"
                        className="form-input"
                        value={auditForm.phone}
                        onChange={(e) => setAuditForm({ ...auditForm, phone: e.target.value })}
                      />
                      {formErrors.phone && <span style={{ fontSize: '0.75rem', color: '#C83E2B' }}>{formErrors.phone}</span>}
                    </div>

                    {/* UTR */}
                    <div className="form-field-group">
                      <label className="form-label">
                        UTR Number * <span style={{ fontWeight: 'normal', color: '#8A7060' }}>(12 digits)</span>
                      </label>
                      <input
                        type="text"
                        maxLength={12}
                        placeholder="e.g. 423156789012"
                        className="form-input"
                        style={{ letterSpacing: '2px', fontWeight: '700' }}
                        value={auditForm.utr}
                        onChange={(e) => setAuditForm({ ...auditForm, utr: e.target.value.replace(/\D/g, '') })}
                      />
                      {formErrors.utr && <span style={{ fontSize: '0.75rem', color: '#C83E2B' }}>{formErrors.utr}</span>}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="form-field-group">
                    <label className="form-label">Message (Optional)</label>
                    <textarea
                      placeholder="A note for our NGO team — dedications, feedback, or greetings!"
                      className="form-textarea"
                      style={{ minHeight: '80px' }}
                      value={auditForm.message}
                      onChange={(e) => setAuditForm({ ...auditForm, message: e.target.value })}
                    ></textarea>
                  </div>

                  {/* 80G Tax Exemption Notice */}
                  <div style={{ backgroundColor: '#E2F0EA', border: '1px solid #B8DCCE', borderRadius: '6px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShieldCheck size={20} style={{ color: 'var(--green-accent)', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.78rem', color: '#1E4620' }}>
                      Eligible for <strong>80G Tax Deduction</strong> under Income Tax Act. Your verified receipt will be sent to your email.
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
                    <button
                      type="button"
                      className="btn-outline-gold"
                      style={{ color: 'var(--text-dark)', borderColor: '#D4C4B0' }}
                      onClick={() => setStep(2)}
                    >
                      <ArrowLeft size={16} /> Back
                    </button>

                    <button
                      type="submit"
                      className="btn-primary"
                      style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : <><Heart size={16} /> Confirm My Donation</>}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* STEP 4: SUCCESS CELEBRATION */}
            {step === 4 && (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--green-accent)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    boxShadow: '0 8px 24px rgba(46, 107, 79, 0.3)',
                  }}
                >
                  <Sparkles size={40} />
                </div>

                <h2 className="section-title" style={{ fontSize: '2.4rem', marginBottom: '10px' }}>
                  Thank You, Truly!
                </h2>

                <p style={{ fontSize: '1.1rem', color: '#4A443D', maxWidth: '480px', margin: '0 auto 16px', lineHeight: '1.6' }}>
                  Your gift of <strong style={{ color: 'var(--primary-red)' }}>₹{effectiveAmount.toLocaleString()}</strong> is now on its way to empowering communities across Manipur.
                </p>

                <p style={{ fontSize: '0.88rem', color: '#8A7060', marginBottom: '32px' }}>
                  Once our team verifies the UTR, your official <strong>80G Tax Exemption Receipt</strong> will be emailed directly to your inbox.
                </p>

                <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
                  <button className="btn-primary" onClick={() => setActivePage('home')}>
                    Return Home
                  </button>
                  <button className="btn-outline-gold" style={{ color: 'var(--text-dark)', borderColor: '#D4C4B0' }} onClick={() => setActivePage('projects')}>
                    See Projects You're Funding
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* TRUST BADGES FOOTNOTE */}
          {step < 4 && (
            <div className="trust-badges-grid">
              <div className="trust-badge-card">🔒 Secure UPI Payment</div>
              <div className="trust-badge-card">📄 80G Tax Receipt</div>
              <div className="trust-badge-card">✅ FCRA Compliant</div>
              <div className="trust-badge-card">📊 Transparent Audit</div>
            </div>
          )}
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
              <div className="social-icons-row">
                <button className="social-btn">FB</button>
                <button className="social-btn">TW</button>
                <button className="social-btn">IG</button>
                <button className="social-btn">YT</button>
              </div>
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
              <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
              <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Use</a>
              <a href="#80g" onClick={(e) => e.preventDefault()}>80G Certificate</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
