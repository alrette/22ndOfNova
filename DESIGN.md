# A Universe Written for You — Dokumen Desain

Website ulang tahun untuk pacar. Satu langit malam yang jadi cara dia menjelajahi cerita kalian. Dokumen ini ditulis supaya builder bisa merencanakan dan membangun tanpa balik bertanya ke pembuatnya, kecuali untuk hal di bagian "Belum diputuskan".

Penanda: **[user]** = diputuskan atau dikatakan langsung oleh pembuat. **[call Claude]** = keputusan yang diambil saat menulis dokumen ini, belum disetujui eksplisit, boleh diubah. **[usul Claude, disetujui user]** = diusulkan Claude dan disetujui pembuat.

---

## 1. Intent dan alasannya

Ini hadiah ulang tahun dari pembuat untuk pacarnya. **[user]** Dia kemungkinan besar membukanya di HP saat di kantor. Pembuat bisa juga memintanya membuka ulang di laptop sepulang kerja, jadi HP dan desktop sama pentingnya. **[user]**

Perasaan yang dituju: tersentuh, happy, dan merasa dihargai. **[user]** Semua keputusan kecil (urutan bintang, panjang teks, kecepatan animasi, kapan efek muncul) diukur dari situ: apakah ini membuat dia merasa dilihat, atau cuma membuat website terlihat keren.

Konsep: langit malam navy yang luas. Satu bintang paling terang di tengah dengan kalimat pembuka. Setelah dia mulai, bintang-bintang lain muncul, masing-masing membuka satu bagian cerita. Bintang yang sudah dibuka menyala lebih terang. Di akhir, semua bintang yang pernah dikunjungi menyatu jadi satu konstelasi dan membuka ucapan ulang tahun. **[user]**

Judul kerja: *A Universe Written for You*. **[user]**

## 2. Goals, non-goals, anti-goals

### Goals
- Langit adalah mekanisme interaksi, bukan dekorasi. Tiap bintang membuka cerita. **[user]**
- Navigasi hybrid: ada alur cerita utama dari awal sampai surat penutup, tapi dia bebas membuka bintang mana pun kapan pun. **[user]**
- Pembukaan sinematik: layar gelap, satu bintang muncul, langit terbuka perlahan. **[user]**
- Nyaman dan bagus di HP dan di desktop, dengan layout yang memang berbeda, bukan sekadar mengecil. **[user]**
- Suasana dreamy dengan banyak glow. **[user]** Dreamy datang dari glow yang tertata, kedalaman, dan tempo pelan.
- Terasa personal: semua isi (nama, tanggal, foto, cerita, doa, surat) bisa diisi pembuat dengan mudah lewat satu file. **[user]**

### Non-goals
- Simulasi galaksi 3D. Langit adalah 2D (SVG dan canvas). **[user, lewat konsep yang disetujui]**
- Backend, akun, analytics, atau pelacakan apa pun. **[call Claude]**
- Musik atau suara yang bunyi otomatis. **[call Claude]** (Sound effect ada, tapi dia sendiri yang memilih "Begin with sound" atau "Begin quietly" di opening, lihat bagian 7.)
- Statistik hubungan nasional atau probabilitas yang diklaim sebagai fakta. Hanya angka personal, atau angka bersumber dengan penjelasan jujur. **[user, lewat konsep yang disetujui]**
- Mengunci surat atau doa di balik game yang sulit. Eksplorasi harus terasa menyenangkan, bukan tugas. **[user, lewat konsep yang disetujui]**

### Anti-goals (gagal walaupun secara teknis jalan)
**Desain yang terlihat seperti AI slop.** **[user]** Ini satu-satunya hal yang pembuat bilang tidak mau. Supaya bisa dicek, definisinya:

- Terlihat seperti template landing page atau SaaS: hero, tiga kartu simetris, footer standar.
- Semua section punya layout yang sama. Ritme layout harus berganti.
- Kartu rounded seragam dengan bayangan generik di mana-mana.
- Gradient ungu-biru generik, emoji sebagai dekorasi, ikon dekoratif tanpa arti.
- Kicker huruf kapital dengan letter-spacing lebar di atas setiap judul section. Pakai paling banyak di beberapa tempat yang memang perlu, bukan pola yang diulang di semua section.
- Pasangan font default yang paling umum dipakai LLM tanpa pertimbangan. Referensi memakai Playfair Display + DM Sans, dan itu tidak boleh diterima begitu saja (lihat bagian Tipografi).
- Glow yang menyebar ke semua elemen sampai teks susah dibaca dan hierarkinya hilang.
- Copy klise yang bisa ditempel ke website mana pun ("every moment with you is a gift"). Placeholder boleh generik, tapi strukturnya harus memaksa pembuat menulis hal spesifik.
- Test sederhana: screenshot satu section tanpa konteks. Kalau bisa dikira website template, gagal.

