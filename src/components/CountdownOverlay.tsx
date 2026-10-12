import React from 'react';

interface CountdownOverlayProps {
  countdownNumber: number;
}

export const CountdownOverlay: React.FC<CountdownOverlayProps> = ({
  countdownNumber,
}) => {
  return (
    <div className="countdown-overlay" role="dialog" aria-modal="true" aria-label="Game Starting Countdown">
      <div className="countdown-content">
        <span className="countdown-subtext">GET YOUR FINGERS READY</span>
        <div key={countdownNumber} className="countdown-digit">
          {countdownNumber}
        </div>
        <p className="countdown-tip">
          💡 Match the instruction banner at the top as fast as you can!
        </p>
      </div>
    </div>
  );
};
