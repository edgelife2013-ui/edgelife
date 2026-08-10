import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Donate from './pages/Donate';

export default function App() {
  const [activePage, setActivePage] = useState('home');

  // Scroll to top whenever activePage changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} />;
      case 'about':
        return <About setActivePage={setActivePage} />;
      case 'projects':
        return <Projects setActivePage={setActivePage} />;
      case 'gallery':
        return <Gallery setActivePage={setActivePage} />;
      case 'contact':
        return <Contact setActivePage={setActivePage} />;
      case 'donate':
        return <Donate setActivePage={setActivePage} />;
      default:
        return <Home setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="app-container">
      {/* Sticky Top Navbar */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Page Body */}
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}
