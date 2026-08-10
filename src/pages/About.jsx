import React from 'react';
import { Target, Sun, Heart, Users, Zap, ShieldCheck, MapPin, Award, Activity, BookOpen, Briefcase, Globe, HelpCircle, CheckCircle2 } from 'lucide-react';
import founder from '../assets/About/founder.png';
import president from '../assets/About/president.png';
import treasurer from '../assets/About/treasurer.png';
import manipurlocation from '../assets/About/manipurlocation.png';

export default function About({ setActivePage }) {
  const teamMembers = [
    {
      name: 'Romita Okram',
      role: 'Founder',
      bio: 'Founded Edge Life in 2013, inspired by the touching sight of nurses sleeping on the floor due to financial hardships. Dedicated to reviving social values, healthcare, and women empowerment.',
      image: founder,
    },
    {
      name: 'President',
      role: 'President',
      bio: 'Leads strategic planning, education, healthcare initiatives, and community relief operations across Manipur.',
      image: president,
    },
    {
      name: 'Treasurer',
      role: 'Treasurer',
      bio: 'Manages financial strategy, budgeting, transparency, and resource allocation for all trust programs.',
      image: treasurer,
    },
  ];

  const overallAchievements = [
    {
      year: '2013 - 2017',
      title: 'Bootstrap Journey & Women Empowerment',
      desc: 'Started the journey from door-to-door donations and bootstrap funding, culminating in active women empowerment programs launched in 2017.',
    },
    {
      year: '2018',
      title: 'State Recognition in Manipur',
      desc: 'Won Manipur state recognition in 2018 for impactful grassroots community service.',
    },
    {
      year: '2017 - Present',
      title: 'Livelihood & Handloom Handicrafts',
      desc: 'Established 40 women directly and 200 women indirectly in income-generating programs for economic sustainability.',
    },
    {
      year: 'July 2023 - Present',
      title: 'Free Mobile Medical Camps & Relief',
      desc: 'Organized free mobile medical camps treating nearly 2,000 inmates in relief camps. Distributed free medicine, food supplements, sanitary pads, and innerwear to Internally Displaced Persons (IDP) during communal dispute.',
    },
    {
      year: 'July 10, 2024',
      title: 'Healthcare & Hygiene Institute / Charitable Hospital',
      desc: 'Inaugurated the EDGE LIFE Healthcare & Hygiene Institute, providing free medicine and affordable medical facilities for local people who cannot afford private hospitals.',
    },
  ];

  return (
    <div className="about-page">
      {/* 1. HERO SECTION */}
      <section className="hero-wrapper" style={{ minHeight: '440px' }}>
        <div className="hero-bg-overlay"></div>
        <div className="hero-placeholder-bg"></div>

        <div className="container hero-content-container" style={{ gridTemplateColumns: '1fr', paddingTop: '60px', paddingBottom: '60px' }}>
          <div className="hero-main" style={{ maxWidth: '850px' }}>
            <div className="hero-tagline" style={{ justifyContent: 'flex-end' }}>
              <span>OUR STORY & PURPOSE</span>
            </div>
            <h1 className="hero-title" style={{ fontSize: '3.4rem' }}>
              Edge Life — A trust to build a value world..
            </h1>
            <p className="hero-description" style={{ fontSize: '1.15rem' }}>
              Edge Life was founded in 2013, inspired by the touching sight of nurses sleeping on the floor due to financial hardships. This moment ignited our mission of promoting social and economic sustainability in Manipur.
            </p>
          </div>
        </div>
      </section>

      {/* 2. FOUNDING STORY & MISSION / VISION */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-cream)' }}>
        <div className="container">
          <div className="mission-vision-grid" style={{ marginBottom: '60px' }}>
            {/* Our Mission */}
            <div className="mv-card">
              <div className="mv-header">
                <div className="mv-icon-badge red">
                  <Target size={22} />
                </div>
                <h2 className="mv-title">Our Mission</h2>
              </div>
              <p className="mv-desc">
                In today's self-centered world, Edge Life works to revive fading social values and support those in need. We assist destitute elderly and children with food and clothing, empower women through handloom handicrafts, and deliver affordable healthcare at doorsteps.
              </p>
              <ul className="mv-checklist">
                <li>
                  <span className="check">✓</span>
                  <span>Promote social and economic sustainability across Manipur</span>
                </li>
                <li>
                  <span className="check">✓</span>
                  <span>Empower women through handloom handicrafts & micro-entrepreneurship</span>
                </li>
                <li>
                  <span className="check">✓</span>
                  <span>Provide doorstep affordable healthcare and free medical camps</span>
                </li>
                <li>
                  <span className="check">✓</span>
                  <span>Support destitute elderly, orphans, and IDPs in relief camps</span>
                </li>
              </ul>
            </div>

            {/* Our Vision & Core Values */}
            <div className="mv-card">
              <div className="mv-header">
                <div className="mv-icon-badge green">
                  <Sun size={22} />
                </div>
                <h2 className="mv-title">Our Vision</h2>
              </div>
              <p className="mv-desc">
                A world built on core social values where every vulnerable individual in Manipur has access to healthcare, zero hunger, education, and sustainable economic opportunities.
              </p>

              {/* Core Values Container */}
              <div className="core-values-box">
                <h3 className="core-values-title">Core Values</h3>
                <div className="values-grid">
                  <div className="value-item">
                    <span className="value-item-icon">❤️</span> Compassion
                  </div>
                  <div className="value-item">
                    <span className="value-item-icon">🤝</span> Community
                  </div>
                  <div className="value-item">
                    <span className="value-item-icon">💪</span> Empowerment
                  </div>
                  <div className="value-item">
                    <span className="value-item-icon">🔮</span> Sustainability
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. EDGE LIFE OVERALL ACHIEVEMENT (EXPLICIT SECTION FROM PDF) */}
          <div style={{ paddingTop: '20px', paddingBottom: '60px' }}>
            <div className="section-label-wrapper">
              <div className="section-label-line"></div>
              <span className="section-label-text">MILESTONES & IMPACT</span>
            </div>

            <h2 className="section-title">Edge Life Overall Achievement</h2>
            <p className="section-subtitle" style={{ marginBottom: '36px' }}>
              From door-to-door bootstrap donations to running a Charitable Hospital and empowering hundreds of women in Manipur.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {overallAchievements.map((ach, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-md)',
                    padding: '28px',
                    boxShadow: '0 4px 18px rgba(0,0,0,0.05)',
                    borderLeft: '5px solid var(--primary-red)',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'inline-block', backgroundColor: '#FAF2E8', color: 'var(--primary-red)', fontWeight: '700', fontSize: '0.82rem', padding: '4px 12px', borderRadius: '20px', marginBottom: '12px' }}>
                      {ach.year}
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--text-dark)', marginBottom: '10px' }}>
                      {ach.title}
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: '1.6' }}>
                      {ach.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. CHARITABLE HOSPITAL & RELIEF INITIATIVES */}
          <div style={{ padding: '36px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: '60px' }}>
            <div className="section-label-wrapper left">
              <div className="section-label-line"></div>
              <span className="section-label-text">HEALTHCARE & HOSPITAL</span>
            </div>
            <h2 className="section-title" style={{ fontSize: '2rem' }}>Edge Life Charitable Hospital</h2>
            <p style={{ color: 'var(--text-dark)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '16px' }}>
              Supporting Manipur, Edge Life (established in 2013) has been working tirelessly to uplift women, support elderly and orphaned children, and provide essential healthcare and education.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.7', marginBottom: '16px' }}>
              On <strong>July 10, 2024</strong>, we inaugurated a charitable hospital to extend our mission in Manipur. Since May 2023, following communal unrest, over 70,000 people in Manipur have been living in relief camps, facing severe shortages of food, income, and medical aid. Inflation has worsened these struggles, making basic necessities like vegetables unaffordable.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.7' }}>
              In response, Edge Life launched mobile medical services, treating over 2,000 individuals and distributing essential supplies including food, innerwear, and sanitary pads. We seek continued corporate and community support to sustain and expand these efforts until a long-term solution is found.
            </p>
          </div>

          {/* 5. OUR SERVICES & UN SDGs */}
          <div style={{ marginBottom: '60px' }}>
            <div className="section-label-wrapper">
              <div className="section-label-line"></div>
              <span className="section-label-text">SUSTAINABLE DEVELOPMENT GOALS</span>
            </div>
            <h2 className="section-title">Our Services & UN SDGs Alignment</h2>
            <p className="section-subtitle" style={{ marginBottom: '32px' }}>
              As the requirement increases with the situation in Manipur and uncertainty of life, Edge Life focuses work on key Sustainable Development Goals:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px' }}>
              <div style={{ background: '#E5243B', color: 'white', padding: '20px', borderRadius: '12px' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '4px' }}>1. NO POVERTY</h3>
                <p style={{ fontSize: '0.88rem', opacity: 0.9 }}>Micro-entrepreneurship & skill training for youth and women to earn 2 square meals daily.</p>
              </div>

              <div style={{ background: '#DDA83A', color: 'white', padding: '20px', borderRadius: '12px' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '4px' }}>2. ZERO HUNGER</h3>
                <p style={{ fontSize: '0.88rem', opacity: 0.9 }}>Food supplement & emergency grain relief distribution in relief camps and vulnerable households.</p>
              </div>

              <div style={{ background: '#4C9F38', color: 'white', padding: '20px', borderRadius: '12px' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '4px' }}>3. GOOD HEALTH</h3>
                <p style={{ fontSize: '0.88rem', opacity: 0.9 }}>Doorstep clinics, Healthcare & Hygiene Institute, free medicines, and mobile medical checkup camps.</p>
              </div>

              <div style={{ background: '#C5192D', color: 'white', padding: '20px', borderRadius: '12px' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '4px' }}>4. QUALITY EDUCATION</h3>
                <p style={{ fontSize: '0.88rem', opacity: 0.9 }}>Supplementary classes and support for children in need for higher studies.</p>
              </div>

              <div style={{ background: '#A21942', color: 'white', padding: '20px', borderRadius: '12px' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '4px' }}>8. DECENT WORK</h3>
                <p style={{ fontSize: '0.88rem', opacity: 0.9 }}>Handloom handicrafts, Self-Help Groups (SHGs), and market linkages for sustainable economic growth.</p>
              </div>
            </div>
          </div>

          {/* 6. MANIPUR: RATIONALE, DEMOGRAPHICS & ECONOMY */}
          <div style={{ padding: '36px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: '60px' }}>
            <div className="section-label-wrapper left">
              <div className="section-label-line"></div>
              <span className="section-label-text">STATE CONTEXT</span>
            </div>
            <h2 className="section-title">Manipur: Rationale & Background</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginTop: '24px' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text-dark)', marginBottom: '10px' }}>
                  Demographics, Geography & Culture
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: '1.65', marginBottom: '14px' }}>
                  Manipur, located in northeastern India, is a culturally diverse state with stunning landscapes. It shares borders with Nagaland, Mizoram, Assam, and Myanmar. The capital, Imphal, lies in a central valley, serving as Manipur's cultural and economic hub, famous for Loktak Lake with floating phumdis.
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: '1.65' }}>
                  It is home to diverse ethnic groups including Meitei, Naga, Kuki, and other tribal communities. The 2011 Census reported a population of ~2.86 million (1.74M rural, 834K urban) with an 85.4% literacy rate.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text-dark)', marginBottom: '10px' }}>
                  Economy, Handicrafts & Need for Support
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: '1.65', marginBottom: '14px' }}>
                  Manipur's economy is driven by agriculture, cottage industries, and trade. Due to limited infrastructure, poverty remains widespread. Unemployment, inadequate healthcare, and limited education exacerbate poverty.
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: '1.65' }}>
                  Known as India's "Gateway to the East", Manipur connects to Southeast Asian countries. With high handicraft potential, empowering handloom artisans provides a direct pathway to economic self-sufficiency.
                </p>
              </div>
            </div>
          </div>

          {/* 7. WHY MANIPUR NEEDS CORPORATE SUPPORT & SOLUTIONS */}
          <div style={{ marginBottom: '60px' }}>
            <div className="section-label-wrapper">
              <div className="section-label-line"></div>
              <span className="section-label-text">CHALLENGES & SOLUTIONS</span>
            </div>
            <h2 className="section-title">Why Manipur Needs Corporate Support?</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginTop: '24px' }}>
              {/* Challenges */}
              <div style={{ backgroundColor: '#FAF4F2', padding: '28px', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--primary-red)' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--primary-red)', marginBottom: '16px' }}>
                  Key Challenges in Manipur
                </h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-dark)', fontSize: '0.94rem' }}>
                  <li>• People of Manipur are educated but face a lack of employment opportunities.</li>
                  <li>• Lack of industries; private sector is majorly dependent on Govt jobs.</li>
                  <li>• Vulnerable youth falling into the trap of drugs and crime due to unemployment.</li>
                  <li>• Limited sources of income for rural & displaced families.</li>
                  <li>• Lack of awareness regarding available welfare schemes & opportunities.</li>
                </ul>
              </div>

              {/* Solutions */}
              <div style={{ backgroundColor: '#F2F7F4', padding: '28px', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #2E7D32' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#2E7D32', marginBottom: '16px' }}>
                  Edge Life's Actionable Solutions
                </h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-dark)', fontSize: '0.94rem' }}>
                  <li>• Skilled micro-entrepreneurship programs for youth and women.</li>
                  <li>• Supplementary classes for children in need to support higher studies.</li>
                  <li>• Awareness campaigns on government facilities & advocacy programs.</li>
                  <li>• Market linkages for handloom & handicraft artisans.</li>
                  <li>• Doorstep affordable medical clinics ensuring 2 square meals daily.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 8. LOCATION & ADDRESSES */}
          <div style={{ paddingTop: '20px', marginBottom: '60px' }}>
            <div className="section-label-wrapper">
              <div className="section-label-line"></div>
              <span className="section-label-text">LOCATION & HEADQUARTERS</span>
            </div>

            <h2 className="section-title">Our Presence in Manipur</h2>
            <p className="section-subtitle" style={{ marginBottom: '30px' }}>
              Edge Life operates from Imphal West, Manipur, delivering healthcare and social support directly to communities and relief camps.
            </p>

            <div className="about-location-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center', backgroundColor: '#FFFFFF', padding: '32px', borderRadius: 'var(--radius-md)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              <div className="about-location-img-wrapper" style={{ overflow: 'hidden', borderRadius: 'var(--radius-sm)', border: '1px solid #EAE5D9', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px', background: '#FAF8F5' }}>
                <img
                  src={manipurlocation}
                  alt="Edge Life Location Map of Manipur"
                  style={{ maxWidth: '100%', maxHeight: '420px', objectFit: 'contain', borderRadius: '6px' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ padding: '16px 20px', borderLeft: '4px solid var(--primary-red)', backgroundColor: '#FAF8F5', borderRadius: '0 8px 8px 0' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text-dark)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={20} color="var(--primary-red)" /> Registered Address
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                    SINGJAMEI OKRAM LEIKAI, IMPHAL WEST, MANIPUR – 795001
                  </p>
                </div>
                <div style={{ padding: '16px 20px', borderLeft: '4px solid var(--gold-accent)', backgroundColor: '#FAF8F5', borderRadius: '0 8px 8px 0' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text-dark)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={20} color="var(--gold-accent)" /> Office Address
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                    SINGJAMEI SOGRAKPAM LEIKAI, IMPHAL WEST, MANIPUR – 795001
                  </p>
                </div>
                <div style={{ padding: '16px 20px', borderLeft: '4px solid #2E7D32', backgroundColor: '#FAF8F5', borderRadius: '0 8px 8px 0' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text-dark)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={20} color="#2E7D32" /> Healthcare Institute & Hospital
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                    EDGE LIFE Healthcare & Hygiene Institute (Inaugurated July 10, 2024)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 9. THE TRUSTEES OF EDGE LIFE */}
          <div style={{ paddingTop: '20px' }}>
            <div className="section-label-wrapper">
              <div className="section-label-line"></div>
              <span className="section-label-text">LEADERSHIP</span>
            </div>

            <h2 className="section-title">The Trustees of Edge Life</h2>

            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <div key={index} className="team-card">
                  <div className="team-img-wrapper">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="team-card-img"
                      />
                    ) : (
                      <div className="image-placeholder" style={{ width: '100%', height: '100%', backgroundColor: '#C8BAA7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold', color: '#FFF' }}>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                  </div>
                  <div className="team-card-body">
                    <h3 className="team-member-name">{member.name}</h3>
                    <span className="team-member-role">{member.role}</span>
                    <p className="team-member-bio">{member.bio}</p>
                  </div>
                </div>
              ))}
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
