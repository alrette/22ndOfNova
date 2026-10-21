// ====================================================================
//  EDIT THIS FILE. Everything personal lives here.
//
//  - Anything in [square brackets] is a placeholder. Replace it,
//    brackets included. Search for "[" before you send the link.
//  - Leave a field as '' to hide it.
//  - Photos: put files in public/photos/ and write 'photos/name.jpg'
//    (no leading slash, so it also works on GitHub Pages).
//  - Keep it specific. "Her laugh" is fine. "The way her laugh
//    arrives half a second before the joke ends" is the one she'll
//    remember.
//  - Add ?reset to the page address to clear saved progress.
// ====================================================================

export const herName = 'Nova';
export const yourName = 'nduts';
export const specialDate = 'November 1';

// The day you first met, as YYYY-MM-DD. Used to count the days.
export const metDate = '2025-07-07';

// ---------- Before her birthday ----------
// Until opensAt the link shows only a waiting screen with a countdown.
// If she has it open at that moment, the star ignites and the opening starts by itself.
// opensAt: an exact moment with its UTC offset (+07:00 is WIB). '' turns the wait off.
// secret: your way in to test early: add ?open=<secret> to the address. It lasts
//   until that browser tab closes. A ritual, not a lock: the words are in the page code.
// note: optional line under the countdown, from you. '' hides it.
export const gate = {
  opensAt: '2026-11-01T00:00:00+07:00',
  secret: 'nduts0707',
  note: '',
};

// ---------- Opening ----------
// Your opening line, split over two or three short lines.
// Under ~12 words in total. Save the YCC line for the end.
export const opening = {
  lines: ['Hai Sayang!!', 'Here\'s a little birthday gift for you'],
};

// ---------- The five stars ----------
// `label` and `sub` appear on the sky. `title` and `lead` open each story.
export const stars = [
  {
    id: 'first-light',
    label: 'The first light',
    sub: 'How it started',
    title: '[A heading about how it began at YCC]',
    lead: '[One sentence to set the scene.]',
  },
  {
    id: 'moments',
    label: 'Moments I keep',
    sub: 'A few small days',
    title: '[A heading for your photos]',
    lead: '[One or two sentences: why these days and not others.]',
  },
  {
    id: 'you',
    label: 'The way I see you',
    sub: 'What I notice',
    title: '[A heading for the things you notice about her]',
    lead: '[One sentence about something she probably does not know you see.]',
  },
  {
    id: 'odds',
    label: 'How lucky I am',
    sub: 'Numbers, sort of',
    title: '[A heading about how lucky this feels]',
    lead: '[One sentence about how unlikely meeting her was.]',
  },
  {
    id: 'wishes',
    label: 'My wishes for you',
    sub: 'For the year ahead',
    title: '[A heading for your wishes]',
    lead: '',
  },
];

// ---------- Star 1: the real sky at the moment you met ----------
// Real star, planet, Sun and Moon positions for this place and time, drawn
// at the top of "The first light". time: local time with its UTC offset.
// Remove `time` (or set it to '') to hide the chart.
export const skyMoment = {
  place: 'South Quarter, Cilandak',
  lat: -6.2915,
  lon: 106.7981,
  time: '2025-07-07T12:00:00+07:00',
  timeZone: 'Asia/Jakarta',
  note: '[One line of your own about the stars that were there when you met, even though the daylight hid them.]',
};

// ---------- Star 1: timeline (4 to 6 entries) ----------
// Merge or delete moments freely. The first one is YCC.
export const timeline = [
  {
    date: '[When]',
    title: 'The first encounter',
    text: '[At YCC: where was she standing when you first noticed her, and what was she doing? Two or three honest sentences.]',
  },
  {
    date: '[When]',
    title: 'The first conversation',
    text: '[What did you actually talk about? Quote a line if you remember one.]',
  },
  {
    date: '[When]',
    title: 'The moment things changed',
    text: '[The specific day you knew. What happened?]',
  },
  {
    date: '[When]',
    title: 'The little moments that made us closer',
    text: '[Two or three small, ordinary things only the two of you would recognise.]',
  },
  {
    date: 'Today',
    title: 'Today, and your new chapter',
    text: '[Where you both are now, and what this birthday starts for her.]',
  },
];

// ---------- Star 2: photos (3 to 6) ----------
// For every caption, answer one question: why do I remember this?
// image: 'photos/first-date.jpg'   focus: where to keep the crop, e.g. '50% 30%'
export const memories = [
  {
    date: '[When]',
    title: '[A title for this day]',
    caption: '[Why do I remember this?]',
    image: '',
    alt: '',
    focus: '50% 40%',
  },
  {
    date: '[When]',
    title: '[A title for this day]',
    caption: '[Why do I remember this?]',
    image: '',
    alt: '',
    focus: '50% 40%',
  },
  {
    date: '[When]',
    title: '[A title for this day]',
    caption: '[Why do I remember this?]',
    image: '',
    alt: '',
    focus: '50% 40%',
  },
];

