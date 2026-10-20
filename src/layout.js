// Star positions as percentages of the sky.
// Phone: a tall sky (about 1.75 screens) that scrolls, stars zig-zag down it.
// Desktop: one full-screen sky. The five stars trace an N, for Nova, in story order:
// up the left stroke, down the diagonal, up the right stroke.
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
    'first-light': { x: 24, y: 76, side: 'l' },
    moments: { x: 26, y: 18, side: 'l' },
    you: { x: 50, y: 47, side: 'r' },
    odds: { x: 74, y: 76, side: 'r' },
    wishes: { x: 76, y: 18, side: 'r' },
    secret: { x: 90, y: 54, side: 'l' },
  },
};
