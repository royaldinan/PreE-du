import React, { useEffect, useRef } from 'react';

// Lapisan partikel ambient yang melayang DI ATAS SceneBackground (langit +
// bukit). Sebelumnya komponen ini sendirian menjadi satu-satunya background
// (warna solid + shape kecil dengan garis koneksi ala diagram jaringan) --
// kesannya lebih "teknis" daripada "ramah anak". Sekarang fokusnya cuma
// ornamen lembut (awan kecil, balon, bintang berkedip) tanpa garis koneksi,
// karena rasa "tempat" sudah dibawa oleh SceneBackground di belakangnya.
const AnimatedBackground = ({ type = 'default' }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const colorSchemes = {
      default: ['#4D96FF', '#6BCB77', '#FFD166', '#FF6B6B', '#C77DFF'],
      computational: ['#4D96FF', '#6BCB77', '#FFD166'],
      critical: ['#FF6B6B', '#FFD166', '#6BCB77'],
      design: ['#C77DFF', '#4D96FF', '#FF6B6B'],
    };

    const colors = colorSchemes[type] || colorSchemes.default;

    // Hanya ornamen bertema anak-anak yang melayang lembut -- shape
    // geometris polos (circle/square/triangle/star) dan garis koneksi
    // sebelumnya dihapus karena terasa seperti diagram jaringan, bukan
    // dekorasi anak-anak.
    const ORNAMENT_KINDS = ['cloud', 'balloon', 'twinkle', 'star'];

    const createParticle = () => {
      const kind = ORNAMENT_KINDS[Math.floor(Math.random() * ORNAMENT_KINDS.length)];
      const isCloud = kind === 'cloud';
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: isCloud ? Math.random() * 22 + 26 : Math.random() * 14 + 12,
        speedX: (Math.random() - 0.5) * (isCloud ? 0.3 : 0.8),
        speedY: kind === 'balloon' ? -(Math.random() * 0.25 + 0.08) : (Math.random() - 0.5) * 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: kind,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.6,
        opacity: Math.random() * 0.3 + 0.4,
        twinklePhase: Math.random() * Math.PI * 2,
      };
    };

    // Lebih sedikit partikel dibanding sebelumnya (26 -> 14) karena setiap
    // partikel sekarang lebih besar dan lebih opaque, jadi tidak perlu
    // banyak untuk terasa "ramai" -- terlalu banyak elemen besar akan
    // menutupi konten utama.
    particlesRef.current = Array.from({ length: 14 }, createParticle);

    const drawShape = (ctx, p, t) => {
      ctx.save();
      ctx.translate(p.x, p.y);

      switch (p.shape) {
        case 'star': {
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
            const x = Math.cos(angle) * p.size;
            const y = Math.sin(angle) * p.size;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fill();
          break;
        }
        case 'cloud': {
          ctx.globalAlpha = p.opacity * 0.85;
          ctx.fillStyle = '#FFFFFF';
          const s = p.size;
          ctx.beginPath();
          ctx.arc(-s * 0.6, 0, s * 0.55, 0, Math.PI * 2);
          ctx.arc(0, -s * 0.25, s * 0.65, 0, Math.PI * 2);
          ctx.arc(s * 0.6, 0, s * 0.55, 0, Math.PI * 2);
          ctx.arc(0, s * 0.25, s * 0.6, 0, Math.PI * 2);
          ctx.fill();
          break;
        }
        case 'balloon': {
          ctx.globalAlpha = p.opacity + 0.15;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.55, p.size * 0.7, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = p.opacity * 0.5;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(0, p.size * 0.7);
          ctx.lineTo(0, p.size * 0.7 + 16);
          ctx.stroke();
          break;
        }
        case 'twinkle': {
          const tw = 0.4 + 0.6 * Math.abs(Math.sin(t * 0.0025 + p.twinklePhase));
          ctx.globalAlpha = tw;
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          const s = p.size * 0.55;
          ctx.moveTo(0, -s);
          ctx.lineTo(s * 0.25, -s * 0.25);
          ctx.lineTo(s, 0);
          ctx.lineTo(s * 0.25, s * 0.25);
          ctx.lineTo(0, s);
          ctx.lineTo(-s * 0.25, s * 0.25);
          ctx.lineTo(-s, 0);
          ctx.lineTo(-s * 0.25, -s * 0.25);
          ctx.closePath();
          ctx.fill();
          break;
        }
        default: {
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();
    };

    const animate = (t) => {
      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.rotation += particle.rotationSpeed;

        if (particle.shape !== 'cloud') {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            particle.x -= dx * 0.015;
            particle.y -= dy * 0.015;
          }
        }

        if (particle.x < -80) particle.x = width + 80;
        if (particle.x > width + 80) particle.x = -80;
        if (particle.y < -80) particle.y = height + 80;
        if (particle.y > height + 80) particle.y = -80;

        drawShape(ctx, particle, t || 0);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [type]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default AnimatedBackground;


