import { useEffect, useState } from 'react';
import { opening, herName, specialDate, ui } from '../content';
import Sparkle from './Sparkle';

const ORBIT_A = 'M20 130a280 80 0 1 0 560 0a280 80 0 1 0 -560 0';
const ORBIT_B = 'M70 130a230 54 0 1 0 460 0a230 54 0 1 0 -460 0';
const ORBIT_C = 'M120 130a180 120 0 1 0 360 0a180 120 0 1 0 -360 0';

// Two faint constellations at the edges of the dark, drawn in while the star is born.
const CORNERS = [
  { cls: 'tl', pts: [[10, 60], [46, 30], [88, 44], [120, 14], [150, 34]] },
  { cls: 'br', pts: [[10, 20], [44, 46], [80, 28], [112, 58], [150, 40]] },
];

// The one orchestrated moment: a single star, its orbits draw, the line arrives, then the way in.
// Leaving it is the second: the star flares, rings break outward and the sky rushes past.
export default function Intro({ onEnter, leaving, reduced }) {
  const [ready, setReady] = useState(reduced);
  useEffect(() => {
    if (reduced) {
      setReady(true);
      return undefined;
    }
    const id = setTimeout(() => setReady(true), 4300);
    return () => clearTimeout(id);
  }, [reduced]);

  return (
    <div className={`intro ${leaving ? 'leaving' : ''}`}>
      {CORNERS.map((c) => (
        <svg key={c.cls} className={`intro-corner ${c.cls}`} viewBox="0 0 160 72" aria-hidden="true">
          <polyline points={c.pts.map((p) => p.join(',')).join(' ')} pathLength="1" />
          {c.pts.map(([x, y], i) => (
            <circle key={x} cx={x} cy={y} r={i === 2 ? 2 : 1.3} style={{ '--i': i }} />
          ))}
        </svg>
      ))}
      <button type="button" className="intro-skip" onClick={() => onEnter()}>
        {ui.skip}
      </button>
      <div className="intro-stage">
        <div className="intro-star">
          <svg className="intro-orbit" viewBox="0 0 600 260" aria-hidden="true">
            <g transform="rotate(-16 300 130)">
              <path d={ORBIT_A} pathLength="1" />
              {!reduced && (
                <circle className="orbiter" r="3.4" fill="#E8B04A">
                  <animateMotion dur="18s" repeatCount="indefinite" path={ORBIT_A} begin="3s" />
                </circle>
              )}
            </g>
            <g transform="rotate(13 300 130)">
              <path d={ORBIT_B} pathLength="1" style={{ animationDelay: '1.6s' }} />
              {!reduced && (
                <circle className="orbiter" r="2.4" fill="#A9C0FF">
                  <animateMotion dur="11s" repeatCount="indefinite" path={ORBIT_B} begin="3.4s" />
                </circle>
              )}
            </g>
            <g transform="rotate(62 300 130)">
              <path className="faint" d={ORBIT_C} pathLength="1" style={{ animationDelay: '2.1s' }} />
            </g>
          </svg>
          <span className="intro-halo" />
          <span className="intro-shock s1" aria-hidden="true" />
          <span className="intro-shock s2" aria-hidden="true" />
          <span className="intro-shock s3" aria-hidden="true" />
          <span className="intro-rays" aria-hidden="true" />
          <Sparkle className="intro-spark" />
        </div>
        <h1 className="intro-title">
          {opening.lines.map((line, i) => (
            <span key={i} className="ln" style={{ '--d': `${2.2 + i * 0.7}s` }}>
              {line}
            </span>
          ))}
        </h1>
        <p className="intro-for">
          {ui.madeFor} {herName}
          <br />
          {specialDate}
        </p>
        <div className="intro-cta" inert={!ready}>
          <button type="button" className="btn btn-primary" onClick={() => onEnter(true)}>
            {ui.beginSound}
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => onEnter(false)}>
            {ui.beginQuiet}
          </button>
        </div>
      </div>
    </div>
  );
}
