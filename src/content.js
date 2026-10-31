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
// Her birthday as MM-DD. On that day (any year) the site greets her a little differently.
export const birthday = '11-01';

// The day you first met, as YYYY-MM-DD. Used to count the days.
export const metDate = '2025-07-07';

// ---------- Before her birthday ----------
// Until opensAt the link shows only a waiting screen with a countdown.
// If she has it open at that moment, the star ignites and the opening starts by itself.
// opensAt: an exact moment with its UTC offset (+07:00 is WIB). '' turns the wait off.
// secret: your way in to test early: add ?open=<secret> to the address. It lasts
//   until that browser tab closes. A ritual, not a lock: the words are in the page code.
// note: optional line under the countdown, from you. '' hides it.
// password: asked once the day arrives, then remembered on her device. Not case
//   or space sensitive. Also a ritual, not a lock. '' turns it off.
// hint: the question shown above the password field.
export const gate = {
  opensAt: '2026-11-01T00:00:00+07:00',
  secret: 'nduts0707',
  note: '',
  password: 'seirockya',
  hint: 'Ramen favorit aku di Puri dari brand apa? (no space)',
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
    title: 'It all began at YCC',
    lead: "An event yang bahkan tadinya aku gamau datengin karena banyak temen-temen lama aku. Which I knew, aku bakal sedih dan sakit hati when I see them.",
  },
  {
    id: 'moments',
    label: 'Moments I keep',
    sub: 'A few small days',
    title: "Days I'd live again",
    lead: "Hari-hari yang masih sering aku putar ulang di kepala, sayang.",
  },
  {
    id: 'you',
    label: 'The way I see you',
    sub: 'What I notice',
    title: 'You are perfect',
    lead: "I can't describe you with another word. Perfect is the only word that I can use to describe you. I always adore you, amazed with everything you do. I love everything tentang kamu, by.",
  },
  {
    id: 'odds',
    label: 'How lucky I am',
    sub: 'Numbers, sort of',
    title: 'The odds of us',
    lead: "Nih aku kasih beberapa angka kaya bagaimana hokinya kita sampe ketemu disini sayang WKWKWKWKWK",
  },
  {
    id: 'wishes',
    label: 'My wishes for you',
    sub: 'For the year ahead',
    title: "Some hopes yang aku harap beneran terjadi, AMIN",
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
  note: "But look at the stars that day, sayang. Ada banyak sekali bintang dan planet yang berkumpul di atas kepala kita hari itu. Even the Sun was there. It felt like they were all encouraging us to meet, as if they couldn't wait to witness our first interaction.",
};

// ---------- Star 1: the sky above her right now ----------
// A second chart at the end of "The first light": the real sky over this place
// at the moment she reads it. Set it to where she usually is. Remove `place` to hide it.
export const skyNow = {
  place: 'Jakarta',
  lat: -6.2088,
  lon: 106.8456,
  timeZone: 'Asia/Jakarta',
  note: "I hope you get a good star on your birthday, by!",
};

