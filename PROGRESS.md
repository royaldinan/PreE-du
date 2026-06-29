# PROGRESS.md — Sesi Big Update PreE-du

> Dokumen ini ditulis di akhir sesi sebagai pegangan untuk sesi
> selanjutnya. Berisi apa yang sudah dikerjakan, apa yang masih
> tersisa, dan keputusan desain yang diambil supaya tidak diulang
> dari nol atau dibatalkan tanpa sengaja.

**Tanggal sesi:** 28-29 Juni 2026
**Branch:** `main` (push langsung, tidak lewat PR)
**Commit range sesi ini:** `a846d71` .. `1b05da7` (10 commit)

---

## 0. TL;DR — kalau cuma baca satu bagian, baca ini

1. **Build production yang gagal total sudah diperbaiki** (`framer-motion` version mismatch). Ini paling kritis — kalau build gagal, deploy Vercel juga gagal/stale.
2. **3 bug "jawaban tidak ada yang benar" yang dilaporkan user sudah ditemukan dan diperbaiki**, semuanya di game dengan logika acak/generatif: `PatternGame`, `PrototypeGame`, `AlgorithmGame`. Sudah diverifikasi lewat simulasi ribuan kali (lihat bagian 2).
3. **Visual sudah di-upgrade besar-besaran**: animasi framer-motion di semua 9 game + semua halaman, confetti, background bertema per-track, ornamen SVG dekoratif (awan/bintang/balon/pelangi), favicon custom, mascot lebih ekspresif.
4. **Repo hygiene diperbaiki**: `node_modules` (8110 file) yang ke-track di git sudah di-untrack.
5. **Belum selesai / belum diaudit**: lihat bagian 6 "Yang Belum Dikerjakan".

---

## 1. Konteks Awal & Permintaan User

User minta dua hal besar dalam satu sesi:

1. **Visual overhaul besar-besaran** — bikin tampilan lebih premium & profesional, tapi tema tetap untuk anak-anak. Animasi bebas pakai library apa saja (tidak terbatas CSS), tambah gambar/ornamen yang bikin anak-anak senang.
2. **Debug menyeluruh** — user melaporkan: (a) ada level dengan pola yang "tidak ada jawaban benar", (b) ada "kunci jawaban salah", (c) di semua game "soal muncul dua kali", (d) kemungkinan ada bug-bug lain yang belum ketahuan, di topik manapun.

User juga minta: kerjakan sesuai kapasitas chat ini, push langsung ke GitHub (bukan zip), bebas pakai library apa saja, dan tulis dokumen progress ini di akhir.

**Delivery method:** push langsung ke `https://github.com/royaldinan/PreE-du` pakai Personal Access Token yang diberikan user di chat. Token TIDAK disimpan permanen di git config (dipakai sekali per push lewat `http.extraheader`, lihat bagian 7). User sudah diminta untuk **revoke token ini setelah sesi selesai** demi keamanan.

---

## 2. Bug yang Ditemukan & Diperbaiki (urutan kronologis)

### 2.1 Build production gagal total — KRITIS
**File:** `frontend/package.json`
**Masalah:** `framer-motion@11.18.2` tidak compatible dengan `motion-dom@12.41.0` yang ter-install (rollup error saat `vite build`, resolusi modul internal berubah antar versi major).
**Fix:** upgrade `framer-motion` ke `^12.23.24` supaya versi sejalan dengan `motion-dom`.
**Cara verifikasi:** `cd frontend && npm install && npm run build` — harus selesai tanpa error, output `dist/assets/index-*.js`.

### 2.2 PatternGame — jawaban benar dihitung salah
**File:** `frontend/src/games/PatternGame.jsx`
**Masalah:** `pattern` di-set sebagai `newPattern.slice(0, -1)` (pattern yang sudah dipotong), tapi `correctAnswer` dihitung dari `pattern[pattern.length - 1]` — yaitu elemen terakhir dari pattern yang SUDAH terpotong, bukan elemen yang sebenarnya hilang/ditanyakan. Akibatnya jawaban yang seharusnya benar ditolak.
**Fix:** `correctAnswer` sekarang disimpan eksplisit di state (`useState`) saat generate round, bukan di-derive ulang dari `pattern` yang sudah dimodifikasi. Sekaligus ditambah: `shuffle()` non-mutating (Fisher-Yates di atas salinan array, bukan `.sort(() => 0.5 - Math.random())` yang bias), dan exclusion supaya 3-shape-set tidak identik dengan ronde sebelumnya (mengurangi rasa "soal mirip berulang").
**Verifikasi:** simulasi 1000x (10 ronde tiap simulasi) — 0 bug, 0 pola identik berturut-turut dari 9000 transisi. Script ada di histori sesi ini (sudah dihapus dari `/tmp`, bisa ditulis ulang kalau perlu re-run).

