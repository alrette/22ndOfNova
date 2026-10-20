import { useRef } from 'react';
import { finale, herName, ui } from '../content';
import { useFocusTrap } from '../hooks';

// The five stars from the sky join into one constellation, then the line arrives.
const PTS = [
  [44, 176],
  [120, 96],
  [196, 148],
  [276, 64],
  [356, 112],
];
const DUST = [
  [20, 60],
  [76, 28],
  [150, 190],
  [236, 22],
  [318, 176],
  [384, 40],
  [248, 120],
];

export default function Finale({ onClose, onLetter, onVideo, hasVideo }) {
  const ref = useRef(null);
  useFocusTrap(ref);
  return (
    <div className="overlay finale">
      <div
        className="finale-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="finale-title"
        ref={ref}
        tabIndex={-1}
      >
        <svg className="finale-sky" viewBox="0 0 400 220" aria-hidden="true">
          <defs>
            <radialGradient id="fg">
              <stop offset="0" stopColor="#F4C46A" stopOpacity=".85" />
              <stop offset=".4" stopColor="#E8B04A" stopOpacity=".25" />
              <stop offset="1" stopColor="#E8B04A" stopOpacity="0" />
            </radialGradient>
          </defs>
          {DUST.map(([x, y], i) => (
            <circle key={`${x}-${y}`} className="f-dust" cx={x} cy={y} r="1.1" style={{ '--d': `${i * 0.4}s` }} />
          ))}
          {PTS.slice(0, -1).map((p, i) => (
            <path
              key={`l${p[0]}`}
              className="f-line"
              d={`M${p[0]} ${p[1]}L${PTS[i + 1][0]} ${PTS[i + 1][1]}`}
              pathLength="1"
              style={{ '--d': `${0.7 + i * 0.55}s` }}
            />
          ))}
          {PTS.map((p, i) => (
            <g key={`s${p[0]}`} transform={`translate(${p[0]} ${p[1]})`}>
              <g className="f-star" style={{ '--d': `${0.25 + i * 0.55}s` }}>
                <circle r="28" fill="url(#fg)" />
                <path
                  d="M0 -10C.5 -4 4 -.5 10 0C4 .5 .5 4 0 10C-.5 4 -4 .5 -10 0C-4 -.5 -.5 -4 0 -10Z"
                  fill="#F7D58C"
                />
              </g>
            </g>
          ))}
        </svg>
        <div className="finale-copy">
          <h2 id="finale-title">
            {finale.greeting} {herName}.
          </h2>
          <p className="finale-line">{finale.line}</p>
          {finale.note && <p className="finale-note">{finale.note}</p>}
          <div className="finale-actions">
            <button type="button" className="btn btn-primary" onClick={onLetter}>
              {ui.letterOpen}
            </button>
            {hasVideo && (
              <button type="button" className="btn btn-ghost" onClick={onVideo}>
                {ui.videoOpen}
              </button>
            )}
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              {ui.backToSky}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
