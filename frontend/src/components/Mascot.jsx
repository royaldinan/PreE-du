import React from 'react';
import { motion } from 'framer-motion';
import soundManager from '../utils/audioManager';

const Mascot = ({ mood = 'idle', size = 'medium', onClick, showClickEffect = true }) => {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32'
  };

  const moodAnimations = {
    idle: { 
      y: [0, -5, 0], 
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' } 
    },
    happy: { 
      y: [0, -10, 0], 
      scale: [1, 1.1, 1], 
      transition: { duration: 0.5, repeat: Infinity } 
    },
    sad: { 
      y: [0, 3, 0], 
      transition: { duration: 1.5, repeat: Infinity } 
    },
    thinking: { 
      rotate: [-5, 5, -5], 
      transition: { duration: 2, repeat: Infinity } 
    },
    excited: { 
      scale: [1, 1.2, 1], 
      rotate: [-10, 10, -10], 
      transition: { duration: 0.3, repeat: Infinity } 
    },
    celebrating: {
      y: [0, -15, 0],
      scale: [1, 1.15, 1],
      rotate: [0, -15, 15, 0],
      transition: { duration: 0.6, repeat: Infinity }
    }
  };

  const handleClick = () => {
    if (showClickEffect) {
      soundManager.init();
      soundManager.playPop();
      soundManager.playHappy();
    }
    if (onClick) onClick();
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} relative cursor-pointer`}
      animate={moodAnimations[mood] || moodAnimations.idle}
      whileHover={{ 
        scale: 1.2, 
        rotate: 5,
        transition: { type: 'spring', stiffness: 400 }
      }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* Premium SVG Mascot - PreEdu Fox Character */}
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
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
          <linearGradient id="cheekGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFB6C1" />
            <stop offset="100%" stopColor="#FF69B4" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Tail */}
        <motion.path
          d="M 40 140 Q 20 130 15 110 Q 10 90 20 85 Q 30 80 40 90 Q 50 100 50 120 Z"
          fill="url(#furGradient)"
          stroke="#E55A2B"
          strokeWidth="2"
          animate={{ rotate: [-10, 10, -10] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", originX: 0.3, originY: 0.7 }}
        />

        {/* Body */}
        <ellipse cx="100" cy="140" rx="45" ry="35" fill="url(#furGradient)" stroke="#E55A2B" strokeWidth="2" />
        <ellipse cx="100" cy="145" rx="30" ry="25" fill="url(#bellyGradient)" opacity="0.8" />

        {/* Ears */}
        <motion.g animate={{ rotate: [-2, 2, -2] }} transition={{ duration: 4, repeat: Infinity }} style={{ originX: 0.5, originY: 0.8 }}>
          <path d="M 70 90 L 60 60 L 85 75 Z" fill="url(#furGradient)" stroke="#E55A2B" strokeWidth="2" />
          <path d="M 68 85 L 63 68 L 78 77 Z" fill="#FFE5B4" opacity="0.7" />
        </motion.g>
        <motion.g animate={{ rotate: [2, -2, 2] }} transition={{ duration: 4, repeat: Infinity, delay: 0.5 }} style={{ originX: 0.5, originY: 0.8 }}>
          <path d="M 130 90 L 140 60 L 115 75 Z" fill="url(#furGradient)" stroke="#E55A2B" strokeWidth="2" />
          <path d="M 132 85 L 137 68 L 122 77 Z" fill="#FFE5B4" opacity="0.7" />
        </motion.g>

        {/* Head */}
        <circle cx="100" cy="90" r="40" fill="url(#furGradient)" stroke="#E55A2B" strokeWidth="2" />

        {/* Eyes */}
        <g>
          <ellipse cx="85" cy="85" rx="8" ry="10" fill="white" />
          <motion.ellipse cx="87" cy="85" rx="4" ry="5" fill="url(#eyeGradient)" animate={{ scaleY: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }} />
          <circle cx="89" cy="82" r="2" fill="white" opacity="0.8" />
        </g>
        <g>
          <ellipse cx="115" cy="85" rx="8" ry="10" fill="white" />
          <motion.ellipse cx="117" cy="85" rx="4" ry="5" fill="url(#eyeGradient)" animate={{ scaleY: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }} />
          <circle cx="119" cy="82" r="2" fill="white" opacity="0.8" />
        </g>

        {/* Nose */}
        <path d="M 95 95 L 105 95 L 100 100 Z" fill="#FF6B6B" />

        {/* Mouth based on mood */}
        {mood === 'happy' || mood === 'excited' || mood === 'celebrating' ? (
          <motion.path d="M 90 102 Q 100 110 110 102" fill="none" stroke="#E55A2B" strokeWidth="2" strokeLinecap="round" animate={{ d: ["M 90 102 Q 100 110 110 102", "M 90 102 Q 100 112 110 102", "M 90 102 Q 100 110 110 102"] }} transition={{ duration: 0.5, repeat: Infinity }} />
        ) : mood === 'sad' ? (
          <path d="M 92 108 Q 100 102 108 108" fill="none" stroke="#E55A2B" strokeWidth="2" strokeLinecap="round" />
        ) : (
          <path d="M 93 104 Q 100 107 107 104" fill="none" stroke="#E55A2B" strokeWidth="2" strokeLinecap="round" />
        )}

        {/* Cheeks */}
        <motion.circle cx="72" cy="95" r="6" fill="url(#cheekGradient)" opacity="0.6" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }} />
        <motion.circle cx="128" cy="95" r="6" fill="url(#cheekGradient)" opacity="0.6" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.1 }} />

        {/* Whiskers */}
        <g stroke="#E55A2B" strokeWidth="1.5" opacity="0.6">
          <line x1="65" y1="95" x2="45" y2="92" />
          <line x1="65" y1="100" x2="45" y2="100" />
          <line x1="65" y1="105" x2="45" y2="108" />
          <line x1="135" y1="95" x2="155" y2="92" />
          <line x1="135" y1="100" x2="155" y2="100" />
          <line x1="135" y1="105" x2="155" y2="108" />
        </g>

        {/* Sparkles for excited/celebrating */}
        {(mood === 'excited' || mood === 'celebrating') && (
          <>
            <motion.circle cx="60" cy="60" r="3" fill="#FFD166" animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
            <motion.circle cx="140" cy="60" r="3" fill="#FFD166" animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 1] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }} />
            <motion.circle cx="100" cy="50" r="4" fill="#6BCB77" animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 1] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }} />
          </>
        )}
      </svg>
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400/20 to-yellow-400/20 blur-xl -z-10" />
    </motion.div>
  );
};

export default Mascot;