### 2.3 PrototypeGame — validasi solusi tidak berhubungan dengan soal
**File:** `frontend/src/games/PrototypeGame.jsx`
**Masalah:** `checkSolution()` memvalidasi `current.parts.indexOf(p) < 3` — ini cuma cek apakah part ada di 3 index pertama array `parts`, TIDAK ADA hubungan dengan `needed` (kata kunci solusi). Akibatnya 3 pilihan pertama APA PUN selalu dianggap "benar" secara kebetulan, sementara mekanisme `needed` (string match `'📚 Buku'.includes('alas')`, dll) tidak pernah match karena emoji+label tidak mengandung kata-kata itu.
**Fix:** redesain total dengan mapping eksplisit `correctParts: [...]` per level (5 level), divalidasi dengan `selectedParts.filter(p => current.correctParts.includes(p)).length >= 2`. Setiap level diverifikasi punya kombinasi yang valid untuk menang (lihat 2.5).

### 2.4 AlgorithmGame — target kadang TIDAK BISA DICAPAI (bug paling kritis untuk laporan user)
**File:** `frontend/src/games/AlgorithmGame.jsx`
**Masalah:** obstacle ditempatkan murni acak tanpa pernah memverifikasi apakah target masih reachable dari titik start `(0,0)`. Simulasi 10.000 percobaan menunjukkan **~2% kemunculan level** (terutama level 5, target di pojok grid `(4,4)`) menghasilkan obstacle yang mengepung target dari segala sisi — TIDAK ADA urutan instruksi apa pun yang bisa menang.
**Fix:** tambah BFS reachability check (`isReachable(target, obstacles)`). Setiap kandidat susunan obstacle divalidasi BFS sebelum dipakai; kalau tidak reachable, di-generate ulang (maks 50 percobaan, fallback ke grid tanpa obstacle).
**Verifikasi:** simulasi 25.000 percobaan (5000 trial × 5 level) setelah fix — **0 unreachable case** (sebelumnya 208/10.000 ≈ 2%).
**Catatan:** ini KEMUNGKINAN BESAR adalah bug yang dimaksud user sebagai "level yang gak ada jawaban benar". Karena bug-nya probabilistik (~2%), user mungkin tidak selalu mengalaminya tiap kali main, yang menjelaskan kenapa terdengar seperti "kadang-kadang".

