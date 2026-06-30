import React from 'react';
import { motion } from 'framer-motion';

// GameButton — tombol jawaban premium & tactile untuk semua game.
//
// Sebelumnya semua game pakai tombol flat solid-color
// (`bg-[#4D96FF] shadow-lg`) tanpa depth/gradient/rim-light apa pun —
// ini komponen yang menggantikannya secara konsisten di semua 9 game.
//
// Teknik (riset: replikasi tombol Duolingo, Josh Comeau "Designing
// Beautiful Shadows", Material elevation system):
// 1. Gradient diagonal halus (bukan solid flat) supaya terasa ada cahaya.
// 2. "Bottom-edge" box-shadow solid (bukan blur) sebagai tepi 3D bawah,
//    collapse + translateY saat ditekan -> sensasi "benar-benar ditekan".
// 3. Rim-light tipis di tepi atas (inset highlight) -> terasa mengkilap.
// 4. Shine-sweep diagonal saat hover (gradient bergerak), bukan cuma scale.
// 5. State "correct"/"wrong" mengubah warna+shadow secara lokal pada
//    tombol yang diklik (bukan cuma teks feedback di luar), supaya
//    reaksi visual terasa LANGSUNG dari objek yang disentuh.
//
// Semua warna preset dipetakan dari token desain yang sudah ada di
// index.css (--color-primary, --color-secondary, dst) supaya konsisten
// dengan sisa aplikasi, bukan warna baru yang asal.

const VARIANTS = {
  blue: {
    top: '#6FB1FF',
    mid: '#4D96FF',
    bottom: '#2D6FD4',
    edge: '#1F5BB8',
    text: '#FFFFFF',
  },
  green: {
    top: '#8EDD96',
    mid: '#6BCB77',
    bottom: '#4AA957',
    edge: '#3A8B45',
    text: '#FFFFFF',
  },
  yellow: {
    top: '#FFE08A',
    mid: '#FFD166',
    bottom: '#E8AE3D',
    edge: '#C8902A',
    text: '#5A3D0A',
  },
  purple: {
    top: '#C08AF0',
    mid: '#9D4CDD',
    bottom: '#7C32B8',
    edge: '#632699',
    text: '#FFFFFF',
  },
  orange: {
    top: '#FFAE70',
    mid: '#FF8C42',
    bottom: '#E06D24',
    edge: '#C0571A',
    text: '#FFFFFF',
  },
  // "white" — varian netral untuk pilihan jawaban yang belum ditentukan
  // benar/salahnya secara warna (mis. opsi sebab-akibat), tapi tetap
  // punya depth (bukan putih flat polos seperti sebelumnya).
  white: {
    top: '#FFFFFF',
    mid: '#FBF8F3',
    bottom: '#EDE6DA',
    edge: '#D8CDB8',
    text: '#2B2D42',
  },
  // "done" — pengganti `bg-gray-300` flat untuk item yang sudah
  // dipilih/dipindahkan (mis. angka yang sudah diurutkan). Tetap punya
  // depth tipis supaya tidak terasa "mati" total.
  done: {
    top: '#E4E1DA',
    mid: '#D6D2C8',
    bottom: '#C2BDB0',
    edge: '#AEA89A',
    text: '#8A8578',
  },
};

// Status sementara setelah klik: mengubah warna+shadow tombol itu
// sendiri jadi hijau (benar) atau merah (salah) secara singkat,
// terlepas dari variant aslinya.
const STATUS_OVERRIDE = {
  correct: {
    top: '#9BEFA8',
    mid: '#5FD46F',
    bottom: '#3CAE4C',
    edge: '#2E8C3B',
    text: '#FFFFFF',
    glow: '0 0 0 4px rgba(95, 212, 111, 0.35)',
  },
  wrong: {
    top: '#FF9B8A',
    mid: '#FF6B5B',
    bottom: '#E0483A',
    edge: '#BD3527',
    text: '#FFFFFF',
    glow: '0 0 0 4px rgba(255, 107, 91, 0.3)',
  },
};

