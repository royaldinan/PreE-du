/**
 * AudioManager — PreE-du
 * ------------------------------------------------------------------
 * Mengelola 2 jenis suara:
 *
 * 1) BGM (musik latar, loop) — satu lagu aktif setiap saat:
 *      - 'mainMenu' -> diputar di Beranda (Home) & halaman Trofi Ku
 *      - 'computational' -> diputar di seluruh Track "Berpikir Komputasional"
 *                           (overview track + ke-3 topiknya)
 *      - 'critical'      -> diputar di seluruh Track "Berpikir Kritis"
 *      - 'design'        -> diputar di seluruh Track "Berpikir Desain"
 *
 *    BGM diganti HANYA saat pindah track/menu (lihat playBgm()).
 *    Kalau track yang diminta sama dengan yang sedang main, tidak
 *    di-restart (supaya tidak "patah" tiap pindah halaman di dalam
 *    track yang sama).
 *
 * 2) SFX (efek suara, sekali main, tidak loop):
 *      - 'click'   -> setiap klik tombol UI (navigasi, mascot, dll)
 *      - 'correct' -> jawaban benar
 *      - 'wrong'   -> jawaban salah
 *      - 'win'     -> menang satu level/topik (dapat >= 1 bintang)
 *      - 'lose'    -> kalah satu level/topik (0 bintang / semua salah)
 *
 * Cara pakai singkat (lihat juga README_AUDIO.md):
 *   import { audioManager } from '../utils/audioManager';
 *   audioManager.playSfx('click');
 *   audioManager.playBgm('computational');
 *   audioManager.toggleMute();
 * ------------------------------------------------------------------
 */

const MUTE_STORAGE_KEY = 'preedu_audio_muted';

class AudioManager {
  constructor() {
    this.basePath = '/sounds/';

    // File-file BGM (loop, lebih pelan dari SFX)
    this.bgmFiles = {
      mainMenu: 'bgmMainMenu.mp3',
      computational: 'bgmTopic1.mp3', // Track 1: Berpikir Komputasional
      critical: 'bgmtopic2.mp3',      // Track 2: Berpikir Kritis
      design: 'bgmtopic3.mp3'         // Track 3: Berpikir Desain
    };

    // File-file SFX (sekali main, lebih kencang dari BGM)
    this.sfxFiles = {
      click: 'click.mp3',
      correct: 'correct.mp3',
      wrong: 'wrong.mp3',
      win: 'win.mp3',
      lose: 'lose.mp3'
    };

    this.bgmVolume = 0.35;
    this.sfxVolume = 0.7;

    // Status umum
    this.muted = this._loadMutePreference();
    this.unlocked = false; // baru true setelah browser mengizinkan audio (interaksi pertama)

    this.currentBgmKey = null;
    this.bgmAudio = null; // satu elemen <audio> aktif untuk BGM (reuse, jangan numpuk)

    this.sfxAudios = {}; // cache elemen <audio> per SFX, supaya bisa ditembak cepat & beruntun

    this._preloadSfx();
  }

  // ---------- Setup & util internal ----------

