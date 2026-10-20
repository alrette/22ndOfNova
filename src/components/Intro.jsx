import { useEffect, useState } from 'react';
import { opening, herName, specialDate, ui } from '../content';
import Sparkle from './Sparkle';

const ORBIT_A = 'M20 130a280 80 0 1 0 560 0a280 80 0 1 0 -560 0';
const ORBIT_B = 'M70 130a230 54 0 1 0 460 0a230 54 0 1 0 -460 0';

// The one orchestrated moment: a single star, its orbit draws, the line arrives, then the way in.
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
      <button type="button" className="intro-skip" onClick={onEnter}>
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
            </g>
          </svg>
          <span className="intro-halo" />
          <Sparkle className="intro-spark" />
        </div>
        <h1 className="intro-title">
          {opening.lines.map((line, i) => (
            <span key={line} className="ln" style={{ '--d': `${2.2 + i * 0.7}s` }}>
              {line}
            </span>
          ))}
        </h1>
        <p className="intro-for">
          {ui.madeFor} {herName}
          <br />
          {specialDate}
        </p>
        <button type="button" className="btn btn-primary intro-cta" onClick={onEnter} inert={!ready}>
          {ui.begin}
        </button>
      </div>
    </div>
  );
}
