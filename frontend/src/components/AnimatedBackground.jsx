import React, { useEffect, useRef } from 'react';

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

    // Warna berdasarkan tipe
    const colorSchemes = {
      default: ['#4D96FF', '#6BCB77', '#FFD166', '#FF6B6B', '#C77DFF'],
      computational: ['#4D96FF', '#6BCB77', '#FFD166'],
      critical: ['#FF6B6B', '#FFD166', '#6BCB77'],
      design: ['#C77DFF', '#4D96FF', '#FF6B6B'],
    };

    const colors = colorSchemes[type] || colorSchemes.default;

    // Setiap partikel adalah salah satu "ornamen": shape geometris dasar,
    // ATAU ornamen bertema anak-anak (awan / balon / bintang berkedip).
    const ORNAMENT_KINDS = ['circle', 'square', 'triangle', 'star', 'cloud', 'balloon', 'twinkle'];

    const createParticle = () => {
      const kind = ORNAMENT_KINDS[Math.floor(Math.random() * ORNAMENT_KINDS.length)];
      const isOrnament = kind === 'cloud' || kind === 'balloon' || kind === 'twinkle';
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: isOrnament ? Math.random() * 14 + 14 : Math.random() * 16 + 8,
        speedX: (Math.random() - 0.5) * (kind === 'cloud' ? 0.4 : 1.6),
        speedY: kind === 'balloon' ? -(Math.random() * 0.3 + 0.1) : (Math.random() - 0.5) * 1.6,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: kind,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * (isOrnament ? 0.3 : 2),
        opacity: Math.random() * 0.35 + 0.25,
        twinklePhase: Math.random() * Math.PI * 2,
      };
    };

    // Inisialisasi partikel
    particlesRef.current = Array.from({ length: 26 }, createParticle);

    const drawShape = (ctx, p, t) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);

      switch (p.shape) {
        case 'circle': {
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
          break;
        }
        case 'square': {
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size, -p.size, p.size * 2, p.size * 2);
          break;
        }
        case 'triangle': {
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size, p.size);
          ctx.lineTo(-p.size, p.size);
          ctx.closePath();
          ctx.fill();
          break;
        }
        case 'star': {
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
          // Awan lembut: 3 lingkaran overlap, tanpa rotasi (lebih natural)
          ctx.rotate((-p.rotation * Math.PI) / 180); // batalkan rotasi untuk awan
          ctx.globalAlpha = p.opacity * 0.8;
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
          ctx.rotate((-p.rotation * Math.PI) / 180);
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
          ctx.lineTo(0, p.size * 0.7 + 14);
          ctx.stroke();
          break;
        }
        case 'twinkle': {
          // Bintang kecil berkedip (opacity berosilasi terlepas dari shape star besar)
          const tw = 0.4 + 0.6 * Math.abs(Math.sin(t * 0.0025 + p.twinklePhase));
          ctx.globalAlpha = tw;
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          const s = p.size * 0.5;
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

        // Interaksi mouse (ornamen lembut seperti awan tidak ikut tertarik,
        // supaya tidak terasa "kaget")
        if (particle.shape !== 'cloud') {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            particle.x -= dx * 0.02;
            particle.y -= dy * 0.02;
          }
        }

        // Wrap around screen
        if (particle.x < -60) particle.x = width + 60;
        if (particle.x > width + 60) particle.x = -60;
        if (particle.y < -60) particle.y = height + 60;
        if (particle.y > height + 60) particle.y = -60;

        drawShape(ctx, particle, t || 0);
      });

      // Garis koneksi antar partikel "geometris" (bukan ornamen lembut)
      // supaya tidak terlalu ramai/berisik secara visual.
      const linkable = particlesRef.current.filter(
        (p) => p.shape === 'circle' || p.shape === 'square' || p.shape === 'triangle' || p.shape === 'star'
      );
      ctx.strokeStyle = 'rgba(77, 150, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let i = 0; i < linkable.length; i++) {
        for (let j = i + 1; j < linkable.length; j++) {
          const p1 = linkable[i];
          const p2 = linkable[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.globalAlpha = 1 - distance / 150;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

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
      style={{ opacity: 0.6 }}
      aria-hidden="true"
    />
  );
};

export default AnimatedBackground;

