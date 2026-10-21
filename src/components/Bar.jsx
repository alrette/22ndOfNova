import { useEffect, useRef } from 'react';
import { birthday, stars, herName, ui } from '../content';
import { isToday } from '../hooks';
import { clearProgress } from '../store';

// Her wishes live only in this browser, so let her keep a copy:
// the share sheet on phones (Notes, Files, a chat), a text file anywhere else.
async function saveWishesFile(wishes) {
  const day = (t) => new Date(t).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const text = `${ui.wishesFile}\n\n${wishes.map((w) => `✦ ${w.text}  (${day(w.t)})`).join('\n')}\n`;
  if (navigator.share) {
    try {
      await navigator.share({ title: ui.wishesFile, text });
      return;
    } catch (e) {
      if (e.name === 'AbortError') return;
    }
  }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
  a.download = 'my-wishes.txt';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

export default function Bar({
  visited,
  hasVideo,
  allVisited,
  menuOpen,
  setMenuOpen,
  onOpenStar,
  onLetter,
  onVideo,
  onReplay,
  soundOn,
  onToggleSound,
  wishes,
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onDoc = (e) => {
      if (!ref.current?.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', onDoc);
    return () => document.removeEventListener('pointerdown', onDoc);
  }, [menuOpen, setMenuOpen]);

  const done = stars.filter((s) => visited.includes(s.id)).length;
  const today = isToday(birthday);

  return (
    <header className={`bar ${today ? 'is-birthday' : ''}`} ref={ref}>
      <span className="brand">{today ? ui.brandToday(herName) : ui.brand(herName)}</span>
      <button
        type="button"
        className="icon-btn sound-btn"
        aria-pressed={soundOn}
        aria-label={soundOn ? ui.soundOn : ui.soundOff}
        title={soundOn ? ui.soundOn : ui.soundOff}
        onClick={onToggleSound}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 9.5h3l4.5-4v13l-4.5-4H4z" fill="currentColor" stroke="none" />
          {soundOn ? (
            <>
              <path d="M15 9a4 4 0 0 1 0 6" />
              <path d="M17.5 6.5a7.5 7.5 0 0 1 0 11" />
            </>
          ) : (
            <path d="M15.5 9.5l5 5M20.5 9.5l-5 5" />
          )}
        </svg>
      </button>
      <button
        type="button"
        className="menu-btn"
        aria-expanded={menuOpen}
        aria-controls="star-menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="pips" aria-hidden="true">
          {stars.map((s) => (
            <i key={s.id} className={visited.includes(s.id) ? 'on' : ''} />
          ))}
        </span>
        <span>{ui.progress(done, stars.length)}</span>
      </button>

      {menuOpen && (
        <nav id="star-menu" className="menu" aria-label={ui.menuTitle}>
          {stars.map((s) => (
            <button key={s.id} type="button" className="menu-item" onClick={() => onOpenStar(s.id)}>
              <i className={`menu-dot ${visited.includes(s.id) ? 'on' : ''}`} aria-hidden="true" />
              <span>
                {s.label}
                <small>{s.sub}</small>
              </span>
            </button>
          ))}
          <div className="menu-rule" />
          <button type="button" className="menu-item" onClick={onLetter}>
            <span>{ui.letterOpen}</span>
          </button>
          {hasVideo && (
            <button type="button" className="menu-item" onClick={onVideo}>
              <span>{ui.videoOpen}</span>
            </button>
          )}
          {allVisited && (
            <button type="button" className="menu-item" onClick={onReplay}>
              <span>{ui.replay}</span>
            </button>
          )}
          {wishes.length > 0 && (
            <details className="menu-wishes">
              <summary className="menu-item">
                <i className="menu-dot wish" aria-hidden="true" />
                <span>{ui.wishesTitle(wishes.length)}</span>
              </summary>
              <ol>
                {wishes.map((w) => (
                  <li key={w.t}>{w.text}</li>
                ))}
              </ol>
              <button type="button" className="btn btn-ghost wishes-save" onClick={() => saveWishesFile(wishes)}>
                {ui.wishesSave}
              </button>
            </details>
          )}
          <button
            type="button"
            className="menu-item"
            onClick={() => {
              clearProgress();
              window.location.reload();
            }}
          >
            <span>{ui.startOver}</span>
          </button>
        </nav>
      )}
    </header>
  );
}
