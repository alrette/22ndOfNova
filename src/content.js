// ====================================================================
//  EDIT THIS FILE. Everything personal lives here.
//
//  - Anything in [square brackets] is a placeholder. Replace it.
//  - Leave a field as '' to hide it.
//  - Photos: put files in public/photos/ and write 'photos/name.jpg'
//    (no leading slash, so it also works on GitHub Pages).
//  - Keep it specific. "Her laugh" is fine. "The way her laugh
//    arrives half a second before the joke ends" is the one she'll
//    remember.
//  - Add ?reset to the page address to clear saved progress.
// ====================================================================

export const herName = '[Her name]';
export const yourName = '[Your name]';
export const specialDate = '[Her birthday, e.g. October 24]';

// The day you first met, as YYYY-MM-DD. Used to count the days.
export const metDate = '2025-01-15'; // REPLACE with the real date

// ---------- Opening ----------
// Three short lines, shown one after another. Keep it under ~12 words.
export const opening = {
  lines: ['Somehow, in this', 'enormous universe,', 'I found you.'],
};

// ---------- The five stars ----------
// `label` and `sub` appear on the sky. `title` and `lead` open each story.
export const stars = [
  {
    id: 'first-light',
    label: 'The first light',
    sub: 'How it started',
    title: 'It started with an ordinary day.',
    lead: '[One sentence to set the scene.]',
  },
  {
    id: 'moments',
    label: 'Moments I keep',
    sub: 'A few small days',
    title: 'Little moments, kept.',
    lead: 'Some days don’t need to be big to stay with you. These are the ones that stayed with me.',
  },
  {
    id: 'you',
    label: 'The way I see you',
    sub: 'What I notice',
    title: 'A map of the things I notice.',
    lead: 'Not the big things. The small ones you probably don’t know I see.',
  },
  {
    id: 'odds',
    label: 'How lucky I am',
    sub: 'Numbers, sort of',
    title: 'I don’t know the odds.',
    lead: 'Out of all the ways that day could have gone, it went this way. Here is what I can count.',
  },
  {
    id: 'wishes',
    label: 'My wishes for you',
    sub: 'For the year ahead',
    title: 'What I hope for you.',
    lead: 'Three wishes, in no particular order.',
  },
];

// ---------- Star 1: timeline (4 to 6 entries) ----------
export const timeline = [
  {
    date: '[When]',
    title: 'The first light',
    text: '[At YCC, where was she standing when you first noticed her? What was she doing? Two or three honest sentences.]',
  },
  {
    date: '[When]',
    title: 'A conversation that stayed',
    text: '[A small moment you remember more clearly than she probably knows.]',
  },
  {
    date: '[When]',
    title: 'Somewhere along the way',
    text: '[When you realised she was becoming important to you.]',
  },
  {
    date: '[Today]',
    title: 'And here we are',
    text: '[What being with her feels like now.]',
  },
];

// ---------- Star 2: photos (3 to 6) ----------
// image: 'photos/first-date.jpg'   focus: where to keep the crop, e.g. '50% 30%'
export const memories = [
  {
    date: '[When]',
    title: '[A memory title]',
    caption: '[Why this one matters to you.]',
    image: '',
    alt: '',
    focus: '50% 40%',
  },
  {
    date: '[When]',
    title: '[Another memory]',
    caption: '[A funny detail or a tiny thing you still remember.]',
    image: '',
    alt: '',
    focus: '50% 40%',
  },
  {
    date: '[When]',
    title: '[A favourite day]',
    caption: '[What you want her to remember about it.]',
    image: '',
    alt: '',
    focus: '50% 40%',
  },
];

// ---------- Star 3: what you notice about her (5 to 8) ----------
export const love = [
  { label: 'Your laugh', detail: '[What it does to a room, or to your day.]' },
  { label: 'How hard you try', detail: '[Something you admire about the way she keeps going.]' },
  { label: 'Your silly side', detail: '[An inside joke, or a tiny habit that makes you laugh.]' },
  { label: 'How you care', detail: '[A specific moment you noticed her kindness.]' },
  { label: 'Your small rituals', detail: '[Something ordinary she does that feels irreplaceable.]' },
  { label: 'How you listen', detail: '[A time she really heard you.]' },
];

// ---------- Star 4: numbers ----------
// kind: 'days' counts from metDate automatically.
// Real counts only. If it is not a number you can stand behind, make it a sentence.
export const odds = {
  items: [
    { kind: 'days', label: 'days since we met', note: 'A small number for a very big thing.' },
    { value: '[N]', label: '[something you count together]', note: '[One line about it.]' },
    { value: '1', label: 'person I made this for', note: 'No statistics needed for this one.' },
  ],
  disclaimer:
    'Not a scientific probability. Just my way of saying how unlikely and wonderful this feels.',
};

// ---------- Star 5: wishes (3) ----------
export const wishes = [
  { title: 'For your heart', text: '[A wish for peace, and for people who make her feel safe.]' },
  { title: 'For your dreams', text: '[A wish for the thing she is working hardest on.]' },
  {
    title: 'For who you are becoming',
    text: '[A wish that she keeps growing without losing what makes her herself.]',
  },
];

// ---------- The faint star (appears after three stars are opened) ----------
export const secret = {
  title: 'You found it.',
  text: '[The most personal thing you want to say. This one is only for her.]',
  image: '',
  alt: '',
};

// ---------- The ending (after all five stars) ----------
export const finale = {
  greeting: 'Happy birthday,',
  line: 'I’m glad I attended YCC.',
  note: '[One honest sentence about why.]',
};

// ---------- The letter ----------
export const letter = {
  title: 'Happy birthday,',
  paragraphs: [
    '[Start with something only you would say. Skip the greeting-card voice.]',
    '[What you appreciate about her, and what you are proud of her for.]',
    '[What you hope this next year brings her, and where you hope to be in it.]',
  ],
  signoff: 'With all my love,',
};

// ---------- Optional video message (leave src empty to hide it) ----------
// Put the file in public/video/ and write 'video/message.mp4'.
// Keep it under about 15 MB (MP4, H.264, 720p). It never plays by itself.
export const video = {
  title: 'A message from me',
  src: '',
  poster: '', // e.g. 'photos/video-poster.jpg'
  captions: '', // optional .vtt file, e.g. 'video/message.vtt'
};

// ---------- Interface text ----------
export const ui = {
  begin: 'Begin our story',
  skip: 'Skip intro',
  madeFor: 'Made for',
  hintTouch: 'Tap a star',
  hintMouse: 'Choose a star',
  brand: (name) => `For ${name}`,
  progress: (n, total) => `${n} of ${total} stars`,
  menuTitle: 'Stars',
  close: 'Close',
  nextStar: 'Next star',
  seeSky: 'See the whole sky',
  backToSky: 'Back to the sky',
  lovePrompt: 'Tap a star to read what I mean.',
  letterOpen: 'Read my letter',
  videoOpen: 'Watch my message',
  replay: 'Replay the ending',
  secretLabel: 'A faint star. Tap it.',
  photoHere: 'Your photo goes here',
  opened: 'opened',
};
