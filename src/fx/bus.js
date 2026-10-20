// Tiny shared state for the two effect canvases.
// calm: letter or video is open, effects step back so the words land.
// panelOpen: a story is open, no shooting stars.
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
