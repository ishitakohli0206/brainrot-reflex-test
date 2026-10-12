import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { getStoredBestScore, getStoredIsMuted, saveStoredIsMuted } from '../utils/storage';
import { soundManager } from '../utils/sound';

export const NotFoundPage: React.FC = () => {
  const [bestScore] = useState<number>(getStoredBestScore());
  const [isMuted, setIsMuted] = useState<boolean>(getStoredIsMuted());

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundManager.setMuted(next);
    saveStoredIsMuted(next);
  };

  return (
    <div className="page-wrapper not-found-page">
      <Header
        bestScore={bestScore}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        currentPath="/404"
      />

      <main className="main-content guide-main not-found-main">
        <div className="not-found-card">
          <div className="not-found-emoji float-anim" aria-hidden="true">
            💀🛸
          </div>
          <span className="not-found-code">ERROR 404</span>
          <h1 className="not-found-title">Page Lost in the Brainrot Void</h1>
          <p className="not-found-desc">
            The target you're looking for was either tapped too fast, abducted by green gremlins, or never existed in the first place.
          </p>

          <div className="not-found-actions">
            <a href="/" className="action-btn primary-btn large-cta pulse-glow">
              ⚡ RETURN TO BRAINROT REFLEX TEST
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
