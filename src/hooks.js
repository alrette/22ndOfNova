import { useEffect, useState } from 'react';

export function useMedia(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatches(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return matches;
}

export const useReducedMotion = () => useMedia('(prefers-reduced-motion: reduce)');

// Keeps keyboard focus inside a dialog and gives it back when it closes.
export function useFocusTrap(ref, active = true) {
  useEffect(() => {
    if (!active) return undefined;
    const root = ref.current;
    if (!root) return undefined;
    const previous = document.activeElement;
    const selector =
      'a[href],button:not([disabled]),input,select,textarea,video[controls],[tabindex]:not([tabindex="-1"])';
    const focusables = () =>
      [...root.querySelectorAll(selector)].filter((el) => el.offsetParent !== null);
    const first = root.querySelector('[data-autofocus]') || focusables()[0] || root;
    first.focus({ preventScroll: true });
    // The target may still be hidden (the finale fades its buttons in): fall back to the dialog itself.
    if (document.activeElement !== first) root.focus({ preventScroll: true });
    const onKey = (e) => {
      if (e.key !== 'Tab') return;
      const list = focusables();
      if (!list.length) {
        e.preventDefault();
        return;
      }
      const a = list[0];
      const z = list[list.length - 1];
      if (e.shiftKey && document.activeElement === a) {
        e.preventDefault();
        z.focus();
      } else if (!e.shiftKey && document.activeElement === z) {
        e.preventDefault();
        a.focus();
      }
    };
    root.addEventListener('keydown', onKey);
    return () => {
      root.removeEventListener('keydown', onKey);
      if (previous && previous.focus) previous.focus({ preventScroll: true });
    };
  }, [active, ref]);
}

// Adds .in to every .reveal inside `ref` once it scrolls into view.
export function useReveal(ref) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    const targets = root.querySelectorAll('.reveal');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      targets.forEach((t) => t.classList.add('in'));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { root: root.closest('.panel-scroll'), threshold: 0.2, rootMargin: '0px 0px -6% 0px' },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [ref]);
}

export function useInView(ref) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) {
      setSeen(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { root: el.closest('.panel-scroll'), threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return seen;
}

export function useCountUp(target, run, duration = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return undefined;
    }
    let raf = 0;
    let t0;
    const step = (t) => {
      if (t0 === undefined) t0 = t;
      const p = Math.min(1, (t - t0) / duration);
      setValue(Math.round(target * (1 - (1 - p) ** 3)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return value;
}

// A YYYY-MM-DD date at local midnight, or null if it is missing or impossible (2025-02-30).
export function parseDate(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return d.getMonth() === Number(m[2]) - 1 && d.getDate() === Number(m[3]) ? d : null;
}

export function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

// Whole days between an ISO date (YYYY-MM-DD) and today, in the device's time zone.
export function daysSince(iso) {
  const start = parseDate(iso);
  if (!start) return null;
  // Rounding absorbs the hour lost or gained on daylight-saving days.
  return Math.max(0, Math.round((startOfToday() - start) / 86400000));
}

// Resolves 'photos/a.jpg' (or '/photos/a.jpg') against the site's base path.
export function asset(path) {
  if (!path) return '';
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}

// True when today, on this device, is the given MM-DD (any year).
export function isToday(mmdd) {
  const d = new Date();
  return `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}` === mmdd;
}
