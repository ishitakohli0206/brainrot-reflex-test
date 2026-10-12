import { useState, useEffect, useRef, useCallback } from 'react';
import {
  GAME_CONFIG,
  getRankForScore,
} from './config';
import type { TargetDefinition } from './config';
import type {
  GameScreen,
  ActiveTarget,
  GameRound,
  FloatingFeedback,
  GameStats,
} from './types';
import {
  getStoredBestScore,
  saveStoredBestScore,
  getStoredIsMuted,
  saveStoredIsMuted,
} from '../utils/storage';
import { soundManager } from '../utils/sound';
import { triggerConfettiBurst } from '../utils/confetti';

export function useBrainrotGame() {
  const [screen, setScreen] = useState<GameScreen>('home');
  const [countdownNumber, setCountdownNumber] = useState<number>(3);
  const [timeLeft, setTimeLeft] = useState<number>(GAME_CONFIG.GAME_DURATION_SECONDS);

  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [highestCombo, setHighestCombo] = useState<number>(0);
  const [hits, setHits] = useState<number>(0);
  const [misses, setMisses] = useState<number>(0);
  const [bonusCollected, setBonusCollected] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(() => getStoredBestScore());
  const [isNewBest, setIsNewBest] = useState<boolean>(false);

  const [currentRound, setCurrentRound] = useState<GameRound | null>(null);
  const [floatingFeedbacks, setFloatingFeedbacks] = useState<FloatingFeedback[]>([]);
  const [comboBanner, setComboBanner] = useState<string | null>(null);
  const [screenShake, setScreenShake] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    const saved = getStoredIsMuted();
    soundManager.setMuted(saved);
    return saved;
  });

  // High precision timer refs
  const gameEndTimeRef = useRef<number>(0);
  const timerIntervalRef = useRef<number | null>(null);
  const roundStartTimeRef = useRef<number>(0);
  const bonusTimeoutRef = useRef<number | null>(null);
  const lastClickTimeRef = useRef<number>(0);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      soundManager.setMuted(next);
      saveStoredIsMuted(next);
      return next;
    });
  }, []);

  /**
   * Helper to pick a random item from an array
   */
  const getRandomItem = <T>(items: T[]): T => {
    return items[Math.floor(Math.random() * items.length)];
  };

  /**
   * Generates distributed, non-overlapping coordinates in percentages.
   * Divide arena into candidate grid cells and add random jitter.
   */
  const generateCoordinates = (count: number) => {
    const rows = count <= 4 ? 2 : count <= 6 ? 3 : 3;
    const cols = Math.ceil(count / rows);

    const cells: { row: number; col: number }[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        cells.push({ row: r, col: c });
      }
    }

    // Shuffle cells
    for (let i = cells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cells[i], cells[j]] = [cells[j], cells[i]];
    }

    const cellWidth = 84 / cols;
    const cellHeight = 74 / rows;

    return cells.slice(0, count).map((cell) => {
      // Add slight jitter inside the cell
      const jitterX = (Math.random() - 0.5) * (cellWidth * 0.35);
      const jitterY = (Math.random() - 0.5) * (cellHeight * 0.35);

      const left = Math.min(88, Math.max(10, 8 + cell.col * cellWidth + cellWidth / 2 + jitterX));
      const top = Math.min(86, Math.max(12, 10 + cell.row * cellHeight + cellHeight / 2 + jitterY));

      return { top, left };
    });
  };

  /**
   * Spawn a new game round based on current difficulty tier
   */
  const generateNextRound = useCallback((remainingSec: number, prevRoundNumber: number = 0): GameRound => {
    const tier =
      GAME_CONFIG.DIFFICULTY_TIERS.find((t) => remainingSec >= t.remainingSec) ||
      GAME_CONFIG.DIFFICULTY_TIERS[GAME_CONFIG.DIFFICULTY_TIERS.length - 1];

    const targetCount = tier.targetCount;
    const scale = tier.scale;

    // Pick target definition
    const targetDef = getRandomItem(GAME_CONFIG.TARGET_ROSTER);
    const instruction = getRandomItem(targetDef.instructionTemplates);

    // Pick unique decoys
    const decoyPool = GAME_CONFIG.TARGET_ROSTER.filter((t) => t.id !== targetDef.id);
    const shuffledDecoys = [...decoyPool].sort(() => Math.random() - 0.5);
    const selectedDecoys = shuffledDecoys.slice(0, targetCount - 1);

    const positions = generateCoordinates(targetCount);
    // Shuffle which position gets the correct target
    const targetPosIdx = Math.floor(Math.random() * targetCount);

    const activeTargets: ActiveTarget[] = [];
    const now = performance.now();

    for (let i = 0; i < targetCount; i++) {
      const isCorrect = i === targetPosIdx;
      const def: TargetDefinition = isCorrect ? targetDef : selectedDecoys[i < targetPosIdx ? i : i - 1];
      const pos = positions[i];

      activeTargets.push({
        instanceId: `target-${prevRoundNumber + 1}-${i}-${Math.random().toString(36).substring(2, 7)}`,
        definition: def,
        isCorrect,
        position: pos,
        scale,
        rotationDeg: (Math.random() - 0.5) * 16,
        spawnTimeMs: now,
      });
    }

    // Check bonus target spawn chance (only occasionally)
    let bonusTarget: ActiveTarget | null = null;
    if (Math.random() < GAME_CONFIG.BONUS_TARGET_CHANCE && remainingSec > 5) {
      const bonusBonus = GAME_CONFIG.BONUS_TARGET;
      // Position bonus target near edge or available spot
      const bonusLeft = Math.floor(Math.random() * 70) + 15;
      const bonusTop = Math.floor(Math.random() * 65) + 15;

      bonusTarget = {
        instanceId: `bonus-${Math.random().toString(36).substring(2, 7)}`,
        definition: {
          id: bonusBonus.id,
          emoji: bonusBonus.emoji,
          name: bonusBonus.name,
          keywords: ['bonus', 'star'],
          instructionTemplates: ['BONUS STAR!'],
          color: bonusBonus.color,
          bgGlow: bonusBonus.bgGlow,
        },
        isCorrect: false,
        isBonus: true,
        position: { top: bonusTop, left: bonusLeft },
        scale: 0.95,
        rotationDeg: 0,
        spawnTimeMs: now,
      };
    }

    roundStartTimeRef.current = now;

    return {
      target: targetDef,
      instruction,
      activeTargets,
      bonusTarget,
      roundNumber: prevRoundNumber + 1,
      startedAtMs: now,
    };
  }, []);

  /**
   * Floating text feedback helper
   */
  const addFloatingFeedback = useCallback((text: string, isPositive: boolean, isBonus: boolean = false, x?: number, y?: number) => {
    const id = `feedback-${Date.now()}-${Math.random()}`;
    const newFeedback: FloatingFeedback = {
      id,
      text,
      isPositive,
      isBonus,
      x: x ?? window.innerWidth / 2,
      y: y ?? window.innerHeight / 2,
    };

    setFloatingFeedbacks((prev) => [...prev, newFeedback]);

    setTimeout(() => {
      setFloatingFeedbacks((prev) => prev.filter((item) => item.id !== id));
    }, 750);
  }, []);

  /**
   * Finalize and end the game
   */
  const endGame = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (bonusTimeoutRef.current) {
      clearTimeout(bonusTimeoutRef.current);
      bonusTimeoutRef.current = null;
    }

    soundManager.playGameOver();

    setScreen('gameover');
    setTimeLeft(0);

    setScore((finalScore) => {
      const savedBest = getStoredBestScore();
      if (finalScore > savedBest) {
        saveStoredBestScore(finalScore);
        setBestScore(finalScore);
        setIsNewBest(true);
        triggerConfettiBurst(undefined, undefined, 75);
      } else {
        setIsNewBest(false);
        if (finalScore >= 250) {
          triggerConfettiBurst(undefined, undefined, 45);
        }
      }
      return finalScore;
    });
  }, []);

  /**
   * Start 30s game round
   */
  const launchActiveGame = useCallback(() => {
    setScreen('playing');
    setTimeLeft(GAME_CONFIG.GAME_DURATION_SECONDS);
    setScore(0);
    setCombo(0);
    setHighestCombo(0);
    setHits(0);
    setMisses(0);
    setBonusCollected(0);
    setIsNewBest(false);
    setComboBanner(null);

    soundManager.playCountdownGo();

    const round = generateNextRound(GAME_CONFIG.GAME_DURATION_SECONDS, 0);
    setCurrentRound(round);

    const now = performance.now();
    gameEndTimeRef.current = now + GAME_CONFIG.GAME_DURATION_SECONDS * 1000;

    // High precision tick interval
    timerIntervalRef.current = window.setInterval(() => {
      const remainingMs = gameEndTimeRef.current - performance.now();
      const remainingSec = Math.max(0, remainingMs / 1000);

      setTimeLeft(parseFloat(remainingSec.toFixed(1)));

      if (remainingSec <= 0) {
        endGame();
      }
    }, 100);
  }, [generateNextRound, endGame]);

  /**
   * Start Chaos Flow (3-second countdown -> 30-second gameplay)
   */
  const startChaos = useCallback(() => {
    soundManager.initContext();
    setScreen('countdown');
    setCountdownNumber(3);
    soundManager.playCountdownTick();

    let count = 3;
    const countInterval = setInterval(() => {
      count -= 1;
      if (count > 0) {
        setCountdownNumber(count);
        soundManager.playCountdownTick();
      } else {
        clearInterval(countInterval);
        launchActiveGame();
      }
    }, 1000);
  }, [launchActiveGame]);

  /**
   * Handle user tapping on a target
   */
  const handleTargetClick = useCallback((target: ActiveTarget, clickX?: number, clickY?: number) => {
    if (screen !== 'playing') return;

    const now = performance.now();
    // Guard against rapid duplicate clicks within 60ms
    if (now - lastClickTimeRef.current < 60) return;
    lastClickTimeRef.current = now;

    // 1. Bonus Target Click
    if (target.isBonus) {
      soundManager.playBonus();
      const bonusPts = GAME_CONFIG.BONUS_TARGET_POINTS;
      setScore((prev) => prev + bonusPts);
      setBonusCollected((prev) => prev + 1);
      addFloatingFeedback(`+${bonusPts} BONUS! 🌟`, true, true, clickX, clickY);

      // Remove bonus target
      setCurrentRound((prev) => (prev ? { ...prev, bonusTarget: null } : null));
      return;
    }

    // 2. Correct Target Click
    if (target.isCorrect) {
      setCombo((prevCombo) => {
        const nextCombo = prevCombo + 1;
        setHighestCombo((highest) => Math.max(highest, nextCombo));

        // Combo milestone sound & banner
        const milestone = GAME_CONFIG.COMBO_MILESTONES.find((m) => m.count === nextCombo);
        if (milestone) {
          soundManager.playComboMilestone();
          setComboBanner(milestone.message);
          setTimeout(() => setComboBanner(null), 1200);
        } else {
          soundManager.playCorrect(nextCombo);
        }

        // Calculate points
        const reactionTime = now - roundStartTimeRef.current;
        const speedBonus = reactionTime < GAME_CONFIG.SPEED_BONUS_THRESHOLD_MS ? GAME_CONFIG.RAPID_HIT_BONUS : 0;
        const comboBonus = nextCombo * GAME_CONFIG.COMBO_BONUS_MULTIPLIER;
        const addedScore = GAME_CONFIG.BASE_POINTS_PER_HIT + comboBonus + speedBonus;

        setScore((prevScore) => prevScore + addedScore);
        setHits((prevHits) => prevHits + 1);

        const feedbackText = speedBonus > 0
          ? `+${addedScore} FAST! 🔥`
          : nextCombo > 1
          ? `+${addedScore} (x${nextCombo})`
          : `+${addedScore}`;

        addFloatingFeedback(feedbackText, true, false, clickX, clickY);

        return nextCombo;
      });

      // Spawn next round immediately
      const remainingSec = Math.max(0, (gameEndTimeRef.current - performance.now()) / 1000);
      setCurrentRound((prev) => generateNextRound(remainingSec, prev?.roundNumber || 0));
      return;
    }

    // 3. Wrong Target Click (Decoy)
    soundManager.playWrong();
    setCombo(0);
    setMisses((prev) => prev + 1);
    setScore((prev) => Math.max(0, prev - GAME_CONFIG.WRONG_HIT_PENALTY));

    // Screen shake feedback
    setScreenShake(true);
    setTimeout(() => setScreenShake(false), 320);

    const funnyWrongMessages = [
      `-${GAME_CONFIG.WRONG_HIT_PENALTY} 💀`,
      `NOT THAT ONE! 🤡`,
      `OOPS! -${GAME_CONFIG.WRONG_HIT_PENALTY}`,
      `L + RATIO 📉`,
    ];
    const chosenMsg = getRandomItem(funnyWrongMessages);
    addFloatingFeedback(chosenMsg, false, false, clickX, clickY);
  }, [screen, generateNextRound, addFloatingFeedback]);

  const goHome = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setScreen('home');
    setTimeLeft(GAME_CONFIG.GAME_DURATION_SECONDS);
  }, []);

  const restartGame = useCallback(() => {
    startChaos();
  }, [startChaos]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (bonusTimeoutRef.current) clearTimeout(bonusTimeoutRef.current);
    };
  }, []);

  // Compute final statistics
  const totalAttempts = hits + misses;
  const accuracyPercent = totalAttempts > 0 ? Math.round((hits / totalAttempts) * 100) : 0;
  const rank = getRankForScore(score);

  const stats: GameStats = {
    score,
    highestCombo,
    currentCombo: combo,
    hits,
    misses,
    accuracyPercent,
    bonusCollected,
    rank,
    isNewBest,
    bestScore,
  };

  return {
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
  };
}
