import React from 'react';

export default function PrivacyPolicy({ setActivePage }) {
  return (
    <div className="privacy-page" style={{ padding: '120px 0 80px 0', minHeight: '80vh', backgroundColor: '#FAF6EF' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        <h1 className="section-title" style={{ fontSize: '2.8rem', marginBottom: '24px', fontFamily: 'var(--font-serif)', color: '#1A1816' }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#8A7060', marginBottom: '32px' }}>
          Effective Date: August 12, 2026
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', color: '#4A443D', lineHeight: '1.6', fontSize: '0.95rem' }}>
          <section>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#1A1816', marginBottom: '12px' }}>1. Information We Collect</h2>
            <p>
              When you contact us or make a donation through the Edge Life website, we collect the personal information you voluntarily provide, including:
            </p>
            <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
              <li>Full Name</li>
              <li>Email Address</li>
              <li>Phone Number (Optional)</li>
              <li>UTR (Unique Transaction Reference) 12-digit number (for donation verification)</li>
              <li>Payment Transaction Screenshots (for donation verification)</li>
              <li>Any message or feedback you send us</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#1A1816', marginBottom: '12px' }}>2. How We Use and Process Your Information</h2>
            <p>
              Edge Life does not store your personal details in a permanent online database. Instead, we use secure form engines (FormSubmit) to forward the form entries directly to our official email: <strong>edgelifemanipur05@gmail.com</strong>.
            </p>
            <p style={{ marginTop: '8px' }}>
              For donation audits and tracking:
            </p>
            <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
              <li>We export and log the submitted transaction information (UTR, Name, Amount, Screenshot) into our secure Google Sheets database.</li>
              <li>Donation acknowledgment receipts can be requested by emailing us directly at <strong>edgelifemanipur05@gmail.com</strong>. Our team will verify and email the receipt upon request.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#1A1816', marginBottom: '12px' }}>3. Data Security and Retention</h2>
            <p>
              Your security is paramount. All communication between your browser and our website is encrypted using SSL/TLS protocols. We retain transaction records solely for internal NGO accounting and verification references.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#1A1816', marginBottom: '12px' }}>4. Third-Party Services</h2>
            <p>
              We use <strong>FormSubmit</strong> to process form submissions. They act as a pass-through forwarding service and do not sell, rent, or store your personal data for marketing purposes.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#1A1816', marginBottom: '12px' }}>5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please reach out to us at: <strong>edgelifemanipur05@gmail.com</strong>.
            </p>
          </section>
        </div>

        <button 
          className="btn-primary" 
          onClick={() => { window.location.hash = ''; }} 
          style={{ marginTop: '40px', padding: '12px 28px' }}
        >
          Return Home
        </button>
      </div>
    </div>
  );
}
