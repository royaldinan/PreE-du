import confetti from 'canvas-confetti';

// Warna-warna ceria sesuai palet PreE-du
const PALETTE = ['#4D96FF', '#6BCB77', '#FFD166', '#FF6B6B', '#9D4CDD', '#FF8C42'];

/**
 * Confetti standar untuk menyelesaikan satu ronde/topik dengan sukses.
 */
export const celebrateWin = () => {
  confetti({
    particleCount: 90,
    spread: 70,
    startVelocity: 38,
    origin: { y: 0.65 },
    colors: PALETTE,
    scalar: 1.05,
  });
};

/**
 * Confetti "besar" — dua tembakan dari kiri & kanan, dipakai untuk momen
 * spesial seperti menyelesaikan topik dengan 3 bintang penuh atau
 * menyelesaikan seluruh track.
 */
export const celebrateBigWin = () => {
  const end = Date.now() + 700;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 60,
      startVelocity: 55,
      origin: { x: 0, y: 0.7 },
      colors: PALETTE,
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 60,
      startVelocity: 55,
      origin: { x: 1, y: 0.7 },
      colors: PALETTE,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};

/**
 * Confetti lembut berbentuk bintang untuk feedback jawaban benar di
 * dalam game (lebih kecil & cepat, tidak mengganggu alur bermain).
 */
export const celebrateCorrectAnswer = () => {
  confetti({
    particleCount: 18,
    spread: 45,
    startVelocity: 25,
    origin: { y: 0.5 },
    colors: PALETTE,
    scalar: 0.7,
    gravity: 1.1,
    ticks: 80,
  });
};
