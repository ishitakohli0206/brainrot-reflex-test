import React, { useState, useCallback } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { getStoredBestScore, getStoredIsMuted, saveStoredIsMuted } from '../utils/storage';
import { soundManager } from '../utils/sound';

export const HowToPlayPage: React.FC = () => {
  const [bestScore] = useState<number>(() => getStoredBestScore());
  const [isMuted, setIsMuted] = useState<boolean>(() => getStoredIsMuted());

  // Interactive warm-up drill state
  const [practiceActive, setPracticeActive] = useState(false);
  const [practiceTarget, setPracticeTarget] = useState<'🍌' | '👽' | '🥔'>('🍌');
  const [practiceReactionTime, setPracticeReactionTime] = useState<number | null>(null);
  const [practiceStartTime, setPracticeStartTime] = useState<number>(0);

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundManager.setMuted(next);
    saveStoredIsMuted(next);
  };

  const startPractice = useCallback(() => {
    soundManager.initContext();
    setPracticeActive(true);
    setPracticeReactionTime(null);
    const targets: ('🍌' | '👽' | '🥔')[] = ['🍌', '👽', '🥔'];
    const chosen = targets[Math.floor(Math.random() * targets.length)];
    setPracticeTarget(chosen);
    setPracticeStartTime(Date.now());
  }, []);

  const handlePracticeHit = useCallback((emoji: '🍌' | '👽' | '🥔') => {
    if (!practiceActive) return;
    if (emoji === practiceTarget) {
      const ms = Math.max(1, Math.round(Date.now() - practiceStartTime));
      setPracticeReactionTime(ms);
      soundManager.playCorrect();
      setPracticeActive(false);
    } else {
      soundManager.playWrong();
    }
  }, [practiceActive, practiceTarget, practiceStartTime]);

  return (
    <div className="page-wrapper how-to-play-page">
      <Header
        bestScore={bestScore}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        currentPath="/how-to-play/"
      />

      <main className="main-content guide-main">
        <article className="guide-article">
          <header className="guide-header">
            <span className="flair-pill">📖 OFFICIAL GAME MANUAL</span>
            <h1 className="guide-title">
              How to Play Brainrot Reflex Test: Master the 30-Second Reaction Blitz
            </h1>
            <p className="guide-lead">
              Learn the exact game loop mechanics, decoy identification techniques, combo multipliers, and reflex speed tactics to reach the "Chronically Online" rank.
            </p>
          </header>

          {/* Quick CTA to jump to game */}
          <div className="quick-cta-banner">
            <div className="cta-text-group">
              <strong>Ready to test your fingers right now?</strong>
              <span>Hop into the live arena and chase the high score!</span>
            </div>
            <a href="/" className="action-btn primary-btn pulse-glow">
              ⚡ PLAY GAME NOW
            </a>
          </div>

          {/* SECTION 1: Starting the Game */}
          <section className="guide-section">
            <h2>1. How to Start the Game</h2>
            <p>
              To begin, click or tap the glowing <strong>START CHAOS</strong> button on the home screen. This initiates a 3-second visual and audio countdown (3... 2... 1... GO!). Use these three seconds to center your eyes on the top instruction banner and position your fingers comfortably above your screen or mouse.
            </p>
            <p>
              Once the countdown concludes, the 30-second timer begins ticking immediately.
            </p>
          </section>

          {/* SECTION 2: How to Identify the Target */}
          <section className="guide-section">
            <h2>2. How to Identify the Target</h2>
            <p>
              At any moment during active gameplay, the <strong>Instruction Banner</strong> at the top of the board specifies which emoji you must tap. Examples include:
            </p>
            <ul className="bullet-list">
              <li><strong>"TAP THE GREEN GREMLIN"</strong> &rarr; Look for the green alien emoji (👽).</li>
              <li><strong>"ONLY TAP THE POTATO"</strong> &rarr; Spot the spud couch potato emoji (🥔).</li>
              <li><strong>"WHERE IS THE BRAIN?"</strong> &rarr; Find the pink galaxy brain emoji (🧠).</li>
              <li><strong>"FIND THE SUS FACE"</strong> &rarr; Locate the wide curious eyes (👀).</li>
              <li><strong>"SMASH THE DUCK"</strong> &rarr; Strike the yellow duck (🦆).</li>
            </ul>
            <p>
              Every character possesses a distinctive color accent and glowing ring. Developing peripheral recognition for these colors will dramatically cut down your recognition time.
            </p>
          </section>

          {/* INTERACTIVE PRACTICE WIDGET */}
          <section className="guide-section practice-drill-section">
            <h2>Interactive Mini Drill: Warm Up Your Reflexes</h2>
            <p>
              Practice single-target visual identification and measure your reaction time below:
            </p>

            <div className="practice-box">
              {!practiceActive && practiceReactionTime === null && (
                <div className="practice-idle">
                  <p>Click "Start Warm-Up" to spawn a target prompt.</p>
                  <button type="button" className="action-btn primary-btn" onClick={startPractice}>
                    🎯 START WARM-UP DRILL
                  </button>
                </div>
              )}

              {practiceActive && (
                <div className="practice-active-stage">
                  <div className="practice-prompt">
                    TAP THE <strong>{practiceTarget === '🍌' ? 'BANANA' : practiceTarget === '👽' ? 'GREMLIN' : 'POTATO'}</strong>!
                  </div>
                  <div className="practice-targets-row">
                    {(['🥔', '🍌', '👽'] as const).map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        className="practice-target-btn"
                        onClick={() => handlePracticeHit(emoji)}
                        aria-label={`Target ${emoji}`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {practiceReactionTime !== null && (
                <div className="practice-result-stage">
                  <div className="practice-ms-number">{practiceReactionTime} ms</div>
                  <p className="practice-eval">
                    {practiceReactionTime < 400
                      ? '⚡ Incredible reflex speed! You are ready for the main arena.'
                      : practiceReactionTime < 650
                      ? '👍 Solid reaction time! With a combo streak you will score high.'
                      : '🐢 Warming up! Keep practicing to get under 500ms.'}
                  </p>
                  <button type="button" className="action-btn secondary-btn" onClick={startPractice}>
                    🔄 TRY AGAIN
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* SECTION 3: How Scoring & Combos Work */}
          <section className="guide-section">
            <h2>3. How Scoring & Combo Multipliers Work</h2>
            <p>
              Scoring is designed to reward sustained accuracy rather than mindless spam clicking:
            </p>
            <div className="callout-card">
              <h3>The Scoring Formula</h3>
              <p>
                <strong>Points per correct hit = Base (100) + (Combo × 15) + Speed Bonus (25 if &lt;600ms)</strong>
              </p>
            </div>
            <p>
              When your combo streak hits 3, 6, 9, 12, or 15, animated popups appear on screen:
            </p>
            <ul className="bullet-list">
              <li><strong>3x Combo:</strong> <em>"YOU'RE COOKING 🔥"</em></li>
              <li><strong>6x Combo:</strong> <em>"TOO FAST ⚡"</em></li>
              <li><strong>9x Combo:</strong> <em>"INSANE 💥"</em></li>
              <li><strong>12x Combo:</strong> <em>"NO BRAIN JUST REFLEX 🧬"</em></li>
              <li><strong>15x Combo:</strong> <em>"ABSOLUTE CINEMA 🎬"</em></li>
            </ul>
            <p>
              <strong>Penalty for Decoys:</strong> If you accidentally click a decoy emoji, your combo streak instantly resets to zero and you forfeit 50 points. A single mistake at combo x12 can cost you hundreds of potential points!
            </p>
          </section>

          {/* SECTION 4: How the Timer Works */}
          <section className="guide-section">
            <h2>4. How the 30-Second Timer Works</h2>
            <p>
              The timer counts down from 30.0 seconds with high-frequency millisecond tracking. Unlike turn-based games, the clock never stops between rounds. As soon as you tap the correct emoji, the next round spawns instantaneously with zero transition latency.
            </p>
            <p>
              When only 5 seconds remain, the timer bar pulses red and audio tension rises. Stay calm and focus on clean taps to close out the round.
            </p>
          </section>

          {/* SECTION 5: How to Improve Your Score */}
          <section className="guide-section">
            <h2>5. Proven Tactics to Improve Your Score</h2>
            <div className="tactics-list">
              <div className="tactic-item">
                <h3>💡 Inhibit Impulsive Clicks</h3>
                <p>
                  Human reaction errors happen when your finger moves before your eyes finish confirming the target. Train yourself to visually register the emoji before initiating motor movement.
                </p>
              </div>

              <div className="tactic-item">
                <h3>💡 Eliminate Device Input Lag</h3>
                <p>
                  Ensure your device is not in extreme battery-saver mode, which can throttle screen refresh rates from 60Hz/120Hz down to 30Hz and add 20-30ms of display latency.
                </p>
              </div>

              <div className="tactic-item">
                <h3>💡 Hunt the Golden Star</h3>
                <p>
                  When the golden star 🌟 appears, prioritize it. The +250 point boost is equivalent to 2.5 standard hits and carries zero penalty risk.
                </p>
              </div>
            </div>
          </section>

          {/* Bottom CTA */}
          <div className="guide-bottom-cta">
            <h2>Put Your Skills to the Test</h2>
            <p>Jump into the live arena, test your reaction speed, and see your rank!</p>
            <a href="/" className="action-btn primary-btn large-cta">
              🚀 LAUNCH BRAINROT REFLEX TEST
            </a>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};