  _loadMutePreference() {
    try {
      return localStorage.getItem(MUTE_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  }

  _saveMutePreference() {
    try {
      localStorage.setItem(MUTE_STORAGE_KEY, String(this.muted));
    } catch {
      // localStorage tidak tersedia (mode private dsb) -> abaikan, tidak fatal
    }
  }

  _preloadSfx() {
    Object.entries(this.sfxFiles).forEach(([key, filename]) => {
      const audio = new Audio(`${this.basePath}${filename}`);
      audio.preload = 'auto';
      audio.volume = this.sfxVolume;
      audio.addEventListener('error', () => {
        console.error(`[audioManager] Gagal memuat SFX "${key}" dari ${this.basePath}${filename}`);
      });
      this.sfxAudios[key] = audio;
    });
  }

  /**
   * Browser modern memblokir audio sebelum ada interaksi user.
   * Panggil ini sekali di klik/tap pertama (sudah dipasang di App.jsx).
   * Aman dipanggil berkali-kali.
   */
  async unlock() {
    if (this.unlocked) return true;
    try {
      // "Bangunkan" satu elemen audio diam-diam (volume 0 sesaat) supaya
      // browser menganggap audio context sudah diizinkan oleh user.
      const probe = this.sfxAudios.click;
      if (probe) {
        const prevVolume = probe.volume;
        probe.volume = 0;
        await probe.play();
        probe.pause();
        probe.currentTime = 0;
        probe.volume = prevVolume;
      }
      this.unlocked = true;
      return true;
    } catch (err) {
      // Belum ada interaksi user yang valid, browser masih menahan -> wajar, coba lagi nanti
      return false;
    }
  }

  // ---------- SFX ----------

  /**
   * Mainkan satu SFX. Aman dipanggil cepat berkali-kali (misal klik beruntun)
   * karena currentTime di-reset tiap panggilan.
   * @param {'click'|'correct'|'wrong'|'win'|'lose'} name
   */
  playSfx(name) {
    if (this.muted) return;
    const audio = this.sfxAudios[name];
    if (!audio) {
      console.warn(`[audioManager] SFX "${name}" tidak dikenal`);
      return;
    }
    try {
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Diblokir browser karena belum ada interaksi user -> wajar, abaikan diam-diam
      });
    } catch {
      // ignore
    }
  }

  // ---------- BGM ----------

  /**
   * Putar BGM untuk satu track/menu. Kalau track yang sama sudah
   * sedang main, TIDAK di-restart (mencegah lagu "patah" tiap pindah
   * halaman di dalam track yang sama, sesuai keputusan desain:
   * BGM diatur per-track, bukan per-topik).
   * @param {'mainMenu'|'computational'|'critical'|'design'} key
   */
  playBgm(key) {
    const filename = this.bgmFiles[key];
    if (!filename) {
      console.warn(`[audioManager] BGM "${key}" tidak dikenal`);
      return;
    }

    // Sudah main BGM yang sama -> jangan diulang dari awal
    if (this.currentBgmKey === key && this.bgmAudio) {
      if (this.muted) {
        this.bgmAudio.pause();
      } else if (this.bgmAudio.paused) {
        this.bgmAudio.play().catch(() => {});
      }
      return;
    }

    // Ganti BGM: matikan yang lama, mainkan yang baru
    if (this.bgmAudio) {
      this.bgmAudio.pause();
      this.bgmAudio.currentTime = 0;
    }

    const audio = new Audio(`${this.basePath}${filename}`);
    audio.loop = true;
    audio.volume = this.bgmVolume;
    audio.preload = 'auto';
    audio.addEventListener('error', () => {
      console.error(`[audioManager] Gagal memuat BGM "${key}" dari ${this.basePath}${filename}`);
    });

    this.bgmAudio = audio;
    this.currentBgmKey = key;

    if (!this.muted) {
      audio.play().catch(() => {
        // Diblokir browser karena belum ada interaksi -> akan tersambung otomatis
        // setelah unlock()/interaksi pertama lewat resume di toggleMute()/unlock()
      });
    }
  }

  stopBgm() {
    if (this.bgmAudio) {
      this.bgmAudio.pause();
      this.bgmAudio.currentTime = 0;
    }
    this.currentBgmKey = null;
  }

  // ---------- Mute toggle (dipakai SoundButton) ----------

  get isMuted() {
    return this.muted;
  }

  toggleMute() {
    this.muted = !this.muted;
    this._saveMutePreference();

    if (this.muted) {
      if (this.bgmAudio) this.bgmAudio.pause();
    } else {
      // Coba lanjutkan BGM yang sedang aktif
      this.unlock();
      if (this.bgmAudio) this.bgmAudio.play().catch(() => {});
    }
    return this.muted;
  }
}

export const audioManager = new AudioManager();
export default audioManager;