const SIZE_PRESETS = {
  // Untuk tombol kecil bujur sangkar (grid pilihan, kartu angka, dst)
  tile: 'w-20 h-20 md:w-24 md:h-24 text-3xl md:text-4xl rounded-2xl',
  tileSm: 'w-14 h-14 md:w-16 md:h-16 text-xl md:text-2xl rounded-xl',
  tileLg: 'w-24 h-24 md:w-28 md:h-28 text-4xl md:text-5xl rounded-2xl',
  // Untuk tombol kotak berisi label pendek (emoji + kata, mis. "📏 Penggaris")
  // — beda dari tile/tileLg yang didesain untuk satu emoji besar saja.
  // Lebih lebar dari tinggi (bukan bujur sangkar ketat) dan font lebih kecil
  // supaya teks tidak overflow.
  labelTile: 'w-[6.5rem] h-24 md:w-28 md:h-24 px-2 text-sm md:text-base leading-snug rounded-2xl',
  // Untuk tombol full-width (opsi sebab-akibat, opsi empati, dst)
  wide: 'w-full px-6 py-4 text-lg rounded-2xl',
  // Untuk tombol aksi/pill (Main Lagi, Jalankan!, dst)
  pill: 'px-6 py-3 text-base rounded-full',
  pillLg: 'px-8 py-4 text-xl rounded-full',
  // Untuk tombol bundar besar tap-cepat (mis. lightbulb ide), bukan
  // kotak — sengaja rounded-full, bukan rounded-2xl seperti tile.
  bigCircle: 'w-32 h-32 md:w-36 md:h-36 text-4xl md:text-5xl rounded-full',
};

const GameButton = ({
  children,
  onClick,
  disabled = false,
  variant = 'blue',
  status = null, // null | 'correct' | 'wrong' | 'pulse'
  size = 'tile',
  className = '',
  motionProps = {},
}) => {
  // 'pulse' tidak ganti warna (beda dari correct/wrong) — dipakai untuk
  // game tap-cepat di mana SETIAP klik berhasil (mis. brainstorm ide),
  // jadi tidak masuk akal kalau tombolnya berubah jadi hijau/merah tiap
  // detik. Pulse cuma menambah glow ring warna variant sendiri + bounce.
  const palette = status === 'correct' || status === 'wrong'
    ? { ...VARIANTS[variant], ...STATUS_OVERRIDE[status] }
    : VARIANTS[variant] || VARIANTS.blue;
  const sizeClass = SIZE_PRESETS[size] || SIZE_PRESETS.tile;

  const pulseGlow = `0 0 0 6px ${palette.mid}55`;
  const restingShadow = `0 5px 0 0 ${palette.edge}, 0 7px 10px rgba(0,0,0,0.18)${
    status === 'correct' || status === 'wrong' ? `, ${palette.glow}` : status === 'pulse' ? `, ${pulseGlow}` : ''
  }`;
  const pressedShadow = `0 1px 0 0 ${palette.edge}, 0 2px 3px rgba(0,0,0,0.12)`;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      initial={motionProps.initial}
      animate={
        status === 'wrong'
          ? { x: [0, -6, 6, -4, 4, 0], y: 0, boxShadow: restingShadow }
          : status === 'correct' || status === 'pulse'
          ? { scale: [1, 1.1, 1], y: 0, boxShadow: restingShadow }
          : { ...motionProps.animate, y: 0, boxShadow: restingShadow }
      }
      transition={motionProps.transition || { duration: status ? 0.3 : 0.2 }}
      whileHover={!disabled ? { y: -2, transition: { duration: 0.15 } } : {}}
      whileTap={!disabled ? { y: 3, boxShadow: pressedShadow, transition: { duration: 0.08 } } : {}}
      style={{
        background: `linear-gradient(155deg, ${palette.top} 0%, ${palette.mid} 55%, ${palette.mid} 100%)`,
        color: palette.text,
      }}
      className={`relative font-bold disabled:cursor-not-allowed disabled:opacity-60 overflow-hidden group ${sizeClass} ${className}`}
    >
      {/* Rim-light: highlight tipis di tepi atas, seperti permukaan mengkilap */}
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[inherit] opacity-50"
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 100%)' }}
      />
      {/* Shine-sweep: garis cahaya diagonal yang lewat saat hover */}
      {!disabled && (
        <span
          className="pointer-events-none absolute -inset-y-2 -left-1/2 w-1/3 rotate-12 opacity-0 group-hover:opacity-100 group-hover:translate-x-[250%] transition-all duration-700 ease-out"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)' }}
        />
      )}
      <span className="relative z-10 flex items-center justify-center w-full h-full leading-none">
        {children}
      </span>
    </motion.button>
  );
};

export default GameButton;
