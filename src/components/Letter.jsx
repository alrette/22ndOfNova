import { useRef, useState } from 'react';
import { letter, futureLetter, openWhen, herName, yourName, ui } from '../content';
import { useFocusTrap, parseDate, startOfToday } from '../hooks';
import { Divider, Flourish } from './Ornament';
import Sparkle from './Sparkle';
import { FinalePhoto, ReplyButton } from './Extras';
import { sfx } from '../fx/sound';

const Envelope = () => (
  <svg className="envelope" viewBox="0 0 140 92" aria-hidden="true">
    <rect x="2" y="12" width="136" height="78" rx="3" className="env-body" />
    <path d="M2 88 70 44 138 88" className="env-fold" />
    <path d="M2 14 70 58 138 14Z" className="env-flap" />
    <circle cx="70" cy="56" r="11" className="env-seal" />
    <path
      d="M70 49C70.3 53 73 55.7 77 56C73 56.3 70.3 59 70 63C69.7 59 67 56.3 63 56C67 55.7 69.7 53 70 49Z"
      className="env-seal-star"
    />
  </svg>
);

// Envelopes she can open any time; one is open at a time and its letter shows below the row.
function OpenWhen() {
  const [open, setOpen] = useState(-1);
  const list = (openWhen || [])
    .map((e) => ({ ...e, body: (e.paragraphs || []).filter(Boolean) }))
    .filter((e) => e.when && e.body.length);
  if (!list.length) return null;
  const cur = list[open];
  return (
    <section className="open-when" aria-labelledby="open-when-title">
      <Divider className="divider-ink" />
      <h3 id="open-when-title">{ui.openWhen}</h3>
      <div className="ow-row">
        {list.map((e, i) => (
          <button
            key={e.when}
            type="button"
            className={`ow ${i === open ? 'is-open' : ''}`}
            aria-expanded={i === open}
            aria-controls="open-when-body"
            onClick={() => {
              if (i !== open) sfx.paper();
              setOpen(i === open ? -1 : i);
            }}
          >
            <Envelope />
            <span>{e.when}</span>
          </button>
        ))}
      </div>
      <div id="open-when-body" aria-live="polite">
        {cur && (
          <div className="future-body" key={open}>
            {cur.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Sealed until futureLetter.openOn on her own device's clock. A ritual, not a lock.
function FutureLetter() {
  const [open, setOpen] = useState(false);
  const body = (futureLetter?.paragraphs || []).filter(Boolean);
  const date = parseDate(futureLetter?.openOn);
  if (!body.length || !date) return null;
  const unlocked = startOfToday() >= date;
  const when = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <section className={`future ${open ? 'is-open' : ''}`} aria-labelledby="future-title">
      <Divider className="divider-ink" />
      <Envelope />
      <h3 id="future-title">{futureLetter.title}</h3>
      {!unlocked && (
        <p className="future-when">
          {ui.sealedUntil} {when}
        </p>
      )}
      {unlocked && !open && (
        <button
          type="button"
          className="btn btn-ink"
          onClick={() => {
            sfx.chime(4);
            setOpen(true);
          }}
        >
          {ui.openFuture}
        </button>
      )}
      {open && (
        <div className="future-body">
          {body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}
    </section>
  );
}

export default function Letter({ onClose }) {
  const ref = useRef(null);
  useFocusTrap(ref);
  return (
    <div
      className="overlay letter-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <article
        className="paper"
        role="dialog"
        aria-modal="true"
        aria-labelledby="letter-title"
        ref={ref}
        tabIndex={-1}
      >
        <span className="paper-frame" aria-hidden="true">
          <Sparkle className="corner c1" />
          <Sparkle className="corner c2" />
          <Sparkle className="corner c3" />
          <Sparkle className="corner c4" />
        </span>
        <button type="button" className="icon-btn paper-close" aria-label={ui.close} onClick={onClose} data-autofocus>
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        <h2 id="letter-title">
          {letter.title} {herName}.
        </h2>
        <Flourish className="paper-flourish" />
        {letter.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <FinalePhoto />
        <p className="signoff">
          {letter.signoff}
          <br />
          <em>{yourName}</em>
        </p>
        <ReplyButton />
        <OpenWhen />
        <FutureLetter />
      </article>
    </div>
  );
}
