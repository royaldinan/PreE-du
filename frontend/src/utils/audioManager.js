class AudioManager {
  constructor() {
    this.enabled = false;
    this.initialized = false;
    this.basePath = '/sounds/';

    // Konfigurasi Volume & Loop
    this.config = {
      click: { volume: 0.6, loop: false },
      correct: { volume: 0.8, loop: false },
      wrong: { volume: 0.7, loop: false },
      win: { volume: 0.9, loop: false },
      bgm: { volume: 0.4, loop: true } // Musik latar lebih pelan
    };

    this.audios = {};
    this._loadSounds();
  }

  _loadSounds() {
    Object.keys(this.config).forEach(key => {
      const src = `${this.basePath}${key}.mp3`;
      const audio = new Audio(src);
      
      audio.loop = this.config[key].loop;
      audio.volume = this.config[key].volume;
      audio.preload = 'auto';

      // Error Handling
      audio.addEventListener('error', (e) => {
        console.error(`❌ GAGAL LOAD: ${key}.mp3 dari ${src}`);
      });

      // Success Log
      audio.addEventListener('canplaythrough', () => {
        console.log(`✅ SIAP: ${key}.mp3`);
      });

      this.audios[key] = audio;
    });
  }

  // Wajib dipanggil saat user interaksi pertama (klik tombol volume)
  async init() {
    if (this.initialized) return true;
    try {
      const test = this.audios['click'];
      if (test) {
        await test.play();
        test.pause();
        test.currentTime = 0;
      }
      this.initialized = true;
      this.enabled = true;
      console.log("🔊 AUDIO SYSTEM ACTIVE!");
      this.play('bgm'); // Langsung mainkan musik
      return true;
    } catch (err) {
      console.warn("⚠️ Menunggu interaksi user...", err);
      return false;
    }
  }

  toggle() {
    if (!this.initialized) return this.init();
    this.enabled = !this.enabled;
    if (this.enabled) this.play('bgm');
    else this.pauseAll();
    return this.enabled;
  }

  play(name) {
    if (!this.enabled || !this.initialized) return;
    const audio = this.audios[name];
    if (audio) {
      audio.currentTime = 0; // Reset untuk SFX
      audio.play().catch(e => console.warn("Playback blocked:", e));
    }
  }

  pauseAll() {
    Object.values(this.audios).forEach(audio => {
      audio.pause();
      if (!audio.loop) audio.currentTime = 0;
    });
  }
}

export const audioManager = new AudioManager();
export default audioManager;