// ---------- Star 1: timeline (4 to 6 entries) ----------
// Merge or delete moments freely. The first one is YCC.
export const timeline = [
  {
    date: "July 7, 2025",
    title: "The first encounter",
    text: "It's funny, padahal kamu datang dengan teman-teman kamu, aku juga datang dengan teman aku. But somehow we ended up in the same study group! As if it's just a coincidence(?) I don't think so. Dan rasa penasaran sudah tumbuh di aku sejak pertama, since aku terpana with your beauty. AHAHAHAHA",
  },
  {
    date: "July 7, 2025",
    title: "The first conversation",
    text: "Damn, I was someone yang sangat takut untuk open up ke orang baru saat itu. I was just there to be an ex-AIESECer and see what's happening in the event. Ngobrol sama kamu di grup buat study group is our first interaction. We discussed some events that only existed in our heads (now we're discussing our dates HAHAHA). You were also very supportive, sayang, lending me your phone for the scripts, and you also gave me bakpia after the presentation. I'm happy for it!",
  },
  {
    date: "",
    title: "The moment things changed",
    text: "Demo tahun lalu, anehnya, jadi jembatan buat kita berdua, sayang. We started to talk tentang pemerintahan, lalu pindah ke WhatsApp, talked about Demon Slayer, ayam woku, susah tidur, callan sambil main Mobile Legends. And then one day I felt the urge to call you \"Sayang\". It was crazy, I don't know why... But I don't regret kenekatanku sih HAHAHAHAHA. After all the conversations and keasikan selama ngobrol, I could feel the warmth from you. Which I like. I wanna be with you...",
  },
  {
    date: "",
    title: "The little moments that made us closer",
    text: "After that we met in person. We became even closer since then. BluBlu jadi perantara kedekatan kita. AND YOU WERE SO CUTE. I really love to see you wear BluBlu. We had a great night at Manekineko. Who would've thought our first date would be at Manekineko??\n\nAfter that we went to Quantum juga ga sih, sayangg? Kita masakin satu sama lain ayam woku, main PS, and eventually we got even closer. We hugged, you lay down sambil aku pelukin, dan kita main Mario xixixixi\n\nFinally we went to the aquarium and watched a movie. And that's the day we started dating xixixixix",
  },
  {
    date: "Today",
    title: "Today, and your new chapter",
    text: "And now here we are, sayang. We are always around when we need each other, we love each other, we listen to each other. I'm really grateful to have you as my partner. 😘",
  },
];

// ---------- Star 2: photos (3 to 6) ----------
// For every caption, answer one question: why do I remember this?
// image: 'photos/first-date.jpg'   focus: where to keep the crop, e.g. '50% 30%'
export const memories = [
  {
    date: "October 3, 2025",
    title: "Our Manekineko date",
    caption: "Manekineko date tuh beneran jadi pembalik keadaan banget sih, byy. Pertama kali kita jalan berdua, and I was surprised kamu keliatan cantikkk banget. Aku langsung fall in love hari itu, dan rasanya mau deket terus sama kamu.",
    image: 'photos/moments/moment-1.jpg',
    alt: "Us at Manekineko, you in a blue cat hoodie blanket",
    focus: '50% 45%',
  },
  {
    date: "October 18, 2025",
    title: "The day I asked you",
    caption: "Damn, aku kepikiran terus seharian tentang bagaimana aku bisa nembak kamu, dan apakah aku udah bisa nembak kamu dengan keadaan aku sekarang. But at the end I did ask you to be my girlfriend, dan aku ga pernah nyesel dengan keputusan aku.",
    image: 'photos/moments/moment-2.jpg',
    alt: "Our silhouettes in front of the big aquarium tank",
    focus: '50% 60%',
  },
  {
    date: "",
    title: "Our first photobooth",
    caption: "Aku rasa ini photobooth pertama kita, sayang? Aku suka banget sama foto-foto itu, dan itu bikin aku jadi pengen punya foto sama kamu terus. TAPI AKU MASIH SERING LUPA. I hope aku punya lebih banyak foto yang bagus sama kamu ke depannya!!",
    image: 'photos/moments/moment-3.jpg',
    alt: "Us in cowboy hats, you kissing my cheek",
    focus: '50% 35%',
  },
  {
    date: "February 22, 2026",
    title: "Our favourite thing so far",
    caption: "Aku sampe sekarang kangen kita ice skating tau, byy... Tapi kadang aku masih takut jatoh, anjay anjay, and it's kinda expensive HAHAHA. Well, so I hope antara kita bisa nyari duit yang kenceng, atau nyari activity baru yang bisa kita nikmati ahihihihi.",
    image: 'photos/moments/moment-4.jpg',
    alt: "Us on the ice rink, arms out",
    focus: '50% 60%',
  },
  {
    date: "November 22, 2025",
    title: "Concert, we should do more",
    caption: "AKU MAU CONCERT LAGI. Aku suka banget nyanyi-nyanyi sama kamu, apalagi lagunya Sal Priadi dan Nadin Amizah. I really love the moments that we had there. Ayo kita nyari festival lagi, sayang!! Atau kita pilih satu artis yang mau kita tonton.",
    image: 'photos/moments/moment-5.jpg',
    alt: "A selfie of us on the grass at a festival",
    focus: '55% 22%',
  },
  {
    date: "August 23, 2026",
    title: "We look so cute and sassy here!",
    caption: "Damn, beneran deh: warna baju kita yang couple, gaya rambut kamu yang sassy, dan ekspresi kita yang tengil. Aku suka banget sama foto ini, and eventually it became one of my favourite photos!",
    image: 'photos/moments/moment-6.jpg',
    alt: "Us pouting at the camera in matching maroon",
    focus: '40% 50%',
  },
];

