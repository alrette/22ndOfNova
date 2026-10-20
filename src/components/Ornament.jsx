import Sparkle from './Sparkle';

// A thin line, a small star, a thin line: the divider used inside stories and the letter.
export function Divider({ className = '' }) {
  return (
    <div className={`divider ${className}`} aria-hidden="true">
      <span />
      <Sparkle className="divider-star" />
      <span />
    </div>
  );
}

// A tiny constellation with an orbit, drawn in when its parent appears.
export function Flourish({ className = '' }) {
  return (
    <svg className={`flourish ${className}`} viewBox="0 0 120 40" aria-hidden="true">
      <ellipse cx="60" cy="20" rx="56" ry="11" transform="rotate(-8 60 20)" pathLength="1" />
      <path d="M14 26 38 12 60 22 84 8 106 18" pathLength="1" />
      {[
        [14, 26],
        [38, 12],
        [60, 22],
        [84, 8],
        [106, 18],
      ].map(([x, y], i) => (
        <circle key={x} cx={x} cy={y} r={i === 2 ? 2.4 : 1.6} style={{ '--i': i }} />
      ))}
    </svg>
  );
}
