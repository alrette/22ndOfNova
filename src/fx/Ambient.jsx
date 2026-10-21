import { useEffect, useRef } from 'react';
import { fx, fxState } from './bus';

// Far, quiet, tidy. Three depth layers: the far one barely moves and is very dim,
// the near one drifts a little faster, is a little brighter and carries a soft glow.
const LAYERS = [
  { share: 0.5, size: [0.5, 0.9], alpha: [0.22, 0.45], drift: 0.5, par: 0.25, glow: false },
  { share: 0.32, size: [0.8, 1.3], alpha: [0.4, 0.7], drift: 1.1, par: 0.6, glow: false },
  { share: 0.18, size: [1.2, 2], alpha: [0.55, 0.95], drift: 2, par: 1, glow: true },
];

const rand = (a, b) => a + Math.random() * (b - a);
const wrap = (v, max) => ((v % max) + max) % max;

function makeGlow() {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 64;
  const g = c.getContext('2d');
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(200,218,255,.6)');
  gr.addColorStop(0.3, 'rgba(110,150,255,.2)');
  gr.addColorStop(1, 'rgba(82,125,255,0)');
  g.fillStyle = gr;
  g.fillRect(0, 0, 64, 64);
  return c;
}

export default function Ambient({ reduced }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const glow = makeGlow();
    let W = 0;
    let H = 0;
    let dpr = 1;
    let stars = [];
    let raf = 0;
    let running = false;
    let last = 0;
    let px = 0.5;
    let py = 0.5;
    let curX = 0;
    let curY = 0;
    let scrollY = window.scrollY;
    let pull = null;
    let warp = null;
    let shoot = null;
    let nextShoot = performance.now() + rand(14000, 26000);

    function build() {
      const total = W < 900 ? 60 : 140;
      stars = [];
      LAYERS.forEach((L, li) => {
        const n = Math.round(total * L.share);
        for (let i = 0; i < n; i += 1) {
          const ang = Math.random() * Math.PI * 2;
          const sp = L.drift * rand(0.4, 1);
          stars.push({
            x: Math.random() * W,
            y: Math.random() * H,
            r: rand(...L.size),
            a: rand(...L.alpha),
            vx: Math.cos(ang) * sp,
            vy: Math.sin(ang) * sp,
            ph: Math.random() * 6.28,
            tw: Math.random() < 0.4 ? rand(0.5, 1.2) : 0,
            li,
            cool: Math.random() < 0.2,
          });
        }
      });
    }

    function resize() {
      const nw = window.innerWidth;
      const nh = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(nw * dpr);
      canvas.height = Math.round(nh * dpr);
      canvas.style.width = `${nw}px`;
      canvas.style.height = `${nh}px`;
      if (!stars.length || nw !== W) {
        W = nw;
        H = nh;
        build();
      } else {
        // Only the height changed (phone address bar): keep the stars where they are.
        const k = nh / H;
        stars.forEach((s) => {
          s.y *= k;
        });
        H = nh;
      }
      if (reduced) draw(performance.now(), 0);
    }

    function draw(t, dt) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const phone = W < 900;
      const tx = phone ? 0 : (px - 0.5) * -36;
      const ty = phone ? -scrollY * 0.12 : (py - 0.5) * -22;
      const k = reduced ? 1 : Math.min(1, dt * 3);
      curX += (tx - curX) * k;
      curY += (ty - curY) * k;

      let pe = 0;
      if (pull) {
        const p = (t - pull.t0) / pull.dur;
        if (p >= 1) pull = null;
        else pe = Math.sin(Math.PI * p);
      }

      // Warp: every star streaks away from one point, as if the sky rushes past.
      let we = 0;
      if (warp) {
        const p = (t - warp.t0) / warp.dur;
        if (p >= 1) warp = null;
        else we = Math.sin(Math.PI * p) ** 1.5;
      }

      for (const s of stars) {
        if (!reduced) {
          s.x = wrap(s.x + s.vx * dt, W);
          s.y = wrap(s.y + s.vy * dt, H);
        }
        const L = LAYERS[s.li];
        let x = wrap(s.x + curX * L.par, W);
        let y = wrap(s.y + curY * L.par, H);
        if (pull) {
          const dx = pull.x - x;
          const dy = pull.y - y;
          const d = Math.hypot(dx, dy);
          if (d < 170 && d > 1) {
            const m = (1 - d / 170) * 16 * pe;
            x += (dx / d) * m;
            y += (dy / d) * m;
          }
        }
        let a = s.a;
        if (s.tw && !reduced) a *= 0.72 + 0.28 * Math.sin(t * 0.001 * s.tw * 2 + s.ph);
        if (we > 0) {
          const dx = x - warp.x;
          const dy = y - warp.y;
          const d = Math.hypot(dx, dy) || 1;
          const len = we * Math.min(260, 30 + d * 0.55) * (0.6 + L.par * 0.6);
          x += (dx / d) * we * 24 * L.par;
          y += (dy / d) * we * 24 * L.par;
          ctx.globalAlpha = Math.min(1, a * (0.6 + we));
          ctx.strokeStyle = s.cool ? '#A9C0FF' : '#EAF0FF';
          ctx.lineWidth = s.r * (1 + we);
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + (dx / d) * len, y + (dy / d) * len);
          ctx.stroke();
        }
        if (L.glow) {
          const g = s.r * 7;
          ctx.globalAlpha = a * 0.85;
          ctx.drawImage(glow, x - g, y - g, g * 2, g * 2);
        }
        ctx.globalAlpha = a;
        ctx.fillStyle = s.cool ? '#A9C0FF' : '#EAF0FF';
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, 6.2832);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (!reduced) {
        if (!shoot && t > nextShoot) {
          if (!fxState.calm && !fxState.panelOpen && !document.hidden) {
            const ang = rand(2.3, 2.55);
            shoot = {
              x: rand(W * 0.45, W * 0.95),
              y: rand(H * 0.05, H * 0.32),
              dx: Math.cos(ang),
              dy: Math.sin(ang),
              t0: t,
              dur: 900,
            };
            fx.emit('shoot');
          } else {
            nextShoot = t + 6000;
          }
        }
        if (shoot) {
          const p = (t - shoot.t0) / shoot.dur;
          if (p >= 1) {
            shoot = null;
            nextShoot = t + rand(25000, 40000);
          } else {
            const dist = 520 * (p * shoot.dur * 0.001);
            const hx = shoot.x + shoot.dx * dist;
            const hy = shoot.y + shoot.dy * dist;
            const len = 150;
            const grad = ctx.createLinearGradient(hx, hy, hx - shoot.dx * len, hy - shoot.dy * len);
            grad.addColorStop(0, 'rgba(244,240,232,.9)');
            grad.addColorStop(1, 'rgba(169,192,255,0)');
            ctx.globalAlpha = Math.sin(Math.PI * p);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(hx, hy);
            ctx.lineTo(hx - shoot.dx * len, hy - shoot.dy * len);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
    }

    function frame(t) {
      if (!running) return;
      if (document.hidden) {
        running = false;
        return;
      }
      const dt = Math.min(0.05, (t - last) / 1000 || 0);
      last = t;
      draw(t, dt);
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running || reduced) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }

    const onScroll = () => {
      scrollY = window.scrollY;
    };
    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return;
      px = e.clientX / W;
      py = e.clientY / H;
    };
    const onVis = () => {
      if (!document.hidden) start();
    };

    resize();
    start();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('visibilitychange', onVis);
    const offPull = fx.on('pull', ({ x, y }) => {
      pull = { x, y, t0: performance.now(), dur: 1600 };
    });
    const offWarp = fx.on('warp', ({ x, y }) => {
      warp = { x, y, t0: performance.now(), dur: 1700 };
    });
    const off = () => {
      offPull();
      offWarp();
    };

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVis);
      off();
    };
  }, [reduced]);

  return <canvas ref={ref} className="ambient" aria-hidden="true" />;
}
