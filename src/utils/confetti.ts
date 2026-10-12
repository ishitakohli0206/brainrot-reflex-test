/**
 * Pure Canvas Particle / Confetti System
 * Lightweight, zero-dependency, self-cleaning celebration effects.
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  decay: number;
  shape: 'rect' | 'circle' | 'star';
}

const PALETTE = ['#00ff88', '#06b6d4', '#facc15', '#f43f5e', '#a855f7', '#3b82f6'];

export function triggerConfettiBurst(x?: number, y?: number, count: number = 60): () => void {
  if (typeof window === 'undefined') return () => {};

  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.remove();
    return () => {};
  }

  const dpr = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  const originX = x ?? width / 2;
  const originY = y ?? height / 2;

  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 9 + 3;
    const shapes: ('rect' | 'circle' | 'star')[] = ['rect', 'circle', 'star'];
    particles.push({
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 3,
      size: Math.random() * 8 + 6,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.2,
      opacity: 1,
      decay: Math.random() * 0.015 + 0.012,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    });
  }

  let animationFrameId: number;
  let isCleanedUp = false;

  const cleanup = () => {
    if (!isCleanedUp) {
      isCleanedUp = true;
      cancelAnimationFrame(animationFrameId);
      if (canvas.parentNode) {
        canvas.remove();
      }
    }
  };

  const render = () => {
    if (isCleanedUp) return;
    ctx.clearRect(0, 0, width, height);

    let activeCount = 0;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (p.opacity <= 0) continue;

      activeCount++;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.22; // gravity
      p.vx *= 0.985; // air resistance
      p.rotation += p.rotationSpeed;
      p.opacity -= p.decay;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;

      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      } else if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // diamond / star
        ctx.beginPath();
        ctx.moveTo(0, -p.size / 2);
        ctx.lineTo(p.size / 2, 0);
        ctx.lineTo(0, p.size / 2);
        ctx.lineTo(-p.size / 2, 0);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }

    if (activeCount > 0) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      cleanup();
    }
  };

  animationFrameId = requestAnimationFrame(render);
  return cleanup;
}