### 2.5 Bug-bug lebih kecil (visual & UX)
- **`Mascot.jsx`** tidak menerima prop `size` sama sekali, padahal dipanggil dengan `size="large"/"medium"` di SEMUA game & halaman. Mascot selalu render ukuran sama (140px fixed). Fix: tambah `SIZE_MAP` dan terapkan ke `<svg width/height>`.
- **`AnimatedBackground.jsx`**: typo `Math.random` (referensi fungsi, bukan dipanggil) di `speedY: (Math.random - 0.5) * 2` membuat semua partikel punya `speedY = NaN` — gerakan vertikal mati total sejak awal. Fix: `Math.random()`.
- **`chunky-card` & `float-animation`**: dipakai di `TrackCard.jsx`/`TrackOverview.jsx` tapi class-nya HANYA ada di `App.css`, yang **tidak pernah di-import** di manapun (`main.jsx`/`App.jsx` cuma import `index.css`). Efek visual ini tidak pernah muncul di browser sejak project dibuat. Fix: pindahkan definisi ke `index.css`, hapus `App.css`.
- **`Trophy.jsx`**: breakdown bintang per-track menampilkan `progress.computational.topics.sorting?.stars` (topic PERTAMA) diulang 3x sebagai representasi "track stars" — bukan gabungan 3 topik yang sebenarnya. Fix: ganti jadi star-row 9-bintang yang benar-benar menjumlahkan ketiga topik.
- **`AnimatedBackground` tidak pernah dipasang dengan prop `type`**: sistem warna per-track (`computational`/`critical`/`design`) sudah ditulis di komponennya sejak awal tapi TIDAK PERNAH terpakai karena dipasang sekali secara global tanpa prop di `App.jsx`. Fix: restrukturisasi `App.jsx` — background sekarang baca route aktif via `useLocation()` dan kirim tema yang sesuai.
- **`canvas-confetti`**: ada di `package.json` sejak awal tapi TIDAK PERNAH dipakai di kode manapun. Fix: dibuat `utils/confetti.js` (3 fungsi: `celebrateWin`, `celebrateBigWin`, `celebrateCorrectAnswer`), dipasang di semua game + `TopicPage.jsx` + `Trophy.jsx`.
- **`IdeationGame.jsx`**: problem yang ditampilkan SELALU index 0 ("Tas sekolah terlalu berat") karena `currentRound` tidak pernah bertambah selama sesi bermain (state itu cuma dipakai untuk index tapi tidak pernah di-`setCurrentRound`). Fix: pilih `problemIndex` acak sekali per sesi/reset.
- **`OddOneOutGame`, `FactOpinionGame`, `CauseEffectGame`, `EmpathyGame`**: tidak ada `lockChoice` state, jadi user bisa klik berkali-kali/ganda saat transisi feedback sedang berjalan (sebelum pindah ke ronde berikutnya). Fix: tambah `lockChoice` di keempat game, konsisten dengan pola yang sudah ada di `PatternGame`/`SortingGame`.
- **`index.html`**: favicon menunjuk ke `/vite.svg` yang sebenarnya TIDAK ADA file-nya (404 diam-diam), dan ada duplikasi font loading (Fredoka One via `<link>` manual vs Fredoka via `index.css` import). Fix: buat `public/favicon.svg` bertema mascot, bersihkan duplikasi font.

### 2.6 Repo hygiene — node_modules ter-track di git
**Masalah:** 8110 file di `frontend/node_modules` ter-track di git index meskipun `.gitignore` root sudah benar berisi `node_modules/`. Kemungkinan dari commit sebelum `.gitignore` diperbarui, tidak pernah di-`git rm --cached`.
**Fix:** `git rm -r --cached frontend/node_modules` (perlu 2 percobaan — percobaan pertama gagal karena `git reset` yang dijalankan di antara `rm --cached` dan `commit` membatalkan staging area; lihat commit `3aa8554` vs `e97aa13` untuk detail).
**Dampak:** ukuran repo jauh lebih kecil, clone/push lebih cepat, dan menghindari potensi konflik install ulang dependency di masa depan.

---

## 3. Verifikasi Sistematis yang Sudah Dilakukan

Karena sandbox sesi ini tidak punya browser untuk klik-klik manual, semua game divalidasi lewat **simulasi logika murni** (re-implementasi logic game di Node.js script terpisah, dijalankan ribuan kali, lalu dihapus dari `/tmp` setelah selesai — script TIDAK disimpan di repo, kalau perlu re-run harus ditulis ulang berdasarkan logic terbaru di file game):

| Game | Yang divalidasi | Hasil |
|---|---|---|
| PatternGame | `answer` selalu ada di `options`, tidak ada duplikat di `options`, tidak ada pola identik berturut-turut | 1000 simulasi (9000 transisi), 0 bug |
| PrototypeGame | Setiap dari 5 level punya kombinasi 3-pilihan yang valid untuk menang | Semua 5 level: 7/10 kombinasi valid |
| AlgorithmGame | Target selalu reachable dari (0,0) via BFS, untuk semua 5 level | SEBELUM fix: 208/10.000 unreachable (~2%). SESUDAH fix: 0/25.000 |
| SortingGame | Tidak ada duplikat angka per ronde, logic `expectedNext` selalu benar untuk player yang main sempurna | 2000 simulasi × 5 ronde, 0 bug |
| OddOneOutGame, FactOpinionGame, CauseEffectGame, EmpathyGame | Semua index `correct` dalam batas array, tidak ada out-of-bounds | Manual check semua data statis, 0 bug |

**Yang TIDAK divalidasi dengan cara ini** (karena sifatnya lebih ke UX/visual daripada logic murni): `AlgorithmRealLife.jsx` dan 8 file `reallife/*.jsx` lain — ini konten statis (teks instruksi aktivitas dunia nyata untuk dicetak), tidak ada logic yang bisa "salah" dalam arti matematis. Sudah dibaca sekilas (`SortingRealLife.jsx` sebagai sampel), terlihat sehat, tapi tidak ada audit mendalam ke semua 9 file.

