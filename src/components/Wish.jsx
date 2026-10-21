import { useRef, useState } from 'react';
import { ui } from '../content';
import { useFocusTrap } from '../hooks';
import Sparkle from './Sparkle';

// Shows for a few seconds after a shooting star crosses the sky.
export function WishChance({ onClick }) {
  return (
    <button type="button" className="wish-chance" onClick={onClick}>
      <Sparkle className="wish-chance-star" />
      {ui.wishChance}
    </button>
  );
}

export function WishDialog({ onSend, onClose }) {
  const ref = useRef(null);
  const [text, setText] = useState('');
  useFocusTrap(ref);
  const wish = text.trim();
  return (
    <div
      className="overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <form
        className="wish-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wish-title"
        ref={ref}
        tabIndex={-1}
        onSubmit={(e) => {
          e.preventDefault();
          if (wish) onSend(wish);
        }}
      >
        <Sparkle className="wish-card-star" />
        <h2 id="wish-title">{ui.wishTitle}</h2>
        <p>{ui.wishNote}</p>
        <input
          data-autofocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={90}
          placeholder={ui.wishPlaceholder}
          aria-label={ui.wishTitle}
          enterKeyHint="send"
        />
        <div className="wish-actions">
          <button type="submit" className="btn btn-primary" disabled={!wish}>
            {ui.wishSend}
          </button>
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            {ui.wishLater}
          </button>
        </div>
      </form>
    </div>
  );
}

// One of her wishes in the sky. Tap it to read it again.
export function WishStar({ wish, p, open, onToggle }) {
  return (
    <button
      type="button"
      className={`wish-star ${open ? 'is-open' : ''} ${p.left ? 'to-left' : ''}`}
      style={{ left: p.x, top: p.y }}
      data-wish={wish.t}
      aria-label={ui.wishStar(wish.text)}
      aria-expanded={open}
      onClick={onToggle}
    >
      <Sparkle className="wish-glyph" />
      {open && (
        <span className="wish-text" aria-hidden="true">
          {wish.text}
        </span>
      )}
    </button>
  );
}