// ---------- Star 3: what you notice about her (5 to 8) ----------
// label: 1 to 3 words. detail: a moment that shows it, not an adjective.
// photo and story are optional: leave '' to show only the detail.
export const love = [
  { label: '[Trait 1]', detail: '[A moment that shows it. Not "you are kind": when were you kind?]', photo: '', photoAlt: '', story: '' },
  { label: '[Trait 2]', detail: '[A moment that shows it]', photo: '', photoAlt: '', story: '' },
  { label: '[Trait 3]', detail: '[A moment that shows it]', photo: '', photoAlt: '', story: '' },
  { label: '[Trait 4]', detail: '[A moment that shows it]', photo: '', photoAlt: '', story: '' },
  { label: '[Trait 5]', detail: '[A moment that shows it]', photo: '', photoAlt: '', story: '' },
  { label: '[Trait 6]', detail: '[A moment that shows it]', photo: '', photoAlt: '', story: '' },
];

// ---------- Star 4: numbers ----------
// kind: 'days' counts from metDate automatically.
// Real counts only. If it is not a number you can stand behind, make it a sentence.
export const odds = {
  items: [
    { kind: 'days', label: 'days since we met', note: '[One line about what those days have been like.]' },
    { value: '[N]', label: '[something you count together]', note: '[One line about it.]' },
    { value: '[N]', label: '[another number only the two of you would know]', note: '' },
  ],
  disclaimer:
    'Not a scientific probability. Just my way of saying how unlikely and wonderful this feels.',
};

// ---------- Star 5: wishes (3) ----------
export const wishes = [
  { title: 'For your heart', text: '[What you hope she feels in the year ahead, specifically.]' },
  { title: 'For your dreams', text: '[Name the thing she is working hardest on.]' },
  {
    title: 'For who you are becoming',
    text: '[How you have watched her grow, and what you hope stays the same.]',
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
  // One last photo after the YCC line, e.g. your first photo together. '' hides it.
  photo: '',
  photoAlt: '',
  photoCaption: '[A few words under the photo]',
  focus: '50% 40%',
};

// ---------- Her reply (optional) ----------
// A button at the end of the letter that opens WhatsApp to you.
// phone: country code + number, digits only (e.g. 6281234567890). '' hides it.
export const reply = {
  phone: '',
  label: 'Tell me what you thought',
  message: '',
};

// ---------- Our song (optional) ----------
// Paste a Spotify track link (Share > Copy song link). It only loads when she taps it.
export const song = {
  title: 'Nothing',
  artist: 'Bruno Major',
  spotifyUrl: 'https://open.spotify.com/track/1lORkxEMmsCZqhoxcmk3A3?si=f39c550a6a784e0a',
};

// ---------- The letter ----------
export const letter = {
  title: 'Happy birthday,',
  paragraphs: [
    '[Start with something only you would say. Skip the greeting-card voice.]',
    '[What you appreciate about her, and what you are proud of her for.]',
    '[What you hope this next year brings her, and where you hope to be in it.]',
  ],
  signoff: '[Your sign-off, the way you end your messages to her]',
};

// ---------- Letter from the future (optional) ----------
// A sealed envelope under the letter. It opens on openOn (YYYY-MM-DD,
// her device's clock), so the site has to stay online until then.
// Leave paragraphs empty to hide it.
export const futureLetter = {
  openOn: '2027-11-01',
  title: 'For your next birthday',
  paragraphs: ['[A short letter for her to read on November 1, 2027.]'],
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

// ---------- Background music (optional) ----------
// Put the file in public/music/ and write 'music/ambient.mp3'. It only plays after she
// chooses "Begin with sound". '' turns music off and nothing loads.
// volume: 0 to 1, relative to the sound effects. credit: shown nowhere yet, keep it for your records.
export const music = {
  src: 'music/ambient.mp3',
  title: 'Clair de lune',
  artist: 'Claude Debussy',
  credit: '',
  volume: 0.35,
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
  expand: 'Show more of the story',
  collapse: 'Show more of the sky',
  nextStar: 'Next star',
  seeSky: 'See the whole sky',
  backToSky: 'Back to the sky',
  lovePrompt: 'Tap a star to read what I mean.',
  letterOpen: 'Read my letter',
  videoOpen: 'Watch my message',
  replay: 'Replay the ending',
  startOver: 'Start over',
  secretLabel: 'A faint star. Tap it.',
  photoHere: 'Your photo goes here',
  opened: 'opened',
  sealedUntil: 'Sealed until',
  openFuture: 'Open it',
  skyTitle: (place) => `The sky above ${place}`,
  skyAria: (place, when) => `Star chart of the sky above ${place} on ${when}`,
  skyDaylight: 'Real positions for that moment. The daylight hid every one of them.',
  songOpen: 'Play our song',
  beginSound: 'Begin with sound',
  beginQuiet: 'Begin quietly',
  gateTitle: (name) => `not yet, Sayang...`,
  gateWhen: 'This sky opens on November 1, at midnight.',
  gateStar: 'Not yet. Soon.',
  gateUnits: ['day', 'hour', 'minute', 'second'],
  soundOn: 'Sound on',
  soundOff: 'Sound off',
  previewMissing: (what) => `Preview only: add ${what} in content.js`,
};
