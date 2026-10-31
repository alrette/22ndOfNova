import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { timeline, memories, love, odds, wishes, tickets, reply, secret, herName, metDate, ui } from '../content';
import { asset, daysSince, parseDate, useCountUp, useInView, useReveal } from '../hooks';
import Sparkle from './Sparkle';
// The star catalogue is the heaviest file on the site: it loads only when the first story opens.
const SkyChart = lazy(() => import('./SkyChart'));
import { sfx } from '../fx/sound';

function Head({ star }) {
  return (
    <header className="story-head">
      <h2 id="panel-title" tabIndex={-1}>
        {star.title}
      </h2>
      {star.lead && <p className="lead">{star.lead}</p>}
    </header>
  );
}

/* 1. The first light: a vertical line that draws itself as you read */
function Timeline({ star }) {
  const ref = useRef(null);
  useReveal(ref);
  return (
    <div ref={ref}>
      <Head star={star} />
      <Suspense fallback={<div className="skychart-wait" />}>
        <SkyChart />
      </Suspense>
      <ol className="tl">
        {timeline.map((t, i) => (
          <li key={i} className="reveal">
            <Sparkle className="tl-mark" />
            {t.date && <span className="tl-date">{t.date}</span>}
            <h3>{t.title}</h3>
            {t.text && <p>{t.text}</p>}
          </li>
        ))}
      </ol>
      <Suspense fallback={null}>
        <SkyChart now />
      </Suspense>
    </div>
  );
}

