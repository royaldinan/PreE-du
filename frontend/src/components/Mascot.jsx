import React from 'react';
import { motion } from 'framer-motion';
import { audioManager } from '../utils/audioManager';

// ============================================================================
// Mimo — the PreE-du mascot. Ultra-Chibi, Mochi-like, and extra cute for kids!
// Designed to be "huggable" with soft pastel colors, toe beans, and squishy animations.
// ============================================================================

const SIZE_MAP = {
  small: 90,
  medium: 140,
  large: 200,
};

// Shared gradient/def block — softer, candy-like pastel colors for kids.
const MimoDefs = () => (
  <defs>
    <linearGradient id="mimo-furBody" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#FFFFFF" />
      <stop offset="100%" stopColor="#E8ECEF" />
    </linearGradient>
    <linearGradient id="mimo-furHead" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#FFFFFF" />
      <stop offset="100%" stopColor="#F4F5F7" />
    </linearGradient>
    <linearGradient id="mimo-earInner" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#FFD6E0" />
      <stop offset="100%" stopColor="#FFB8C9" />
    </linearGradient>
    <linearGradient id="mimo-bellyFur" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#FFFFFF" />
      <stop offset="100%" stopColor="#FFF5E6" />
    </linearGradient>
    <radialGradient id="mimo-cheekBlush" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#FF9EBB" stopOpacity="0.7" />
      <stop offset="100%" stopColor="#FF9EBB" stopOpacity="0" />
    </radialGradient>
    <linearGradient id="mimo-collarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#FF9F1C" />
      <stop offset="50%" stopColor="#FFD166" />
      <stop offset="100%" stopColor="#FF9F1C" />
    </linearGradient>
    <linearGradient id="mimo-bellGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#FFE66D" />
      <stop offset="100%" stopColor="#F4D35E" />
    </linearGradient>
    <radialGradient id="mimo-eyeShine" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stopColor="#B2EBF2" />
      <stop offset="70%" stopColor="#4DD0E1" />
      <stop offset="100%" stopColor="#00BCD4" />
    </radialGradient>
  </defs>
);

