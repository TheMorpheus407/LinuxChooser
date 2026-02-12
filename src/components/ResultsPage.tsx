import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuiz } from '../hooks/useQuiz';
import { useState, useMemo } from 'react';
import { getDistroById } from '../data/distros';
import { getDEById } from '../data/desktopEnvironments';
import type { DistroScore } from '../context/QuizContext';

// Download links for all supported distributions
const DOWNLOAD_LINKS: Record<string, string> = {
  'linux-mint': 'https://linuxmint.com/download.php',
  'ubuntu': 'https://ubuntu.com/download/desktop',
  'ubuntu-budgie': 'https://ubuntubudgie.org/downloads/',
  'ubuntu-cinnamon': 'https://ubuntucinnamon.org/download/',
  'ubuntu-mate': 'https://ubuntu-mate.org/download/',
  'ubuntu-studio': 'https://ubuntustudio.org/download/',
  'fedora': 'https://fedoraproject.org/workstation/download',
  'pop-os': 'https://pop.system76.com/',
  'manjaro': 'https://manjaro.org/download/',
  'opensuse-tumbleweed': 'https://get.opensuse.org/tumbleweed/',
  'opensuse-leap': 'https://get.opensuse.org/leap/',
  'arch': 'https://archlinux.org/download/',
  'debian': 'https://www.debian.org/download',
  'elementary': 'https://elementary.io/',
  'zorin': 'https://zorin.com/os/download/',
  'kubuntu': 'https://kubuntu.org/getkubuntu/',
  'endeavouros': 'https://endeavouros.com/latest-release/',
  'nobara': 'https://nobaraproject.org/download/',
  'garuda': 'https://garudalinux.org/downloads.html',
  'cachyos': 'https://cachyos.org/download/',
  'mx-linux': 'https://mxlinux.org/download-links/',
  'tails': 'https://tails.net/install/',
  'qubes': 'https://www.qubes-os.org/downloads/',
  'void': 'https://voidlinux.org/download/',
  'gentoo': 'https://www.gentoo.org/downloads/',
  'nixos': 'https://nixos.org/download.html',
  'bazzite': 'https://bazzite.gg/',
  'antix': 'https://antixlinux.com/download/',
  'puppy': 'https://puppylinux.com/',
  'linuxlite': 'https://www.linuxliteos.com/download.php',
  'lubuntu': 'https://lubuntu.me/downloads/',
  'kdeneon': 'https://neon.kde.org/download',
  'xubuntu': 'https://xubuntu.org/download/',
  'almalinux': 'https://almalinux.org/get-almalinux/',
};

