/**
 * Safe localStorage wrapper with error boundaries for private browsing
 * or restricted environment constraints.
 */

const BEST_SCORE_KEY = 'brainrot_reflex_best_score';
const MUTED_KEY = 'brainrot_reflex_audio_muted';

export function getStoredBestScore(): number {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return 0;
    const val = window.localStorage.getItem(BEST_SCORE_KEY);
    if (!val) return 0;
    const parsed = parseInt(val, 10);
    return isNaN(parsed) ? 0 : Math.max(0, parsed);
  } catch (e) {
    console.warn('LocalStorage read error:', e);
    return 0;
  }
}

export function saveStoredBestScore(score: number): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return false;
    const current = getStoredBestScore();
    if (score > current) {
      window.localStorage.setItem(BEST_SCORE_KEY, score.toString());
      return true;
    }
    return false;
  } catch (e) {
    console.warn('LocalStorage write error:', e);
    return false;
  }
}

export function getStoredIsMuted(): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return false;
    return window.localStorage.getItem(MUTED_KEY) === 'true';
  } catch {
    return false;
  }
}

export function saveStoredIsMuted(isMuted: boolean): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    window.localStorage.setItem(MUTED_KEY, isMuted ? 'true' : 'false');
  } catch (e) {
    console.warn('LocalStorage audio pref error:', e);
  }
}
