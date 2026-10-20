// Star positions as percentages of the sky.
// Phone: a tall sky (about 1.75 screens) that scrolls, stars zig-zag down it.
// Desktop: one full-screen sky, stars spread across it.
// side = where the label sits: r (right), l (left), b (below), a (above).
// Chosen so the constellation lines run through empty space, never through a label.
export const LAYOUT = {
  mobile: {
    'first-light': { x: 30, y: 11, side: 'r' },
    moments: { x: 68, y: 25, side: 'l' },
    you: { x: 28, y: 40, side: 'r' },
    odds: { x: 70, y: 54, side: 'l' },
    wishes: { x: 32, y: 69, side: 'r' },
    secret: { x: 78, y: 83, side: 'l' },
  },
  desktop: {
    'first-light': { x: 16, y: 36, side: 'l' },
    moments: { x: 33, y: 66, side: 'b' },
    you: { x: 52, y: 30, side: 'a' },
    odds: { x: 71, y: 62, side: 'b' },
    wishes: { x: 87, y: 30, side: 'a' },
    secret: { x: 60, y: 86, side: 'r' },
  },
};