// ---------- Star 3: what you notice about her (5 to 8) ----------
// label: 1 to 3 words. detail: a moment that shows it, not an adjective.
// photo and story are optional: leave '' to show only the detail.
export const love = [
  {
    label: "Kind-hearted",
    detail: "Kamu adalah orang yang sangat baik, kamu ga pernah jahat sama orang-orang di sekitar kamu, by. Aku merasakan sekali kebaikan dari kamu. Kamu selalu membantu siapa pun itu selagi kamu bisa, kamu selalu berkata hal-hal yang baik, kamu bisa menyenangkan hati orang. You are bright, as long as I've observed you, sayang.",
    photo: '',
    photoAlt: '',
    story: '',
  },
  {
    label: "Supportive",
    detail: "Even saat kamu down, saat kamu lagi capek dan seharusnya kamu yang paling butuh untuk di-support, justru kamulah orang yang selalu support aku kapan pun itu. Sometimes aku tahu kamu lagi capek, tapi kamu tetap nyemangatin aku untuk segala hal yang aku lakukan. So I hope kamu juga bisa merasakan apa yang aku rasakan dari support kamu, byyy.",
    photo: '',
    photoAlt: '',
    story: '',
  },
  {
    label: "Funny",
    detail: "Kamu tuh orangnya sebenernya lucu banget, humoris, aku suka. Kalau ngelawak kadang kocak, gajelas, garing, but menurut aku hal-hal seperti itulah yang selalu bikin aku balik lagi, balik lagi ke kamu. Even mungkin belakangan ini kamu capek, jadi kamu ga terlalu mengeluarkan emosi kamu, I hope that I can see your smile and also your laugh every day hihi.",
    photo: '',
    photoAlt: '',
    story: '',
  },
  {
    label: "Strong, fr",
    detail: "Very strong, indeed. Kamu selalu mengusahakan hidup kamu dan keluarga kamu. Kamu kerja sangat keras dan mungkin hanya bisa menikmati sedikit dari apa yang kamu hasilkan. It must've been very heavy for you lately, apalagi dengan banyaknya tantangan yang lagi kamu hadapi dan aku yang jarang bisa nemenin kamu belakangan. But you're still able to stand, work, and keep going. Pasti berat, pasti capek, but kamu tetap keep going, and I know it must not have been easy. So kamu keren, cool, strong banget.",
    photo: '',
    photoAlt: '',
    story: '',
  },
  {
    label: "Smart",
    detail: "Kamu tuh pinter banget tau, by. Kamu selalu bilang kalau aku pinter, but kamu harus lihat seberapa pinter kamu sebenernya. Pinternya kamu tuh yang street smart gitu loh, dan aku rasa itu keren banget. Apalagi emotional intelligence, kamu tuh juaranya deh. Kadang kalau lagi sama orang baru, aku berharap aku bawa kamu biar ada yang memecah awkwardness dalam ngobrol hehehehe.",
    photo: '',
    photoAlt: '',
    story: '',
  },
  {
    label: "Sabarrr banget",
    detail: "Aku sering banget bikin kamu marah dan jengkel, tapi kamu selalu akhirnya maafin aku, akhirnya mau ngertiin aku, dan aku sangat-sangat senang dengan sifat kamu yang itu. AKU JUGA HARUS MEMPERBAIKI DIRI biar kamu ga harus tahan-tahan emosi terus. But dengan kamu yang bisa sabar kapan pun itu, aku jadi tenang, karena setiap masalah di hubungan kita bisa diselesaikan dengan berdiskusi, karena kita ga meledak satu sama lain hehehe.",
    photo: '',
    photoAlt: '',
    story: '',
  },
];