/* 2. Moments I keep: an uneven collage, big photo first */
function Photo({ m }) {
  const [failed, setFailed] = useState(false);
  if (m.image && !failed) {
    return (
      <img
        src={asset(m.image)}
        alt={m.alt || m.title}
        loading="lazy"
        style={{ objectPosition: m.focus || '50% 40%' }}
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <div className="ph">
      <svg className="ph-orbit" viewBox="0 0 100 100" aria-hidden="true">
        <ellipse cx="50" cy="50" rx="44" ry="22" transform="rotate(-24 50 50)" />
        <ellipse cx="50" cy="50" rx="34" ry="14" transform="rotate(18 50 50)" />
      </svg>
      <Sparkle className="ph-star" />
      <span>{ui.photoHere}</span>
    </div>
  );
}

function Memories({ star }) {
  const ref = useRef(null);
  useReveal(ref);
  return (
    <div ref={ref}>
      <Head star={star} />
      <div className="mem-wrap">
        {memories.map((m, i) => (
          <figure key={i} className="mem reveal">
            <div className="mem-photo">
              <Photo m={m} />
            </div>
            <figcaption>
              {m.date && <span className="mem-date">{m.date}</span>}
              {m.title && <h3>{m.title}</h3>}
              {m.caption && <p>{m.caption}</p>}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

/* 3. The way I see you: her at the centre, what he notices around her */
const RX = [30, 26, 32, 27, 31, 28, 30, 26];
const RY = [37, 33, 40, 34, 38, 35, 39, 33];
const JIT = [-8, 10, -12, 6, -5, 12, -9, 7];

function Love({ star }) {
  const ref = useRef(null);
  useReveal(ref);
  const [active, setActive] = useState(null);
  const [seen, setSeen] = useState([]);
  const pts = useMemo(
    () =>
      love.map((_, i) => {
        const a = ((-90 + i * (360 / love.length) + JIT[i % 8]) * Math.PI) / 180;
        return { x: 50 + RX[i % 8] * Math.cos(a), y: 50 + RY[i % 8] * Math.sin(a) };
      }),
    [],
  );
  const ring = pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

  const pick = (i) => {
    sfx.twinkle(i);
    setActive(active === i ? null : i);
    setSeen((s) => (s.includes(i) ? s : [...s, i]));
  };

  return (
    <div ref={ref}>
      <Head star={star} />
      <div className="love-map reveal">
        <svg viewBox="0 0 100 100" className="love-lines" aria-hidden="true">
          <polygon points={ring} className="love-ring" />
          {pts.map((p, i) => (
            <path
              key={i}
              d={`M50 50L${p.x.toFixed(1)} ${p.y.toFixed(1)}`}
              pathLength="1"
              style={{ '--i': i }}
            />
          ))}
        </svg>
        <div className="love-core">
          <span className="halo" />
          <Sparkle className="love-sparkle" />
          <span className="love-name">{herName}</span>
        </div>
        {love.map((l, i) => (
          <button
            key={i}
            type="button"
            className={`love-node ${pts[i].y < 50 ? 'up' : 'down'} ${active === i ? 'is-active' : ''} ${
              seen.includes(i) ? 'is-seen' : ''
            }`}
            style={{ left: `${pts[i].x}%`, top: `${pts[i].y}%` }}
            aria-pressed={active === i}
            onClick={() => pick(i)}
          >
            <span className="halo" />
            <Sparkle className="love-glyph" />
            <span className="love-label">{l.label}</span>
          </button>
        ))}
      </div>
      <div className="love-detail" aria-live="polite">
        {active === null ? (
          <p className="love-hint">{ui.lovePrompt}</p>
        ) : (
          <>
            <h3>{love[active].label}</h3>
            <p>{love[active].detail}</p>
            {love[active].photo && (
              <img className="love-photo" src={asset(love[active].photo)} alt={love[active].photoAlt || ''} loading="lazy" />
            )}
            {love[active].story && <p className="love-story">{love[active].story}</p>}
          </>
        )}
      </div>
    </div>
  );
}

/* 4. How lucky I am: real counts, set large */
const pad = (n) => String(n).padStart(2, '0');

// The rest of the count, still running: hours, minutes and seconds since the day they met began.
function Ticking() {
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const t = Math.floor((now - parseDate(metDate)) / 1000);
  return (
    <p className="odds-tick" aria-hidden="true">
      {ui.ticking(Math.floor(t / 3600) % 24, Math.floor(t / 60) % 60, t % 60)}
    </p>
  );
}

function OddsRow({ item, days }) {
  const ref = useRef(null);
  const seen = useInView(ref);
  const isDays = item.kind === 'days';
  const numeric = isDays ? days : /^[\d,]+$/.test(item.value || '') ? Number(item.value.replace(/,/g, '')) : null;
  const n = useCountUp(numeric ?? 0, seen && numeric !== null);
  const shown = numeric === null ? item.value : n.toLocaleString('en-US');
  return (
    <div className="odds-row" ref={ref}>
      <p className="odds-num" style={{ '--len': String(numeric === null ? item.value : numeric.toLocaleString('en-US')).length }}>
        <span aria-hidden="true">{shown}</span>
        <span className="sr-only">{numeric === null ? item.value : numeric.toLocaleString('en-US')}</span>
      </p>
      <p className="odds-label">{item.label}</p>
      {isDays && <Ticking />}
      {item.note && <p className="odds-note">{item.note}</p>}
    </div>
  );
}

function Odds({ star }) {
  const days = daysSince(metDate);
  const items = odds.items.filter((it) => it.kind !== 'days' || days !== null);
  return (
    <div>
      <Head star={star} />
      <div className="odds">
        {items.map((it, i) => (
          <OddsRow key={i} item={it} days={days} />
        ))}
      </div>
      {odds.disclaimer && (
        <p className="odds-disclaimer">
          <Sparkle className="odds-star" />
          {odds.disclaimer}
        </p>
      )}
    </div>
  );
}

/* 5. Wishes: three small stars, set loosely, then the tickets that make them real */
function Tickets() {
  const items = (tickets?.items || []).filter((t) => t.title);
  if (!items.length) return null;
  const phone = (reply.phone || '').replace(/\D/g, '');
  return (
    <section className="tickets reveal" aria-labelledby="tickets-title">
      <h3 id="tickets-title">{tickets.title}</h3>
      <ul>
        {items.map((t, i) => {
          const inner = (
            <>
              <span className="ticket-main">
                <span className="ticket-no">No. {pad(i + 1)}</span>
                <span className="ticket-title">{t.title}</span>
                {t.detail && <span className="ticket-detail">{t.detail}</span>}
              </span>
              {phone && <span className="ticket-stub">{ui.ticketUse}</span>}
            </>
          );
          return (
            <li key={i}>
              {phone ? (
                <a
                  className="ticket"
                  href={`https://wa.me/${phone}?text=${encodeURIComponent(tickets.message(t.title))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {inner}
                </a>
              ) : (
                <div className="ticket">{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Wishes({ star }) {
  const ref = useRef(null);
  useReveal(ref);
  return (
    <div ref={ref}>
      <Head star={star} />
      <div className="wishes">
        {wishes.map((w, i) => (
          <section key={i} className={`wish wish-${i % 3} reveal`}>
            <Sparkle className="wish-mark" />
            <h3>{w.title}</h3>
            <p>{w.text}</p>
          </section>
        ))}
      </div>
      <Tickets />
    </div>
  );
}

export const STORIES = {
  'first-light': Timeline,
  moments: Memories,
  you: Love,
  odds: Odds,
  wishes: Wishes,
};

/* The faint star */
export function Secret() {
  return (
    <div className="secret">
      <Sparkle className="secret-spark" />
      <header className="story-head">
        <h2 id="panel-title" tabIndex={-1}>
          {secret.title}
        </h2>
      </header>
      {secret.image && <img className="secret-img" src={asset(secret.image)} alt={secret.alt || ''} />}
      <p className="secret-text">{secret.text}</p>
    </div>
  );
}
