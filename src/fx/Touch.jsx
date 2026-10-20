import { useEffect, useRef } from 'react';
import { fx, fxState } from './bus';

// Touch: a small burst of stardust where a finger lands.
// Mouse: a short, fading trail behind the pointer.
// Transitions: flare (a star opens) and nova (the big moments) add expanding rings.
// Everything sits above the content, so particles stay small and brief.
const TONES = { blue: '110,150,255', ivory: '244,240,232', amber: '232,176,74' };
const MAX = 80;
const MAX_RINGS = 8;
const rand = (a, b) => a + Math.random() * (b - a);
const easeOut = (k) => 1 - (1 - k) ** 3;

function makeSprite(rgb) {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 64;
  const g = c.getContext('2d');
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,1)');
  gr.addColorStop(0.22, `rgba(${rgb},.9)`);
  gr.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = gr;
  g.fillRect(0, 0, 64, 64);
  return c;
}

export default function Touch({ reduced }) {
  const ref = useRef(null);

  useEffect(() => {
    if (reduced) return undefined;
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const sprites = Object.fromEntries(Object.entries(TONES).map(([k, v]) => [k, makeSprite(v)]));
    let W = 0;
    let H = 0;
    let dpr = 1;
    let ps = [];
    let rings = [];
    let raf = 0;
    let running = false;
    let last = 0;
    let lastBurst = 0;
    let lx = -100;
    let ly = -100;

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
    }

    function wake() {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }

    function add(p) {
      ps.push({ age: 0, drag: 2.2, ...p });
      if (ps.length > MAX) ps.splice(0, ps.length - MAX);
      wake();
    }

    function ring(x, y, r1, life, tone, width, delay = 0) {
      rings.push({ x, y, r1, life, tone, width, age: -delay });
      if (rings.length > MAX_RINGS) rings.splice(0, rings.length - MAX_RINGS);
      wake();
    }

    function frame(t) {
      const dt = Math.min(0.05, (t - last) / 1000 || 0);
      last = t;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      rings = rings.filter((r) => r.age < r.life);
      for (const r of rings) {
        r.age += dt;
        if (r.age <= 0) continue;
        const k = r.age / r.life;
        ctx.globalAlpha = (1 - k) ** 1.6 * 0.85;
        ctx.strokeStyle = `rgba(${TONES[r.tone]},1)`;
        ctx.lineWidth = r.width * (1 - 0.6 * k);
        ctx.beginPath();
        ctx.arc(r.x, r.y, 6 + r.r1 * easeOut(k), 0, 6.2832);
        ctx.stroke();
      }

      ctx.globalCompositeOperation = 'lighter';
      ps = ps.filter((p) => p.age < p.life);
      for (const p of ps) {
        p.age += dt;
        const k = p.age / p.life;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 1 - p.drag * dt;
        p.vy *= 1 - p.drag * dt;
        const s = p.size * (1 - 0.45 * k);
        ctx.globalAlpha = Math.max(0, (1 - k) ** 1.3);
        ctx.drawImage(sprites[p.tone], p.x - s, p.y - s, s * 2, s * 2);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      if (ps.length || rings.length) {
        raf = requestAnimationFrame(frame);
      } else {
        running = false;
        ctx.clearRect(0, 0, W, H);
      }
    }

    function burst(x, y, tone) {
      const n = 10;
      add({ x, y, vx: 0, vy: 0, life: 0.38, size: 20, tone: 'ivory' });
      for (let i = 0; i < n; i += 1) {
        const a = (i / n) * 6.2832 + rand(-0.3, 0.3);
        const sp = rand(50, 125);
        const r = Math.random();
        add({
          x,
          y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp - 10,
          life: rand(0.55, 0.8),
          size: rand(4, 9),
          tone: r < 0.35 ? 'ivory' : r < 0.7 ? 'blue' : tone === 'amber' ? 'amber' : 'blue',
        });
      }
    }

    // A star opening: one ring and a tight ring of amber dust.
    function flare({ x, y }) {
      ring(x, y, 70, 0.9, 'amber', 1.6);
      add({ x, y, vx: 0, vy: 0, life: 0.5, size: 30, tone: 'amber' });
      for (let i = 0; i < 12; i += 1) {
        const a = (i / 12) * 6.2832 + rand(-0.15, 0.15);
        const sp = rand(90, 160);
        add({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: rand(0.6, 0.85), size: rand(3, 6), tone: i % 3 ? 'amber' : 'ivory', drag: 3 });
      }
    }

    // The big moments: three rings and a wide spray of light.
    function nova({ x, y, tone = 'amber', scale = 1 }) {
      const reach = Math.max(W, H) * 0.55 * scale;
      ring(x, y, reach, 1.4, 'ivory', 2.2);
      ring(x, y, reach * 0.75, 1.5, tone, 1.6, 0.12);
      ring(x, y, reach * 0.5, 1.6, 'blue', 1.2, 0.26);
      add({ x, y, vx: 0, vy: 0, life: 0.7, size: 70 * scale, tone: 'ivory' });
      for (let i = 0; i < 40; i += 1) {
        const a = rand(0, 6.2832);
        const sp = rand(120, 420) * scale;
        const r = Math.random();
        add({
          x,
          y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          life: rand(0.8, 1.4),
          size: rand(3, 8),
          tone: r < 0.4 ? tone : r < 0.75 ? 'ivory' : 'blue',
          drag: 1.6,
        });
      }
    }

    const onDown = (e) => {
      if (fxState.calm || e.pointerType === 'mouse') return;
      const now = performance.now();
      if (now - lastBurst < 90) return;
      lastBurst = now;
      const tone = e.target.closest?.('[data-tone]')?.dataset.tone;
      burst(e.clientX, e.clientY, tone);
    };

    const onMove = (e) => {
      if (fxState.calm || e.pointerType !== 'mouse') return;
      if (Math.hypot(e.clientX - lx, e.clientY - ly) < 7) return;
      lx = e.clientX;
      ly = e.clientY;
      add({
        x: e.clientX + rand(-3, 3),
        y: e.clientY + rand(-3, 3),
        vx: rand(-14, 14),
        vy: rand(-14, 14) - 6,
        life: rand(0.45, 0.65),
        size: rand(3, 7),
        tone: Math.random() < 0.6 ? 'blue' : 'ivory',
      });
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointerdown', onDown, { passive: true, capture: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    const offs = [fx.on('flare', flare), fx.on('nova', nova)];
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', onDown, { capture: true });
      window.removeEventListener('pointermove', onMove);
      offs.forEach((off) => off());
    };
  }, [reduced]);

  return <canvas ref={ref} className="touch" aria-hidden="true" />;
}
