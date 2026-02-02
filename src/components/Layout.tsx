import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [logoError, setLogoError] = useState(false);

  return (
    <div className="layout">
      {/* Skip link for keyboard navigation */}
      <a href="#main-content" className="skip-link">
        Zum Inhalt springen
      </a>

      <header className="header">
        <motion.a
          href={import.meta.env.BASE_URL}
          className="logo-link"
          aria-label="Zur Startseite"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {logoError ? (
            <span className="logo-text">Linux Chooser</span>
          ) : (
            <img
              src={`${import.meta.env.BASE_URL}MO-logo_transparent_WHITE_445813.png`}
              alt="Morpheus Logo"
              className="logo"
              loading="lazy"
              onError={() => setLogoError(true)}
            />
          )}
        </motion.a>
        <nav className="header-nav">
          <Link to="/distros" className="nav-link">Distributionen</Link>
        </nav>
      </header>

      <main id="main-content" className="main-content" tabIndex={-1}>
        {children}
      </main>

      <footer className="footer">
        <div className="footer-content">
          <span className="footer-text">Erstellt von Morpheus</span>
          <div className="footer-links">
            <a
              href="https://www.patreon.com/themorpheus"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              <svg className="footer-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M15.386.524c-4.764 0-8.64 3.876-8.64 8.64 0 4.75 3.876 8.613 8.64 8.613 4.75 0 8.614-3.864 8.614-8.613C24 4.4 20.136.524 15.386.524zM.003 23.537h4.22V.524H.003z"/>
              </svg>
              Patreon
            </a>
            <a
              href="https://the-morpheus.de"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              <svg className="footer-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              Website
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