## 3. Constraints

- **Basis kode (update):** sejak 20 Oktober 2026 basisnya adalah build dari `universe.zip` (React 19 + Vite 8, Fraunces + Schibsted Grotesk), yang sudah mengikuti dokumen ini. Pekerjaan berikutnya melanjutkan kode itu. **[user mengirim zip, call Claude untuk melanjutkannya]**
- **Basis kode (awal):** proyek React + Vite yang sudah ada (file referensi: `App.jsx`, `content.js`, `styles.css`, `main.jsx`, `index.html`, `package.json`, `README.md`). Bangun di atasnya, jangan mulai dari nol. **[user memberi referensi, call Claude untuk membangun di atasnya]** Node 20.19 atau lebih baru (syarat Vite di lockfile). Dari basis kode lama dipertahankan: pola `content.js`, palet, ide isi tiap section, dan surat kertas krem. Ditulis ulang: mekanisme peta dan langit, starfield, mini game, header, tipografi, dan layout HP. Jika isi `refs/` bertentangan dengan keputusan **[user]** atau anti-goal di dokumen ini, dokumen ini menang dan builder mencatat konfliknya di README. **[call Claude]**
- **Mobile dan desktop setara.** Layar HP minimal 360px lebar, desktop sampai 1920px. **[user]**
- **Performa di HP biasa.** Dua canvas efek (satu di belakang konten, satu di depan), DPR dibatasi, animasi dijeda saat tab tidak terlihat, jumlah partikel dibatasi (lihat bagian Efek). **[call Claude]**
- **Reduced motion dihormati.** Jika perangkat meminta gerak dikurangi: tanpa drift, tanpa jejak, tanpa ledakan, tanpa bintang jatuh, bintang diam, transisi instan. Semua isi tetap bisa diakses. **[call Claude]**
- **Teks terbaca.** Teks isi minimal 15px di HP. Teks UI kecil minimal 12px. Referensi memakai 7-10px di banyak tempat, itu tidak boleh dipertahankan. Kontras teks terhadap latar minimal AA. **[call Claude]**
- **Isi personal di satu tempat:** semua teks, tanggal, nama, jalur foto, surat, dan pesan bintang rahasia ada di `src/content.js`. Referensi menaruh surat di dalam `App.jsx`, itu dipindahkan. **[call Claude]**
- **Folder aset dari pembuat.** Pembuat akan menaruh foto dan referensi desain lain di satu folder. Gunakan `public/photos/` untuk foto dan `refs/` untuk referensi desain. Builder membaca semua gambar di `refs/` sebelum menentukan arah visual dan merujuknya di dokumen ini. **[user menyebut folder, nama folder call Claude]**
- **Deploy statis.** Hasil `npm run build` adalah folder statis yang bisa dihosting di mana saja. Vite memakai `base: './'` supaya jalan di subpath mana pun, dan halaman diberi `noindex`. Pembuat menjalankan Node dan build sendiri lewat Claude Code, jadi README berisi langkah deploy yang jelas (GitHub Pages atau Cloudflare Pages, pilihan pembuat) dan cara mengisi `content.js`. Tidak ada gerbang password atau hitung mundur, karena tanpa backend itu hanya kosmetik. **[call Claude]** (Pengecualian: amplop "letter from the future" disegel berdasarkan tanggal, lihat Struktur pengalaman nomor 4. Segel itu ritual, bukan keamanan.)

## 4. Keputusan yang sudah diambil

### Visual
- **Palet** (dari referensi, cocok dengan arah awal): **[user]**
  - Midnight `#080F25` latar utama
  - Panel `#17264A` dan `#101A35` untuk panel cerita (solid, border halus)
  - Electric blue `#527DFF` interaksi dan bintang aktif
  - Light blue `#A9C0FF` aksen sekunder
  - Warm ivory `#F4F0E8` teks utama
  - Muted `#A6B2CE` teks sekunder
