import React from 'react';
import { motion } from 'framer-motion';

// GameTile — permukaan kartu non-interaktif (bukan tombol) untuk konten
// di dalam game: kotak slot pattern, kartu soal/cause/scenario, kotak
// "instruksimu"/"urutanmu" yang menampung item terkumpul, dst.
//
// Sebelumnya semua ini cuma `bg-white rounded-xl shadow-md` atau
// `bg-[#FEFAF6] rounded-2xl` — datar, tanpa border, tanpa rasa
// "permukaan" yang berbeda dari kartu di sekitarnya. GameTile memberi
// gradient sangat halus + border tipis + inset highlight supaya
// terlihat seperti permukaan fisik, bukan kotak warna solid.

const TONE = {
  // Permukaan netral terang — pengganti `bg-white`/`bg-[#FEFAF6]` polos
  paper: {
    bg: 'linear-gradient(165deg, #FFFFFF 0%, #FBF7F0 100%)',
    border: 'rgba(43, 45, 66, 0.08)',
    innerTop: 'rgba(255,255,255,0.9)',
    shadow: '0 2px 0 0 rgba(43,45,66,0.06), 0 6px 16px rgba(43,45,66,0.06)',
  },
  // Permukaan "well"/wadah tempat item dijatuhkan (instruksimu, urutanmu)
  well: {
    bg: 'linear-gradient(165deg, #F3EFE6 0%, #ECE5D6 100%)',
    border: 'rgba(43, 45, 66, 0.10)',
    innerTop: 'rgba(255,255,255,0.5)',
    shadow: 'inset 0 2px 6px rgba(43,45,66,0.08), 0 1px 0 rgba(255,255,255,0.6)',
  },
  // Kartu soal/pertanyaan yang perlu menonjol sedikit
  highlight: {
    bg: 'linear-gradient(165deg, #FFFFFF 0%, #F5F0FF 100%)',
    border: 'rgba(157, 76, 221, 0.18)',
    innerTop: 'rgba(255,255,255,0.9)',
    shadow: '0 3px 0 0 rgba(157,76,221,0.12), 0 8px 20px rgba(43,45,66,0.08)',
  },
  // Slot kosong yang menunggu diisi (placeholder pattern)
  placeholder: {
    bg: 'linear-gradient(165deg, #FFF8E1 0%, #FFEFC2 100%)',
    border: 'rgba(255, 209, 102, 0.5)',
    innerTop: 'rgba(255,255,255,0.7)',
    shadow: '0 3px 0 0 rgba(232,174,61,0.4), 0 6px 14px rgba(43,45,66,0.08)',
  },
};

const GameTile = ({
  children,
  tone = 'paper',
  className = '',
  as: Component = motion.div,
  animateProps = {},
}) => {
  const palette = TONE[tone] || TONE.paper;

  return (
    <Component
      {...animateProps}
      style={{
        background: palette.bg,
        border: `1.5px solid ${palette.border}`,
        boxShadow: palette.shadow,
      }}
      className={`relative rounded-2xl ${className}`}
    >
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-1/3 rounded-t-[inherit] opacity-60"
        style={{ background: `linear-gradient(180deg, ${palette.innerTop} 0%, rgba(255,255,255,0) 100%)` }}
      />
      <span className="relative z-10">{children}</span>
    </Component>
  );
};

export default GameTile;
