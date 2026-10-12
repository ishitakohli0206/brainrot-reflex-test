import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-emoji" aria-hidden="true">🧠</span>
              <span className="logo-main">Brainrot Reflex Test</span>
            </div>
            <p className="footer-tagline">
              The fast-paced 30-second online reaction and reflex challenge. Tap targets, build combos, and test your internet agility.
            </p>
          </div>

          <div className="footer-links-group">
            <h3 className="footer-heading">Game & Guides</h3>
            <ul className="footer-nav-list">
              <li><a href="/">Play Game</a></li>
              <li><a href="/how-to-play/">How to Play & Scoring</a></li>
              <li><a href="/reaction-time-game/">Reaction Time Speed Guide</a></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h3 className="footer-heading">Information</h3>
            <ul className="footer-nav-list">
              <li><a href="/about/">About This Project</a></li>
              <li><a href="/privacy/">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-disclaimer">
          <p>
            <strong>Disclaimer:</strong> Brainrot Reflex Test is a casual arcade browser game created purely for entertainment and reflex fun. Scores, reaction metrics, and funny ranks generated in this game are not medical diagnostics or clinical assessments of neurological reaction times.
          </p>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; 2026 Brainrot Reflex Test. Built with React & TypeScript. Zero trackers. Free to play anywhere.
          </p>
          <div className="footer-badges">
            <span className="tech-badge">⚡ 100% Client-Side</span>
            <span className="tech-badge">🔒 Privacy First</span>
            <span className="tech-badge">📱 Mobile Optimized</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
