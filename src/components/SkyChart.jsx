import { useId, useMemo, useRef } from 'react';
import sky from '../data/sky.json';
import { skyMoment, skyNow, ui } from '../content';
import { useInView, useReducedMotion } from '../hooks';
import { PLANETS, altAz, julianDay, localSiderealTime, moonRaDec, planetRaDec, project, sunRaDec } from '../sky/astro';

const R = 200;
const FONT = 17; // chart units: about 12px on the narrowest phone

// B-V colour index to a soft star tint.
function tint(bv) {
  if (bv < 0) return '#c9d8ff';
  if (bv < 0.4) return '#eef2ff';
  if (bv < 0.8) return '#fff4e0';
  if (bv < 1.3) return '#ffe2b8';
  return '#ffc99a';
}

// Label placement: try right, left, below, above; skip a spot that overlaps an earlier label.
function placeLabels(items) {
  const boxes = [];
  const out = [];
  for (const it of items) {
    const w = it.text.length * FONT * 0.6 + 6;
    const h = FONT + 4;
    const gap = it.gap;
    const tries = [
      { x: it.x + gap, y: it.y + h * 0.35, anchor: 'start', bx: it.x + gap, by: it.y - h * 0.6 },
      { x: it.x - gap, y: it.y + h * 0.35, anchor: 'end', bx: it.x - gap - w, by: it.y - h * 0.6 },
      { x: it.x, y: it.y + gap + h * 0.8, anchor: 'middle', bx: it.x - w / 2, by: it.y + gap },
      { x: it.x, y: it.y - gap - h * 0.2, anchor: 'middle', bx: it.x - w / 2, by: it.y - gap - h },
    ];
    const free = tries.find((t) => {
      const box = [t.bx, t.by, t.bx + w, t.by + h];
      const inside = Math.hypot(Math.max(Math.abs(box[0]), Math.abs(box[2])), Math.max(Math.abs(box[1]), Math.abs(box[3]))) < R - 4;
      return inside && boxes.every((b) => box[2] < b[0] || box[0] > b[2] || box[3] < b[1] || box[1] > b[3]);
    });
    if (!free) continue;
    boxes.push([free.bx, free.by, free.bx + w, free.by + h]);
    out.push({ ...it, ...free });
  }
  return out;
}

function compute({ lat, lon, time }) {
  const date = new Date(time);
  if (Number.isNaN(date.getTime()) || typeof lat !== 'number' || typeof lon !== 'number') return null;
  const jd = julianDay(date);
  const lst = localSiderealTime(jd, lon);
  const at = (ra, dec) => {
    const h = altAz(ra, dec, lat, lst);
    return { ...h, ...project(h.alt, h.az, R) };
  };

  const stars = sky.stars
    .map(([ra, dec, mag, bv, name]) => ({ ...at(ra, dec), mag, bv, name }))
    .filter((s) => s.alt > 0);

  const lines = [];
  for (const c of sky.lines) {
    for (const line of c.lines) {
      const pts = line.map(([ra, dec]) => at(ra, dec));
      for (let i = 1; i < pts.length; i += 1) {
        if (pts[i - 1].alt > 0 && pts[i].alt > 0) {
          lines.push(`M${pts[i - 1].x.toFixed(1)} ${pts[i - 1].y.toFixed(1)}L${pts[i].x.toFixed(1)} ${pts[i].y.toFixed(1)}`);
        }
      }
    }
  }

  const milky = sky.mw.map((m) => ({
    level: m.level,
    d: m.polys
      .map((ring) => {
        const pts = ring.map(([ra, dec]) => at(ra, dec));
        if (pts.every((p) => p.alt < -15)) return '';
        return `M${pts.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join('L')}Z`;
      })
      .join(''),
  }));

  const sun = at(sunRaDec(jd).ra, sunRaDec(jd).dec);
  const moon = at(moonRaDec(jd).ra, moonRaDec(jd).dec);
  const planets = PLANETS.map((name) => {
    const p = planetRaDec(name, jd);
    return { name, ...at(p.ra, p.dec) };
  }).filter((p) => p.alt > 0);

  const labels = placeLabels([
    ...(sun.alt > 0 ? [{ text: 'Sun', x: sun.x, y: sun.y, gap: 20, kind: 'sun' }] : []),
    ...(moon.alt > 0 ? [{ text: 'Moon', x: moon.x, y: moon.y, gap: 14, kind: 'moon' }] : []),
    ...planets.map((p) => ({ text: p.name, x: p.x, y: p.y, gap: 9, kind: 'planet' })),
    ...stars.filter((s) => s.name).map((s) => ({ text: s.name, x: s.x, y: s.y, gap: 7, kind: 'star' })),
  ]);

  return { date, stars, lines, milky, sun, moon, planets, labels, day: sun.alt > -6 };
}

