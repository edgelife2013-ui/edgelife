import React, { useState, useEffect, useRef } from 'react';
import { Check, ArrowRight, ArrowLeft, Heart, Smartphone, AlertCircle, Sparkles, ShieldCheck, Building2, Copy, UploadCloud, CheckCircle2, FileText } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

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
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' or 'bank'
  const [copiedField, setCopiedField] = useState(null);

  const [bankDetails, setBankDetails] = useState({
    bankName: 'STATE BANK OF INDIA',
    accountNumber: '34437296931',
    ifscCode: 'SBIN0004562',
    branchName: 'IMPHAL SECRETARIAT',
  });

  const handleCopyText = (text, fieldLabel) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldLabel);
    setTimeout(() => setCopiedField(null), 2000);
  };
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
    message: 'Donation for Edge Life',
    _honey: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [screenshotFile, setScreenshotFile] = useState(null);

  const topRef = useRef(null);

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [step]);

  const effectiveAmount = isCustom ? parseInt(customAmount || '0', 10) : selectedAmount;
  const canProceed = effectiveAmount >= 1;

  const upiId = "9436231759@okbizaxis";
  const upiPayLink = `upi://pay?pa=${upiId}&pn=EDGE%20LIFE&am=${effectiveAmount}&cu=INR&tn=Donation%20for%20Edge%20Life`;

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
      const formDataObj = new FormData();
      formDataObj.append('name', auditForm.name);
      formDataObj.append('email', auditForm.email);
      formDataObj.append('phone', auditForm.phone);
      formDataObj.append('utr', auditForm.utr);
      formDataObj.append('amount', `₹${effectiveAmount}`);
      formDataObj.append('purpose', 'Donation for Edge Life');
      formDataObj.append('_honey', auditForm._honey || '');
      formDataObj.append('_autoresponder', "Thank you for your generous contribution to Edge Life. We have received your payment submission details. Edge Life is a registered public trust. If you require a formal donation receipt or have any queries, please contact the NGO directly at edgelifemanipur05@gmail.com or +91 9436231759. Thank you for supporting our community programs in Manipur! - Edge Life");

      if (screenshotFile) {
        formDataObj.append('attachment', screenshotFile);
      }

      // Post to FormSubmit free API for direct email forwarding to edgelifemanipur05@gmail.com
      await fetch('https://formsubmit.co/ajax/edgelifemanipur05@gmail.com', {
        method: 'POST',
        body: formDataObj,
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
                  Minimum donation: ₹1. 100% of your contribution goes to active programs in Manipur.
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
                      min={1}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="Enter custom amount"
                      className="form-input"
                      style={{ paddingLeft: '36px', fontSize: '1.2rem', fontWeight: '700', minHeight: '52px' }}
                    />
                  </div>
                )}

                {/* Error message for invalid custom amount */}
                {isCustom && !canProceed && (
                  <div style={{ color: '#C83E2B', fontSize: '0.85rem', marginTop: '-12px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}>
                    <AlertCircle size={16} /> Minimum donation is ₹1
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

                {/* Payment Method Switcher Tabs */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', justifyContent: 'center' }}>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    style={{
                      padding: '10px 20px',
                      borderRadius: '30px',
                      fontWeight: '700',
                      fontSize: '0.9rem',
                      border: '2px solid #EAE2D5',
                      backgroundColor: paymentMethod === 'upi' ? 'var(--primary-red)' : '#FFFFFF',
                      color: paymentMethod === 'upi' ? '#FFFFFF' : '#4A443D',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: paymentMethod === 'upi' ? '0 4px 12px rgba(200,62,43,0.25)' : 'none'
                    }}
                  >
                    Pay via UPI
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    style={{
                      padding: '10px 20px',
                      borderRadius: '30px',
                      fontWeight: '700',
                      fontSize: '0.9rem',
                      border: '2px solid #EAE2D5',
                      backgroundColor: paymentMethod === 'bank' ? 'var(--primary-red)' : '#FFFFFF',
                      color: paymentMethod === 'bank' ? '#FFFFFF' : '#4A443D',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: paymentMethod === 'bank' ? '0 4px 12px rgba(200,62,43,0.25)' : 'none'
                    }}
                  >
                    Bank Transfer
                  </button>
                </div>

                {paymentMethod === 'upi' ? (
                  <>
                    <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto 24px', fontSize: '0.9rem' }}>
                      Pay <strong>₹{effectiveAmount.toLocaleString()}</strong> via UPI — scan the dynamic QR or copy the official UPI ID to pay in your UPI app.
                    </p>

                    <div className="payment-methods-grid">
                      {/* Dynamic QR Box */}
                      <div className="qr-box-card">
                        <span style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#5A4A3A' }}>
                          Scan QR with Any UPI App
                        </span>

                        <div className="qr-image-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' }}>
                          <QRCodeSVG value={upiPayLink} size={172} level="M" style={{ display: 'block' }} />
                        </div>

                        <div style={{ textAlign: 'center', margin: '2px 0 6px 0' }}>
                          <span style={{ fontSize: '0.75rem', color: '#8A7060', display: 'block' }}>
                            Amount: <strong style={{ color: 'var(--primary-red)' }}>₹{effectiveAmount.toLocaleString()}</strong>
                          </span>
                          <span style={{ fontSize: '0.72rem', color: '#8A7060', display: 'block', marginTop: '2px' }}>
                            Note: <strong>Donation for Edge Life</strong>
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', flexWrap: 'wrap', justifyContent: 'center' }}>
                          <span style={{ fontSize: '0.82rem', fontWeight: '800', color: 'var(--primary-red)', backgroundColor: '#FDF0EE', padding: '5px 10px', borderRadius: '6px', letterSpacing: '0.5px' }}>
                            {upiId}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyText(upiId, 'upi-qr')}
                            style={{
                              backgroundColor: copiedField === 'upi-qr' ? 'var(--green-accent)' : '#FAF6EF',
                              color: copiedField === 'upi-qr' ? '#FFFFFF' : '#1A1816',
                              border: '1px solid #D4C4B0',
                              padding: '5px 10px',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              fontWeight: '700',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            {copiedField === 'upi-qr' ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy ID</>}
                          </button>
                        </div>
                      </div>

                      {/* 3-Step UPI Payment Card */}
                      <div
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '2px solid #EAE2D5',
                          borderRadius: 'var(--radius-md)',
                          padding: '24px',
                          display: 'flex',
                          flexDirection: 'column',
                          textAlign: 'left',
                          gap: '14px',
                          boxShadow: '0 4px 16px rgba(0,0,0,0.04)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #EAE2D5', paddingBottom: '12px' }}>
                          <Smartphone size={26} style={{ color: 'var(--primary-red)' }} />
                          <div>
                            <h4 style={{ fontWeight: '700', fontSize: '1.05rem', color: '#1A1816', margin: 0 }}>Pay with Any UPI App</h4>
                            <p style={{ fontSize: '0.78rem', color: '#8A7060', margin: 0 }}>Google Pay · PhonePe · Paytm · BHIM</p>
                          </div>
                        </div>

                        {/* Step 1: Copy UPI ID */}
                        <div style={{ backgroundColor: '#FAF6EF', padding: '12px 14px', borderRadius: '8px', border: '1px solid #EAE2D5' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                            <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#8A7060', textTransform: 'uppercase' }}>
                              Step 1: Copy Official UPI ID
                            </span>
                            <span style={{ fontSize: '0.72rem', color: 'var(--primary-red)', fontWeight: 'bold' }}>EDGE LIFE</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1A1816', letterSpacing: '0.5px' }}>
                              {upiId}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopyText(upiId, 'upi-box')}
                              style={{
                                backgroundColor: copiedField === 'upi-box' ? 'var(--green-accent)' : 'var(--primary-red)',
                                color: '#FFFFFF',
                                border: 'none',
                                padding: '8px 14px',
                                borderRadius: '6px',
                                fontSize: '0.8rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                transition: 'all 0.2s ease'
                              }}
                            >
                              {copiedField === 'upi-box' ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy UPI ID</>}
                            </button>
                          </div>
                        </div>

                        {/* Step 2 & 3: Amount & Note */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                          <div style={{ backgroundColor: '#FAF6EF', padding: '10px 12px', borderRadius: '8px', border: '1px solid #EAE2D5' }}>
                            <span style={{ fontSize: '0.68rem', fontWeight: 'bold', color: '#8A7060', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                              Step 2: Enter Amount
                            </span>
                            <span style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--primary-red)' }}>
                              ₹{effectiveAmount.toLocaleString()}
                            </span>
                          </div>
                          <div style={{ backgroundColor: '#FAF6EF', padding: '10px 12px', borderRadius: '8px', border: '1px solid #EAE2D5' }}>
                            <span style={{ fontSize: '0.68rem', fontWeight: 'bold', color: '#8A7060', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                              Step 3: Add Note
                            </span>
                            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1A1816' }}>
                              Donation for Edge Life
                            </span>
                          </div>
                        </div>

                        {/* Step 4: Simple Guide */}
                        <div style={{ backgroundColor: '#E2F0EA', border: '1px solid #B8DCCE', borderRadius: '8px', padding: '12px 14px' }}>
                          <p style={{ fontSize: '0.78rem', color: '#1E4620', margin: '0 0 8px 0', lineHeight: '1.45' }}>
                            📱 <strong>How to pay on your phone:</strong><br />
                            1. Open your UPI app (GPay / PhonePe / Paytm / BHIM)<br />
                            2. Tap <strong>"Pay UPI ID"</strong> → paste <strong>{upiId}</strong><br />
                            3. Enter <strong>₹{effectiveAmount}</strong> with note <em>"Donation for Edge Life"</em> and note your 12-digit UTR.
                          </p>

                          <button
                            type="button"
                            onClick={() => handleCopyText(upiId, 'upi-btn-bottom')}
                            style={{
                              width: '100%',
                              backgroundColor: copiedField === 'upi-btn-bottom' ? 'var(--green-accent)' : '#2E6B4F',
                              color: '#FFFFFF',
                              border: 'none',
                              padding: '10px 14px',
                              borderRadius: '6px',
                              fontSize: '0.8rem',
                              fontWeight: '700',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px',
                              transition: 'all 0.2s ease',
                              marginTop: '2px'
                            }}
                          >
                            {copiedField === 'upi-btn-bottom' ? <><Check size={14} /> UPI ID Copied! Open your UPI App</> : <><Copy size={14} /> Copy UPI ID to Clipboard</>}
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto 28px', fontSize: '0.9rem' }}>
                      Transfer <strong>₹{effectiveAmount.toLocaleString()}</strong> directly to our bank account.
                    </p>

                    <div
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '2px solid #EAE2D5',
                        borderRadius: 'var(--radius-md)',
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        textAlign: 'left',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
                      }}
                    >
                      <h4 style={{ fontWeight: '700', fontSize: '1.05rem', color: '#1A1816', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 4px 0' }}>
                        <Building2 size={20} style={{ color: 'var(--primary-red)' }} /> Bank Transfer Details (NEFT / IMPS / RTGS)
                      </h4>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px', marginTop: '4px' }}>
                        {[
                          { label: 'Account Name', value: 'EDGE LIFE' },
                          { label: 'Bank Name', value: bankDetails.bankName },
                          { label: 'Account Number', value: bankDetails.accountNumber },
                          { label: 'IFSC Code', value: bankDetails.ifscCode },
                          { label: 'Branch Name', value: bankDetails.branchName },
                        ].map((item, index) => (
                          <div
                            key={index}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              backgroundColor: '#FAF6EF',
                              padding: '10px 14px',
                              borderRadius: '8px',
                              border: '1px solid #EAE2D5'
                            }}
                          >
                            <div>
                              <span style={{ fontSize: '0.68rem', color: '#8A7060', textTransform: 'uppercase', fontWeight: 'bold', display: 'block', marginBottom: '2px' }}>
                                {item.label}
                              </span>
                              <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#1A1816', letterSpacing: item.label.includes('Number') || item.label.includes('IFSC') ? '1px' : 'normal' }}>
                                {item.value}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleCopyText(item.value, item.label)}
                              style={{
                                backgroundColor: copiedField === item.label ? 'var(--green-accent)' : 'transparent',
                                color: copiedField === item.label ? '#FFFFFF' : 'var(--primary-red)',
                                border: copiedField === item.label ? 'none' : '1px solid var(--primary-red)',
                                padding: '5px 10px',
                                borderRadius: '4px',
                                fontSize: '0.7rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              {copiedField === item.label ? 'Copied!' : 'Copy'}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* UTR Notice Box */}
                <div style={{ backgroundColor: '#FAF2E6', border: '1px solid #E5D5BC', borderRadius: '8px', padding: '12px 16px', margin: '24px 0', textAlign: 'center' }}>
                  <p style={{ fontSize: '0.85rem', color: '#5A4A3A', margin: 0 }}>
                    💡 <strong style={{ color: 'var(--primary-red)' }}>After paying:</strong> Note down your 12-digit UTR transaction number from your payment receipt to confirm in the next step.
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
                  Enter your UTR transaction number and upload a payment screenshot to verify your donation of <strong>₹{effectiveAmount.toLocaleString()}</strong>. Contact us at edgelifemanipur05@gmail.com for receipt details.
                </p>

                <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* Honeypot Spam Protection */}
                  <input
                    type="text"
                    name="_honey"
                    style={{ display: 'none' }}
                    value={auditForm._honey}
                    onChange={(e) => setAuditForm({ ...auditForm, _honey: e.target.value })}
                  />

                  <div className="donate-form-grid">
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

                    {/* Screenshot Upload (Optional) */}
                    <div className="form-field-group form-span-full">
                      <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span>Upload Transaction Screenshot (Optional)</span>
                        <span style={{ fontSize: '0.72rem', color: '#8A7060', fontWeight: 'normal' }}>JPEG, PNG up to 5MB</span>
                      </label>

                      <input
                        type="file"
                        id="payment-screenshot-input"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => setScreenshotFile(e.target.files[0] || null)}
                      />
                      <label htmlFor="payment-screenshot-input" className="screenshot-dropzone">
                        {screenshotFile ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1E4620', fontSize: '0.82rem', fontWeight: '600' }}>
                            <CheckCircle2 size={20} color="#2E6B4F" style={{ flexShrink: 0 }} />
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '240px' }}>
                              {screenshotFile.name}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                setScreenshotFile(null);
                              }}
                              style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#C83E2B', fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }}
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: '#5A4A3A', cursor: 'pointer', padding: '4px 0' }}>
                            <UploadCloud size={22} style={{ color: 'var(--primary-red)', flexShrink: 0 }} />
                            <div style={{ textAlign: 'left' }}>
                              <span style={{ fontSize: '0.82rem', fontWeight: '700', display: 'block', color: '#1A1816' }}>Tap to select payment screenshot</span>
                              <span style={{ fontSize: '0.7rem', color: '#8A7060' }}>Helps our team match your donation instantly</span>
                            </div>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="form-field-group form-span-full">
                    <label className="form-label">Message (Optional)</label>
                    <textarea
                      placeholder="A note for our NGO team — dedications, feedback, or greetings!"
                      className="form-textarea"
                      style={{ minHeight: '70px' }}
                      value={auditForm.message}
                      onChange={(e) => setAuditForm({ ...auditForm, message: e.target.value })}
                    ></textarea>
                  </div>

                  {/* Tax / Receipt Notice */}
                  <div style={{ backgroundColor: '#FAF6EF', border: '1px solid #EAE2D5', borderRadius: '8px', padding: '12px 14px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <ShieldCheck size={20} style={{ color: 'var(--primary-red)', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.78rem', color: '#5A4A3A', lineHeight: '1.45' }}>
                      <strong>Tax Receipt Notice:</strong> Edge Life is a registered public trust. If you require a formal tax receipt for your contribution, please contact the NGO directly with your transaction details at <strong>edgelifemanipur05@gmail.com</strong> or <strong>+91 9436231759</strong>.
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

            {/* STEP 4: SUCCESS CELEBRATION & ON-SCREEN RECEIPT */}
            {step === 4 && (
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <div className="no-print">
                  <div
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--green-accent)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                      boxShadow: '0 8px 24px rgba(46, 107, 79, 0.25)',
                    }}
                  >
                    <Sparkles size={36} />
                  </div>

                  <h2 className="section-title" style={{ fontSize: '2.2rem', marginBottom: '8px' }}>
                    Thank You, Truly!
                  </h2>

                  <p style={{ fontSize: '1.05rem', color: '#4A443D', maxWidth: '480px', margin: '0 auto 20px', lineHeight: '1.5' }}>
                    Your contribution of <strong style={{ color: 'var(--primary-red)' }}>₹{effectiveAmount.toLocaleString()}</strong> has been submitted to support community programs in Manipur.
                  </p>
                </div>

                {/* On-Screen Receipt Card */}
                <div
                  className="receipt-print-card"
                  style={{
                    backgroundColor: '#FAF6EF',
                    border: '1px solid #EAE2D5',
                    borderRadius: '12px',
                    padding: '20px 24px',
                    maxWidth: '440px',
                    margin: '0 auto 24px',
                    textAlign: 'left',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.04)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #EAE2D5', paddingBottom: '10px', marginBottom: '12px' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#8A7060', display: 'block' }}>
                        Submission Confirmation
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#8A7060' }}>Edge Life (Regd. Public Trust)</span>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#2E6B4F', fontWeight: 'bold', backgroundColor: '#E2F0EA', padding: '3px 8px', borderRadius: '4px' }}>
                      Received
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#8A7060' }}>Donor Name:</span>
                      <strong style={{ color: '#1A1816' }}>{auditForm.name || 'Anonymous Donor'}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#8A7060' }}>Amount:</span>
                      <strong style={{ color: 'var(--primary-red)', fontSize: '1rem' }}>₹{effectiveAmount.toLocaleString()}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#8A7060' }}>UTR Reference:</span>
                      <strong style={{ color: '#1A1816', letterSpacing: '1px' }}>{auditForm.utr || '—'}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#8A7060' }}>Date:</span>
                      <span style={{ color: '#1A1816', fontWeight: '600' }}>{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>

                  <div style={{ borderTop: '1px dashed #D4C4B0', marginTop: '12px', paddingTop: '10px' }}>
                    <p style={{ fontSize: '0.72rem', color: '#8A7060', lineHeight: '1.45', margin: 0 }}>
                      ℹ️ <strong>Note:</strong> Edge Life is a registered public trust. For official tax receipts or certificate queries, please contact the NGO directly at <strong>edgelifemanipur05@gmail.com</strong> or <strong>+91 9436231759</strong>.
                    </p>
                  </div>
                </div>

                <div className="no-print" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="btn-outline-gold"
                    style={{ color: 'var(--text-dark)', borderColor: '#D4C4B0', padding: '10px 18px', fontSize: '0.85rem' }}
                    onClick={() => window.print()}
                  >
                    🖨️ Print Confirmation
                  </button>
                  <button className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.85rem' }} onClick={() => setActivePage('home')}>
                    Return Home
                  </button>
                  <button className="btn-outline-gold" style={{ color: 'var(--text-dark)', borderColor: '#D4C4B0', padding: '10px 18px', fontSize: '0.85rem' }} onClick={() => setActivePage('projects')}>
                    View Projects
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* TRUST BADGES FOOTNOTE */}
          {step < 4 && (
            <div className="trust-badges-grid">
              <div className="trust-badge-card">🔒 Direct Bank &amp; UPI Transfer</div>
              <div className="trust-badge-card">🏛️ Registered Public Trust</div>
              <div className="trust-badge-card">✨ 100% Community Impact</div>
              <div className="trust-badge-card">📊 Transparent Operations</div>
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
