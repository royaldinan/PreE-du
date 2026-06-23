import React from 'react';
import { motion } from 'framer-motion';

const Mascot = ({ mood = 'idle', size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32'
  };

  const moodAnimations = {
    idle: { y: [0, -5, 0], transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' } },
    happy: { y: [0, -10, 0], scale: [1, 1.1, 1], transition: { duration: 0.5, repeat: Infinity } },
    sad: { y: [0, 3, 0], transition: { duration: 1.5, repeat: Infinity } },
    thinking: { rotate: [-5, 5, -5], transition: { duration: 2, repeat: Infinity } },
    excited: { scale: [1, 1.2, 1], rotate: [-10, 10, -10], transition: { duration: 0.3, repeat: Infinity } }
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} relative`}
      animate={moodAnimations[mood]}
      whileHover={{ scale: 1.15, rotate: 5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* Premium SVG Mascot - PreEdu Fox Character */}
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="furGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF8C42" />
            <stop offset="50%" stopColor="#FF6B35" />
            <stop offset="100%" stopColor="#F7931E" />
          </linearGradient>
          <linearGradient id="bellyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFE5B4" />
            <stop offset="100%" stopColor="#FFD7A3" />
          </linearGradient>
          <linearGradient id="eyeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2B2D42" />
            <stop offset="100%" stopColor="#4A4E69" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Ears */}
        <motion.path
          d="M50 60 L70 20 L90 60 Z"
          fill="url(#furGradient)"
          stroke="#E55A2B"
          strokeWidth="3"
          initial={{ rotate: -5 }}
          animate={{ rotate: mood === 'excited' ? [-5, 5, -5] : -5 }}
          transition={{ duration: 0.3, repeat: mood === 'excited' ? Infinity : 0 }}
        />
        <motion.path
          d="M110 60 L130 20 L150 60 Z"
          fill="url(#furGradient)"
          stroke="#E55A2B"
          strokeWidth="3"
          initial={{ rotate: 5 }}
          animate={{ rotate: mood === 'excited' ? [5, -5, 5] : 5 }}
          transition={{ duration: 0.3, repeat: mood === 'excited' ? Infinity : 0 }}
        />
        
        {/* Inner Ears */}
        <path d="M58 55 L70 35 L82 55 Z" fill="#FFB6A3" />
        <path d="M118 55 L130 35 L142 55 Z" fill="#FFB6A3" />
        
        {/* Head */}
        <ellipse cx="100" cy="90" rx="60" ry="50" fill="url(#furGradient)" stroke="#E55A2B" strokeWidth="3" filter="url(#glow)" />
        
        {/* Belly/Chest */}
        <ellipse cx="100" cy="140" rx="35" ry="25" fill="url(#bellyGradient)" />
        
        {/* Eyes */}
        <motion.g
          animate={mood === 'happy' ? { scaleY: [1, 0.3, 1] } : {}}
          transition={{ duration: 0.3, repeat: mood === 'happy' ? 2 : 0 }}
        >
          <ellipse cx="75" cy="85" rx="12" ry="15" fill="url(#eyeGradient)" />
          <ellipse cx="125" cy="85" rx="12" ry="15" fill="url(#eyeGradient)" />
          {/* Eye Highlights */}
          <circle cx="78" cy="80" r="5" fill="white" />
          <circle cx="128" cy="80" r="5" fill="white" />
        </motion.g>
        
        {/* Nose */}
        <motion.ellipse
          cx="100"
          cy="105"
          rx="8"
          ry="6"
          fill="#2B2D42"
          animate={mood === 'happy' ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.5, repeat: mood === 'happy' ? Infinity : 0 }}
        />
        
        {/* Mouth */}
        {mood === 'happy' ? (
          <motion.path
            d="M85 115 Q100 130 115 115"
            fill="none"
            stroke="#2B2D42"
            strokeWidth="3"
            strokeLinecap="round"
            animate={{ d: ['M85 115 Q100 130 115 115', 'M85 115 Q100 125 115 115', 'M85 115 Q100 130 115 115'] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        ) : mood === 'sad' ? (
          <path d="M85 120 Q100 110 115 120" fill="none" stroke="#2B2D42" strokeWidth="3" strokeLinecap="round" />
        ) : (
          <path d="M90 115 Q100 120 110 115" fill="none" stroke="#2B2D42" strokeWidth="3" strokeLinecap="round" />
        )}
        
        {/* Whiskers */}
        <g stroke="#E55A2B" strokeWidth="2" opacity="0.6">
          <line x1="50" y1="100" x2="70" y2="105" />
          <line x1="50" y1="110" x2="70" y2="112" />
          <line x1="50" y1="120" x2="70" y2="118" />
          <line x1="150" y1="100" x2="130" y2="105" />
          <line x1="150" y1="110" x2="130" y2="112" />
          <line x1="150" y1="120" x2="130" y2="118" />
        </g>
        
        {/* Cheeks */}
        <motion.circle
          cx="60"
          cy="105"
          r="8"
          fill="#FFB6A3"
          opacity="0.6"
          animate={mood === 'happy' ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 1, repeat: mood === 'happy' ? Infinity : 0 }}
        />
        <motion.circle
          cx="140"
          cy="105"
          r="8"
          fill="#FFB6A3"
          opacity="0.6"
          animate={mood === 'happy' ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 1, repeat: mood === 'happy' ? Infinity : 0, delay: 0.1 }}
        />
        
        {/* Tail */}
        <motion.path
          d="M140 130 Q170 120 180 100 Q185 90 175 85 Q165 80 160 90 Q155 100 150 110"
          fill="url(#furGradient)"
          stroke="#E55A2B"
          strokeWidth="3"
          animate={mood === 'excited' ? { rotate: [0, 15, 0] } : { rotate: [0, 5, 0] }}
          transition={{ duration: mood === 'excited' ? 0.3 : 2, repeat: Infinity }}
          style={{ originX: 0.7, originY: 0.7 }}
        />
        
        {/* Star/Accessory for excited mood */}
        {mood === 'excited' && (
          <motion.path
            d="M100 30 L105 45 L120 45 L108 55 L112 70 L100 60 L88 70 L92 55 L80 45 L95 45 Z"
            fill="#FFD166"
            stroke="#F4A261"
            strokeWidth="2"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: [0, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 0.5 }}
          />
        )}
      </svg>
    </motion.div>
  );
};

export default Mascot;
