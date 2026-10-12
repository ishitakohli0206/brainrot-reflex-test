import React, { useState } from 'react';
import type { GameStats } from '../game/types';
import { GAME_CONFIG } from '../game/config';

interface GameOverModalProps {
  stats: GameStats;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  stats,
  onPlayAgain,
  onGoHome,
}) => {
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const handleShare = async () => {
    const shareText = `I scored ${stats.score} in Brainrot Reflex Test 🧠🔥 Rank: ${stats.rank.title} ${stats.rank.badge}! Can you beat my reflexes?`;
    const shareUrl = GAME_CONFIG.PRODUCTION_DOMAIN;

    // Check for native Web Share API
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Brainrot Reflex Test Score',
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (err: unknown) {
        // User cancelled share or share failed; proceed to clipboard fallback
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
      }
    }

    // Fallback: Copy to clipboard
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        setCopyFeedback('Score copied to clipboard! 📋');
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = `${shareText}\n${shareUrl}`;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopyFeedback('Score copied to clipboard! 📋');
      }
    } catch {
      setCopyFeedback('Could not copy automatically. Share manually!');
    }

    setTimeout(() => {
      setCopyFeedback(null);
    }, 2800);
  };

  return (
    <div className="game-over-overlay" role="dialog" aria-modal="true" aria-labelledby="game-over-title">
      <div className="game-over-card">
        {stats.isNewBest && (
          <div className="new-record-pill">
            <span aria-hidden="true">🎉</span> NEW PERSONAL RECORD!
          </div>
        )}

        <h2 id="game-over-title" className="game-over-title">
          GAME OVER
        </h2>

        {/* Score & Rank Highlight */}
        <div className="score-hero-container">
          <div className="final-score-display">
            <span className="final-score-label">FINAL SCORE</span>
            <span className="final-score-number">{stats.score}</span>
          </div>

          <div className="rank-card">
            <div className="rank-badge-icon" aria-hidden="true">
              {stats.rank.badge}
            </div>
            <div className="rank-details">
              <span className="rank-eyebrow">YOUR REFLEX RANK</span>
              <h3 className="rank-title">{stats.rank.title}</h3>
              <p className="rank-desc">{stats.rank.description}</p>
            </div>
          </div>
        </div>

        {/* Breakdown Stats Grid */}
        <div className="stats-breakdown-grid">
          <div className="stat-box">
            <span className="stat-icon" aria-hidden="true">🎯</span>
            <span className="stat-value">{stats.accuracyPercent}%</span>
            <span className="stat-label">Accuracy</span>
          </div>
          <div className="stat-box">
            <span className="stat-icon" aria-hidden="true">🔥</span>
            <span className="stat-value">x{stats.highestCombo}</span>
            <span className="stat-label">Max Combo</span>
          </div>
          <div className="stat-box">
            <span className="stat-icon" aria-hidden="true">⚡</span>
            <span className="stat-value">{stats.hits}</span>
            <span className="stat-label">Targets Hit</span>
          </div>
          <div className="stat-box">
            <span className="stat-icon" aria-hidden="true">🏆</span>
            <span className="stat-value">{stats.bestScore}</span>
            <span className="stat-label">All-Time Best</span>
          </div>
        </div>

        {/* Share Feedback Toast */}
        {copyFeedback && (
          <div className="copy-toast" role="status">
            {copyFeedback}
          </div>
        )}

        {/* Primary Actions */}
        <div className="game-over-actions">
          <button
            type="button"
            className="action-btn primary-btn play-again-btn"
            onClick={onPlayAgain}
          >
            <span aria-hidden="true">🔄</span> PLAY AGAIN
          </button>

          <button
            type="button"
            className="action-btn share-btn"
            onClick={handleShare}
          >
            <span aria-hidden="true">🚀</span> SHARE RESULT
          </button>

          <button
            type="button"
            className="action-btn secondary-btn home-btn"
            onClick={onGoHome}
          >
            <span aria-hidden="true">🏠</span> HOME
          </button>
        </div>
      </div>
    </div>
  );
};
