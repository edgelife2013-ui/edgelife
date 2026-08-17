import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Donate from './pages/Donate';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';

export default function App() {
  const [activePage, setActivePage] = useState(() => {
    const rawHash = window.location.hash.substring(1).split('?')[0];
    const hash = rawHash === 'donate-success' ? 'donate' : rawHash;
    const validPages = ['home', 'about', 'projects', 'gallery', 'contact', 'donate', 'privacy', 'terms'];
    return validPages.includes(hash) ? hash : 'home';
  });

  // Sync state with browser Back/Forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.substring(1).split('?')[0];
      const hash = rawHash === 'donate-success' ? 'donate' : rawHash;
      const validPages = ['home', 'about', 'projects', 'gallery', 'contact', 'donate', 'privacy', 'terms'];
      const targetPage = validPages.includes(hash) ? hash : 'home';
      setActivePage(targetPage);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const setPageAndHash = (page) => {
    window.location.hash = page === 'home' ? '' : page;
    setActivePage(page);
  };

  // Scroll to top whenever activePage changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setPageAndHash} />;
      case 'about':
        return <About setActivePage={setPageAndHash} />;
      case 'projects':
        return <Projects setActivePage={setPageAndHash} />;
      case 'gallery':
        return <Gallery setActivePage={setPageAndHash} />;
      case 'contact':
        return <Contact setActivePage={setPageAndHash} />;
      case 'donate':
        return <Donate setActivePage={setPageAndHash} />;
      case 'privacy':
        return <PrivacyPolicy setActivePage={setPageAndHash} />;
      case 'terms':
        return <TermsOfUse setActivePage={setPageAndHash} />;
      default:
        return <Home setActivePage={setPageAndHash} />;
    }
  };

  return (
    <div className="app-container">
      {/* Sticky Top Navbar */}
      <Navbar activePage={activePage} setActivePage={setPageAndHash} />

      {/* Main Page Body */}
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}
