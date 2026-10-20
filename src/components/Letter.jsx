import { useRef } from 'react';
import { letter, herName, yourName, ui } from '../content';
import { useFocusTrap } from '../hooks';

export default function Letter({ onClose }) {
  const ref = useRef(null);
  useFocusTrap(ref);
  return (
    <div
      className="overlay"
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
        <button type="button" className="icon-btn paper-close" aria-label={ui.close} onClick={onClose} data-autofocus>
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        <h2 id="letter-title">
          {letter.title} {herName}.
        </h2>
        {letter.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p className="signoff">
          {letter.signoff}
          <br />
          <em>{yourName}</em>
        </p>
      </article>
    </div>
  );
}