- **Tambahan [call Claude]:** amber hangat `#E8B04A` khusus untuk bintang yang sudah dibuka, supaya progres terlihat dan layar tidak biru semua. Soft violet `#B7A3E8` sangat jarang, hanya untuk satu atau dua sorotan. Electric blue `#527DFF` dipakai untuk elemen grafis, tombol, dan garis, bukan untuk teks kecil di atas panel `#17264A` (kontrasnya sekitar 4:1, di bawah AA); teks memakai light blue atau ivory. Status bintang dibedakan juga lewat ukuran dan kecerahan, bukan hanya warna. Palet tidak ditambah lagi (Moonlight `#DCE6FF` dari konteks awal sengaja tidak dipakai). **[usul Claude, disetujui user]**
- **Glow banyak, tapi berhierarki.** **[user minta banyak glow; hierarki call Claude]**
  1. Ambient: kabut biru statis di latar (radial gradient besar, lembut). Murah, selalu ada.
  2. Sumber cahaya: bintang, orbit, bintang yang baru dibuka, bintang selected, dan titik yang disentuh. Di sinilah glow paling kuat.
  3. Interaksi: ledakan dan jejak (lihat Efek). Muncul sesaat lalu hilang.
  - Teks display (judul serif, angka besar, nama bintang, kalimat penutup) boleh diberi glow tipis. **[user]** Teks isi tetap tajam tanpa glow. Foto tidak bercahaya.
  - Glow dibuat dengan radial gradient (di SVG dan canvas) atau box-shadow berlapis (di elemen HTML), bukan `filter: drop-shadow` pada banyak elemen SVG yang beranimasi, karena berat di HP. Pemakaian filter dibatasi pada elemen yang jumlahnya sedikit dan tidak terus beranimasi.
- **Tanpa blur sebagai fondasi.** Panel solid. Backdrop blur tidak dipakai untuk panel cerita. **[user, lewat konsep]** (referensi memakai backdrop blur di header dan backdrop surat, ganti dengan warna solid atau gelap semi-solid tanpa blur).
- **Satu motif visual konsisten:** konstelasi dan orbit. Garis tipis, titik kecil tajam. Muncul lagi di timeline, wishes, dan footer. **[user, lewat konsep]**

### Tipografi
- Heading memakai serif editorial dengan karakter, bukan Playfair Display secara default. Shortlist: Cormorant Garamond (hanya untuk headline besar, weight 500 ke atas, karena garisnya tipis di latar gelap), Instrument Serif, atau Fraunces. Body memakai sans bersih yang nyaman dibaca. Builder memilih final setelah membaca `refs/` dan boleh memakai skill frontend-design. **[call Claude; shortlist usul Claude, disetujui user]** Jika pembuat menyukai Playfair, itu bisa dipertahankan, cukup beri tahu.
- Italic hanya untuk kalimat emosional.
- Sentence case untuk heading. Kapital semua hanya untuk label kecil yang jumlahnya terbatas.

