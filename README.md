# A Universe Written for You

Website ulang tahun: langit malam sebagai navigasi, 5 bintang cerita, satu rasi bintang di akhir yang membuka ucapan ulang tahun.
Isi website-nya bahasa Inggris. Dokumen ini bahasa Indonesia.

Desain lengkap + alasannya ada di [`DESIGN.md`](./DESIGN.md). Kalau ada referensi di `refs/` yang bertabrakan dengan DESIGN.md, **DESIGN.md yang menang**.

## Yang harus lu isi (urut)

Semua yang personal ada di satu file: **`src/content.js`**. Apa pun yang ada di `[kurung siku]` itu placeholder, ganti.

1. **Nama**: `herName`, `yourName`. Tanggal sudah diisi: `specialDate` = November 1, `metDate` = `2025-07-07` (dipakai buat hitung "berapa hari"; kalau dikosongin, baris hitungannya hilang).
2. **Kalimat pembuka** (`opening.lines`): tulis sendiri, di bawah ~12 kata, jangan sebut YCC dulu.
3. **Judul dan lead tiap bintang** (`stars[].title`, `stars[].lead`): semuanya prompt, tulis dengan kata-kata lu sendiri.
4. **Bintang 1, "The first light"** (`timeline`): lima momen, momen pertama soal YCC. Boleh dihapus atau digabung. Kalimat "I'm glad I attended YCC." **tidak** ditaruh di sini, dia baru muncul di akhir.
5. **Foto** (`memories`): tiap caption menjawab satu pertanyaan, *why do I remember this?* Taruh file di `public/photos/`, tulis di content sebagai `'photos/nama.jpg'` (tanpa `/` di depan, biar jalan di GitHub Pages). Foto yang belum ada otomatis tampil sebagai placeholder, tidak error.
   - Pakai foto asli, bukan foto stok. Satu foto yang spesifik lebih kena daripada sepuluh yang generik.
   - Landscape atau portrait bebas. Kalau wajahnya ke-crop aneh, atur `focus` (mis. `'50% 30%'`).
   - Kecilkan dulu (lebar ~1600px, di bawah 400 KB per foto) supaya kebuka cepat di data seluler kantor.
6. **Bintang "The way I see you"** (`love`): 5 sampai 8 hal kecil yang lu perhatiin dari dia (`label` 1 sampai 3 kata, `detail` satu momen). `photo` + `photoAlt` dan `story` opsional, tampil di bawah detail kalau diisi.
7. **`odds`**: angka-angka. Ada disclaimer "Not a scientific probability" supaya jujur dan lucu.
8. **`wishes`**, **`finale.note`** (satu kalimat jujur kenapa lu senang ikut YCC), **`letter`** (surat, termasuk sign-off).
9. **Letter from the future (opsional)** (`futureLetter`): surat pendek untuk ulang tahun berikutnya. Tampil sebagai amplop tersegel di bawah surat dan baru bisa dibuka mulai `openOn` (`2027-11-01`) menurut jam HP dia. **Situsnya harus tetap online sampai tanggal itu.** Kosongkan `paragraphs` untuk menyembunyikannya.
10. **Video singkat (opsional)**: taruh file di `public/video/message.mp4`, lalu isi `video.src = 'video/message.mp4'`. `poster` dan `captions` (`.vtt`) opsional. Kalau `src` dikosongkan, tombol videonya tidak muncul. Video tidak pernah autoplay.
   - Rekam vertikal, 20-40 detik, di bawah ~15 MB. Format MP4 (H.264) paling aman di semua HP.
11. **Langit asli** (`skyMoment`): sudah diisi South Quarter, Cilandak, 7 Juli 2025 jam 12.00 WIB. Ganti `time` kalau jamnya beda (format `2025-07-07T12:00:00+07:00`), dan tulis `note` sendiri.
12. **Foto terakhir di finale** (`finale.photo`, `photoAlt`, `photoCaption`): misalnya foto pertama kalian berdua.
13. **Balasan** (`reply.phone`): nomor WhatsApp lu, kode negara + angka saja, misalnya `6281234567890`. `reply.message` boleh diisi sebagai teks awal.
14. **Our song** (`song.spotifyUrl`): di Spotify, Share → Copy song link, lalu tempel. Isi juga `title` dan `artist`.
15. **Musik latar** (`music`): file ada di `public/music/ambient.mp3` (Clair de lune, Debussy). Ganti musiknya dengan menimpa file itu, atau taruh file lain di `public/music/` dan ubah `music.src` (mis. `'music/lagu-lain.mp3'`, tanpa `/` di depan). Ubah juga `title` dan `artist`. `credit` buat catatan sumber/lisensi rekamannya (belum ditampilkan di situs). `volume` (0 sampai 1) relatif terhadap sound effect. Kosongkan `src` kalau mau tanpa musik sama sekali; filenya tidak dimuat. Pakai rekaman domain publik atau yang lu punya haknya. Musik diputar loop, jadi file pendek pun tidak masalah, dan sebaiknya di bawah ~5 MB.
16. **`refs/`**: folder buat referensi desain lu. Tidak ikut ke website.