// ---------- Star 4: numbers ----------
// kind: 'days' counts from metDate automatically.
// Real counts only. If it is not a number you can stand behind, make it a sentence.
export const odds = {
  items: [
    { kind: 'days', label: 'days since we met', note: "demn by butuh campur tangan Tuhan" },
    {
      value: '400,000,000,000,000,000',
      label: 'to 1: the odds of you being born at all',
      note: "Bayangin aja by aku cari tau tentang kaya seberapa kemungkinan manusia itu lahir dan actually kecil banget anjir kaya kemungkinannya SEGITU, jadi kaya kecil banget ga sih kemungkinan dimana kita ketemu even dari kesempatan kita lahir dan HIDUP di this wowonomy LOLOLOOLOL",
    },
    {
      value: '285,000',
      label: 'to 1: the odds of finding your person on any given night',
      note: "Ini itungan orang by, dan dia ngitung kaya sesusah itu buat ketemu orang yang pas APALAGI INDONESIA KAN GEDE YA. kaya banyak banget hal yang mendorong kita ketemu, jadi di Indonesia, masuk binus, ikut ycc, satu group, chattan atau engga, BANYAKKK BANGET VARIABELNYA",
    },
  ],
};

// ---------- Star 5: wishes (3) ----------
export const wishes = [
  {
    title: "For your heart",
    text: "Tahun ini mungkin jadi tahun yang berat buat kamu, sayang. Banyak banget hal yang terjadi tahun ini. Aku selalu berharap nantinya kamu akhirnya menemukan ketenangan yang kamu butuhkan. Aku berharap kamu bisa selalu kuat dalam menghadapi semua (walau sambil nangis). Aku juga berharap kamu makin bisa bahagia, sayang.",
  },
  {
    title: "For your dreams",
    text: "Aku berharap kamu bisa mencapai mimpi kamu, sayang. Pekerjaan yang baik dengan lingkungan yang baik pula, hidup yang nyaman, dan eventually kamu bisa membantu orang-orang di sekitar kamu tanpa merasa terbebani. Aku berharap kamu bisa lebih menikmati hidup kamu dengan hasil kerja keras kamu sendiri, sayang. I love you.",
  },
  {
    title: "For who you are becoming",
    text: "Aku berharap traits yang sudah aku sebutkan sebelumnya tetap ada. Aku berharap kamu tetap jadi diri kamu, dan kamu ga menahan emosi kamu. Aku mau kamu jadi orang yang bisa menjadi diri sendiri tanpa menyembunyikan emosi yang ada. I always love you, by, and you have to know it hehehehehe.",
  },
];

// ---------- Star 5: tickets, after the wishes ----------
// Small promises she can cash in. With reply.phone filled in, tapping one opens
// WhatsApp to you with the message below; without it they are just to keep.
// Leave items empty to hide them.
export const tickets = {
  title: 'Three tickets, yours to use',
  items: [
    { title: 'One dinner, wherever you choose', detail: '' },
    { title: 'A day at KidZania', detail: "We've been talking about this so much." },
    { title: 'Anything you want', detail: "As long as I'm able to do it." },
  ],
  message: (title) => `I'm using my ticket: ${title}`,
};

// ---------- The faint star (appears after three stars are opened) ----------
export const secret = {
  title: 'You found it.',
  text: 'We know that our religion would be something yang selalu kita pusingin, but I will always fight for us and I hope that you always love me too and support me by my side. I Love You sayanggg!',
  image: '',
  alt: '',
};