### Gerak dan efek
- **Bintang jauh, ambient.** **[user]** Tiga lapis kedalaman: yang jauh hampir diam dan sangat redup, yang dekat sedikit lebih cepat dan sedikit lebih terang. Melayang sangat pelan (kira-kira satu sampai dua piksel per detik), bergeser tipis mengikuti scroll (parallax ringan), sebagian berkelip pelan. Subtle, rapi, tapi menambah kedalaman. Redup di belakang konten, tidak pernah mengganggu keterbacaan teks. Tidak ada benda besar yang terbang melintas.
- **Pop saat disentuh di HP.** **[user]** Setiap sentuhan menghasilkan ledakan kecil debu bintang di titik sentuh. Tidak mengganggu scroll (listener pasif, `pointer-events: none` pada canvas).
- **Jejak mouse di desktop.** **[user]** Ekor debu bintang yang memudar mengikuti kursor. Hanya aktif jika perangkat memakai pointer halus (mouse atau trackpad).
- **Bintang jatuh jarang.** **[call Claude]** Sekitar sekali tiap setengah menit, tidak saat panel cerita terbuka. Boleh dibuang.
- **Bintang terbuka "menarik" bintang kecil di sekitarnya sebentar.** **[call Claude]** Penanda halus. Boleh dibuang.
- **Kamera bergeser halus ke bintang yang dipilih, khusus desktop.** Langit bergeser dan sedikit memperbesar ke arah bintang yang dibuka, lalu kembali saat panel ditutup. Tidak dipakai di HP (panel dari bawah dan scroll sudah cukup) dan mati saat reduced motion aktif. **[usul Claude, disetujui user]**
- **Transisi dramatis dan ornamen.** **[user: "lebih lebay", "magnificent", banyak hiasan untuk transisi]** Gerak besar hanya di momen perpindahan, bukan loop di mana-mana, supaya teks tetap terbaca:
  - Opening ke langit: bintang meledak terang, tiga cincin kejut, sinar silang, langit "warp" (bintang memanjang keluar dari titik tengah), lalu bintang-bintang menyala satu per satu dengan cincin kecil.
  - Membuka bintang: cincin dan debu amber dari bintang, cincin orbit berputar di bintang yang terbuka, garis cahaya menyapu tepi panel, judul tersibak dari kiri.
  - Bintang berikutnya: komet terbang di sepanjang garis konstelasi dan menggambar garisnya, kamera ikut bergeser di desktop.
  - Sebelum finale: setiap garis dan bintang menyala bergiliran, lalu ledakan cahaya besar, baru layar ucapan.
  - Finale: konstelasi yang sama dengan peta langit, orbit tergambar, cahaya kecil naik terus selama layar terbuka.
  - Surat: kertas membuka dari lipatan tengah, bingkai emas dengan bintang di keempat sudut.
  - Ornamen tetap: divider garis-bintang-garis, flourish konstelasi kecil, konstelasi samar di sudut opening.
  - Semua mati saat reduced motion. **[detail call Claude]**
- Efek hidup di dua canvas dengan gaya partikel yang sama. Canvas belakang (di bawah konten) menggambar bintang ambient dan bintang jatuh. Canvas depan (di atas konten, `pointer-events: none`) menggambar ledakan sentuh dan jejak mouse, dengan partikel kecil dan singkat supaya tidak mengganggu teks di bawahnya. Gaya partikel: debu bintang kecil berwarna electric blue dan ivory, dengan sedikit amber di sekitar bintang yang sudah dibuka.
- **Anggaran awal:** bintang ambient sekitar 60 di HP dan 140 di desktop. Partikel interaksi aktif maksimal sekitar 80, dihitung terpisah dari bintang ambient. Ledakan sentuh 8 sampai 12 partikel dengan umur sekitar 0,6 sampai 0,8 detik. Jejak mouse sekitar 20 titik yang memudar dalam sekitar 0,5 detik. Angka ini titik awal, builder menyesuaikan setelah diuji di HP.

### Struktur pengalaman
1. **Opening (sinematik).** Layar gelap, satu bintang terang muncul, orbit tergambar, lalu kalimat pembuka dan tombol mulai. Nama dia dan tanggal ulang tahunnya tampil kecil. Ada tombol kecil untuk melewati animasi, dan opening hanya diputar sekali per sesi browser. **[user: sinematik; skip dan aturan sesi call Claude]**
2. **Peta bintang (langit).** Lima bintang cerita ditambah satu bintang rahasia:
   - The first light: timeline dari awal kenal sampai sekarang. Garis menyambung satu per satu saat dibaca.
   - The memories: foto dan caption dalam layout editorial asimetris, bukan kartu seragam.
   - The way I see you: bintang pusat yang mewakili dia, titik-titik di sekelilingnya adalah hal yang pembuat kagumi. Tap satu titik untuk membaca. Tiap titik bisa punya foto atau cerita kecil opsional; jika kosong, hanya kalimatnya yang tampil. **[foto opsional: usul Claude, disetujui user]**
   - The odds of finding you: angka personal dan refleksi tentang keberuntungan. Ada label jujur bahwa ini bukan probabilitas ilmiah.
   - Wishes across the sky: tiga tema doa (hati, mimpi, diri yang sedang bertumbuh).
   - Bintang rahasia: bintang kecil yang berkelip samar dan baru bisa di-tap setelah tiga bintang cerita dibuka (ditemukan lewat tap, tanpa hover, supaya jalan di HP). Membuka pesan paling personal. Tidak dihitung dalam syarat final alignment. Ini menggantikan "mini game" terpisah di referensi, tebakan satu dari tiga bintang yang jawabannya selalu B. **[call Claude, disetujui secara umum saat membahas ruang lingkup]**