---

## 4. Visual Upgrade — Ringkasan per Tahap

Semua tahap di bawah sudah di-push ke `main`. Library baru yang dipakai: **framer-motion** (sudah ada, di-upgrade versinya) dan **canvas-confetti** (sudah ada di `package.json`, baru sekarang benar-benar dipakai). Tidak ada library baru lain yang ditambahkan — semua animasi premium dibangun dari yang sudah tersedia + custom SVG.

- **Tahap 1** (`1140afc`): `AnimatedBackground` jadi theme-aware per track + ornamen ramah anak (awan/balon/bintang berkedip) selain shape geometris. Favicon custom. `utils/confetti.js` dibuat & dipasang di `TopicPage`. `TopicPage` dapat `AnimatePresence` untuk transisi antar tahap (game → jembatan → real life → selesai).
- **Tahap 2** (`441016a`): `Home.jsx`, `TrackCard.jsx`, `TrackOverview.jsx` — entrance animation, hover/tap motion, stagger.
- **Tahap 3** (`d3c3273`): `SortingGame`, `AlgorithmGame`, `OddOneOutGame`, `FactOpinionGame`, `CauseEffectGame` — motion + confetti + `lockChoice` di game yang belum punya.
- **Tahap 4** (`c14c843`): `EmpathyGame`, `IdeationGame` — motion + confetti, plus fix problem index yang stuck (lihat 2.5).
- **Tahap 5** (`1b05da7`): `components/Decorations.jsx` baru — `CloudDecoration`, `StarSparkle`, `BalloonDecoration`, `RainbowArc`. Dipasang di header `Home.jsx`, completion screen `TopicPage.jsx`, dan `Trophy.jsx` (pelangi muncul khusus saat `totalStars >= 18`).
- **Mascot** (`190da87`): SVG sama (karakter rubah/kucing oranye), tapi sekarang benar-benar merespons prop `size`, ekspresi wajah beda untuk mood `sad` (mata melengkung ke bawah) vs `happy` (pipi merona + mulut lebar) vs default.

**Keputusan desain penting:** confetti BESAR (`celebrateBigWin`/`celebrateWin`) HANYA dipanggil dari `TopicPage.jsx` (di `handleGameComplete`, dipanggil oleh `onComplete()` semua game) dan `Trophy.jsx` (saat 27 bintang). Di DALAM tiap game, hanya `celebrateCorrectAnswer` (confetti kecil) yang dipanggil per jawaban benar. Ini supaya confetti besar tidak muncul dua kali (sempat jadi bug waktu `IdeationGame` punya `celebrateWin` sendiri + `TopicPage` juga punya — sudah dihapus duplikatnya).

---

## 5. Struktur Project (untuk orientasi cepat sesi berikutnya)

```
frontend/
  src/
    games/           <- 9 file, satu per topic (game interaktif)
    reallife/         <- 9 file, satu per topic (aktivitas cetak dunia nyata)
    pages/            <- Home, TrackOverview, TopicPage, Trophy
    components/        <- Mascot, TrackCard, ProgressBar, SoundButton,
                          AnimatedBackground, Decorations (baru)
    utils/             <- localStorage.js (progress), audioManager.js (BGM/SFX),
                          confetti.js (baru)
    index.css          <- SEMUA styling global (App.css sudah dihapus,
                          jangan dibuat ulang kecuali memang akan di-import)
  public/
    sounds/            <- 9 file .mp3 (BGM + SFX), nama case-sensitive!
    favicon.svg        <- baru, ganti vite.svg yang tidak ada filenya
  README_AUDIO.md      <- dokumentasi lengkap sistem audio dari sesi
                          sebelumnya, masih akurat dan berguna
```

**Pola yang konsisten di semua 9 game** (kalau menambah game baru, ikuti pola ini):
- State: `currentRound`/`currentLevel`, `score`, `gameComplete`, `feedback`, `mascotMood`, `lockChoice`
- `lockChoice` WAJIB ada untuk mencegah klik ganda saat transisi
- Formula bintang harus bisa hasilkan 0 (lihat `README_AUDIO.md` bagian 5 untuk kenapa ini penting — sebelum sesi sebelumnya, formula lama tidak bisa hasilkan 0 sama sekali)
- Konfetti kecil (`celebrateCorrectAnswer`) di jawaban benar, JANGAN tambah confetti besar di dalam game (sudah dihandle `TopicPage`)
- `framer-motion` untuk semua animasi (entrance, hover, tap, AnimatePresence untuk feedback)

