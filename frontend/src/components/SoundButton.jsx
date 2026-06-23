import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { audioManager } from '../utils/audioManager';
import { motion } from 'framer-motion';

const SoundButton = () => {
  const [isMuted, setIsMuted] = useState(true); // Default muted
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Cek status awal
    setIsMuted(!audioManager.enabled);
    setIsReady(audioManager.initialized);
  }, []);

  const handleToggle = async () => {
    // Jika belum initialized, wajib panggil initialize() dulu
    if (!audioManager.initialized) {
      const success = await audioManager.initialize();
      if (success) {
        setIsMuted(false);
        setIsReady(true);
      }
      return;
    }

    // Toggle biasa
    const newState = audioManager.toggle();
    setIsMuted(!newState);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleToggle}
      className={`fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg border-2 transition-all ${
        isMuted
          ? 'bg-gray-200 border-gray-300 text-gray-500 hover:bg-gray-300'
          : 'bg-green-500 border-green-600 text-white shadow-green-300 animate-pulse'
      }`}
      title={isMuted ? "Klik untuk Nyalakan Suara" : "Klik untuk Matikan Suara"}
    >
      {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
    </motion.button>
  );
};

export default SoundButton;
