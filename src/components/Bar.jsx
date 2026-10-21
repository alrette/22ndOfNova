import { useEffect, useRef } from 'react';
import { stars, herName, ui } from '../content';
import { clearProgress } from '../store';

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

  return (
    <header className="bar" ref={ref}>
      <span className="brand">{ui.brand(herName)}</span>
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
