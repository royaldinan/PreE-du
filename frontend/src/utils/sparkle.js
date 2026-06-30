// sparkleAt — burst sparkle kecil yang muncul TEPAT dari posisi elemen
// yang diklik (DOM particle, bukan canvas-confetti yang origin-nya fixed
// di tengah viewport). Ini melengkapi celebrateCorrectAnswer() yang sudah
// ada: confetti besar tetap jatuh dari atas viewport, tapi sparkle ini
// memberi reaksi LOKAL pada objek yang baru saja disentuh, supaya jelas
// terlihat "tombol ini yang benar", bukan cuma confetti generik di mana
// saja di layar.
//
// Teknik: 8-10 elemen <span> kecil di-attach ke document.body dengan
// position:fixed pada koordinat klik, lalu di-animate keluar secara
// radial dengan Web Animations API (tidak perlu re-render React),
// dan dibersihkan otomatis setelah animasi selesai.

const SPARKLE_EMOJI = ['✨', '⭐', '💫'];

export const sparkleAt = (element, options = {}) => {
  if (!element || typeof element.getBoundingClientRect !== 'function') return;

  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const count = options.count || 8;

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.4 - 0.2);
    const distance = 36 + Math.random() * 28;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    const span = document.createElement('span');
    span.textContent = SPARKLE_EMOJI[Math.floor(Math.random() * SPARKLE_EMOJI.length)];
    span.style.position = 'fixed';
    span.style.left = `${centerX}px`;
    span.style.top = `${centerY}px`;
    span.style.fontSize = `${14 + Math.random() * 10}px`;
    span.style.pointerEvents = 'none';
    span.style.zIndex = '9999';
    span.style.willChange = 'transform, opacity';
    document.body.appendChild(span);

    const animation = span.animate(
      [
        { transform: 'translate(-50%, -50%) scale(0.4) rotate(0deg)', opacity: 1 },
        {
          transform: `translate(${dx - 50}%, ${dy - 50}%) scale(1.1) rotate(${
            Math.random() > 0.5 ? 90 : -90
          }deg)`,
          opacity: 0,
          offset: 1,
        },
      ],
      {
        duration: 550 + Math.random() * 250,
        easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      }
    );

    animation.onfinish = () => span.remove();
    // Fallback pembersihan kalau onfinish tidak terpicu (mis. tab di background)
    setTimeout(() => span.remove(), 1200);
  }
};
