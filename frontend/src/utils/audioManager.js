class AudioManager {
  constructor() {
    this.enabled = false; // Start muted to comply with autoplay policies
    this.initialized = false;
    this.basePath = '/sounds/';
    
    // Definisi Suara & Konfigurasi
    this.config = {
      click: { volume: 0.6, loop: false },
      correct: { volume: 0.8, loop: false },
      wrong: { volume: 0.6, loop: false },
      win: { volume: 0.9, loop: false },
      bgm: { volume: 0.4, loop: true }
    };

    this.audioElements = {};
    this.preloadSounds();
  }

  preloadSounds() {
    Object.keys(this.config).forEach(key => {
      const src = `${this.basePath}${key}.mp3`;
      const audio = new Audio(src);
      
      // Set config
      audio.loop = this.config[key].loop;
      audio.volume = this.config[key].volume;
      audio.preload = 'auto';

      // Error Handling Detail
      audio.addEventListener('error', (e) => {
        console.error(`❌ GAGAL MEMUAT SUARA: ${key} (${src}). Cek file atau CORS.`, e);
      });

      // Load event
      audio.addEventListener('canplaythrough', () => {
        console.log(`✅ Suara siap: ${key}`);
      });

      this.audioElements[key] = audio;
    });
  }

  // WAJIB DIPANGGIL SAAT USER KLIK TOMBOL "UNMUTE" PERTAMA KALI
  async initialize() {
    if (this.initialized) return true;
    
    try {
      // Memaksa browser mengizinkan audio dengan play() singkat lalu pause
      const testAudio = this.audioElements['click'];
      if (testAudio) {
        testAudio.muted = false;
        await testAudio.play();
        testAudio.pause();
        testAudio.currentTime = 0;
      }
      
      this.enabled = true;
      this.initialized = true;
      
      // Langsung mainkan BGM setelah inisialisasi berhasil
      this.play('bgm');
      
      console.log("🔊 Audio System Initialized Successfully!");
      return true;
    } catch (err) {
      console.warn("⚠️ Audio initialization pending user interaction:", err);
      return false;
    }
  }

  toggle() {
    if (!this.initialized) {
      // Jika belum init, coba init dulu
      const success = this.initialize();
      return success;
    }

    this.enabled = !this.enabled;
    if (this.enabled) {
      this.play('bgm');
    } else {
      this.pauseAll();
    }
    return this.enabled;
  }

  play(soundName) {
    if (!this.enabled || !this.initialized) return;

    const audio = this.audioElements[soundName];
    if (audio) {
      // Reset waktu untuk SFX agar bisa diputar ulang dengan cepat
      if (!this.config[soundName].loop) {
        audio.currentTime = 0;
      }
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn(`Playback prevented for ${soundName}:`, error);
        });
      }
    } else {
      console.warn(`Sound '${soundName}' not found in library.`);
    }
  }

  pauseAll() {
    Object.values(this.audioElements).forEach(audio => {
      audio.pause();
      // Jangan reset currentTime untuk BGM biar bisa lanjut nanti kalau mau
      if (audio.loop) return; 
      audio.currentTime = 0;
    });
  }
}

// Singleton Instance
export const audioManager = new AudioManager();
export default audioManager;
