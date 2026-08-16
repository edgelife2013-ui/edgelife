import React from 'react';

export default function TermsOfUse({ setActivePage }) {
  return (
    <div className="terms-page" style={{ padding: '120px 0 80px 0', minHeight: '80vh', backgroundColor: '#FAF6EF' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        <h1 className="section-title" style={{ fontSize: '2.8rem', marginBottom: '24px', fontFamily: 'var(--font-serif)', color: '#1A1816' }}>
          Terms of Use
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#8A7060', marginBottom: '32px' }}>
          Effective Date: August 12, 2026
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', color: '#4A443D', lineHeight: '1.6', fontSize: '0.95rem' }}>
          <section>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#1A1816', marginBottom: '12px' }}>1. Agreement to Terms</h2>
            <p>
              By accessing or using the Edge Life website, you agree to comply with and be bound by these Terms of Use. If you do not agree to these terms, please do not use our website.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#1A1816', marginBottom: '12px' }}>2. Donation and Payment Verification Terms</h2>
            <p>
              By making a donation via our UPI links, QR code, or direct bank transfer, you acknowledge and agree that:
            </p>
            <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
              <li><strong>Voluntary Contribution</strong>: All donations are voluntary and made as non-refundable contributions to fund Edge Life's social programs in Manipur (Healthcare, Mobile Camps, Women Livelihoods).</li>
              <li><strong>No Refund Policy</strong>: Once a donation is successfully initiated, it cannot be refunded or cancelled.</li>
              <li><strong>UTR and Screenshot Submission</strong>: To verify your donation, you must provide your 12-digit UTR transaction number and an optional transaction screenshot via our donation confirmation form.</li>
              <li><strong>Manual Audit Process</strong>: We manually verify all submissions against our State Bank of India merchant statement. Transaction confirmation will be logged in our Google Sheets record only after manual matching is successful. Fake, incorrect, or duplicate UTR entries will be rejected.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#1A1816', marginBottom: '12px' }}>3. Donation Receipts and Inquiries</h2>
            <p>
              Edge Life is a registered public trust. Donors who require a formal donation receipt or acknowledgment certificate must email their transaction details and request directly to <strong>edgelifemanipur05@gmail.com</strong>. Automated tax receipts are not generated on the website. Official receipts are issued manually following verification with our bank records.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#1A1816', marginBottom: '12px' }}>4. Disclaimer of Warranties</h2>
            <p>
              Our website is provided on an "as-is" and "as-available" basis. While we strive to maintain uninterrupted service, we do not warrant that the website will be error-free or that the local UPI payment launch links will work on all mobile devices due to operating system default handler settings.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#1A1816', marginBottom: '12px' }}>5. Governing Law</h2>
            <p>
              These Terms of Use shall be governed by and construed in accordance with the laws of India and the jurisdiction of Manipur.
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
