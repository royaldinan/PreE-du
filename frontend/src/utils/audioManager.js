// Audio Manager menggunakan Web Audio API untuk sound effects
class SoundManager {
  constructor() {
    this.audioContext = null;
    this.isMuted = false;
    this.masterGain = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      this.masterGain.gain.value = 0.3;
      this.initialized = true;
    } catch (e) {
      console.warn('Web Audio API tidak didukung');
    }
  }

  ensureInit() {
    if (!this.initialized) {
      this.init();
    }
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  playTone(frequency, duration, type = 'sine', volume = 0.5, startTime = 0) {
    this.ensureInit();
    if (!this.audioContext || this.isMuted) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);

    oscillator.type = type;
    oscillator.frequency.value = frequency;

    const now = this.audioContext.currentTime + startTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volume, now + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, now + duration);

    oscillator.start(now);
    oscillator.stop(now + duration);
  }

  playHover() {
    this.playTone(600, 0.1, 'sine', 0.2);
  }

  playClick() {
    this.playTone(800, 0.08, 'square', 0.15);
  }

  playSelect() {
    this.playTone(523.25, 0.15, 'sine', 0.3);
    setTimeout(() => this.playTone(659.25, 0.15, 'sine', 0.3), 100);
  }

  playCorrect() {
    this.playTone(523.25, 0.15, 'sine', 0.4, 0);
    this.playTone(659.25, 0.15, 'sine', 0.4, 0.1);
    this.playTone(783.99, 0.2, 'sine', 0.4, 0.2);
  }

  playSuccess() {
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      this.playTone(freq, 0.2, 'triangle', 0.3, i * 0.1);
    });
  }

  playComplete() {
    [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, i) => {
      this.playTone(freq, 0.3, 'sine', 0.4, i * 0.15);
    });
  }

  playWrong() {
    this.playTone(200, 0.2, 'sawtooth', 0.2);
    setTimeout(() => this.playTone(150, 0.2, 'sawtooth', 0.2), 150);
  }

  playPop() {
    this.playTone(800, 0.08, 'sine', 0.3);
  }

  playStar() {
    [1046.50, 1318.51, 1567.98].forEach((freq, i) => {
      this.playTone(freq, 0.15, 'sine', 0.35, i * 0.08);
    });
  }

  playTrophy() {
    [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98].forEach((freq, i) => {
      this.playTone(freq, 0.4, 'triangle', 0.4, i * 0.12);
    });
  }

  playMatch() {
    this.playTone(880, 0.1, 'sine', 0.3);
    setTimeout(() => this.playTone(1100, 0.12, 'sine', 0.3), 80);
  }

  playThink() {
    this.playTone(400, 0.3, 'sine', 0.15);
  }

  playHappy() {
    [659.25, 783.99, 987.77].forEach((freq, i) => {
      this.playTone(freq, 0.15, 'sine', 0.3, i * 0.08);
    });
  }

  mute() {
    this.isMuted = true;
    if (this.masterGain) {
      this.masterGain.gain.value = 0;
    }
  }

  unmute() {
    this.isMuted = false;
    if (this.masterGain) {
      this.masterGain.gain.value = 0.3;
    }
  }

  toggleMute() {
    if (this.isMuted) {
      this.unmute();
    } else {
      this.mute();
    }
    return this.isMuted;
  }

  setVolume(volume) {
    if (this.masterGain) {
      this.masterGain.gain.value = Math.max(0, Math.min(0.5, volume));
    }
  }
}

const soundManager = new SoundManager();

export default soundManager;
export { SoundManager };
