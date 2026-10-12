import React from 'react';
import { useBrainrotGame } from '../game/useBrainrotGame';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { GameHUD } from '../components/GameHUD';
import { GameBoard } from '../components/GameBoard';
import { CountdownOverlay } from '../components/CountdownOverlay';
import { GameOverModal } from '../components/GameOverModal';
import { SEOContent } from '../components/SEOContent';

export const HomePage: React.FC = () => {
  const {
    screen,
    countdownNumber,
    timeLeft,
    score,
    combo,
    stats,
    currentRound,
    floatingFeedbacks,
    comboBanner,
    screenShake,
    isMuted,
    startChaos,
    handleTargetClick,
    restartGame,
    goHome,
    toggleMute,
  } = useBrainrotGame();

  return (
    <div className="page-wrapper home-page">
      <Header
        bestScore={stats.bestScore}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        currentPath="/"
      />

      <main className="main-content" id="main-content">
        <section className="hero-game-section" aria-label="Brainrot Reflex Test Game Area">
          <div className="hero-header-block">
            <h1 className="main-game-title">Brainrot Reflex Test</h1>
            <p className="main-game-subtitle">
              Tap the correct target as quickly as you can. Avoid the wrong ones.
            </p>
          </div>

          {/* GAME CONTAINER */}
          <div className="game-stage-container" id="game-stage">
            {screen === 'home' && (
              <div className="home-screen-card">
                <div className="home-badge-container">
                  <span className="flair-pill">🔥 30-SECOND BLITZ REFLEX TEST</span>
                </div>

                <div className="home-hero-visual">
                  <span className="hero-emoji-icon float-anim" aria-hidden="true">🧠</span>
                  <div className="hero-target-preview">
                    <span className="preview-target-pill">👽 Gremlin</span>
                    <span className="preview-target-pill">🥔 Potato</span>
                    <span className="preview-target-pill">🍌 Banana</span>
                    <span className="preview-target-pill">🗿 Sigma</span>
                  </div>
                </div>

                {stats.bestScore > 0 && (
                  <div className="home-best-record">
                    <span className="record-trophy" aria-hidden="true">🏆</span>
                    <span>Your Best Score: <strong>{stats.bestScore}</strong></span>
                  </div>
                )}

                <div className="home-action-wrap">
                  <button
                    type="button"
                    className="start-chaos-btn pulse-glow"
                    onClick={startChaos}
                    id="start-chaos-button"
                  >
                    <span className="btn-icon" aria-hidden="true">⚡</span>
                    START CHAOS
                  </button>
                </div>
              </div>
            )}

            {screen === 'countdown' && (
              <div className="playing-container">
                <CountdownOverlay countdownNumber={countdownNumber} />
                <GameHUD
                  score={0}
                  combo={0}
                  timeLeft={30}
                  bestScore={stats.bestScore}
                />
                <div className="game-arena placeholder-arena">
                  <div className="arena-standby-text">Standby... Arena spawning!</div>
                </div>
              </div>
            )}

            {screen === 'playing' && (
              <div className="playing-container">
                <GameHUD
                  score={score}
                  combo={combo}
                  timeLeft={timeLeft}
                  bestScore={stats.bestScore}
                />
                <GameBoard
                  currentRound={currentRound}
                  onTargetClick={handleTargetClick}
                  floatingFeedbacks={floatingFeedbacks}
                  comboBanner={comboBanner}
                  screenShake={screenShake}
                />
              </div>
            )}

            {screen === 'gameover' && (
              <div className="playing-container">
                <GameOverModal
                  stats={stats}
                  onPlayAgain={restartGame}
                  onGoHome={goHome}
                />
              </div>
            )}
          </div>
        </section>

        {/* Structured Data JSON-LD for Google & Search Crawlers */}
        <SEOContent />
      </main>

      <Footer />
    </div>
  );
};
