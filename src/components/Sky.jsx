import { useLayoutEffect, useRef, useState } from 'react';
import { stars, ui, finale } from '../content';
import { LAYOUT } from '../layout';
import Sparkle from './Sparkle';

function Star({ id, label, sub, index, p, state, active, secret, onOpen }) {
  const aria = secret ? ui.secretLabel : `${label}${state === 'visited' ? `, ${ui.opened}` : ''}`;
  return (
    <button
      type="button"
      className={`star side-${p.side} ${active ? 'is-active' : ''} ${secret ? 'is-secret' : ''}`}
      style={{ left: `${p.x}%`, top: `${p.y}%`, '--i': index }}
      data-star={id}
      data-state={state}
      data-tone={state === 'visited' ? 'amber' : 'blue'}
      aria-label={aria}
      aria-haspopup="dialog"
      onClick={(e) => onOpen(id, e.currentTarget)}
    >
      <span className="star-halo" />
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

export default function Sky({
  isDesktop,
  visited,
  secretFound,
  secretUnlocked,
  openId,
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

  return (
    <section
      ref={ref}
      id="sky"
      className={`sky ${revealed ? 'revealed' : ''} ${openId ? 'has-panel' : ''}`}
      aria-label="Star map"
    >
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
        pairs.map(([a, b]) => {
          const p = at(a);
          const q = at(b);
          const style = {
            left: p.x,
            top: p.y,
            width: Math.hypot(q.x - p.x, q.y - p.y),
            '--a': `${Math.atan2(q.y - p.y, q.x - p.x)}rad`,
          };
          const lit = visited.includes(a) && visited.includes(b);
          return (
            <span key={`${a}-${b}`} aria-hidden="true">
              <i className="line line-base" style={style} />
              <i className={`line line-lit ${lit ? 'on' : ''}`} style={style} />
            </span>
          );
        })}

      {stars.map((s, i) => (
        <Star
          key={s.id}
          id={s.id}
          label={s.label}
          sub={s.sub}
          index={i}
          p={pos[s.id]}
          state={visited.includes(s.id) ? 'visited' : 'new'}
          active={openId === s.id}
          onOpen={onOpen}
        />
      ))}

      {secretUnlocked && (
        <Star
          id="secret"
          index={stars.length}
          p={pos.secret}
          state={secretFound ? 'visited' : 'new'}
          active={openId === 'secret'}
          secret
          onOpen={onOpen}
        />
      )}

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