3. **Alur utama dan final alignment.** Alur utama adalah urutan 1 sampai 5; di dalam panel ada tombol "bintang berikutnya" yang mengikuti urutan itu, tapi dia bebas membuka bintang mana pun lewat tap. Final alignment terpicu saat kelima bintang cerita sudah dibuka, dalam urutan apa pun: garis antarbintang menyatu jadi satu konstelasi, lalu ucapan ulang tahun muncul di langit sebagai layar singkat (bukan panel), dengan kalimat penutup dari pembuat ("I'm glad I attended YCC", lihat bagian 7) dan tombol untuk membuka surat. Final alignment bisa diputar ulang lewat nav.
4. **Surat.** Selalu bisa dibuka lewat navigasi, tidak terkunci di balik apa pun. Efek dikurangi saat surat terbuka supaya pesannya yang terasa. Kertas krem di atas langit gelap (dari referensi, kontrasnya baik).
   - **Letter from the future (opsional).** Amplop kecil tersegel di bawah surat, berisi surat pendek untuk ulang tahun berikutnya. Sebelum tanggal `futureLetter.openOn`, amplop menampilkan tanggal bukanya (tanpa hitung mundur) dan tidak bisa dibuka; mulai tanggal itu, amplop bisa dibuka. Tanggal dicek dengan jam perangkat di zona waktu lokal, jadi segelnya bisa diakali, dan itu diterima karena fungsinya ritual, bukan keamanan. Jika `futureLetter.body` kosong, amplop tidak tampil. Konsekuensinya, situs harus tetap online sampai tanggal itu; README menyebutkannya. **[usul Claude, disetujui user]**
5. **Video singkat (opsional).** **[user: video, bukan voice note]** Video pesan dari pembuat, durasi yang disarankan 30 sampai 60 detik. Tidak pernah diputar otomatis, hanya jalan saat dia menekan play, karena dia mungkin sedang di kantor. Ada poster (satu frame atau foto), kontrol bawaan, `playsInline`, dan `preload="metadata"` supaya tidak menghabiskan kuota sebelum diputar. Mendukung file takarir `.vtt` opsional supaya bisa ditonton tanpa suara. Ukuran yang disarankan: MP4 (H.264 + AAC), 720p, di bawah sekitar 15 MB, karena HP butuh file yang ringan walau batas file GitHub Pages jauh lebih besar. Muncul di layar final alignment dan bisa dibuka dari nav. Surat tetap utuh tanpa video. Jika `videoMessage.src` kosong di `content.js`, bagian ini tidak tampil sama sekali. **[call Claude untuk penempatan, takarir, dan batas ukuran]**

### Layout per perangkat
- **HP (update):** panel cerita terbuka setinggi sekitar dua pertiga layar, dan langit di atasnya digeser supaya bintang yang dibuka terlihat. Panel membesar hampir penuh lewat handle atau saat dia mulai scroll. Di bawah bintang terakhir ada ruang langit kosong supaya bintang paling bawah juga bisa naik ke atas panel. **[call Claude]**
- **HP:** langit vertikal setinggi sekitar 1,5 sampai 2 layar yang di-scroll, dan scroll itu menjadi sumber parallax. Saat panel terbuka, langit di belakangnya diam. Lima bintang cerita, bintang rahasia, dan titik surat tersusun zig-zag dengan area tap minimal 44px di lebar 360px. Bintang di-tap. Cerita terbuka sebagai panel dari bawah yang bisa diperluas hampir penuh, dengan langit tetap terlihat di bagian atas. Konten panjang (timeline, foto) di-scroll di dalam panel. Tidak ada peta lebar yang dipotong. Referensi memakai SVG `viewBox 1000x600` dengan `preserveAspectRatio="xMidYMid slice"`, yang kemungkinan besar memotong bintang dan label di tepi layar sempit. Itu harus diganti dengan susunan yang dirancang untuk HP. **[call Claude]**
- **Desktop:** peta bintang luas di kiri, panel cerita di kanan, dan langit tetap terlihat. Langit satu layar penuh yang tidak di-scroll, parallax-nya mengikuti posisi pointer. Panel punya lebar normal sekitar 40 sampai 45 persen layar dan mode lebar untuk bagian yang butuh ruang (galeri foto, surat), di mana langit tetap terlihat sebagai strip gelap di kiri. Nav kecil untuk melompat antar bintang.
- Ritme layout panel berganti antar bintang (satu kolom besar, terbagi dua, timeline vertikal, asimetris), bukan satu pola yang diulang.