// Body + Ears + Tail + Paws (Mochi Style)
const MimoBody = ({ children }) => (
  <>
    {/* Soft Contact Shadow */}
    <ellipse cx="100" cy="205" rx="55" ry="8" fill="#000000" opacity="0.08" />

    {/* Fluffy Cloud Tail */}
    <g>
      <path
        d="M 135 165 C 180 180, 210 130, 180 90 C 160 60, 130 80, 150 110 C 165 130, 155 155, 135 165 Z"
        fill="url(#mimo-furBody)"
        stroke="#D1D5DB"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M 160 100 Q 170 110 165 120" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M 175 125 Q 185 135 175 145" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" fill="none" />
    </g>

    {/* Back Paws (Small, peeking) */}
    <ellipse cx="65" cy="188" rx="15" ry="10" fill="url(#mimo-furBody)" stroke="#D1D5DB" strokeWidth="2" />
    <ellipse cx="135" cy="188" rx="15" ry="10" fill="url(#mimo-furBody)" stroke="#D1D5DB" strokeWidth="2" />

    {/* Small Chibi Body (Bean shape) */}
    <ellipse cx="100" cy="165" rx="45" ry="35" fill="url(#mimo-furBody)" stroke="#D1D5DB" strokeWidth="2.5" />
    
    {/* Soft Belly Patch */}
    <ellipse cx="100" cy="170" rx="30" ry="25" fill="url(#mimo-bellyFur)" />

    {/* Front Mochi Paws with Toe Beans! */}
    <g>
      <ellipse cx="70" cy="192" rx="16" ry="12" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="2" />
      <ellipse cx="70" cy="188" rx="4.5" ry="3.5" fill="#FFB8C9" />
      <circle cx="63" cy="194" r="2" fill="#FFB8C9" />
      <circle cx="70" cy="196" r="2.5" fill="#FFB8C9" />
      <circle cx="77" cy="194" r="2" fill="#FFB8C9" />
    </g>
    <g>
      <ellipse cx="130" cy="192" rx="16" ry="12" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="2" />
      <ellipse cx="130" cy="188" rx="4.5" ry="3.5" fill="#FFB8C9" />
      <circle cx="123" cy="194" r="2" fill="#FFB8C9" />
      <circle cx="130" cy="196" r="2.5" fill="#FFB8C9" />
      <circle cx="137" cy="194" r="2" fill="#FFB8C9" />
    </g>

    {/* Rounder Soft Ears */}
    <g>
      <path d="M 45 65 Q 10 15 65 25 Q 85 35 85 55 Z" fill="url(#mimo-furHead)" stroke="#D1D5DB" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M 50 55 Q 25 25 62 32 Q 75 38 78 50 Z" fill="url(#mimo-earInner)" />
    </g>
    <g>
      <path d="M 155 65 Q 190 15 135 25 Q 115 35 115 55 Z" fill="url(#mimo-furHead)" stroke="#D1D5DB" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M 150 55 Q 175 25 138 32 Q 125 38 122 50 Z" fill="url(#mimo-earInner)" />
    </g>

    {/* Big Chibi Head (18% larger) */}
    <circle cx="100" cy="95" r="72" fill="url(#mimo-furHead)" stroke="#D1D5DB" strokeWidth="2.5" />

    {/* Cute Hair Tuft */}
    <path d="M 90 25 Q 100 15 105 25 Q 110 18 115 28" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>

    {/* Per-mood face content */}
    {children}

    {/* Collar */}
    <path d="M 55 145 Q 100 165 145 145 L 142 153 Q 100 173 58 153 Z" fill="url(#mimo-collarGrad)" stroke="#E8763D" strokeWidth="1" opacity="0.95" />
    
    {/* Swinging Bell (Native SVG Animation for smooth pendulum effect) */}
    <g transform="translate(100, 152)">
      <animateTransform 
        attributeName="transform" 
        type="rotate" 
        values="-15; 15; -15" 
        keyTimes="0; 0.5; 1"
        calcMode="spline"
        keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
        dur="2s" 
        repeatCount="indefinite" 
        additive="sum"
      />
      <g transform="translate(-100, -152)">
        <circle cx="100" cy="162" r="10" fill="url(#mimo-bellGrad)" stroke="#D4AF37" strokeWidth="1.5" />
        <path d="M 93 162 L 107 162" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 100 162 L 100 168" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="100" cy="168" r="2" fill="#B8842A" />
        <circle cx="97" cy="158" r="2.5" fill="#FFFFFF" opacity="0.6" />
      </g>
    </g>
  </>
);

// ---- Per-mood face content ----
const FaceIdle = () => (
  <>
    <ellipse cx="35" cy="115" rx="18" ry="12" fill="url(#mimo-cheekBlush)" />
    <ellipse cx="165" cy="115" rx="18" ry="12" fill="url(#mimo-cheekBlush)" />

    {/* Left Eye with Blink (35% larger + 3 Highlights) */}
    <g transform="translate(65, 100)">
      <animateTransform attributeName="transform" type="scale" values="1 1; 1 0.05; 1 1; 1 1" keyTimes="0; 0.02; 0.04; 1" dur="4s" repeatCount="indefinite" additive="sum" />
      <g transform="translate(-65, -100)">
        <ellipse cx="65" cy="100" rx="20" ry="24" fill="url(#mimo-eyeShine)" />
        <ellipse cx="68" cy="105" rx="12" ry="14" fill="#1E5266" />
        <circle cx="58" cy="88" r="7" fill="#FFFFFF" />
        <circle cx="74" cy="112" r="4" fill="#FFFFFF" />
        <circle cx="64" cy="98" r="2" fill="#FFFFFF" />
      </g>
    </g>

    {/* Right Eye with Blink */}
    <g transform="translate(135, 100)">
      <animateTransform attributeName="transform" type="scale" values="1 1; 1 0.05; 1 1; 1 1" keyTimes="0; 0.02; 0.04; 1" dur="4s" repeatCount="indefinite" additive="sum" />
      <g transform="translate(-135, -100)">
        <ellipse cx="135" cy="100" rx="20" ry="24" fill="url(#mimo-eyeShine)" />
        <ellipse cx="132" cy="105" rx="12" ry="14" fill="#1E5266" />
        <circle cx="128" cy="88" r="7" fill="#FFFFFF" />
        <circle cx="144" cy="112" r="4" fill="#FFFFFF" />
        <circle cx="134" cy="98" r="2" fill="#FFFFFF" />
      </g>
    </g>

    <ellipse cx="100" cy="118" rx="5" ry="3.5" fill="#FF9E92" />
    <path d="M 85 128 Q 92.5 136 100 128 Q 107.5 136 115 128" stroke="#7A7F8C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    
    {/* Whiskers */}
    <path d="M 20 110 Q 35 112 45 115 M 15 120 Q 30 120 42 122" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
    <path d="M 180 110 Q 165 112 155 115 M 185 120 Q 170 120 158 122" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
  </>
);

const FaceHappy = () => (
  <>
    <ellipse cx="35" cy="115" rx="18" ry="12" fill="url(#mimo-cheekBlush)" />
    <ellipse cx="165" cy="115" rx="18" ry="12" fill="url(#mimo-cheekBlush)" />

    <path d="M 45 100 Q 65 80 85 100" stroke="#3A3F4B" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M 115 100 Q 135 80 155 100" stroke="#3A3F4B" strokeWidth="4" strokeLinecap="round" fill="none" />

    <ellipse cx="100" cy="115" rx="5" ry="3.5" fill="#FF9E92" />

    <path d="M 85 125 Q 100 145 115 125 Z" fill="#C76B5D" />
    <path d="M 92 132 Q 100 128 108 132" stroke="#FF8A7D" strokeWidth="3" strokeLinecap="round" fill="none" />
    
    <path d="M 20 110 Q 35 112 45 115 M 15 120 Q 30 120 42 122" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
    <path d="M 180 110 Q 165 112 155 115 M 185 120 Q 170 120 158 122" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
  </>
);

const FaceSad = () => (
  <>
    <ellipse cx="40" cy="120" rx="14" ry="8" fill="url(#mimo-cheekBlush)" opacity="0.5" />
    <ellipse cx="160" cy="120" rx="14" ry="8" fill="url(#mimo-cheekBlush)" opacity="0.5" />

    <path d="M 45 80 Q 60 70 75 75" stroke="#B8BEC8" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M 155 80 Q 140 70 125 75" stroke="#B8BEC8" strokeWidth="3" strokeLinecap="round" fill="none" />

    <g transform="translate(65, 105)">
      <ellipse cx="65" cy="105" rx="18" ry="22" fill="url(#mimo-eyeShine)" />
      <ellipse cx="65" cy="112" rx="12" ry="14" fill="#1E5266" />
      <circle cx="60" cy="95" r="8" fill="#FFFFFF" />
      <circle cx="72" cy="115" r="4" fill="#FFFFFF" />
    </g>
    <g transform="translate(135, 105)">
      <ellipse cx="135" cy="105" rx="18" ry="22" fill="url(#mimo-eyeShine)" />
      <ellipse cx="135" cy="112" rx="12" ry="14" fill="#1E5266" />
      <circle cx="130" cy="95" r="8" fill="#FFFFFF" />
      <circle cx="142" cy="115" r="4" fill="#FFFFFF" />
    </g>

    {/* Falling Tear Animation */}
    <path d="M 40 125 Q 35 135 40 140 Q 45 135 40 125 Z" fill="#9FE8F5">
      <animate attributeName="opacity" values="0; 1; 0" dur="2s" repeatCount="indefinite" />
      <animateTransform attributeName="transform" type="translate" values="0 0; 0 15; 0 20" dur="2s" repeatCount="indefinite" />
    </path>

    <ellipse cx="100" cy="120" rx="4.5" ry="3" fill="#FF9E92" />
    <path d="M 90 132 Q 100 124 110 132" stroke="#7A7F8C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </>
);

const FaceThinking = () => (
  <>
    <ellipse cx="35" cy="115" rx="18" ry="12" fill="url(#mimo-cheekBlush)" />
    <ellipse cx="165" cy="115" rx="18" ry="12" fill="url(#mimo-cheekBlush)" />

    <path d="M 45 75 Q 60 65 75 75" stroke="#B8BEC8" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M 125 85 Q 140 85 155 80" stroke="#B8BEC8" strokeWidth="3" strokeLinecap="round" fill="none" />

    <g transform="translate(65, 100)">
      <animateTransform attributeName="transform" type="scale" values="1 1; 1 0.05; 1 1; 1 1" keyTimes="0; 0.02; 0.04; 1" dur="5s" repeatCount="indefinite" additive="sum" />
      <g transform="translate(-65, -100)">
        <ellipse cx="65" cy="100" rx="20" ry="24" fill="url(#mimo-eyeShine)" />
        <ellipse cx="72" cy="95" rx="12" ry="14" fill="#1E5266" />
        <circle cx="68" cy="88" r="6" fill="#FFFFFF" />
        <circle cx="78" cy="100" r="3" fill="#FFFFFF" />
      </g>
    </g>
    <g transform="translate(135, 100)">
      <animateTransform attributeName="transform" type="scale" values="1 1; 1 0.05; 1 1; 1 1" keyTimes="0; 0.02; 0.04; 1" dur="5s" repeatCount="indefinite" additive="sum" />
      <g transform="translate(-135, -100)">
        <ellipse cx="135" cy="100" rx="20" ry="24" fill="url(#mimo-eyeShine)" />
        <ellipse cx="142" cy="95" rx="12" ry="14" fill="#1E5266" />
        <circle cx="138" cy="88" r="6" fill="#FFFFFF" />
        <circle cx="148" cy="100" r="3" fill="#FFFFFF" />
      </g>
    </g>

    <ellipse cx="100" cy="118" rx="5" ry="3.5" fill="#FF9E92" />
    <circle cx="105" cy="128" r="4" fill="none" stroke="#7A7F8C" strokeWidth="2.5" />

    {/* Floating Thought Bubbles */}
    <circle cx="160" cy="50" r="5" fill="#D1D5DB">
      <animate attributeName="cy" values="50; 45; 50" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="175" cy="35" r="3.5" fill="#D1D5DB">
      <animate attributeName="cy" values="35; 30; 35" dur="2s" begin="0.3s" repeatCount="indefinite" />
    </circle>
    <circle cx="185" cy="20" r="2" fill="#D1D5DB">
      <animate attributeName="cy" values="20; 15; 20" dur="2s" begin="0.6s" repeatCount="indefinite" />
    </circle>
  </>
);

const FACES = {
  idle: FaceIdle,
  happy: FaceHappy,
  sad: FaceSad,
  thinking: FaceThinking,
};

const Mascot = ({ mood = 'idle', message = '', size = 'medium' }) => {
  const pixelSize = SIZE_MAP[size] || SIZE_MAP.medium;
  const Face = FACES[mood] || FACES.idle;
  
  // Squishy Bounce Variants (Mochi / Jelly Effect)
  const variants = {
    idle: {
      y: [0, -12, 0],
      scaleY: [1, 0.96, 1], // Squish bounce
      scaleX: [1, 1.04, 1], // Stretch bounce
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
    },
    happy: {
      y: [0, -25, 0],
      rotate: [0, -12, 12, -12, 0],
      scaleY: [1, 1.1, 0.9, 1.05, 1],
      scaleX: [1, 0.95, 1.1, 0.98, 1],
      transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
    },
    sad: {
      y: [0, 6, 0],
      rotate: [-4, 4, -4],
      scaleY: [1, 0.98, 1],
      transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
    },
    thinking: {
      y: [0, -5, 0],
      rotate: [0, 12, 12, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    }
  };

  const handleClick = async () => {
    await audioManager.unlock();
    audioManager.playSfx('click');
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 relative">
      <motion.div
        animate={variants[mood] || variants.idle}
        onClick={handleClick}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="cursor-pointer"
        style={{ filter: 'drop-shadow(0px 15px 20px rgba(0,0,0,0.15))', transformOrigin: 'bottom center' }}
      >
        <svg
          width={pixelSize}
          height={pixelSize * (220 / 200)}
          viewBox="0 0 200 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={`Mimo si maskot, sedang ${mood === 'idle' ? 'santai' : mood === 'happy' ? 'senang' : mood === 'sad' ? 'sedih' : 'berpikir'}`}
        >
          <MimoDefs />
          <MimoBody>
            <Face />
          </MimoBody>
        </svg>

        {/* Bubble Chat (Candy Pastel Theme) */}
        {message && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white px-5 py-2.5 rounded-3xl shadow-xl border-2 border-pink-200 whitespace-nowrap z-20"
          >
            <p className="text-sm font-bold text-gray-700">{message}</p>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-pink-200 rotate-45"></div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Mascot;
