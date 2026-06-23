import React from 'react';
import { motion } from 'framer-motion';

const Mascot = ({ mood = 'idle', size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-16 h-16 text-4xl',
    medium: 'w-24 h-24 text-6xl',
    large: 'w-32 h-32 text-8xl'
  };

  const animations = {
    idle: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    },
    happy: {
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 0.5,
        repeat: 2
      }
    },
    sad: {
      y: [0, 5],
      opacity: [1, 0.7, 1],
      transition: {
        duration: 1,
        repeat: 2
      }
    }
  };

  return (
    <motion.div
      data-testid="mascot-owl"
      className={`${sizeClasses[size]} flex items-center justify-center`}
      animate={animations[mood]}
    >
      <div className="relative">
        {/* Owl face */}
        <div className="relative bg-[#4D96FF] rounded-full p-4 shadow-xl border-4 border-white/50">
          {/* Eyes */}
          <div className="flex gap-2 justify-center mb-1">
            <div className="w-4 h-5 bg-white rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-[#2B2D42] rounded-full"></div>
            </div>
            <div className="w-4 h-5 bg-white rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-[#2B2D42] rounded-full"></div>
            </div>
          </div>
          {/* Beak */}
          <div className="w-3 h-3 bg-[#FF8C42] rounded-full mx-auto"></div>
        </div>
        {/* Ears */}
        <div className="absolute -top-2 -left-1 w-3 h-6 bg-[#4D96FF] rounded-full transform -rotate-12"></div>
        <div className="absolute -top-2 -right-1 w-3 h-6 bg-[#4D96FF] rounded-full transform rotate-12"></div>
      </div>
    </motion.div>
  );
};

export default Mascot;