### Isi dan batasnya **[call Claude]**
- Timeline 4 sampai 6 entri. Placeholder-nya mengikuti lima momen: the first encounter (YCC), the first conversation, the moment things changed, the little moments that made us closer, dan today, and your new chapter. Pembuat boleh menghapus atau menggabungkan momen. **[lima momen dari konteks awal user, disetujui user]**
- Memories 3 sampai 6 foto, portrait atau landscape (layout harus tahan keduanya, `object-fit: cover` dengan titik fokus yang bisa diatur per foto). Komentar di `content.js` memandu setiap caption dengan pertanyaan "Why do I remember this?". Pertanyaan itu tidak tampil di situs. **[usul Claude, disetujui user]**
- The way I see you 5 sampai 8 titik. The odds 3 angka: hitungan hari sejak bertemu (dari `metDate`) dan dua angka personal lain. Wishes 3 tema.
- Kalimat pembuka maksimal sekitar 12 kata. Teks yang lebih panjang dari placeholder tidak boleh merusak layout. Field kosong tidak ditampilkan.
- Dua tanggal: `specialDate` (ulang tahun, tampil di opening) dan `metDate` (pertama bertemu, untuk hitungan hari). Tanggal ketiga, `futureLetter.openOn`, hanya untuk amplop tahun depan.
- Nilainya: ulang tahun 1 November 2026, pertama bertemu 7 Juli 2025, amplop dibuka 1 November 2027. **[user]**
- Copy yang ditulis AI dan terlihat final (kalimat pembuka, judul dan lead tiap cerita, catatan angka, sign-off) diubah jadi prompt dalam kurung siku supaya pembuat menulisnya sendiri. **[usul Claude, disetujui user]**
- Seluruh situs berbahasa Inggris, termasuk isi cerita, dan `<html lang="en">`. **[user]** Teks UI (tombol, label bintang, label jujur "not a scientific probability", aria-label) tetap dikumpulkan di objek `ui` di `content.js` supaya mudah diubah.

### Teknis
- React + Vite, komponen fungsional. SVG untuk bintang, garis konstelasi, dan animasi menggambar jalur. Dua canvas (belakang untuk ambient, depan untuk ledakan dan jejak). Framer Motion atau CSS untuk transisi panel, builder yang memilih berdasarkan kebutuhan. **[call Claude]**
- Perbaikan pada basis kode referensi: script `build` sekarang hanya `vite` (menjalankan dev server), ubah menjadi `vite build`. Versi dependensi memakai `latest`, kunci ke versi tertentu. Hapus tombol musik palsu. **[call Claude]**
- Aksesibilitas: setiap bintang adalah tombol dengan label, bisa dioperasikan dengan keyboard, fokus terlihat jelas, ada `lang` yang benar.
- Jumlah hari sejak bertemu dihitung dari `metDate` di `content.js` memakai zona waktu lokal perangkat, bukan angka yang diketik manual. **[call Claude]**
- Progres (bintang yang sudah dibuka) disimpan di `localStorage` dengan try/catch, jadi reload tidak menghapusnya. Progres tidak berpindah antar perangkat, dan itu diterima: di laptop dia mulai dari awal, dan nav tetap memungkinkan melompat ke mana pun. **[call Claude]**

## 5. Cara memeriksa hasilnya

Builder tidak boleh menyatakan selesai sebelum memeriksa ini:
- `npm run build` berhasil dan `npm run preview` menampilkan situs yang sama.
- Dirender di 390x844 dan 1440x900, dilihat langsung (screenshot), dan tidak ada bintang atau label terpotong, tidak ada scroll horizontal.
- Tidak ada teks di bawah 12px, dan teks isi minimal 15px di HP.
- Dengan reduced motion aktif, tidak ada animasi gerak, semua isi tetap terbaca.
- Surat bisa dibuka tanpa mengunjungi bintang lain.
- Amplop tahun depan tersegel sebelum `futureLetter.openOn` dan bisa dibuka sejak tanggal itu (diuji dengan mengganti tanggal), dan tidak tampil jika isinya kosong.
- Semua teks personal hanya ada di `content.js`.
- Uji "screenshot tanpa konteks" dari bagian 2.

