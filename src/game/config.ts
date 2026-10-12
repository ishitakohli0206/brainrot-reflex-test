/**
 * Brainrot Reflex Test - Global Game Configuration
 * All gameplay durations, scoring thresholds, ranks, and metadata
 * are centralized here for easy tuning and maintenance.
 */

export interface TargetDefinition {
  id: string;
  emoji: string;
  name: string;
  keywords: string[];
  instructionTemplates: string[];
  color: string;
  bgGlow: string;
}

export interface RankDefinition {
  minScore: number;
  maxScore: number;
  title: string;
  badge: string;
  description: string;
}

export const GAME_CONFIG = {
  // Gameplay Timers
  GAME_DURATION_SECONDS: 30,
  COUNTDOWN_DURATION_SECONDS: 3,

  // Scoring Rules
  BASE_POINTS_PER_HIT: 100,
  WRONG_HIT_PENALTY: 50,
  COMBO_BONUS_MULTIPLIER: 15, // extra points = currentCombo * 15
  SPEED_BONUS_THRESHOLD_MS: 600, // rapid clicks (<600ms) get extra 25 pts
  RAPID_HIT_BONUS: 25,
  BONUS_TARGET_POINTS: 250,
  BONUS_TARGET_CHANCE: 0.18, // 18% chance for bonus item to appear
  BONUS_TARGET_LIFETIME_MS: 2200,

  // Dynamic Difficulty Thresholds (remaining seconds in game)
  DIFFICULTY_TIERS: [
    { remainingSec: 30, targetCount: 4, scale: 1.05, jitter: 0 },
    { remainingSec: 22, targetCount: 5, scale: 0.98, jitter: 1 },
    { remainingSec: 14, targetCount: 7, scale: 0.90, jitter: 2 },
    { remainingSec: 7, targetCount: 9, scale: 0.82, jitter: 3 },
  ],

  // Funny Ranks Configuration
  RANKS: [
    {
      minScore: 0,
      maxScore: 99,
      title: 'Certified NPC',
      badge: '🤖',
      description: 'Bruh, are your fingers lagging? Standard factory settings detected.',
    },
    {
      minScore: 100,
      maxScore: 249,
      title: 'Brainrot Apprentice',
      badge: '👶',
      description: 'Beginning to tap the chaos. Skibidi reflex instincts warming up.',
    },
    {
      minScore: 250,
      maxScore: 449,
      title: 'Reflex Goblin',
      badge: '👺',
      description: 'Fast fingers and mischievous energy. You react faster than standard internet speed.',
    },
    {
      minScore: 450,
      maxScore: 699,
      title: 'Sigma Reflex',
      badge: '🗿',
      description: 'Built different. High-velocity visual processing and pure clutch reflexes.',
    },
    {
      minScore: 700,
      maxScore: Infinity,
      title: 'Chronically Online',
      badge: '⚡',
      description: 'Zero ping detected. You have achieved brainrot transcendence and god-tier reflex speed.',
    },
  ] as RankDefinition[],

  // Short Combo Feedback Messages
  COMBO_MILESTONES: [
    { count: 3, message: "YOU'RE COOKING 🔥" },
    { count: 6, message: 'TOO FAST ⚡' },
    { count: 9, message: 'INSANE 💥' },
    { count: 12, message: 'NO BRAIN JUST REFLEX 🧬' },
    { count: 15, message: 'ABSOLUTE CINEMA 🎬' },
  ],

  // Target Roster (original emoji/CSS characters, no copyrighted assets)
  TARGET_ROSTER: [
    {
      id: 'alien',
      emoji: '👽',
      name: 'Green Gremlin',
      keywords: ['alien', 'gremlin', 'green extraterrestrial'],
      instructionTemplates: [
        'TAP THE GREEN GREMLIN',
        'HIT THE GREEN GREMLIN',
        'FIND THE ALIEN',
        'WHERE IS THE GREMLIN?',
      ],
      color: '#00ff88',
      bgGlow: 'rgba(0, 255, 136, 0.3)',
    },
    {
      id: 'potato',
      emoji: '🥔',
      name: 'Potato',
      keywords: ['potato', 'spud', 'couch potato'],
      instructionTemplates: [
        'ONLY TAP THE POTATO',
        'SMASH THE POTATO',
        'FIND THE COUCH POTATO',
        'HIT THE POTATO',
      ],
      color: '#d4a373',
      bgGlow: 'rgba(212, 163, 115, 0.3)',
    },
    {
      id: 'banana',
      emoji: '🍌',
      name: 'Banana',
      keywords: ['banana', 'fruit', 'yellow banana'],
      instructionTemplates: [
        'TAP THE BANANA',
        'GRAB THE BANANA',
        'WHERE IS THE BANANA?',
        'FIND THE BANANA',
      ],
      color: '#facc15',
      bgGlow: 'rgba(250, 204, 21, 0.3)',
    },
    {
      id: 'demon',
      emoji: '👹',
      name: 'Red Demon',
      keywords: ['demon', 'ogre', 'red monster'],
      instructionTemplates: [
        'CATCH THE RED DEMON',
        'HIT THE RED DEMON',
        'SMACK THE OGRE',
        'TAP THE RED DEMON',
      ],
      color: '#ef4444',
      bgGlow: 'rgba(239, 68, 68, 0.3)',
    },
    {
      id: 'frog',
      emoji: '🐸',
      name: 'Meme Frog',
      keywords: ['frog', 'pepe', 'ribbit'],
      instructionTemplates: [
        'TAP THE MEME FROG',
        'GRAB THE FROG',
        'FIND THE GREEN FROG',
        'TOUCH THE FROG',
      ],
      color: '#22c55e',
      bgGlow: 'rgba(34, 197, 94, 0.3)',
    },
    {
      id: 'clown',
      emoji: '🤡',
      name: 'Silly Clown',
      keywords: ['clown', 'circus', 'honk'],
      instructionTemplates: [
        'TOUCH THE CLOWN',
        'HONK THE CLOWN',
        'FIND THE CIRCUS CLOWN',
        'TAP THE CLOWN',
      ],
      color: '#ec4899',
      bgGlow: 'rgba(236, 72, 153, 0.3)',
    },
    {
      id: 'sigma',
      emoji: '😎',
      name: 'Cool Sigma',
      keywords: ['cool', 'sunglasses', 'sigma'],
      instructionTemplates: [
        'FIND THE COOL GUY',
        'TAP THE SUNGLASSES',
        'SPOT THE SIGMA',
        'HIT THE SHADES',
      ],
      color: '#06b6d4',
      bgGlow: 'rgba(6, 182, 212, 0.3)',
    },
    {
      id: 'brain',
      emoji: '🧠',
      name: 'Galaxy Brain',
      keywords: ['brain', 'mind', 'galaxy brain'],
      instructionTemplates: [
        'WHERE IS THE BRAIN?',
        'TAP THE GALAXY BRAIN',
        'FIND THE BRAINROT',
        'HIT THE BRAIN',
      ],
      color: '#f43f5e',
      bgGlow: 'rgba(244, 63, 94, 0.3)',
    },
    {
      id: 'sus',
      emoji: '👀',
      name: 'Sus Eyes',
      keywords: ['eyes', 'sus', 'looking'],
      instructionTemplates: [
        'FIND THE SUS FACE',
        'TAP THE SUS EYES',
        'SPOT THE EYES',
        'WHERE ARE THE EYES?',
      ],
      color: '#a855f7',
      bgGlow: 'rgba(168, 85, 247, 0.3)',
    },
    {
      id: 'duck',
      emoji: '🦆',
      name: 'Duck',
      keywords: ['duck', 'mallard', 'bird'],
      instructionTemplates: [
        'SMASH THE DUCK',
        'QUACK THE DUCK',
        'TAP THE DUCK',
        'CATCH THE DUCK',
      ],
      color: '#eab308',
      bgGlow: 'rgba(234, 179, 8, 0.3)',
    },
    {
      id: 'moai',
      emoji: '🗿',
      name: 'Moai Chad',
      keywords: ['moai', 'stone', 'chad'],
      instructionTemplates: [
        'FIND THE MOAI STONE',
        'TAP THE CHAD MOAI',
        'HIT THE STONE FACE',
        'SPOT THE MOAI',
      ],
      color: '#94a3b8',
      bgGlow: 'rgba(148, 163, 184, 0.3)',
    },
    {
      id: 'skull',
      emoji: '💀',
      name: 'Dead Skull',
      keywords: ['skull', 'dead', 'skeleton'],
      instructionTemplates: [
        'TAP THE DEAD SKULL',
        'FIND THE SKULL',
        'HIT THE BONEHEAD',
        'SMASH THE SKULL',
      ],
      color: '#f8fafc',
      bgGlow: 'rgba(248, 250, 252, 0.3)',
    },
  ] as TargetDefinition[],

  // Bonus targets that spawn with golden shimmer
  BONUS_TARGET: {
    id: 'bonus_star',
    emoji: '🌟',
    name: 'Bonus Golden Star',
    label: '+250 BONUS!',
    color: '#fbbf24',
    bgGlow: 'rgba(251, 191, 36, 0.6)',
  },

  // Production Domain Configuration (replace with your real deployment domain)
  PRODUCTION_DOMAIN: 'https://YOUR-DOMAIN.com',

  // SEO & Social Defaults
  SITE_NAME: 'Brainrot Reflex Test',
  DEFAULT_TITLE: 'Brainrot Reflex Test | Free Online Reaction Game',
  DEFAULT_DESCRIPTION:
    'Play Brainrot Reflex Test, a free 30-second reaction game. Tap the right targets, build combos and beat your high score.',
};

/**
 * Returns rank data for a given score.
 */
export function getRankForScore(score: number): RankDefinition {
  const match = GAME_CONFIG.RANKS.find(
    (rank) => score >= rank.minScore && score <= rank.maxScore
  );
  return match || GAME_CONFIG.RANKS[0];
}
