# 🔊 Sistem Audio — PreE-du

Dokumen ini menjelaskan cara kerja musik latar (BGM) dan efek suara (SFX) di
project ini. Baca dulu sebelum menambah/mengubah suara, supaya tidak
menduplikasi logic yang sudah ada.

---

## 1. File suara yang dipakai

Semua file ada di `frontend/public/sounds/`:

| File                | Jenis | Dipakai untuk                                  |
|---------------------|-------|-------------------------------------------------|
| `bgmMainMenu.mp3`   | BGM   | Beranda (Home) & halaman Trofi Ku               |
| `bgmTopic1.mp3`     | BGM   | Seluruh Track **Berpikir Komputasional**        |
| `bgmtopic2.mp3`     | BGM   | Seluruh Track **Berpikir Kritis**               |
| `bgmtopic3.mp3`     | BGM   | Seluruh Track **Berpikir Desain**               |
| `click.mp3`         | SFX   | Setiap klik tombol UI (navigasi, mascot, dll)   |
| `correct.mp3`       | SFX   | Jawaban benar                                   |
| `wrong.mp3`         | SFX   | Jawaban salah                                   |
| `win.mp3`           | SFX   | Menang satu topik/level (dapat ≥ 1 bintang)     |
| `lose.mp3`          | SFX   | Kalah satu topik/level (dapat 0 bintang)        |

> ⚠️ Nama file **case-sensitive**. `bgmtopic2.mp3` dan `bgmtopic3.mp3` memang
> huruf kecil semua (tidak ada huruf besar di "topic"), beda dengan
> `bgmTopic1.mp3` dan `bgmMainMenu.mp3` yang pakai camelCase. Kalau mengganti
> file, JANGAN ubah penamaan ini kecuali ikut diubah juga di
> `src/utils/audioManager.js`.

**Penting — BGM diatur per TRACK, bukan per TOPIK.** Artinya satu track
(misalnya "Berpikir Komputasional") punya SATU lagu BGM yang sama, dipakai
baik di halaman overview track-nya maupun di ketiga topik di dalamnya. Lagu
TIDAK berganti/restart saat pindah antar topik dalam track yang sama — hanya
berganti saat pindah ke track lain atau balik ke menu utama.

---

## 2. Arsitektur: `audioManager.js`

Semua logic suara terpusat di satu file:
`frontend/src/utils/audioManager.js`

Ini adalah singleton (satu instance dipakai di seluruh app, di-import sebagai
`audioManager` di file manapun yang butuh).

### API publik

```js
import { audioManager } from '../utils/audioManager';

// SFX — sekali main, tidak loop
audioManager.playSfx('click');   // 'click' | 'correct' | 'wrong' | 'win' | 'lose'

// BGM — loop terus sampai diganti
audioManager.playBgm('mainMenu');       // 'mainMenu' | 'computational' | 'critical' | 'design'
audioManager.stopBgm();

// Mute toggle (dipakai tombol speaker pojok kanan atas / SoundButton.jsx)
audioManager.toggleMute();   // return boolean (true = sekarang muted)
audioManager.isMuted;        // getter, boolean

// Wajib dipanggil sekali di interaksi pertama user (browser blokir
// autoplay sebelum ada klik/tap). Sudah dipasang otomatis di App.jsx,
// biasanya tidak perlu dipanggil manual lagi di tempat lain.
await audioManager.unlock();
```

### Kenapa `playBgm(key)` aman dipanggil berkali-kali?

`playBgm()` dipanggil di `useEffect` setiap halaman track/topic di-mount.
Supaya BGM tidak "patah-patah" (restart dari awal) setiap pindah halaman di
dalam track yang sama, `playBgm()` cek dulu: kalau key yang diminta SAMA
dengan BGM yang sedang aktif, fungsi ini tidak melakukan apa-apa selain
memastikan audio tetap berjalan (resume kalau ke-pause). Restart dari awal
HANYA terjadi kalau key-nya benar-benar berbeda dari sebelumnya.

### Kenapa ada `unlock()`?

Browser modern (Chrome, Safari, dst) memblokir `audio.play()` sebelum ada
interaksi user yang valid (klik/tap/keydown) di halaman. `unlock()` "membangunkan"
sistem audio dengan trik play-pause senyap di SFX click, dipanggil otomatis
di `App.jsx` saat klik/keydown pertama di mana saja dalam app. Setelah itu,
semua `playSfx()`/`playBgm()` berikutnya akan langsung berhasil.

---

## 3. Titik-titik pemasangan SFX `click`

Dipasang di setiap tombol navigasi/aksi penting:

- `components/Mascot.jsx` — klik karakter mascot
- `components/TrackCard.jsx` — klik card track & tombol CTA di Beranda
- `pages/Home.jsx` — tombol "Trofi Ku"
- `pages/TrackOverview.jsx` — tombol "Kembali", klik topic card
- `pages/TopicPage.jsx` — tombol "Kembali", "Sekarang Kita Main Beneran!",
  "Cetak", "Saya Sudah Selesai!", "Lanjut ke Topik Berikutnya"
