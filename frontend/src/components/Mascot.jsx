import React from 'react';
import { motion } from 'framer-motion';
import { audioManager } from '../utils/audioManager';

const Mascot = ({ mood = 'idle', message = "" }) => {
  const variants = {
    idle: { y: [0, -8, 0], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } },
    happy: { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0], transition: { duration: 0.4 } },
    sad: { y: [0, 4, 0], transition: { duration: 1.5, repeat: Infinity } },
    thinking: { rotate: [0, -5, 5, 0], transition: { duration: 3, repeat: Infinity } },
  };

  const handleClick = () => {
    audioManager.play('click'); // Mainkan suara klik
    // Opsional: Ganti mood sebentar
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <motion.div
        animate={variants[mood] || variants.idle}
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer relative"
      >
        {/* SVG Burung Hantu */}
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" fill="#F6E58D" stroke="#F5A623" strokeWidth="3"/>
          <circle cx="35" cy="40" r="12" fill="white" stroke="#333" strokeWidth="2"/>
          <circle cx="35" cy="40" r="5" fill="black"/>
          <circle cx="65" cy="40" r="12" fill="white" stroke="#333" strokeWidth="2"/>
          <circle cx="65" cy="40" r="5" fill="black"/>
          <path d="M45 55 L50 65 L55 55 Z" fill="#FF7F50" stroke="#333" strokeWidth="1"/>
          <path d="M20 50 Q10 70 25 80" fill="#F5A623" stroke="#333" strokeWidth="2"/>
          <path d="M80 50 Q90 70 75 80" fill="#F5A623" stroke="#333" strokeWidth="2"/>
          <path d="M40 90 L40 95 M60 90 L60 95" stroke="#FF7F50" strokeWidth="3"/>
        </svg>
        {message && (
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-lg shadow border border-blue-200 text-xs font-bold whitespace-nowrap">
            {message}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Mascot;
