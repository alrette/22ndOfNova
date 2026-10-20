import { useRef } from 'react';
import { finale, herName, stars, ui } from '../content';
import { LAYOUT } from '../layout';
import { useFocusTrap } from '../hooks';
import { Flourish } from './Ornament';
import { FinalePhoto, SongButton } from './Extras';

// The constellation she just completed, redrawn from the star map's own positions.
const SRC = stars.map((s) => LAYOUT.desktop[s.id]);
const xs = SRC.map((p) => p.x);
const ys = SRC.map((p) => p.y);
const PTS = SRC.map((p) => [
  30 + ((p.x - Math.min(...xs)) / (Math.max(...xs) - Math.min(...xs))) * 340,
  30 + ((p.y - Math.min(...ys)) / (Math.max(...ys) - Math.min(...ys))) * 160,
]);
const DUST = [
  [20, 60],
  [76, 28],
  [150, 190],
  [236, 22],
  [318, 176],
  [384, 40],
  [248, 120],
];
// Light that keeps rising behind the words while this screen is open.
const RISE = [
  [6, 0, 9],
  [14, 3.2, 11],
  [22, 1.4, 8],
  [31, 5.1, 12],
  [39, 2.2, 10],
  [47, 6.3, 9],
  [55, 0.8, 11],
  [63, 4.4, 8],
  [71, 2.9, 12],
  [79, 5.8, 10],
  [87, 1.1, 9],
  [94, 3.7, 11],
];

export default function Finale({ onClose, onLetter, onVideo, hasVideo }) {
  const ref = useRef(null);
  useFocusTrap(ref);
  return (
    <div className="overlay finale">
      <div className="finale-rise" aria-hidden="true">
        {RISE.map(([left, delay, dur]) => (
          <i key={left} style={{ left: `${left}%`, '--d': `${delay}s`, '--t': `${dur}s` }} />
        ))}
      </div>
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
          <ellipse className="f-orbit" cx="200" cy="112" rx="196" ry="70" transform="rotate(-6 200 112)" pathLength="1" />
          <ellipse className="f-orbit f-orbit-2" cx="200" cy="112" rx="150" ry="98" transform="rotate(14 200 112)" pathLength="1" />
          {DUST.map(([x, y], i) => (
            <circle key={`${x}-${y}`} className="f-dust" cx={x} cy={y} r="1.1" style={{ '--d': `${i * 0.4}s` }} />
          ))}
          {PTS.slice(0, -1).map((p, i) => (
            <path
              key={`l${i}`}
              className="f-line"
              d={`M${p[0]} ${p[1]}L${PTS[i + 1][0]} ${PTS[i + 1][1]}`}
              pathLength="1"
              style={{ '--d': `${0.7 + i * 0.55}s` }}
            />
          ))}
          {PTS.map((p, i) => (
            <g key={`s${i}`} transform={`translate(${p[0]} ${p[1]})`}>
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
          <Flourish className="finale-flourish" />
          <p className="finale-line">{finale.line}</p>
          {finale.note && <p className="finale-note">{finale.note}</p>}
          <FinalePhoto />
          <div className="finale-actions">
            <button type="button" className="btn btn-primary" onClick={onLetter}>
              {ui.letterOpen}
            </button>
            {hasVideo && (
              <button type="button" className="btn btn-ghost" onClick={onVideo}>
                {ui.videoOpen}
              </button>
            )}
            <SongButton />
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              {ui.backToSky}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
