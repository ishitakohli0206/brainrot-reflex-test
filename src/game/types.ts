import type { TargetDefinition, RankDefinition } from './config';

export type GameScreen = 'home' | 'countdown' | 'playing' | 'gameover';

export interface ActiveTarget {
  instanceId: string;
  definition: TargetDefinition;
  isCorrect: boolean;
  isBonus?: boolean;
  position: {
    top: number; // percentage (0 - 100)
    left: number; // percentage (0 - 100)
  };
  scale: number;
  rotationDeg: number;
  spawnTimeMs: number;
}

export interface GameRound {
  target: TargetDefinition;
  instruction: string;
  activeTargets: ActiveTarget[];
  bonusTarget?: ActiveTarget | null;
  roundNumber: number;
  startedAtMs: number;
}

export interface FloatingFeedback {
  id: string;
  text: string;
  isPositive: boolean;
  isBonus?: boolean;
  x: number;
  y: number;
}

export interface GameStats {
  score: number;
  highestCombo: number;
  currentCombo: number;
  hits: number;
  misses: number;
  accuracyPercent: number;
  bonusCollected: number;
  rank: RankDefinition;
  isNewBest: boolean;
  bestScore: number;
}
