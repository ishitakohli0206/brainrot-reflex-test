import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { getStoredBestScore, getStoredIsMuted, saveStoredIsMuted } from '../utils/storage';
import { soundManager } from '../utils/sound';

export const PrivacyPage: React.FC = () => {
  const [bestScore] = useState<number>(getStoredBestScore());
  const [isMuted, setIsMuted] = useState<boolean>(getStoredIsMuted());

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundManager.setMuted(next);
    saveStoredIsMuted(next);
  };

  const handleClearLocalStorage = () => {
    try {
      localStorage.removeItem('brainrot_reflex_best_score');
      localStorage.removeItem('brainrot_reflex_audio_muted');
      alert('Local storage data has been cleared.');
      window.location.reload();
    } catch {
      alert('Unable to clear local storage in this browsing mode.');
    }
  };

  return (
    <div className="page-wrapper privacy-page">
      <Header
        bestScore={bestScore}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        currentPath="/privacy/"
      />

      <main className="main-content guide-main">
        <article className="guide-article">
          <header className="guide-header">
            <span className="flair-pill">🔒 TRANSPARENCY</span>
            <h1 className="guide-title">
              Privacy Policy for Brainrot Reflex Test
            </h1>
            <p className="guide-lead">
              Last updated: October 2026. An accurate, transparent explanation of data handling on this website.
            </p>
          </header>

          <section className="guide-section">
            <h2>1. Overview</h2>
            <p>
              Brainrot Reflex Test is designed with user privacy as a foundational principle. We believe casual web games should not require account registration, invasively track personal behavior across the internet, or store personal identifiers.
            </p>
          </section>

          <section className="guide-section">
            <h2>2. What Data We Collect & Store</h2>
            <div className="privacy-point-box">
              <h3>📱 LocalStorage (Stored Exclusively On Your Device)</h3>
              <p>
                Brainrot Reflex Test utilizes standard browser <strong>localStorage</strong> solely to enhance your local gaming experience. Specifically, we store:
              </p>
              <ul className="bullet-list">
                <li><code>brainrot_reflex_best_score</code>: An integer representing your personal all-time highest score, so you can track your progress when returning to the site.</li>
                <li><code>brainrot_reflex_audio_muted</code>: A boolean flag remembering whether you preferred sound effects on or off.</li>
              </ul>
              <p>
                <strong>Important:</strong> These values reside exclusively on your client device in your browser's private sandbox. They are never transmitted to any external server, database, or analytics platform.
              </p>
            </div>

            <div className="privacy-point-box">
              <h3>🚫 No Personal Identifiable Information (PII)</h3>
              <p>
                We do NOT collect:
              </p>
              <ul className="bullet-list">
                <li>Names, email addresses, or phone numbers</li>
                <li>Passwords or account credentials</li>
                <li>Payment, banking, or credit card information</li>
                <li>Device contact lists or geolocation coordinates</li>
                <li>Third-party marketing cookies or social tracking pixels</li>
              </ul>
            </div>
          </section>

          <section className="guide-section">
            <h2>3. Hosting & Server Infrastructure Logs</h2>
            <p>
              Like almost every website served on the internet, when you request web pages from our free static hosting CDN provider (such as Vercel, Netlify, Cloudflare, or GitHub Pages), the hosting provider's edge servers automatically log standard technical HTTP transmission headers.
            </p>
            <p>
              These standard logs may include:
            </p>
            <ul className="bullet-list">
              <li>Your internet protocol (IP) address</li>
              <li>Browser user-agent string and operating system type</li>
              <li>Requested file paths and HTTP status codes</li>
              <li>Date, time, and referring URL of requests</li>
            </ul>
            <p>
              These server logs are managed by the hosting infrastructure provider strictly for basic networking operations, DDoS mitigation, and security threat prevention.
            </p>
          </section>

          <section className="guide-section">
            <h2>4. Web Audio API & Hardware Permissions</h2>
            <p>
              Brainrot Reflex Test synthesizes sound effects procedurally using the Web Audio API. This feature only outputs audio through your device's speakers; it never accesses your microphone, webcam, or recording hardware.
            </p>
          </section>

          <section className="guide-section">
            <h2>5. How to Clear or Reset Your Local Data</h2>
            <p>
              You maintain total control over your local data. You can clear your high scores and preferences at any time by clearing your browser cache/cookies or by clicking the button below:
            </p>
            <div className="clear-data-action">
              <button
                type="button"
                className="action-btn secondary-btn"
                onClick={handleClearLocalStorage}
              >
                🗑️ Clear Local Storage Scores & Settings
              </button>
            </div>
          </section>

          <section className="guide-section">
            <h2>6. Changes to This Policy</h2>
            <p>
              Should the functionality of Brainrot Reflex Test ever change (such as adding optional cloud leaderboards), this privacy policy will be updated immediately to clearly disclose what information is processed.
            </p>
          </section>

          <div className="guide-bottom-cta">
            <a href="/" className="action-btn primary-btn large-cta">
              ⚡ RETURN TO GAME
            </a>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};
