import React from 'react';
import { motion } from 'framer-motion';
import { audioManager } from '../utils/audioManager';

const Mascot = ({ mood = 'idle', message = "" }) => {
  const variants = {
    idle: { y: [0, -10, 0], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } },
    happy: { scale: [1, 1.1, 1], y: [0, -15, 0], transition: { duration: 0.4 } },
    sad: { y: [0, 5, 0], rotate: [-5, 5, -5], transition: { duration: 1.5, repeat: Infinity } },
    thinking: { rotate: [0, -10, 10, 0], transition: { duration: 3, repeat: Infinity } },
  };

  const handleClick = () => {
    // Pastikan audio initialized dulu
    if (!audioManager.initialized) {
      audioManager.initialize().then(() => {
         audioManager.play('click');
      });
    } else {
      audioManager.play('click');
    }
    // Bisa tambahkan logic ganti mood di sini jika mau
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 relative">
      <motion.div
        animate={variants[mood] || variants.idle}
        onClick={handleClick}
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer drop-shadow-xl"
        style={{ filter: "drop-shadow(0px 10px 10px rgba(0,0,0,0.2))" }}
      >
        {/* SVG KUTING UTUH YANG IMUT */}
        <svg width="140" height="140" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ekor */}
          <path d="M160 140 Q190 120 170 90 Q150 110 160 140" fill="#FF9F43" stroke="#EE5A24" strokeWidth="3"/>
          
          {/* Badan */}
          <ellipse cx="100" cy="120" rx="60" ry="50" fill="#FF9F43" stroke="#EE5A24" strokeWidth="3"/>
          
          {/* Perut Putih */}
          <ellipse cx="100" cy="130" rx="35" ry="30" fill="#FFF0E0" />
          
          {/* Kepala */}
          <circle cx="100" cy="80" r="50" fill="#FF9F43" stroke="#EE5A24" strokeWidth="3"/>
          
          {/* Telinga Kiri */}
          <path d="M60 50 L50 20 L80 45 Z" fill="#FF9F43" stroke="#EE5A24" strokeWidth="3" strokeLinejoin="round"/>
          <path d="M55 45 L60 30 L70 45 Z" fill="#FFCCCC" />
          
          {/* Telinga Kanan */}
          <path d="M140 50 L150 20 L120 45 Z" fill="#FF9F43" stroke="#EE5A24" strokeWidth="3" strokeLinejoin="round"/>
          <path d="M145 45 L140 30 L130 45 Z" fill="#FFCCCC" />
          
          {/* Mata Kiri */}
          <ellipse cx="85" cy="75" rx="8" ry="10" fill="white" stroke="#333" strokeWidth="2"/>
          <circle cx="87" cy="75" r="4" fill="black"/>
          <circle cx="88" cy="73" r="1.5" fill="white"/>
          
          {/* Mata Kanan */}
          <ellipse cx="115" cy="75" rx="8" ry="10" fill="white" stroke="#333" strokeWidth="2"/>
          <circle cx="117" cy="75" r="4" fill="black"/>
          <circle cx="118" cy="73" r="1.5" fill="white"/>
          
          {/* Hidung */}
          <path d="M95 88 L105 88 L100 94 Z" fill="#FF6B6B" stroke="#333" strokeWidth="1"/>
          
          {/* Mulut */}
          <path d="M90 98 Q100 105 110 98" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
          
          {/* Kumis */}
          <path d="M70 90 Q50 90 40 85 M70 95 Q50 95 40 100" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
          <path d="M130 90 Q150 90 160 85 M130 95 Q150 95 160 100" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
          
          {/* Kaki Depan */}
          <ellipse cx="80" cy="160" rx="15" ry="10" fill="#FF9F43" stroke="#EE5A24" strokeWidth="3"/>
          <ellipse cx="120" cy="160" rx="15" ry="10" fill="#FF9F43" stroke="#EE5A24" strokeWidth="3"/>
          
          {/* Kaki Belakang */}
          <ellipse cx="70" cy="150" rx="12" ry="8" fill="#EE5A24" opacity="0.8"/>
          <ellipse cx="130" cy="150" rx="12" ry="8" fill="#EE5A24" opacity="0.8"/>
        </svg>

        {/* Bubble Chat */}
        {message && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-xl shadow-xl border-2 border-blue-300 whitespace-nowrap z-20"
          >
            <p className="text-sm font-bold text-gray-700">{message}</p>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-blue-300 rotate-45"></div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Mascot;