## 6. Diserahkan ke builder

Posisi tepatnya tiap bintang, urutan visual peta, pemilihan font final, timing dan easing animasi, struktur komponen, redaksi placeholder (selama memaksa pembuat menulis hal spesifik), detail seni langit (kabut, orbit), serta cara menyusun layout editorial per bintang. Builder juga yang menyesuaikan anggaran partikel setelah diuji.

## 7. Putusan tambahan dari pembuat

- Bahasa: seluruh situs berbahasa Inggris. **[user]**
- Hosting: GitHub Pages atau Cloudflare Pages. **[user]** Keduanya statis. GitHub Pages melayani situs dari subpath `/nama-repo/`, jadi `base: './'` wajib; Cloudflare Pages melayani dari root. README berisi langkah singkat untuk keduanya.
- Video singkat menggantikan voice note. **[user]** Lihat Struktur pengalaman nomor 5.
- Kalimat yang ingin dia ingat: "I'm glad I attended YCC." **[user]** Kalimat ini adalah pembayaran emosional dari seluruh cerita. Builder menyusun copy dan pacing supaya kalimat ini baru muncul di akhir (layar final alignment, lalu diulang kecil di footer), dan bintang pertama (The first light) bercerita tentang YCC sehingga kalimat itu bermakna saat dibaca. Kalimat ini tidak dipakai di opening. **[call Claude]** "YCC" diperlakukan sebagai acara atau tempat pertama kali mereka bertemu. Itu tebakan, dan builder tidak mengarang kepanjangan atau ceritanya; detailnya diisi pembuat di `content.js`.
- **Tambahan 20 Oktober 2026** **[user setuju semuanya]**:
  - *Langit asli saat bertemu.* Di awal "The first light" tampil peta langit melingkar untuk South Quarter, Cilandak, 7 Juli 2025 sekitar pukul 12.00 WIB **[user]**: bintang asli (katalog d3-celestial, BSD-3), garis konstelasi, Bima Sakti, Matahari, Bulan, dan planet. Karena siang, ada keterangan jujur bahwa cahaya siang menyembunyikan semuanya. Lokasi dan jam bisa diubah di `skyMoment`. **[detail call Claude]**
  - *Foto terakhir* di finale setelah kalimat YCC (`finale.photo`), di samping teks pada layar lebar.
  - *Balasan via WhatsApp* di akhir surat (`reply.phone`).
  - *Our song*: tombol yang baru memuat embed Spotify saat ditekan (`song.spotifyUrl`). Lagu tidak di-upload sebagai file.
  - *Sound effect* disintesis Web Audio, tanpa file: tiap bintang punya nada dari satu skala pentatonik, komet berbunyi whoosh, warp, akor saat alignment, suara kertas di surat. Pilihan suara di opening, tombol on/off di bar, diingat di perangkat. Semua field opsional tersembunyi kalau kosong; build preview menampilkan placeholder.
- Nama dia Nova. **[user]** Di desktop kelima bintang membentuk huruf N, sesuai urutan cerita (naik di garis kiri, turun di diagonal, naik di garis kanan), dan konstelasi di finale menggambar N yang sama. Bentuk W sengaja dihindari karena bisa dibaca sebagai inisial orang lain. **[user]** Setelah N selesai, bintang tengahnya meledak jadi supernova (cincin, sinar, lalu tetap berpendar pelan). Hiasan kecil memakai lengkung, bukan zig-zag, supaya tidak terbaca sebagai huruf. **[call Claude, user minta supernova kalau tidak jelek]** Di HP langit tetap zig-zag vertikal karena di-scroll.
- Urutan penutup: kelima bintang terbuka, konstelasi menyatu, "I'm glad I attended YCC", lalu video (jika ada) dan tombol surat. Di dalam surat ada amplop untuk tahun depan, dan footer mengulang kalimat YCC dalam ukuran kecil. **[usul Claude, disetujui user]**
