import React, { useState } from 'react';

interface HeaderProps {
  bestScore: number;
  isMuted: boolean;
  onToggleMute: () => void;
  currentPath?: string;
}

export const Header: React.FC<HeaderProps> = ({
  bestScore,
  isMuted,
  onToggleMute,
  currentPath = '/',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Game', href: '/' },
    { label: 'How to Play', href: '/how-to-play/' },
    { label: 'Reaction Test', href: '/reaction-time-game/' },
    { label: 'About', href: '/about/' },
  ];

  return (
    <header className="site-header" role="banner">
      <div className="header-container">
        {/* Brand Logo */}
        <a href="/" className="brand-logo" aria-label="Brainrot Reflex Test Homepage">
          <span className="logo-emoji" aria-hidden="true">🧠</span>
          <div className="logo-text">
            <span className="logo-main">BRAINROT</span>
            <span className="logo-sub">REFLEX TEST</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {navLinks.map((link) => {
              const isActive =
                currentPath === link.href ||
                (link.href !== '/' && currentPath.startsWith(link.href));
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Quick Actions (Best Score Badge + Sound Toggle) */}
        <div className="header-actions">
          {bestScore > 0 && (
            <div className="best-score-badge" title="Your highest score saved locally">
              <span className="badge-icon" aria-hidden="true">🏆</span>
              <span className="badge-label">BEST:</span>
              <span className="badge-value">{bestScore}</span>
            </div>
          )}

          <button
            type="button"
            className="sound-toggle-btn"
            onClick={onToggleMute}
            aria-label={isMuted ? 'Unmute game sound effects' : 'Mute game sound effects'}
            title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
          >
            {isMuted ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
            <span className="sound-btn-text">{isMuted ? 'MUTED' : 'SFX ON'}</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <nav className="mobile-nav" aria-label="Mobile Navigation">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};