- `pages/Trophy.jsx` — tombol "Kembali", "Reset Progress"
- `games/IdeationGame.jsx` & `games/PrototypeGame.jsx` — tombol pilih
  bagian/mulai (karena game ini juga punya banyak tombol interaktif selain
  jawaban benar/salah)

Kalau menambah tombol baru di halaman manapun, tambahkan
`audioManager.playSfx('click')` di awal handler `onClick`-nya, mengikuti pola
yang sudah ada (lihat contoh `handleBackToTrack` di `TopicPage.jsx`).

---

## 4. Titik-titik pemasangan SFX `correct` / `wrong`

Dipasang di semua 9 file game (`src/games/*.jsx`), di handler jawaban:

| Game                  | Trigger correct/wrong                                  |
|------------------------|---------------------------------------------------------|
| SortingGame            | klik angka sesuai/tidak sesuai urutan                   |
| PatternGame            | pilih bentuk lanjutan benar/salah                       |
| AlgorithmGame          | robot sampai tujuan (correct) / nabrak atau gagal sampai (wrong) |
| OddOneOutGame          | pilih item ganjil benar/salah                           |
| FactOpinionGame        | pilih FAKTA/OPINI benar/salah                           |
| CauseEffectGame        | pilih akibat benar/salah                                |
| EmpathyGame            | pilih masalah/empati benar/salah                        |
| IdeationGame           | setiap klik tombol ide = `correct` (tidak ada "salah" di game ini) |
| PrototypeGame          | cek solusi: kombinasi bagian tepat/tidak tepat           |

---

## 5. Logic menang (WIN) vs kalah (LOSE)

**Keputusan desain:** kalau pemain menyelesaikan satu topik dengan **0
bintang** (semua jawaban salah di percobaan pertama / 0 ide terkumpul / 0
level tercapai), itu dihitung **kalah** → SFX `lose`. Selain itu (1–3
bintang) → **menang** → SFX `win`.

Logic ini terpusat di **satu tempat saja**: `handleGameComplete()` di
`pages/TopicPage.jsx`. Fungsi ini dipanggil oleh SEMUA game lewat prop
`onComplete(totalStars)`:

```js
// pages/TopicPage.jsx
const handleGameComplete = (earnedStars) => {
  setGameComplete(true);
  setStars(earnedStars);

  if (earnedStars === 0) {
    setMascotMood('sad');
    audioManager.playSfx('lose');
  } else {
    setMascotMood('happy');
    audioManager.playSfx('win');
  }
};
```

### Kenapa harus diubah formula bintang di tiap game?

Sebelum perbaikan ini, **formula skor di semua game tidak pernah bisa
menghasilkan 0** — fallback paling rendah selalu `... : 1` (minimal 1
bintang walau semua salah). Itu artinya kondisi "kalah" yang diminta user
tidak akan pernah benar-benar terjadi.

Sekarang formula di tiap game sudah diperbaiki agar 0 itu mungkin, contoh
(`PatternGame.jsx`):

```js
// SEBELUM (bug — minimal selalu 1):
const totalStars = score >= 8 ? 3 : score >= 5 ? 2 : 1;

// SESUDAH (0 mungkin terjadi kalau score = 0):
const totalStars = newScore >= 8 ? 3 : newScore >= 5 ? 2 : newScore >= 1 ? 1 : 0;
```

Pola yang sama (`... >= 1 ? 1 : 0` di ujung rantai ternary) diterapkan di
**semua 9 game**. Kalau menambah game baru, ikuti pola ini agar konsisten
dengan sistem win/lose.

> Catatan tambahan: di `SortingGame.jsx` ditemukan bug terpisah — variabel
> `score` di kode aslinya tidak pernah di-`setScore()` sama sekali (selalu
> 0). Ini juga sudah diperbaiki: skor sekarang dihitung dari jumlah ronde
> yang diselesaikan tanpa kesalahan ("ronde sempurna").

---

## 6. Tombol mute (`SoundButton.jsx`)

Tombol speaker mengambang di pojok kanan atas, tampil di semua halaman
(dipasang langsung di `App.jsx`, di luar `<Routes>`). Status mute disimpan
ke `localStorage` (key: `preedu_audio_muted`) supaya preferensi pemain tidak
hilang saat reload halaman.

---

## 7. Checklist kalau ingin menambah SFX/BGM baru

1. Taruh file `.mp3` baru di `frontend/public/sounds/`.
2. Daftarkan nama file di `this.bgmFiles` atau `this.sfxFiles` dalam
   constructor `AudioManager` (`src/utils/audioManager.js`).
3. Panggil `audioManager.playSfx('namaBaru')` atau
   `audioManager.playBgm('namaBaru')` dari komponen yang relevan.
4. Update tabel di bagian 1 dokumen ini.

Tidak perlu menyentuh file lain — semua loading, preload, volume, dan mute
sudah ditangani otomatis oleh `audioManager.js`.
