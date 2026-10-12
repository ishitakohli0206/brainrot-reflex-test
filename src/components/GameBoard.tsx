import React from 'react';
import type { GameRound, ActiveTarget, FloatingFeedback } from '../game/types';

interface GameBoardProps {
  currentRound: GameRound | null;
  onTargetClick: (target: ActiveTarget, clickX?: number, clickY?: number) => void;
  floatingFeedbacks: FloatingFeedback[];
  comboBanner: string | null;
  screenShake: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  currentRound,
  onTargetClick,
  floatingFeedbacks,
  comboBanner,
  screenShake,
}) => {
  if (!currentRound) return null;

  const handlePointerDown = (
    e: React.PointerEvent<HTMLButtonElement>,
    target: ActiveTarget
  ) => {
    // Prevent default touch gestures like zoom/double-tap delay
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = rect.left + rect.width / 2;
    const clickY = rect.top;
    onTargetClick(target, clickX, clickY);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    target: ActiveTarget
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const rect = e.currentTarget.getBoundingClientRect();
      onTargetClick(target, rect.left + rect.width / 2, rect.top);
    }
  };

  return (
    <div className={`game-board-container ${screenShake ? 'shake-active' : ''}`}>
      {/* Dynamic Instruction Banner */}
      <div className="instruction-banner" role="status" aria-live="polite">
        <span className="instruction-arrow" aria-hidden="true">👉</span>
        <span className="instruction-text">{currentRound.instruction}</span>
        <span
          className="instruction-badge"
          style={{
            borderColor: currentRound.target.color,
            boxShadow: `0 0 12px ${currentRound.target.color}`,
          }}
        >
          {currentRound.target.emoji}
        </span>
      </div>

      {/* Combo Banner Toast */}
      {comboBanner && (
        <div className="combo-milestone-toast" role="status">
          <span className="toast-text">{comboBanner}</span>
        </div>
      )}

      {/* Interactive Arena */}
      <div className="game-arena" id="game-arena">
        {/* Active Targets */}
        {currentRound.activeTargets.map((target) => {
          return (
            <button
              key={target.instanceId}
              type="button"
              className="target-btn"
              style={{
                top: `${target.position.top}%`,
                left: `${target.position.left}%`,
                transform: `translate(-50%, -50%) scale(${target.scale}) rotate(${target.rotationDeg}deg)`,
                borderColor: target.definition.color,
                boxShadow: `0 4px 14px ${target.definition.bgGlow}`,
              }}
              onPointerDown={(e) => handlePointerDown(e, target)}
              onKeyDown={(e) => handleKeyDown(e, target)}
              aria-label={`Target: ${target.definition.name}`}
            >
              <span className="target-emoji" aria-hidden="true">
                {target.definition.emoji}
              </span>
              <span className="target-subname">{target.definition.name}</span>
            </button>
          );
        })}

        {/* Bonus Target (Golden Star) if active */}
        {currentRound.bonusTarget && (
          <button
            key={currentRound.bonusTarget.instanceId}
            type="button"
            className="target-btn bonus-target-btn"
            style={{
              top: `${currentRound.bonusTarget.position.top}%`,
              left: `${currentRound.bonusTarget.position.left}%`,
              transform: 'translate(-50%, -50%) scale(1.1)',
            }}
            onPointerDown={(e) => handlePointerDown(e, currentRound.bonusTarget!)}
            onKeyDown={(e) => handleKeyDown(e, currentRound.bonusTarget!)}
            aria-label="Bonus Star: tap for extra 250 points"
          >
            <span className="bonus-shimmer-ring" aria-hidden="true" />
            <span className="target-emoji bonus-emoji" aria-hidden="true">
              {currentRound.bonusTarget.definition.emoji}
            </span>
            <span className="bonus-label">+250!</span>
          </button>
        )}

        {/* Floating Feedbacks */}
        {floatingFeedbacks.map((item) => (
          <div
            key={item.id}
            className={`floating-feedback ${
              item.isBonus ? 'feedback-bonus' : item.isPositive ? 'feedback-pos' : 'feedback-neg'
            }`}
            style={{
              left: `${item.x}px`,
              top: `${item.y}px`,
            }}
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
};