// The sky when they met, or (now) the sky above her at the moment she reads it.
export default function SkyChart({ now = false }) {
  const m = now ? skyNow : skyMoment;
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const seen = useInView(ref);
  const uid = useId().replace(/[^\w-]/g, ''); // two charts on one page need their own gradient ids
  const data = useMemo(() => (m?.place ? compute(now ? { ...m, time: new Date() } : m) : null), [m, now]);
  if (!data) return null;

  const when = data.date.toLocaleString('en-US', {
    timeZone: m.timeZone,
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <figure className={`skychart ${seen || reduced ? 'in' : ''}`} ref={ref}>
      <svg viewBox={`${-R - 22} ${-R - 22} ${2 * R + 44} ${2 * R + 44}`} role="img" aria-label={ui.skyAria(m.place, when)}>
        <defs>
          <clipPath id={`${uid}clip`}>
            <circle r={R} />
          </clipPath>
          <radialGradient id={`${uid}bg`}>
            <stop offset="0" stopColor="#13234d" />
            <stop offset="1" stopColor="#080f25" />
          </radialGradient>
          <radialGradient id={`${uid}sun`}>
            <stop offset="0" stopColor="#fff6dc" stopOpacity="1" />
            <stop offset="0.12" stopColor="#ffe2a3" stopOpacity="0.9" />
            <stop offset="0.4" stopColor="#e8b04a" stopOpacity="0.28" />
            <stop offset="1" stopColor="#e8b04a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle r={R + 10} className="sc-ring" />
        <g className="sc-turn">
          <g clipPath={`url(#${uid}clip)`}>
            <circle r={R} fill={`url(#${uid}bg)`} />
            {data.milky.map((m) => m.d && <path key={m.level} d={m.d} className={`sc-mw sc-mw-${m.level}`} />)}
            {data.day && <circle cx={data.sun.x} cy={data.sun.y} r="150" fill={`url(#${uid}sun)`} className="sc-day" />}
            <circle r={R * Math.tan((30 / 2) * (Math.PI / 180))} className="sc-alt" />
            <circle r={R * Math.tan((60 / 2) * (Math.PI / 180))} className="sc-alt" />
            <path d={data.lines.join('')} className="sc-lines" pathLength="1" />
            {data.stars.map((s, i) => (
              <circle
                key={i}
                cx={s.x.toFixed(1)}
                cy={s.y.toFixed(1)}
                r={Math.max(0.6, 3 - 0.5 * s.mag).toFixed(2)}
                fill={tint(s.bv)}
                className="sc-star"
                style={{ '--d': `${0.3 + Math.min(1.6, Math.max(0, s.mag) * 0.3)}s` }}
              />
            ))}
            {data.planets.map((p) => (
              <circle key={p.name} cx={p.x} cy={p.y} r="3.4" className="sc-planet" />
            ))}
            {data.moon.alt > 0 && <circle cx={data.moon.x} cy={data.moon.y} r="7" className="sc-moon" />}
            {data.sun.alt > 0 && <circle cx={data.sun.x} cy={data.sun.y} r="9" className="sc-sun" />}
          </g>
          <circle r={R} className="sc-horizon" />
          {data.labels.map((l) => (
            <text key={l.text} x={l.x} y={l.y} textAnchor={l.anchor} className={`sc-label sc-label-${l.kind}`}>
              {l.text}
            </text>
          ))}
        </g>
        {[
          ['N', 0, -R - 12],
          ['E', -R - 12, 0],
          ['S', 0, R + 12],
          ['W', R + 12, 0],
        ].map(([t, x, y]) => (
          <text key={t} x={x} y={y} dy="6" textAnchor="middle" className="sc-cardinal">
            {t}
          </text>
        ))}
      </svg>
      <figcaption>
        <span className="skychart-title">{now ? ui.skyNowTitle(m.place) : ui.skyTitle(m.place)}</span>
        <span className="skychart-when">{when}</span>
        {data.day && <span className="skychart-day">{now ? ui.skyNowDaylight : ui.skyDaylight}</span>}
        {m.note && <span className="skychart-note">{m.note}</span>}
      </figcaption>
    </figure>
  );
}
