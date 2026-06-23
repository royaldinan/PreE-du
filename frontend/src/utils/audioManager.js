class AudioManager {
  constructor() {
    this.enabled = true;
    // Menggunakan URL Langsung (CDN) agar tidak perlu download file manual & anti 404
    this.sounds = {
      click: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=click-17934.mp3',
      correct: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3?filename=success-1-6297.mp3',
      wrong: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_33dde17b75.mp3?filename=error-1-24892.mp3',
      win: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_5b33e45855.mp3?filename=level-up-6297.mp3',
      bgm: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=happy-kids-11305.mp3'
    };
    
    this.audioElements = {};
    this.initAudio();
  }

  initAudio() {
    Object.keys(this.sounds).forEach(key => {
      const audio = new Audio(this.sounds[key]);
      audio.loop = (key === 'bgm');
      audio.volume = (key === 'bgm') ? 0.3 : 0.6;
      // Preload
      audio.load();
      this.audioElements[key] = audio;
    });
  }

  toggle() {
    this.enabled = !this.enabled;
    if (!this.enabled) {
      this.pauseAll();
    } else {
      this.play('bgm');
    }
    return this.enabled;
  }

  play(soundName) {
    if (!this.enabled) return;
    const audio = this.audioElements[soundName];
    if (audio) {
      audio.currentTime = 0;
      // Promise handling untuk autoplay policy browser
      audio.play().catch(e => console.log("Menunggu interaksi user untuk audio"));
    }
  }

  pauseAll() {
    Object.values(this.audioElements).forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
  }
}

export const audioManager = new AudioManager();
export default audioManager;
