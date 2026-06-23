import React, { useEffect, useRef } from 'react';

const AnimatedBackground = ({ type = 'default' }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

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

    // Buat partikel
    const createParticle = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 20 + 10,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random - 0.5) * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: ['circle', 'square', 'triangle', 'star'][Math.floor(Math.random() * 4)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
      opacity: Math.random() * 0.5 + 0.3,
    });

    // Inisialisasi partikel
    particlesRef.current = Array.from({ length: 30 }, createParticle);

    const drawShape = (ctx, shape, x, y, size, rotation, color, opacity) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;

      switch (shape) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(0, 0, size, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'square':
          ctx.fillRect(-size, -size, size * 2, size * 2);
          break;
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(0, -size);
          ctx.lineTo(size, size);
          ctx.lineTo(-size, size);
          ctx.closePath();
          ctx.fill();
          break;
        case 'star':
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
            const x = Math.cos(angle) * size;
            const y = Math.sin(angle) * size;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fill();
          break;
        default:
          ctx.beginPath();
          ctx.arc(0, 0, size, 0, Math.PI * 2);
          ctx.fill();
      }

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update dan gambar partikel
      particlesRef.current.forEach((particle) => {
        // Gerakan
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.rotation += particle.rotationSpeed;

        // Interaksi mouse
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          particle.x -= dx * 0.02;
          particle.y -= dy * 0.02;
        }

        // Wrap around screen
        if (particle.x < -50) particle.x = width + 50;
        if (particle.x > width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = height + 50;
        if (particle.y > height + 50) particle.y = -50;

        // Gambar partikel
        drawShape(
          ctx,
          particle.shape,
          particle.x,
          particle.y,
          particle.size,
          particle.rotation,
          particle.color,
          particle.opacity
        );
      });

      // Gambar koneksi garis antara partikel terdekat
      ctx.strokeStyle = 'rgba(77, 150, 255, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
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

    animate();

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
    />
  );
};

export default AnimatedBackground;
