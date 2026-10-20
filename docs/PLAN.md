# Rencana implementasi

Sumber kebenaran desain: `../DESIGN.md`. Dokumen ini hanya urutan kerja dan cara memeriksa.

## Arsitektur singkat

- React 19 + Vite 8, versi dikunci. Font di-host sendiri lewat `@fontsource-variable` (Fraunces untuk heading, Schibsted Grotesk untuk body), jadi tidak ada request ke pihak ketiga.
- Semua isi personal ada di `src/content.js`. Kode tidak berisi teks cerita.
- Langit = komponen HTML dengan bintang berupa tombol (target tap 56px) dan garis konstelasi dihitung dalam piksel dari posisi persen. Posisi HP dan desktop terpisah di `src/layout.js`.
- Dua canvas efek: `Ambient` (belakang konten: bintang tiga lapis, parallax, bintang jatuh) dan `Touch` (depan: ledakan sentuh dan jejak mouse). Keduanya berbagi satu gaya partikel dan satu bus kecil (`fx/bus.js`).
- Progres disimpan di `localStorage`, opening sekali per sesi di `sessionStorage`. Parameter `?reset` menghapus keduanya untuk uji coba.

## Urutan kerja

1. Fondasi: config, token desain, `content.js`, `layout.js`, store dan hooks.
2. Efek: `Ambient`, `Touch`, reduced motion.
3. Opening, langit, bintang, garis, bar dan menu.
4. Panel dan lima cerita (timeline, memories, love, odds, wishes) plus bintang rahasia.
5. Finale, surat, video, kunci fokus, tombol Escape.
6. Build, screenshot 390x844 dan 1440x900, perbaiki.
7. README, zip, serahkan.

## Cara memeriksa

- `npm run build` berhasil, `npm run preview` jalan.
- Screenshot opening, langit kosong, panel terbuka (tiap cerita), finale, surat, di HP dan desktop. Tidak ada bintang atau label terpotong, tidak ada scroll horizontal.
- Ukuran teks terhitung: isi di HP minimal 15px, UI minimal 12px.
- Reduced motion: tidak ada gerak, semua isi terbaca.
- Surat bisa dibuka tanpa mengunjungi bintang.
- Semua teks personal hanya di `content.js`.
- Uji "screenshot tanpa konteks" dari DESIGN.md bagian 2.