---

## 6. Yang Belum Dikerjakan / Perlu Perhatian Sesi Berikutnya

1. **9 file `reallife/*.jsx`** belum di-polish visual sama sekali (masih styling lama, belum dapat `chunky-card`/motion). Sudah dicek satu sample (`SortingRealLife.jsx`) dan logic-nya sehat (konten statis), tapi belum disentuh secara visual.
2. **`localStorage.js`**: kalau di masa depan struktur `DEFAULT_PROGRESS` berubah (tambah field baru), data lama yang sudah tersimpan di browser user (`JSON.parse` hasil lama) bisa punya struktur yang tidak lengkap dan menyebabkan crash di `updateTopicProgress` (akses `progress[track].topics[topic]` yang `undefined`). Belum ada migration/defensive check untuk ini — bukan bug yang ada SEKARANG, tapi risiko ke depan.
3. **`vite.config.js`** masih punya `optimizeDeps`/`commonjsOptions` khusus untuk `framer-motion`/`motion-dom` yang kemungkinan ditambahkan sesi sebelumnya untuk coba fix build error yang sama (yang sekarang sudah diperbaiki dari root cause-nya, yaitu version mismatch). Config ini tidak berbahaya untuk dibiarkan, tapi secara teknis sudah tidak diperlukan lagi — bisa dibersihkan kalau mau strict.
4. **Belum ada smoke-test interaktif di browser sungguhan** (sandbox sesi ini tidak punya browser GUI). Semua game divalidasi lewat simulasi logic murni (lihat bagian 3), build production juga sudah diverifikasi sukses berkali-kali, tapi belum ada yang benar-benar klak-klik di Chrome/Firefox. **Rekomendasi kuat:** setelah Vercel re-deploy dari push terakhir, user (atau sesi berikutnya) sebaiknya benar-benar mainkan semua 9 game di `pre-edu-psi.vercel.app` untuk memastikan tidak ada regresi visual yang lolos dari simulasi logic.
5. **Belum dicek:** apakah Vercel auto-deploy benar-benar ter-trigger dari push terakhir dan sukses. Build lokal sudah diverifikasi sukses berkali-kali di sandbox, tapi environment Vercel bisa punya perbedaan kecil (Node version, dll) yang tidak tertangkap di sini. **Cek dashboard Vercel project setelah membaca dokumen ini.**
6. **Ornamen dekoratif (`Decorations.jsx`)** baru dipasang di 3 tempat (`Home`, `TopicPage` completion, `Trophy`). Belum dipasang di `TrackOverview.jsx` atau di dalam game-game itu sendiri — kalau user masih merasa kurang "ramai"/dekoratif, di situ tempat yang masuk akal untuk ditambah selanjutnya.
7. **Tidak ada perubahan pada 9 file PDF/MD dokumen** (`PRD_PreEdu_*.pdf`, `PreEdu_Emergent_Prompt.md`, dll) di root repo — sesi ini fokus murni ke `frontend/`. Kalau dokumen itu juga perlu di-update mengikuti perubahan, itu belum dilakukan.

---

## 7. Catatan Teknis Operasional (kalau sesi berikutnya juga push manual)

- Push dilakukan dengan `git -c credential.helper= -c http.https://github.com/.extraheader="Authorization: Basic $(echo -n "USERNAME:TOKEN" | base64 -w0)" push origin main` — token TIDAK pernah ditulis ke `git remote -v` atau `.git/config` secara permanen, hanya dipakai sekali per command lewat header HTTP.
- **Token PAT yang dipakai sesi ini sudah terekspos di riwayat chat** — sangat disarankan untuk di-revoke dan diganti token baru sebelum sesi berikutnya, jangan dipakai ulang.
- Build command: `cd frontend && npm run build` (Vite 7). Selalu jalankan ini SEBELUM commit kalau mengubah apa pun di `src/` — beberapa bug di sesi ini (terutama 2.1) baru ketahuan justru karena build dijalankan, bukan dari baca kode saja.
- `npm install` di environment ini perlu `--break-system-packages` HANYA untuk pip (Python), TIDAK untuk npm — `npm install` biasa saja sudah cukup.
