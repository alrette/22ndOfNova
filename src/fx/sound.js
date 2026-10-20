// Sound effects, synthesised with Web Audio: no files to load, nothing to license.
// Every star has its own note from one pentatonic scale, so opening them in order
// plays a small melody, and the ending plays all five as the constellation lights.
// Off until she chooses "Begin with sound"; the choice is remembered on her device.

const KEY = 'universe.sound.v1';
const NOTES = [659.25, 783.99, 880, 987.77, 1174.66]; // E5 G5 A5 B5 D6

let ctx = null;
let master = null;
let reverb = null;
let noiseBuf = null;
let enabled = (() => {
  try {
    return localStorage.getItem(KEY) === 'on';
  } catch {
    return false;
  }
})();

function impulse(seconds) {
  const len = Math.floor(ctx.sampleRate * seconds);
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch += 1) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i += 1) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 3;
  }
  return buf;
}

function ensure() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.32;
    const comp = ctx.createDynamicsCompressor();
    master.connect(comp).connect(ctx.destination);
    reverb = ctx.createConvolver();
    reverb.buffer = impulse(2.8);
    const wet = ctx.createGain();
    wet.gain.value = 0.5;
    reverb.connect(wet).connect(master);
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i += 1) d[i] = Math.random() * 2 - 1;
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) ctx.suspend();
      else if (enabled) ctx.resume();
    });
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

const live = () => enabled && ensure();

function out(node, dry = 1, wetSend = 1) {
  const d = ctx.createGain();
  d.gain.value = dry;
  node.connect(d).connect(master);
  const w = ctx.createGain();
  w.gain.value = wetSend;
  node.connect(w).connect(reverb);
}

function bell(freq, t, dur = 1.8, vol = 0.22) {
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  [
    [1, 'sine', 1],
    [2.01, 'sine', 0.28],
    [3.98, 'sine', 0.08],
  ].forEach(([mult, type, level]) => {
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.value = freq * mult;
    const lg = ctx.createGain();
    lg.gain.value = level;
    o.connect(lg).connect(g);
    o.start(t);
    o.stop(t + dur + 0.05);
  });
  out(g, 0.8, 0.9);
}

function whoosh(t, dur, from, to, vol = 0.18) {
  const src = ctx.createBufferSource();
  src.buffer = noiseBuf;
  const f = ctx.createBiquadFilter();
  f.type = 'bandpass';
  f.Q.value = 0.9;
  f.frequency.setValueAtTime(from, t);
  f.frequency.exponentialRampToValueAtTime(to, t + dur);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + dur * 0.45);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f).connect(g);
  out(g, 1, 0.6);
  src.start(t);
  src.stop(t + dur + 0.05);
}

function pad(freqs, t, dur, vol = 0.07) {
  freqs.forEach((fq, i) => {
    [-4, 4].forEach((cents) => {
      const o = ctx.createOscillator();
      o.type = i % 2 ? 'triangle' : 'sine';
      o.frequency.value = fq;
      o.detune.value = cents;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + 0.8);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g);
      out(g, 0.7, 1);
      o.start(t);
      o.stop(t + dur + 0.05);
    });
  });
}

function boom(t, vol = 0.35) {
  const o = ctx.createOscillator();
  o.frequency.setValueAtTime(90, t);
  o.frequency.exponentialRampToValueAtTime(38, t + 1.2);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);
  o.connect(g);
  out(g, 1, 0.3);
  o.start(t);
  o.stop(t + 1.5);
}

function crinkle(t) {
  const src = ctx.createBufferSource();
  src.buffer = noiseBuf;
  const f = ctx.createBiquadFilter();
  f.type = 'highpass';
  f.frequency.value = 2400;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.09, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);
  src.connect(f).connect(g);
  out(g, 1, 0.2);
  src.start(t, Math.random());
  src.stop(t + 0.16);
}

export const sfx = {
  get enabled() {
    return enabled;
  },
  // Call from a tap or click: browsers only start audio inside a user gesture.
  setEnabled(on) {
    enabled = on;
    try {
      localStorage.setItem(KEY, on ? 'on' : 'off');
    } catch {
      /* private mode: the choice lasts this visit */
    }
    if (on) ensure();
    else if (ctx) ctx.suspend();
  },
  chime(i = 0) {
    if (!live()) return;
    const t = ctx.currentTime + 0.01;
    const f = NOTES[((i % 5) + 5) % 5];
    bell(f, t, 2.2, 0.22);
    bell(f / 2, t, 2.6, 0.08);
    bell(f * 2, t + 0.07, 1, 0.05);
  },
  twinkle(i = 0) {
    if (!live()) return;
    bell(NOTES[i % 5] * 2, ctx.currentTime + 0.01, 0.9, 0.07);
  },
  tick() {
    if (!live()) return;
    bell(1760, ctx.currentTime + 0.01, 0.25, 0.03);
  },
  close() {
    if (!live()) return;
    bell(NOTES[0] / 2, ctx.currentTime + 0.01, 1.2, 0.06);
  },
  secret() {
    if (!live()) return;
    const t = ctx.currentTime + 0.01;
    [...NOTES, NOTES[0] * 2].forEach((f, i) => bell(f * 2, t + i * 0.07, 1.6, 0.08));
    bell(NOTES[0], t + 0.45, 2.6, 0.18);
  },
  comet() {
    if (!live()) return;
    const t = ctx.currentTime + 0.01;
    whoosh(t + 0.1, 1.2, 380, 2600, 0.16);
  },
  warp() {
    if (!live()) return;
    const t = ctx.currentTime + 0.01;
    whoosh(t, 1.8, 180, 5200, 0.3);
    boom(t + 0.05, 0.32);
    NOTES.forEach((f, i) => bell(f, t + 0.35 + i * 0.09, 2, 0.1));
    pad([164.81, 246.94, 329.63], t + 0.2, 3.4, 0.05);
  },
  // Matches the ending: one note per line flare, then the light gathers.
  align() {
    if (!live()) return;
    const t = ctx.currentTime + 0.05;
    NOTES.forEach((f, i) => bell(f, t + i * 0.25, 2.4, 0.2));
    whoosh(t + 0.9, 0.9, 300, 3000, 0.12);
    boom(t + 1.65, 0.28);
    pad([82.41, 164.81, 246.94, 329.63, 392, 493.88], t + 1.65, 5, 0.055);
    [NOTES[0] * 2, NOTES[2] * 2, NOTES[4] * 2].forEach((f, i) => bell(f, t + 1.7 + i * 0.12, 2.4, 0.08));
  },
  paper() {
    if (!live()) return;
    const t = ctx.currentTime + 0.01;
    [0, 0.12, 0.3, 0.42].forEach((d) => crinkle(t + d));
    bell(NOTES[2] / 2, t + 0.5, 2.4, 0.08);
  },
};