Sound effect dan musik tidak perlu diisi apa-apa. Dia memilih sendiri di layar pembuka: "Begin with sound" (efek + musik) atau "Begin quietly" (tanpa keduanya; mp3-nya tidak pernah diunduh), dan bisa diubah lewat ikon speaker di atas. Musik memudar saat lagu Spotify atau video diputar, dan menurun sedikit saat surat dibuka.

**Soal "Play our song":** embed Spotify hanya memutar lagu penuh kalau dia sedang login ke Spotify di browser itu. Kalau tidak, yang terdengar cuma preview 30 detik. Kalau lu mau dia dengar lagu penuh, bilang dia login dulu, atau kirim juga link lagunya.

Kalau mau update data bintang dari katalog: `node scripts/make-sky-data.mjs` (hasilnya `src/data/sky.json`, sudah ikut di repo).

Tips: isi dulu yang paling personal (surat, "how you see her", kalimat di finale). Teks yang kelihatan templat adalah satu-satunya cara website ini bisa terasa generik.

## Jalanin di komputer

Butuh Node **20.19 atau lebih baru**.

```bash
npm install
npm run dev        # development, buka alamat yang muncul
npm run build      # hasil jadi di folder dist/
VITE_PREVIEW=1 npm run build   # versi preview: placeholder untuk field kosong
npm run preview    # cek hasil build di http://localhost:4173
```

Progress (bintang yang sudah dibuka) tersimpan di browser masing-masing perangkat. Waktu lu ngetes dan mau mulai dari awal, tambah **`?reset`** di alamat, misalnya `http://localhost:4173/?reset`. Dia otomatis mulai dari nol di HP-nya sendiri, jadi lu tidak perlu ngapa-ngapain sebelum kirim link.

## Deploy

Hasil build memakai path relatif (`base: './'`), jadi jalan di dua-duanya tanpa setting tambahan.

### Cloudflare Pages (paling gampang)
1. Push project ini ke GitHub (repo private juga bisa).
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. Build command: `npm run build`. Output directory: `dist`. Environment variable `NODE_VERSION` = `22`.
4. Deploy. Lu dapat alamat `xxx.pages.dev`. Bisa diganti nama project-nya biar alamatnya manis.

Tanpa Git: `npm run build`, lalu drag-drop folder `dist/` di menu "Upload assets".

### GitHub Pages
1. Push ke GitHub.
2. Repo → Settings → Pages → Source: **GitHub Actions**.
3. Tambah file `.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - id: deployment
        uses: actions/deploy-pages@v4
```

Alamatnya jadi `https://username.github.io/nama-repo/`. Repo GitHub Pages versi gratis harus **public**, jadi kalau lu mau suratnya tidak bisa dibaca orang lain di GitHub, pakai Cloudflare Pages (repo boleh private). Halamannya sudah `noindex` supaya tidak muncul di Google, tapi siapa pun yang tahu linknya tetap bisa buka.

## Cek sebelum dikirim

- Buka di HP asli (bukan cuma emulator), portrait, sambil scroll langitnya. Semua label bintang terbaca?
- Buka di laptop, tes mouse trail, lalu buka satu bintang dengan keyboard (Tab → Enter → Esc).
- Tidak ada `[kurung siku]` yang tersisa: cari `[` di `src/content.js`.
- Foto kebuka, video jalan, dan tombol "Read my letter" kebuka dari menu.
- Mode hemat gerak (Reduce Motion di HP) tetap jalan: animasinya mati, kontennya tetap kebaca.
- Terakhir: lu sendiri jalanin dari awal sampai rasi bintangnya muncul. Kalau di salah satu titik lu merasa "ini kayak templat", tulis ulang teks di bagian itu.

## Struktur

```
src/content.js        semua teks, foto, tanggal (EDIT INI)
src/layout.js         posisi bintang di langit (HP dan desktop)
src/styles.css        design system (warna, tipografi, glow, animasi)
src/fx/               bintang jauh (Ambient) + pop/trail sentuhan (Touch)
src/components/       Intro, Sky, Panel, Stories, Finale, Letter, VideoModal
public/photos/        foto lu
public/video/         video pesan lu
public/music/         musik latar (ambient.mp3)
refs/                 referensi desain (tidak ikut build)
DESIGN.md             keputusan desain + alasan
docs/PLAN.md          rencana kerja
```