// ---------- The film reel on the birthday screen (optional) ----------
// Photos that roll past on two strips of film under the YCC line, edge to edge:
// odd entries on the top strip, even ones on the bottom, in this order.
// Files live in public/photos/marquee/, numbered by the date they were taken.
// Frames are square: `focus` (default '50% 40%') keeps a face in the crop.
// alt: a few words for screen readers. An empty list hides the reel.
export const reel = [
  { image: 'photos/marquee/reel-01.jpg', alt: '' },
  { image: 'photos/marquee/reel-02.jpg', alt: '' },
  { image: 'photos/marquee/reel-03.jpg', alt: '' },
  { image: 'photos/marquee/reel-04.jpg', alt: '' },
  { image: 'photos/marquee/reel-05.jpg', alt: '' },
  { image: 'photos/marquee/reel-06.jpg', alt: '' },
  { image: 'photos/marquee/reel-07.jpg', alt: '' },
  { image: 'photos/marquee/reel-08.jpg', alt: '' },
  { image: 'photos/marquee/reel-09.jpg', alt: '' },
  { image: 'photos/marquee/reel-10.jpg', alt: '' },
  { image: 'photos/marquee/reel-11.jpg', alt: '' },
  { image: 'photos/marquee/reel-12.jpg', alt: '' },
  { image: 'photos/marquee/reel-13.jpg', alt: '' },
  { image: 'photos/marquee/reel-14.jpg', alt: '' },
  { image: 'photos/marquee/reel-15.jpg', alt: '' },
  { image: 'photos/marquee/reel-16.jpg', alt: '' },
  { image: 'photos/marquee/reel-17.jpg', alt: '' },
  { image: 'photos/marquee/reel-18.jpg', alt: '' },
  { image: 'photos/marquee/reel-19.jpg', alt: '' },
  { image: 'photos/marquee/reel-20.jpg', alt: '' },
  { image: 'photos/marquee/reel-21.jpg', alt: '' },
  { image: 'photos/marquee/reel-22.jpg', alt: '' },
];

// ---------- The ending (after all five stars) ----------
export const finale = {
  greeting: 'Happy birthday,',
  line: 'I’m glad I attended YCC.',
  note: 'Hence, I was able to meet you, my Love',
  // A photo tucked into the letter, after its last paragraph. '' hides it.
  photo: 'photos/moments/moment-2.jpg',
  photoAlt: 'Our silhouettes in front of the big aquarium tank',
  photoCaption: 'October 18, 2025. The day you said yes.',
  focus: '50% 40%',
};

