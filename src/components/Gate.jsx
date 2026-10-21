import { useEffect, useState } from 'react';
import { gate, herName, ui } from '../content';
import { useReducedMotion } from '../hooks';
import { PREVIEW } from '../preview';
import Touch from '../fx/Touch';
import Sparkle from './Sparkle';

const OPENS = Date.parse(gate.opensAt || '');
const KEY = 'universe.gate.v1';

// ?open=<secret> lets him in for the rest of this tab's life.
function letIn() {
  if (PREVIEW || !OPENS) return true;
  try {
    const url = new URL(window.location.href);
    if (gate.secret && url.searchParams.get('open') === gate.secret) {
      sessionStorage.setItem(KEY, '1');
      url.searchParams.delete('open');
      window.history.replaceState({}, '', url);
    }
    return sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

const split = (ms) => {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [Math.floor(s / 86400), Math.floor(s / 3600) % 24, Math.floor(s / 60) % 60, s % 60];
};

// Before her birthday the site is only this: one unborn star and a countdown.
export default function Gate({ children }) {
  const reduced = useReducedMotion();
  const [free] = useState(letIn);
  const [skew, setSkew] = useState(0); // server clock minus device clock
  const [now, setNow] = useState(Date.now);
  const locked = !free && now + skew < OPENS;
  const [phase, setPhase] = useState(locked ? 'locked' : 'open'); // locked | opening | open
  const [nudge, setNudge] = useState(0);

  // The server's clock, so moving the phone's clock forward does not open it early.
  useEffect(() => {
    if (free) return;
    fetch(window.location.href, { method: 'HEAD', cache: 'no-store' })
      .then((r) => {
        const server = Date.parse(r.headers.get('Date') || '');
        if (server) setSkew(server - Date.now());
      })
      .catch(() => {});
  }, [free]);

  useEffect(() => {
    if (phase === 'locked' && !locked) setPhase('opening');
    else if (phase === 'open' && locked) setPhase('locked');
  }, [phase, locked]);

  useEffect(() => {
    if (phase !== 'locked') return undefined;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'opening') return undefined;
    const id = setTimeout(() => setPhase('open'), reduced ? 300 : 2300);
    return () => clearTimeout(id);
  }, [phase, reduced]);

  if (phase === 'open') return children;

  const parts = split(OPENS - (now + skew));
  return (
    <>
      <div className={`intro gate ${phase === 'opening' ? 'leaving' : ''}`}>
        <div className="intro-stage">
          <button type="button" className="intro-star gate-star" aria-label={ui.gateStar} onClick={() => setNudge((n) => n + 1)}>
            <span className="intro-halo" />
            <span className="intro-shock s1" aria-hidden="true" />
            <span className="intro-shock s2" aria-hidden="true" />
            <span className="intro-shock s3" aria-hidden="true" />
            <span className="intro-rays" aria-hidden="true" />
            <Sparkle key={nudge} className={`intro-spark ${nudge ? 'nudged' : ''}`} />
          </button>
          <h1 className="gate-title">{ui.gateTitle(herName)}</h1>
          <p className="gate-when">{ui.gateWhen}</p>
          <p className="gate-count" aria-hidden="true">
            {parts.map((n, i) => (
              <span key={ui.gateUnits[i]}>
                <b>{i ? String(n).padStart(2, '0') : n}</b>
                {ui.gateUnits[i]}
                {n === 1 ? '' : 's'}
              </span>
            ))}
          </p>
          {gate.note && <p className="gate-note">{gate.note}</p>}
        </div>
      </div>
      <Touch reduced={reduced} />
    </>
  );
}
