// Progress lives in the browser only. Every access is wrapped because
// storage can be blocked (private windows, strict settings).
const KEY = 'universe.progress.v1';
const INTRO = 'universe.intro.v1';

export function loadProgress() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const p = JSON.parse(raw);
      return {
        visited: Array.isArray(p.visited) ? p.visited : [],
        secretFound: !!p.secretFound,
        finaleSeen: !!p.finaleSeen,
      };
    }
  } catch {
    /* ignore */
  }
  return { visited: [], secretFound: false, finaleSeen: false };
}

export function saveProgress(p) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* ignore */
  }
}

export function clearProgress() {
  try {
    localStorage.removeItem(KEY);
    sessionStorage.removeItem(INTRO);
  } catch {
    /* ignore */
  }
}

export function introSeen() {
  try {
    return sessionStorage.getItem(INTRO) === '1';
  } catch {
    return false;
  }
}

export function markIntroSeen() {
  try {
    sessionStorage.setItem(INTRO, '1');
  } catch {
    /* ignore */
  }
}

// Her wishes, the little stars she adds herself. Kept apart from progress, so "Start over" leaves them.
const WISHES = 'universe.wishes.v1';

export function loadWishes() {
  try {
    const w = JSON.parse(localStorage.getItem(WISHES) || '[]');
    return Array.isArray(w) ? w.filter((x) => x && typeof x.text === 'string') : [];
  } catch {
    return [];
  }
}

export function saveWishes(list) {
  try {
    localStorage.setItem(WISHES, JSON.stringify(list));
  } catch {
    /* private mode: the wish lasts this visit */
  }
}
