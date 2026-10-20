import { useEffect, useRef } from 'react';
import { stars, herName, ui } from '../content';

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
        </nav>
      )}
    </header>
  );
}
