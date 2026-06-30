import React from 'react';
import { motion } from 'framer-motion';

// Wrapper untuk area game. Sebelumnya konten game langsung muncul di
// kartu putih polos tanpa visual "tempat bermain". Komponen ini memberi:
// 1. Header panel berwarna mini dengan ikon topik dan label game
// 2. Area konten dengan latar lebih lembut (tidak putih keras)
// 3. Dekorasi sudut kecil (bintang, konfeti) yang statik sebagai aksen
//
// Dipakai di TopicPage.jsx sebagai wrapper <GameComponent />.

const CORNER_DECORATIONS = [
  { x: 'left-3 top-3', emoji: '⭐', rotate: '-rotate-12', size: 'text-xl' },
  { x: 'right-3 top-3', emoji: '🌟', rotate: 'rotate-12', size: 'text-xl' },
  { x: 'left-3 bottom-3', emoji: '✨', rotate: 'rotate-6', size: 'text-lg' },
  { x: 'right-3 bottom-3', emoji: '💫', rotate: '-rotate-6', size: 'text-lg' },
];

const GameStage = ({ topicIcon, topicTitle, trackColor, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl shadow-xl"
    >
      {/* Header panel berwarna */}
      <div
        className="px-6 py-4 flex items-center gap-3"
        style={{ background: `linear-gradient(135deg, ${trackColor}dd 0%, ${trackColor}bb 100%)` }}
      >
        <span className="text-3xl">{topicIcon}</span>
        <div>
          <p className="heading-font text-white text-lg leading-tight">🎮 Permainan Online</p>
          <p className="body-font text-white/80 text-sm">{topicTitle}</p>
        </div>
        {/* Dekorasi lingkaran di pojok kanan header */}
        <div className="ml-auto flex gap-2">
          {['⭐', '⭐', '⭐'].map((s, i) => (
            <span key={i} className="text-white/40 text-xl">☆</span>
          ))}
        </div>
      </div>

      {/* Area konten game dengan bg lebih warm */}
      <div className="relative bg-[#FEFAF6] p-6">
        {/* Dekorasi sudut */}
        {CORNER_DECORATIONS.map((d, i) => (
          <span
            key={i}
            className={`absolute ${d.x} ${d.size} ${d.rotate} opacity-25 pointer-events-none select-none`}
          >
            {d.emoji}
          </span>
        ))}
        {/* Konten game */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default GameStage;
