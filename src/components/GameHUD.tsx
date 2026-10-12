import React from 'react';
import { GAME_CONFIG } from '../game/config';

interface GameHUDProps {
  score: number;
  combo: number;
  timeLeft: number;
  bestScore: number;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  score,
  combo,
  timeLeft,
  bestScore,
}) => {
  const timeProgress = Math.max(0, Math.min(100, (timeLeft / GAME_CONFIG.GAME_DURATION_SECONDS) * 100));
  const isTimeCritical = timeLeft <= 5.0 && timeLeft > 0;

  return (
    <div className="game-hud" aria-label="Game Status Heads-Up Display">
      {/* SCORE item */}
      <div className="hud-metric hud-score">
        <span className="metric-label">SCORE</span>
        <span className="metric-value score-text">{score}</span>
      </div>

      {/* COMBO item */}
      <div className={`hud-metric hud-combo ${combo > 1 ? 'has-combo' : ''}`}>
        <span className="metric-label">COMBO</span>
        <span className="metric-value combo-text">
          {combo > 0 ? `x${combo}` : '0'}
        </span>
        {combo >= 3 && <span className="combo-fire" aria-hidden="true">🔥</span>}
      </div>

      {/* TIME item with animated progress bar */}
      <div className={`hud-metric hud-time ${isTimeCritical ? 'critical-pulse' : ''}`}>
        <span className="metric-label">TIME</span>
        <span className="metric-value time-text">{timeLeft.toFixed(1)}s</span>
        <div className="time-bar-track">
          <div
            className={`time-bar-fill ${isTimeCritical ? 'critical' : ''}`}
            style={{ width: `${timeProgress}%` }}
          />
        </div>
      </div>

      {/* BEST score item */}
      <div className="hud-metric hud-best">
        <span className="metric-label">BEST</span>
        <span className="metric-value best-text">{Math.max(bestScore, score)}</span>
      </div>
    </div>
  );
};
