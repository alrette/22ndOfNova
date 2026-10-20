// Tiny shared state for the two effect canvases.
// calm: letter or video is open, effects step back so the words land.
// panelOpen: a story is open, no shooting stars.
// Events: pull (stars lean toward a point), warp (light-speed streaks),
// nova (a large burst with rings), flare (a small burst with one ring).
const listeners = {};

export const fxState = { calm: false, panelOpen: false };

export const fx = {
  on(type, fn) {
    (listeners[type] ||= new Set()).add(fn);
    return () => listeners[type].delete(fn);
  },
  emit(type, payload) {
    listeners[type]?.forEach((fn) => fn(payload));
  },
};

export function centerOf(el) {
  if (!el) return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}
