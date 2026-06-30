import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProgressBar from './ProgressBar';
import { audioManager } from '../utils/audioManager';

// Ornamen latar mini yang berbeda per track, ditempatkan di sudut kartu
// supaya tidak terlihat "kosong" di area putih/transparan sekitar konten.
const CardOrnament = ({ track }) => {
  const ornaments = {
    computational: (
      <svg width="100" height="100" viewBox="0 0 100 100" className="absolute top-2 right-2 opacity-20 pointer-events-none">
        <rect x="10" y="10" width="22" height="22" rx="4" fill="#fff" transform="rotate(15 21 21)" />
        <rect x="55" y="25" width="16" height="16" rx="3" fill="#fff" transform="rotate(-10 63 33)" />
        <circle cx="75" cy="70" r="10" fill="#fff" />
        <circle cx="25" cy="72" r="6" fill="#fff" />
        <line x1="30" y1="22" x2="55" y2="28" stroke="#fff" strokeWidth="2" strokeDasharray="3 3" />
        <line x1="63" y1="40" x2="75" y2="60" stroke="#fff" strokeWidth="2" strokeDasharray="3 3" />
      </svg>
    ),
    critical: (
      <svg width="100" height="100" viewBox="0 0 100 100" className="absolute top-2 right-2 opacity-20 pointer-events-none">
        <text x="12" y="38" fontSize="28">🔎</text>
        <text x="55" y="70" fontSize="22">❓</text>
        <text x="10" y="78" fontSize="18">💭</text>
      </svg>
    ),
    design: (
      <svg width="100" height="100" viewBox="0 0 100 100" className="absolute top-2 right-2 opacity-20 pointer-events-none">
        <circle cx="25" cy="30" r="14" fill="#fff" />
        <circle cx="60" cy="20" r="10" fill="#fff" />
        <circle cx="75" cy="55" r="16" fill="#fff" />
        <circle cx="30" cy="70" r="10" fill="#fff" />
        <circle cx="60" cy="78" r="7" fill="#fff" />
      </svg>
    ),
  };
  return ornaments[track] || null;
};

const TrackCard = ({ track, title, description, icon, color, completed, total }) => {
  const navigate = useNavigate();

  const goToTrack = () => {
    audioManager.playSfx('click');
    navigate(`/track/${track}`);
  };

  return (
    <motion.div
      data-testid={`track-card-${track}`}
      onClick={goToTrack}
      whileHover={{ scale: 1.03, y: -8 }}
      whileTap={{ scale: 0.99 }}
      className="relative cursor-pointer p-8 h-full rounded-3xl overflow-hidden"
      style={{
        backgroundColor: color,
        boxShadow: `0 10px 0 0 ${color}99, 0 14px 20px rgba(0,0,0,0.2)`,
      }}
    >
      {/* Ornamen SVG di pojok kanan atas */}
      <CardOrnament track={track} />

      {/* Lingkaran besar dekoratif di belakang */}
      <div
        className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full opacity-20 pointer-events-none"
        style={{ backgroundColor: '#fff' }}
      />
      <div
        className="absolute -top-6 -left-6 w-24 h-24 rounded-full opacity-10 pointer-events-none"
        style={{ backgroundColor: '#fff' }}
      />

      <div className="relative flex flex-col h-full z-10">
        {/* Icon & Title */}
        <div className="flex items-start gap-4 mb-6">
          <div className="text-6xl float-animation" data-testid={`track-icon-${track}`}>
            {icon}
          </div>
          <div className="flex-1">
            <h2 className="heading-font text-2xl md:text-3xl text-white mb-2">
              {title}
            </h2>
            <p className="body-font text-base text-white/90">
              {description}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-auto pt-5 border-t-2 border-white/30">
          <ProgressBar current={completed} total={total} color="rgba(255,255,255,0.9)" />
        </div>

        {/* CTA Button */}
        <motion.button
          data-testid={`start-track-${track}`}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          className="mt-5 w-full py-4 px-8 rounded-full font-bold text-xl shadow-lg"
          style={{
            backgroundColor: '#fff',
            color: color,
            boxShadow: '0 6px 0 0 rgba(0,0,0,0.12)',
          }}
          onClick={(e) => { e.stopPropagation(); goToTrack(); }}
        >
          {completed === 0 ? 'Mulai Belajar! 🚀' : completed === total ? 'Ulangi Lagi! ✨' : 'Lanjutkan! 💪'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TrackCard;


