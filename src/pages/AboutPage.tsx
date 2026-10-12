import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { getStoredBestScore, getStoredIsMuted, saveStoredIsMuted } from '../utils/storage';
import { soundManager } from '../utils/sound';

export const AboutPage: React.FC = () => {
  const [bestScore] = useState<number>(getStoredBestScore());
  const [isMuted, setIsMuted] = useState<boolean>(getStoredIsMuted());

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundManager.setMuted(next);
    saveStoredIsMuted(next);
  };

  return (
    <div className="page-wrapper about-page">
      <Header
        bestScore={bestScore}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        currentPath="/about/"
      />

      <main className="main-content guide-main">
        <article className="guide-article">
          <header className="guide-header">
            <span className="flair-pill">ℹ️ THE STORY</span>
            <h1 className="guide-title">
              About Brainrot Reflex Test
            </h1>
            <p className="guide-lead">
              A love letter to fast-paced internet arcade culture, built with modern web technologies, zero bloat, and pure responsive speed.
            </p>
          </header>

          <section className="guide-section">
            <h2>Why Was Brainrot Reflex Test Created?</h2>
            <p>
              In a modern internet full of heavy, advertisement-bloated mobile games and multi-gigabyte downloads, the simple joy of instant browser arcade games has become rare. Many reflex tests online are either sterile, hospital-style clickers (click a red box when it turns green) or slow apps wrapped in intrusive ads and login prompts.
            </p>
            <p>
              <strong>Brainrot Reflex Test</strong> was engineered with a straightforward philosophy:
            </p>
            <ul className="bullet-list">
              <li><strong>Zero Friction:</strong> No downloads, no accounts, no logins, no paywalls. Open the link and you are playing in 2 seconds.</li>
              <li><strong>Fun Internet Aesthetics:</strong> Playful internet meme characters (gremlins, potatoes, bananas, sigma faces, galaxy brains) paired with bright arcade styling.</li>
              <li><strong>Deep Choice Reflex Mechanics:</strong> A real test of selective visual attention and cognitive inhibition under a tight 30-second clock.</li>
              <li><strong>Privacy First:</strong> Your highest score and audio preferences stay strictly inside your own browser using localStorage.</li>
            </ul>
          </section>

          <section className="guide-section">
            <h2>The Technology Stack</h2>
            <p>
              Under the hood, Brainrot Reflex Test is handcrafted with lightweight, modern web standards:
            </p>
            <div className="tech-stack-grid">
              <div className="tech-item-card">
                <h3>⚛️ React & TypeScript</h3>
                <p>Ensures robust component modularity, clean state management, and type safety across the entire game loop.</p>
              </div>

              <div className="tech-item-card">
                <h3>⚡ Vite 8</h3>
                <p>Lightning-fast build system producing minimal JavaScript bundles with instant initial page load times.</p>
              </div>

              <div className="tech-item-card">
                <h3>🎵 Web Audio API</h3>
                <p>Procedural sound effects generated directly in real-time via the browser's audio synthesizer, requiring zero external audio asset downloads.</p>
              </div>

              <div className="tech-item-card">
                <h3>🎨 Handcrafted Vanilla CSS</h3>
                <p>GPU-accelerated animations, fluid typography, dark-mode arcade palette, and responsive touch controls without bloated utility frameworks.</p>
              </div>
            </div>
          </section>

          <section className="guide-section">
            <h2>Accessibility & Mobile Performance</h2>
            <p>
              We designed Brainrot Reflex Test to deliver an identical 60fps experience on everything from budget Android smartphones to high-end desktop gaming monitors:
            </p>
            <ul className="bullet-list">
              <li>Large, accessible touch targets (68px+) designed for single-handed thumb tapping on phones.</li>
              <li>Pointer events with zero touch latency (no 300ms mobile tap delay).</li>
              <li>Support for keyboard navigation via Tab and Enter/Space keys.</li>
              <li>Respect for system <code>prefers-reduced-motion</code> accessibility preferences.</li>
            </ul>
          </section>

          <div className="guide-bottom-cta">
            <h2>Ready to Play?</h2>
            <p>Test your reflexes and see if you can achieve the "Chronically Online" title!</p>
            <a href="/" className="action-btn primary-btn large-cta">
              ⚡ PLAY BRAINROT REFLEX TEST NOW
            </a>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};
