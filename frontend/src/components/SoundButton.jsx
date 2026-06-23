import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { audioManager } from '../utils/audioManager';
import { motion } from 'framer-motion';

const SoundButton = () => {
  const [isMuted, setIsMuted] = useState(!audioManager.enabled);

  useEffect(() => {
    setIsMuted(!audioManager.enabled);
  }, []);

  const handleToggle = () => {
    const newState = audioManager.toggle();
    setIsMuted(!newState);
    if (newState) audioManager.play('bgm');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleToggle}
      className={`fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg border-2 transition-all ${
        isMuted
          ? 'bg-gray-200 border-gray-300 text-gray-500'
          : 'bg-yellow-400 border-yellow-500 text-white animate-pulse'
      }`}
    >
      {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
    </motion.button>
  );
};

export default SoundButton;
