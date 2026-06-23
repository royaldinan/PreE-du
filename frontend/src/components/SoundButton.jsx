import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import soundManager from '../utils/audioManager';

const SoundButton = () => {
  const [isMuted, setIsMuted] = useState(false);

  const handleToggle = () => {
    soundManager.init();
    const newMuted = soundManager.toggleMute();
    setIsMuted(newMuted);
    
    if (!newMuted) {
      soundManager.playClick();
    }
  };

  return (
    <motion.button
      onClick={handleToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-blue-400"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
    >
      {isMuted ? (
        <VolumeX className="w-6 h-6 text-gray-500" />
      ) : (
        <Volume2 className="w-6 h-6 text-blue-500" />
      )}
    </motion.button>
  );
};

export default SoundButton;