export default function ResultsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { results, fullResults, warnings, dealBreakerWarnings, resetQuiz } = useQuiz();
  const [shareMessage, setShareMessage] = useState<string | null>(null);
  const [expandedAlternative, setExpandedAlternative] = useState<string | null>(null);

  // Helper function to get download URL for a distro
  const getDownloadUrl = (distroId: string): string => {
    const distro = getDistroById(distroId);
    return DOWNLOAD_LINKS[distroId] || distro?.website || '#';
  };

  // Toggle expanded state for alternative recommendations
  const toggleAlternative = (key: string) => {
    setExpandedAlternative(prev => prev === key ? null : key);
  };

  // Check for shared result in URL params
  const sharedResult = useMemo((): DistroScore | null => {
    const distroId = searchParams.get('distro');
    const deId = searchParams.get('de');
    const scoreParam = searchParams.get('score');

    if (!distroId || !deId || !scoreParam) {
      return null;
    }

    const distro = getDistroById(distroId);
    const de = getDEById(deId);
    const parsedScore = parseInt(scoreParam, 10);

    if (!distro || !de || isNaN(parsedScore)) {
      return null;
    }

    // Validate that the DE is actually available for this distro
    if (!distro.availableDEs.includes(deId)) {
      return null;
    }

    // Clamp score to valid range (0-100)
    const score = Math.max(0, Math.min(100, parsedScore));

    return {
      distroId: distro.id,
      desktopEnvId: de.id,
      score: score,
      name: distro.name,
      desktopName: de.name,
    };
  }, [searchParams]);

  // Determine if we're viewing a shared result
  const isSharedView = sharedResult !== null && results.length === 0;

  // Get top result and remaining rankings
  const topResult = isSharedView ? sharedResult : results[0];
  const topFullResult = !isSharedView && fullResults.length > 0 ? fullResults[0] : null;
  const remainingResults = isSharedView ? [] : results.slice(1, 10);

  // Get reasons from the full result (dynamic from scoring algorithm)
  const reasons = topFullResult?.reasons || [];

  // Get warnings from the top result and deal breaker warnings
  const resultWarnings = topFullResult?.warnings || [];
  const allWarnings = useMemo(() => {
    const warningMessages: string[] = [...resultWarnings];

    // Add deal breaker warnings
    dealBreakerWarnings.forEach(dbWarning => {
      if (!warningMessages.includes(dbWarning.message)) {
        warningMessages.push(dbWarning.message);
      }
    });

    // Add legacy warnings if not already included
    warnings.forEach(warning => {
      if (!warningMessages.includes(warning.message)) {
        warningMessages.push(warning.message);
      }
    });

    return warningMessages;
  }, [resultWarnings, dealBreakerWarnings, warnings]);

  // Get download URL from DOWNLOAD_LINKS or fallback to distro website
  const downloadUrl = DOWNLOAD_LINKS[topResult?.distroId || ''] ||
    topFullResult?.distro.website ||
    (topResult ? getDistroById(topResult.distroId)?.website : null) || '#';
  const websiteUrl = topFullResult?.distro.website ||
    (topResult ? getDistroById(topResult.distroId)?.website : null) || '#';

  const handleStartOver = () => {
    resetQuiz();
    navigate('/');
  };

  const handleShare = async () => {
    // Build share URL with result parameters
    const shareUrl = topResult
      ? `${window.location.origin}${import.meta.env.BASE_URL}ergebnis?distro=${encodeURIComponent(topResult.distroId)}&de=${encodeURIComponent(topResult.desktopEnvId)}&score=${topResult.score}`
      : window.location.href;
    const shareText = topResult
      ? `Meine Linux-Empfehlung: ${topResult.name} mit ${topResult.desktopName}! Finde deine perfekte Distribution:`
      : 'Finde deine perfekte Linux-Distribution:';

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Linux Chooser - Meine Empfehlung',
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // User cancelled or share failed, fall back to clipboard
        copyToClipboard(shareUrl);
      }
    } else {
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setShareMessage('Link kopiert!');
      setTimeout(() => setShareMessage(null), 3000);
    }).catch(() => {
      setShareMessage('Fehler: Zugriff auf die Zwischenablage verweigert');
      setTimeout(() => setShareMessage(null), 3000);
    });
  };

  if (!topResult) {
    return (
      <div className="results-page">
        <div className="no-results">
          <h2>Keine Ergebnisse</h2>
          <p>Bitte beantworte zuerst die Fragen, um eine Empfehlung zu erhalten.</p>
          <motion.button
            className="cta-button"
            onClick={() => navigate('/fragen')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Zu den Fragen
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="results-page">
      <motion.div
        className="results-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Top Recommendation */}
        <motion.section
          className="top-recommendation"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="recommendation-label">
            {isSharedView ? 'Geteilte Empfehlung' : 'Unsere Empfehlung für dich'}
          </span>
          <div className="recommendation-header">
            {topFullResult?.distro.logo && (
              <img
                src={topFullResult.distro.logo}
                alt={`${topResult.name} Logo`}
                className="recommendation-logo"
                loading="lazy"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            )}
            {!topFullResult && getDistroById(topResult.distroId)?.logo && (
              <img
                src={getDistroById(topResult.distroId)!.logo}
                alt={`${topResult.name} Logo`}
                className="recommendation-logo"
                loading="lazy"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            )}
            <h1 className="recommendation-title">
              {topResult.name}
              <span className="recommendation-desktop">mit {topResult.desktopName}</span>
            </h1>
          </div>
          <div className="recommendation-score">
            <div className="score-circle" role="img" aria-label={`Übereinstimmung: ${topResult.score} Prozent`}>
              <svg viewBox="0 0 100 100" aria-hidden="true">
                <circle
                  className="score-bg"
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                />
                <motion.circle
                  className="score-progress"
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${topResult.score * 2.83} 283`}
                  initial={{ strokeDasharray: '0 283' }}
                  animate={{ strokeDasharray: `${topResult.score * 2.83} 283` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <span className="score-value" aria-hidden="true">{topResult.score}%</span>
            </div>
            <span className="score-label">Übereinstimmung</span>
          </div>
        </motion.section>

        {/* Shared view banner */}
        {isSharedView && (
          <motion.div
            className="shared-view-banner"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p>Dies ist eine geteilte Empfehlung. Mache den Quiz selbst, um deine persönliche Empfehlung zu erhalten!</p>
            <motion.button
              className="cta-button small"
              onClick={() => navigate('/fragen')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Quiz starten
            </motion.button>
          </motion.div>
        )}

        {/* Why this fits */}
        {reasons.length > 0 && (
          <motion.section
            className="why-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="section-title">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
              {isSharedView ? 'Warum diese Distribution?' : 'Warum passt das zu dir?'}
            </h2>
            <ul className="reasons-list">
              {reasons.map((reason, index) => (
                <motion.li
                  key={index}
                  className="reason-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="check-icon" aria-hidden="true">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  {reason}
                </motion.li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* Warnings */}
        {allWarnings.length > 0 && (
          <motion.section
            className="warnings-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="section-title warning-title">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
              </svg>
              Wichtige Hinweise
            </h2>
            <ul className="warnings-list">
              {allWarnings.map((warning, index) => (
                <motion.li
                  key={index}
                  className="warning-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="warning-icon" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                  {warning}
                </motion.li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* Download button */}
        <motion.div
          className="download-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="download-button"
            aria-label={`${topResult.name} herunterladen (öffnet in neuem Tab)`}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
            {topResult.name} herunterladen
          </a>
        </motion.div>

        {/* Website button */}
        {websiteUrl.replace(/\/+$/, '') !== downloadUrl.replace(/\/+$/, '') && websiteUrl !== '#' && (
          <motion.div
            className="website-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="website-button"
              aria-label={`Offizielle Webseite von ${topResult.name} (öffnet in neuem Tab)`}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              Offizielle Webseite
            </a>
          </motion.div>
        )}

        {/* Full Rankings */}
        <motion.section
          className="rankings-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <h2 className="section-title">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
            </svg>
            Alle Empfehlungen
          </h2>
          <div className="rankings-list">
            {remainingResults.map((result, index) => {
              const itemKey = `${result.distroId}-${result.desktopEnvId}`;
              const isExpanded = expandedAlternative === itemKey;
              const distro = getDistroById(result.distroId);
              const altDownloadUrl = getDownloadUrl(result.distroId);

              return (
                <motion.div
                  key={itemKey}
                  className={`ranking-item-container ${isExpanded ? 'expanded' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.0 + index * 0.05 }}
                >
                  <button
                    className="ranking-item ranking-item-clickable"
                    onClick={() => toggleAlternative(itemKey)}
                    aria-expanded={isExpanded}
                    aria-controls={`ranking-details-${itemKey}`}
                  >
                    <div className="ranking-position">#{index + 2}</div>
                    <div className="ranking-info">
                      <span className="ranking-name">{result.name}</span>
                      <span className="ranking-desktop">{result.desktopName}</span>
                    </div>
                    <div className="ranking-score">
                      <div className="score-bar small">
                        <motion.div
                          className="score-fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${result.score}%` }}
                          transition={{ duration: 0.5, delay: 1.1 + index * 0.05 }}
                        />
                      </div>
                      <span className="score-text">{result.score}%</span>
                    </div>
                    <svg
                      className={`ranking-expand-icon ${isExpanded ? 'rotated' : ''}`}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                    </svg>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        id={`ranking-details-${itemKey}`}
                        className="ranking-details"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="ranking-details-content">
                          <p className="ranking-combo-label">
                            <strong>{result.name}</strong> mit <strong>{result.desktopName}</strong>
                          </p>
                          {distro?.description && (
                            <p className="ranking-description">{distro.description}</p>
                          )}

                          <div className="ranking-links">
                            <a
                              href={altDownloadUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ranking-download-link"
                              aria-label={`${result.name} mit ${result.desktopName} herunterladen (öffnet in neuem Tab)`}
                            >
                              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                              </svg>
                              {result.name} herunterladen
                            </a>

                            {distro?.website && (
                              <a
                                href={distro.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ranking-website-link"
                                aria-label={`Offizielle Webseite von ${result.name} (öffnet in neuem Tab)`}
                              >
                                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                                </svg>
                                Offizielle Webseite
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Actions */}
        <motion.div
          className="results-actions"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <button className="share-button" onClick={handleShare}>
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
            </svg>
            Ergebnis teilen
          </button>

          <button className="restart-button" onClick={handleStartOver}>
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
            </svg>
            Neu starten
          </button>

          <Link to="/distros" className="browse-link">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
            </svg>
            Alle Distributionen ansehen
          </Link>
        </motion.div>

        {/* Share message toast */}
        {shareMessage && (
          <motion.div
            className="share-toast"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            {shareMessage}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
