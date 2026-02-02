import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/fragen');
  };

  return (
    <div className="landing-page">
      <motion.div
        className="landing-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="landing-headline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Finde deine perfekte Linux-Distribution
        </motion.h1>

        <motion.p
          className="landing-subtext"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Der Wechsel zu Linux muss nicht kompliziert sein! Beantworte ein paar
          einfache Fragen zu deinen Gewohnheiten und Vorlieben, und wir finden
          gemeinsam die Distribution, die perfekt zu dir passt. Keine Vorkenntnisse
          nötig - wir erklären alles auf dem Weg.
        </motion.p>

        <motion.div
          className="landing-features"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="feature-item">
            <div className="feature-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div className="feature-text">
              <strong>Personalisierte Empfehlung</strong>
              <span>Basierend auf deinen echten Bedürfnissen</span>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
              </svg>
            </div>
            <div className="feature-text">
              <strong>Nur 3-5 Minuten</strong>
              <span>Schnell und unkompliziert</span>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
              </svg>
            </div>
            <div className="feature-text">
              <strong>Ehrliche Einschätzung</strong>
              <span>Inkl. Hinweise zu Einschränkungen</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="landing-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.button
            className="cta-button"
            onClick={handleStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Los geht's
            <svg className="cta-arrow" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
            </svg>
          </motion.button>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/distros" className="browse-link">
              Alle Distributionen ansehen
            </Link>
          </motion.div>
        </motion.div>

        <motion.p
          className="landing-note"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          Du kannst jederzeit zurückgehen oder Fragen überspringen.
          Deine Antworten werden nicht gespeichert.
        </motion.p>
      </motion.div>
    </div>
  );
}
