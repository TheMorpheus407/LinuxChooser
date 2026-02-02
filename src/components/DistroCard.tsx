import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Distro } from '../data/distros';

interface DistroCardProps {
  distro: Distro;
  viewMode: 'grid' | 'list';
}

// Helper to get logo URL with BASE_URL
const getLogoUrl = (logo: string): string => {
  return `${import.meta.env.BASE_URL}${logo.replace(/^\//, '')}`;
};

// Helper to truncate description
const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

// Map release model to German labels
const releaseModelLabels: Record<string, string> = {
  fixed: 'Feste Releases',
  rolling: 'Rolling Release',
  'semi-rolling': 'Semi-Rolling',
  immutable: 'Unveränderlich',
};

// Map package manager to display names
const packageManagerLabels: Record<string, string> = {
  apt: 'APT',
  dnf: 'DNF',
  pacman: 'Pacman',
  zypper: 'Zypper',
  portage: 'Portage',
  xbps: 'XBPS',
  apk: 'APK',
  'rpm-ostree': 'rpm-ostree',
  nix: 'Nix',
};

// Map target audience to German labels
const audienceLabels: Record<string, string> = {
  beginner: 'Einsteiger',
  intermediate: 'Fortgeschrittene',
  advanced: 'Experten',
  developer: 'Entwickler',
  gamer: 'Gamer',
  server: 'Server',
  privacy: 'Datenschutz',
};

// Score bar component
function ScoreBar({ label, value }: { label: string; value: number }) {
  const percentage = (value / 10) * 100;

  return (
    <div className="distro-stat-bar">
      <span className="distro-stat-label">{label}</span>
      <div className="distro-stat-track">
        <motion.div
          className="distro-stat-fill"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      <span className="distro-stat-value">{value}/10</span>
    </div>
  );
}

export default function DistroCard({ distro, viewMode }: DistroCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const handleLogoError = () => {
    setLogoError(true);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const description = viewMode === 'grid'
    ? truncateText(distro.description, 100)
    : distro.description;

  return (
    <motion.div
      className={`distro-card ${viewMode === 'list' ? 'list-view' : ''}`}
      whileHover={{ scale: viewMode === 'grid' ? 1.02 : 1.01 }}
      transition={{ duration: 0.2 }}
      layout
    >
      <div className="distro-card-header">
        {!logoError ? (
          <img
            src={getLogoUrl(distro.logo)}
            alt={`${distro.name} Logo`}
            className="distro-card-logo"
            onError={handleLogoError}
            loading="lazy"
          />
        ) : (
          <div className="distro-card-logo distro-card-logo-fallback">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
        )}

        <div className="distro-card-title-section">
          <h3 className="distro-card-name">{distro.name}</h3>
          {distro.version && (
            <span className="distro-card-version">{distro.version}</span>
          )}
        </div>
      </div>

      <p className="distro-card-description">{description}</p>

      <div className="distro-card-stats">
        <ScoreBar label="Einsteigerfreundlich" value={distro.beginnerFriendly} />
        <ScoreBar label="Stabilität" value={distro.stability} />
        <ScoreBar label="Gaming-Support" value={distro.gamingSupport} />
        <ScoreBar label="Performance" value={distro.performance} />
      </div>

      <div className="distro-card-badges">
        <span className="distro-card-badge distro-card-badge-release">
          {releaseModelLabels[distro.releaseModel] || distro.releaseModel}
        </span>
        <span className="distro-card-badge distro-card-badge-package">
          {packageManagerLabels[distro.packageManager] || distro.packageManager}
        </span>
      </div>

      <button
        className="distro-card-expand"
        onClick={toggleExpanded}
        aria-expanded={expanded}
        aria-controls={`distro-details-${distro.id}`}
      >
        <span>{expanded ? 'Weniger anzeigen' : 'Mehr anzeigen'}</span>
        <svg
          className={`distro-card-expand-icon ${expanded ? 'rotated' : ''}`}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
        </svg>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            id={`distro-details-${distro.id}`}
            className="distro-card-details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="distro-card-details-content">
              {/* Full description */}
              <div className="distro-detail-section">
                <h4 className="distro-detail-title">Beschreibung</h4>
                <p className="distro-detail-text">{distro.description}</p>
              </div>

              {/* Available Desktop Environments */}
              {distro.availableDEs.length > 0 && (
                <div className="distro-detail-section">
                  <h4 className="distro-detail-title">Desktop-Umgebungen</h4>
                  <div className="distro-detail-tags">
                    {distro.availableDEs.map((de) => (
                      <span
                        key={de}
                        className={`distro-detail-tag ${de === distro.defaultDE ? 'default' : ''}`}
                      >
                        {de.toUpperCase()}
                        {de === distro.defaultDE && ' (Standard)'}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Target Audience */}
              {distro.targetAudience.length > 0 && (
                <div className="distro-detail-section">
                  <h4 className="distro-detail-title">Zielgruppe</h4>
                  <div className="distro-detail-tags">
                    {distro.targetAudience.map((audience) => (
                      <span key={audience} className="distro-detail-tag audience">
                        {audienceLabels[audience] || audience}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Features (first 5) */}
              {distro.features.length > 0 && (
                <div className="distro-detail-section">
                  <h4 className="distro-detail-title">Funktionen</h4>
                  <ul className="distro-detail-features">
                    {distro.features.slice(0, 5).map((feature, index) => (
                      <li key={index} className="distro-detail-feature">
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action buttons */}
              <div className="distro-card-actions">
                <a
                  href={distro.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="distro-card-link distro-card-link-primary"
                  aria-label={`${distro.name} Website besuchen (öffnet in neuem Tab)`}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                  Website
                </a>
                <a
                  href={distro.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="distro-card-link distro-card-link-secondary"
                  aria-label={`Mehr über ${distro.name} erfahren (öffnet in neuem Tab)`}
                >
                  Mehr erfahren
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
