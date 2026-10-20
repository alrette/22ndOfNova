import { useLayoutEffect, useRef, useState } from 'react';
import { stars, ui, finale } from '../content';
import { LAYOUT } from '../layout';
import Sparkle from './Sparkle';

const CAM_PULL = 0.3; // how far the camera brings the chosen star toward the centre
const CAM_ZOOM = 1.08;

function Star({ id, label, sub, index, p, side, state, active, secret, onOpen }) {
  const aria = secret ? ui.secretLabel : `${label}${state === 'visited' ? `, ${ui.opened}` : ''}`;
  return (
    <button
      type="button"
      className={`star side-${side} ${active ? 'is-active' : ''} ${secret ? 'is-secret' : ''}`}
      style={{ left: p.x, top: p.y, '--i': index }}
      data-star={id}
      data-state={state}
      data-tone={state === 'visited' ? 'amber' : 'blue'}
      aria-label={aria}
      aria-haspopup="dialog"
      onClick={(e) => onOpen(id, e.currentTarget)}
    >
      <span className="star-halo" />
      <span className="star-orbit" aria-hidden="true" />
      <Sparkle className="star-glyph" />
      {!secret && (
        <span className="star-label">
          <span className="star-name">{label}</span>
          <span className="star-sub">{sub}</span>
        </span>
      )}
    </button>
  );
}

function Comet({ from, to, delay }) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  return (
    <span
      className="comet"
      aria-hidden="true"
      style={{
        left: from.x,
        top: from.y,
        '--dx': `${dx}px`,
        '--dy': `${dy}px`,
        '--ang': `${Math.atan2(dy, dx)}rad`,
        '--delay': `${delay}s`,
      }}
    >
      <span className="comet-tail" />
      <span className="comet-head" />
    </span>
  );
}

export default function Sky({
  isDesktop,
  reduced,
  visited,
  secretFound,
  secretUnlocked,
  openId,
  travel,
  aligning,
  revealed,
  finaleSeen,
  onOpen,
}) {
  const ref = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const ro = new ResizeObserver(([e]) =>
      setSize({ w: e.contentRect.width, h: e.contentRect.height }),
    );
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  const pos = isDesktop ? LAYOUT.desktop : LAYOUT.mobile;
  const at = (id) => ({ x: (pos[id].x / 100) * size.w, y: (pos[id].y / 100) * size.h });
  const pairs = stars.slice(0, -1).map((s, i) => [s.id, stars[i + 1].id]);
  const panelOpen = Boolean(openId || travel);

  // With the story panel open the desktop sky narrows: labels near an edge swap sides.
  const sideOf = (id) => {
    const p = pos[id];
    if (isDesktop && panelOpen && p.x < 25) return 'r';
    if (isDesktop && panelOpen && p.x > 75) return 'l';
    return p.side;
  };

  // Desktop camera: drift toward the chosen star and lean in a little.
  // Written as translate + scale around the corner so a change of star glides instead of jumping.
  const focusId = isDesktop && !reduced && size.w ? (travel?.to ?? openId) : null;
  let camStyle;
  if (focusId && pos[focusId]) {
    const s = at(focusId);
    const tx = s.x + (size.w / 2 - s.x) * CAM_PULL - CAM_ZOOM * s.x;
    const ty = s.y + (size.h / 2 - s.y) * CAM_PULL - CAM_ZOOM * s.y;
    camStyle = { transform: `translate(${tx}px, ${ty}px) scale(${CAM_ZOOM})` };
  }

  return (
    <section
      ref={ref}
      id="sky"
      className={`sky ${revealed ? 'revealed' : ''} ${panelOpen ? 'has-panel' : ''} ${aligning ? 'aligning' : ''}`}
      aria-label="Star map"
    >
      <div className="sky-cam" style={camStyle}>
        {size.w > 0 && (
          <svg className="orbits" viewBox={`0 0 ${size.w} ${size.h}`} aria-hidden="true">
            {[
              [0.5, 0.27, 0.95, 0.27, -16],
              [0.5, 0.6, 0.85, 0.3, 12],
              [0.5, 0.9, 0.9, 0.24, -7],
            ].map(([cx, cy, rx, ry, rot]) => {
              const u = Math.min(size.w, size.h * 1.3);
              const x = size.w * cx;
              const y = size.h * cy;
              return (
                <ellipse
                  key={`${cx}-${cy}`}
                  cx={x}
                  cy={y}
                  rx={u * rx}
                  ry={u * ry}
                  transform={`rotate(${rot} ${x} ${y})`}
                />
              );
            })}
          </svg>
        )}

        {size.w > 0 &&
          pairs.map(([a, b], k) => {
            const p = at(a);
            const q = at(b);
            const lit = visited.includes(a) && visited.includes(b);
            const flying = travel && travel.from === a && travel.to === b;
            return (
              <i
                key={`${a}-${b}`}
                className={`line ${flying ? 'is-flying' : ''}`}
                aria-hidden="true"
                style={{
                  left: p.x,
                  top: p.y,
                  width: Math.hypot(q.x - p.x, q.y - p.y),
                  transform: `rotate(${Math.atan2(q.y - p.y, q.x - p.x)}rad)`,
                  '--k': k,
                }}
              >
                <b className="line-base" />
                <b className={`line-lit ${lit ? 'on' : ''}`} />
              </i>
            );
          })}

        {size.w > 0 &&
          stars.map((s, i) => (
            <Star
              key={s.id}
              id={s.id}
              label={s.label}
              sub={s.sub}
              index={i}
              p={at(s.id)}
              side={sideOf(s.id)}
              state={visited.includes(s.id) ? 'visited' : 'new'}
              active={openId === s.id}
              onOpen={onOpen}
            />
          ))}

        {size.w > 0 && secretUnlocked && (
          <Star
            id="secret"
            index={stars.length}
            p={at('secret')}
            side={pos.secret.side}
            state={secretFound ? 'visited' : 'new'}
            active={openId === 'secret'}
            secret
            onOpen={onOpen}
          />
        )}

        {size.w > 0 && travel && (
          <Comet key={travel.key} from={at(travel.from)} to={at(travel.to)} delay={isDesktop ? 0.15 : 0.45} />
        )}
      </div>

      {revealed && visited.length === 0 && (
        <p className="hint">{isDesktop ? ui.hintMouse : ui.hintTouch}</p>
      )}

      {finaleSeen && (
        <p className="sky-sign">
          <Sparkle className="sky-sign-star" />
          {finale.line}
        </p>
      )}
    </section>
  );
}