// ---------- Her reply (optional) ----------
// A button at the end of the letter that opens WhatsApp to you.
// phone: country code + number, digits only (e.g. 6281234567890). '' hides it.
export const reply = {
  phone: '6281315347175',
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

// ---------- More songs (optional) ----------
// Songs that remind you of her, listed under our song on the birthday screen.
// An entry stays hidden until it has a Spotify link. why: one line, in your own words.
export const moreSongs = [
  {
    title: '[Song title]',
    artist: '[Artist]',
    spotifyUrl: '',
    why: '[Why this one makes you think of her.]',
  },
  {
    title: '[Song title]',
    artist: '[Artist]',
    spotifyUrl: '',
    why: '[Why this one makes you think of her.]',
  },
];

// ---------- The letter ----------
export const letter = {
  title: 'Happy birthday,',
  paragraphs: [
    'I hope that you like this little gift I prepared for you, sayang. In this big 22 yo, semoga semuanya jadi lebih baik, dan aku harap semua wish aku sebelumnya terwujud ya sayang ehehehehehehe',
  ],
  signoff: 'With Love,',
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

// ---------- "Open when..." envelopes (optional) ----------
// Small envelopes under the letter that she can open any time, as often as she likes.
// `when` finishes the sentence "Open when ...". Delete an entry, or leave its
// paragraphs empty, to hide it. Two or three is plenty.
export const openWhen = [
  {
    when: 'you’re tired',
    paragraphs: ['As I said, kamu adalah orang yang sangat kuat dan mungkin kamu ga sadar akan hal itu lewat pembicaraan yang pernah kita lakukan. Tapi as I say to you sayang, setiap hari adalah pembelajaran yang bisa kita ambil untuk jadi lebih baik lagi kedepannya. Dan aku yakin suatu hari nanti, matahari akan datang ke hidup kita lewat semua usaha dan juga ilmu yang sudah kita dapatkan dari semua rasa lelah dan juga pengalaman itu! So keep going sayang, aku akan selalu support kamu apapun yang terjadi!!'],
  },
  {
    when: 'you miss me',
    paragraphs: ['xixixixi sayang aku selalu suka kalau misalnya kamu lagi kangen sama aku, aku selalu merasa disayang dan ditunggu kehadirannya. i always wish that we can settle for our life in this young age dan akhirnya kita bisa hidup bersama secepatnya dimasa depan. If you miss me today, berarti kita lagi memperjuangkan itu. SO JUST REMEMBER THAT WE ARE WORKING FOR THE LIFE THAT WE WANT IN THE FUTURE. Aku akan tetap miss you, but dengan pemahaman yang berbeda dan motivasi biar ga usah kangen kangen lagi HAHAHAHAH'],
  },
  {
    when: 'you doubt yourself',
    paragraphs: ['aku rasa sih tidak perlu ada yang di ragukan dari diri kamu sayang. kamu itu cantik, lucu, pinter, rajin, masakannya enak. dan dari sudut pandang aku, kamu itu udah perfect dan banyak banget hal positif yang bisa aku lihat dari kamu. jadi berbanggalah dengan diri kamu sekarang. jangan pernah dengerin kata kata jelek dari orang lain, just be yourself. but eventually kalau kamu masih doubt yourself, berarti kamupun sadar kalau misalnya diri kamu bisa aja jadi lebih baik dari hari ini. SO, USE IT AS MOTIVATION JUGA YAAAA.'],
  },
];

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
  openWhen: 'Open when…',
  wishChance: 'A shooting star. Make a wish.',
  wishTitle: 'Make a wish',
  wishNote: 'It stays in your sky, only on this device.',
  wishPlaceholder: 'I wish…',
  wishSend: 'Send it to the sky',
  wishLater: 'Not now',
  wishStar: (text) => `Your wish: ${text}`,
  wishesTitle: (n) => `My wishes (${n})`,
  wishesSave: 'Save my wishes',
  wishesFile: 'My wishes, from the sky',
  skyTitle: (place) => `The sky above ${place}`,
  skyAria: (place, when) => `Star chart of the sky above ${place} on ${when}`,
  skyDaylight: 'Real positions for that moment. The daylight hid every one of them.',
  songOpen: 'Play our song',
  moreSongs: 'Songs that remind me of you',
  skyNowTitle: (place) => `The sky above ${place}, right now`,
  skyNowDaylight: 'Daylight hides them right now. They are all still there.',
  brandToday: (name) => `Happy birthday, ${name}`,
  todayLine: 'Today is your day',
  ticking: (h, m, s) => `and ${h} ${h === 1 ? 'hour' : 'hours'}, ${m} ${m === 1 ? 'minute' : 'minutes'}, ${s} ${s === 1 ? 'second' : 'seconds'}`,
  ticketUse: 'Use it',
  beginSound: 'Begin with sound',
  beginQuiet: 'Begin quietly',
  gateTitle: (name) => `not yet, Sayang...`,
  gateWhen: 'This sky opens on November 1, at midnight.',
  gateStar: 'Not yet. Soon.',
  gateUnits: ['day', 'hour', 'minute', 'second'],
  passTitle: 'One last thing, Sayang...',
  passPlaceholder: 'Your answer',
  passGo: 'Open',
  passWrong: 'Hmm, not that one. Try again?',
  soundOn: 'Sound on',
  soundOff: 'Sound off',
  previewMissing: (what) => `Preview only: add ${what} in content.js`,
};
