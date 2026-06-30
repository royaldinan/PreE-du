import React from 'react';
import { motion } from 'framer-motion';
import { audioManager } from '../utils/audioManager';

// ============================================================================
// Mimo — the PreE-du mascot. A chibi gray-white kitten with a bell collar.
//
// Replaces the old flat-color, hand-drawn-looking SVG (single fill per shape,
// no gradient, no shine, realistic body proportions) with a proper chibi
// character: oversized head, big gradient-shaded eyes with a highlight glint,
// soft fur gradients, and a tail/paws that actually read as a sitting cat.
// Visual language (155deg gradients, offset depth, soft rim highlight) is
// shared with GameButton.jsx / GameTile.jsx so Mimo sits naturally next to
// the rest of the tactile gameplay system rather than looking imported.
//
// Prop API is unchanged from the previous component (mood / message / size)
// so none of the 13 call sites across games/pages need to change.
// ============================================================================

const SIZE_MAP = {
  small: 90,
  medium: 140,
  large: 200,
};

// Shared gradient/def block — identical across all four moods, defined once.
const MimoDefs = () => (
  <defs>
    <linearGradient id="mimo-furBody" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#F4F5F7" />
      <stop offset="55%" stopColor="#E2E5EA" />
      <stop offset="100%" stopColor="#CDD2DA" />
    </linearGradient>
    <linearGradient id="mimo-furHead" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#FAFBFC" />
      <stop offset="60%" stopColor="#ECEEF1" />
      <stop offset="100%" stopColor="#D9DCE2" />
    </linearGradient>
    <linearGradient id="mimo-earInner" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#FFE3D6" />
      <stop offset="100%" stopColor="#FFCBB3" />
    </linearGradient>
    <linearGradient id="mimo-bellyFur" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#FFFFFF" />
      <stop offset="100%" stopColor="#F7F4EF" />
    </linearGradient>
    <radialGradient id="mimo-cheekBlush" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#FFB3A7" stopOpacity="0.65" />
      <stop offset="100%" stopColor="#FFB3A7" stopOpacity="0" />
    </radialGradient>
    <linearGradient id="mimo-collarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#FFB199" />
      <stop offset="100%" stopColor="#FF8C42" />
    </linearGradient>
    <linearGradient id="mimo-bellGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#FFE899" />
      <stop offset="100%" stopColor="#FFD166" />
    </linearGradient>
    <radialGradient id="mimo-eyeShine" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#9FE8F5" />
      <stop offset="60%" stopColor="#5FC9E0" />
      <stop offset="100%" stopColor="#3DA8C2" />
    </radialGradient>
  </defs>
);

// Body + ears + collar — identical across all four moods. Only the face
// (eyes/brows/nose/mouth) and cheek blush differ per mood, passed as children.
const MimoBody = ({ children }) => (
  <>
    {/* soft contact shadow */}
    <ellipse cx="100" cy="193" rx="48" ry="7" fill="#000000" opacity="0.10" />

    {/* tail, curled around right side, behind body — starts low/back so it
        clears the head silhouette instead of poking into it */}
    <path
      d="M124 188 Q160 190 172 166 Q184 142 176 118 Q170 100 154 96 Q146 94 142 100 Q156 102 164 118 Q170 134 162 152 Q154 170 132 182 Q128 185 124 188 Z"
      fill="url(#mimo-furBody)" stroke="#B8BEC8" strokeWidth="2.5" strokeLinejoin="round"
    />
    <path d="M150 100 Q166 108 172 128" stroke="#C9CDD4" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />

    {/* back paws peeking */}
    <ellipse cx="66" cy="184" rx="17" ry="11" fill="url(#mimo-furBody)" stroke="#B8BEC8" strokeWidth="2.5" />
    <ellipse cx="134" cy="184" rx="17" ry="11" fill="url(#mimo-furBody)" stroke="#B8BEC8" strokeWidth="2.5" />

    {/* body */}
    <ellipse cx="100" cy="148" rx="52" ry="46" fill="url(#mimo-furBody)" stroke="#B8BEC8" strokeWidth="2.5" />

    {/* belly patch */}
    <ellipse cx="100" cy="160" rx="32" ry="30" fill="url(#mimo-bellyFur)" />

    {/* front paws */}
    <ellipse cx="75" cy="184" rx="16" ry="13" fill="url(#mimo-bellyFur)" stroke="#B8BEC8" strokeWidth="2.5" />
    <ellipse cx="125" cy="184" rx="16" ry="13" fill="url(#mimo-bellyFur)" stroke="#B8BEC8" strokeWidth="2.5" />
    <path d="M69 187 Q75 191 81 187" stroke="#C9CDD4" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M119 187 Q125 191 131 187" stroke="#C9CDD4" strokeWidth="1.5" strokeLinecap="round" fill="none" />

    {/* left ear (head circle drawn after, overlapping the base, so there's no seam) */}
    <path
      d="M52 64 Q36 22 66 12 Q86 18 82 54 Q67 50 52 64 Z"
      fill="url(#mimo-furHead)" stroke="#B8BEC8" strokeWidth="2.5" strokeLinejoin="round"
    />
    <path d="M58 54 Q50 30 66 22 Q77 28 74 48 Q66 44 58 54 Z" fill="url(#mimo-earInner)" />

    {/* right ear */}
    <path
      d="M148 64 Q164 22 134 12 Q114 18 118 54 Q133 50 148 64 Z"
      fill="url(#mimo-furHead)" stroke="#B8BEC8" strokeWidth="2.5" strokeLinejoin="round"
    />
    <path d="M142 54 Q150 30 134 22 Q123 28 126 48 Q134 44 142 54 Z" fill="url(#mimo-earInner)" />

    {/* head */}
    <circle cx="100" cy="96" r="60" fill="url(#mimo-furHead)" stroke="#B8BEC8" strokeWidth="2.5" />

    {/* tabby brow-stripe marking, subtle, on every mood */}
    <path d="M84 48 Q89 39 94 48" stroke="#C9CDD4" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />
    <path d="M106 48 Q111 39 116 48" stroke="#C9CDD4" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />
    <path d="M97 39 L100 54 L103 39" stroke="#C9CDD4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6" />

    {/* per-mood face content (blush, eyes, brows, nose, mouth, extras) */}
    {children}

    {/* whiskers */}
    <path d="M30 98 Q47 96 58 101 M30 109 Q47 109 58 109" stroke="#C9CDD4" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M170 98 Q153 96 142 101 M170 109 Q153 109 142 109" stroke="#C9CDD4" strokeWidth="2" strokeLinecap="round" fill="none" />

    {/* collar + bell, sitting with a visible neck gap below the chin */}
    <path d="M66 134 Q100 148 134 134 L131 144 Q100 156 69 144 Z" fill="url(#mimo-collarGrad)" stroke="#E8763D" strokeWidth="1.5" />
    <circle cx="100" cy="149" r="8.5" fill="url(#mimo-bellGrad)" stroke="#E8AE3D" strokeWidth="1.5" />
    <path d="M95.5 149 L104.5 149 M100 146.5 L100 151.5" stroke="#E8AE3D" strokeWidth="1.3" strokeLinecap="round" />
    <circle cx="100" cy="152.5" r="1.4" fill="#B8842A" />
  </>
);

// ---- Per-mood face content ----

const FaceIdle = () => (
  <>
    <ellipse cx="58" cy="110" rx="14" ry="10" fill="url(#mimo-cheekBlush)" />
    <ellipse cx="142" cy="110" rx="14" ry="10" fill="url(#mimo-cheekBlush)" />

    <ellipse cx="76" cy="94" rx="15" ry="17" fill="url(#mimo-eyeShine)" />
    <ellipse cx="76" cy="94" rx="15" ry="17" fill="none" stroke="#2B7A91" strokeWidth="1.5" />
    <ellipse cx="76" cy="98" rx="9" ry="11" fill="#1E5266" opacity="0.85" />
    <circle cx="81" cy="86" r="5.5" fill="#FFFFFF" />
    <circle cx="71" cy="98" r="2.2" fill="#FFFFFF" opacity="0.9" />

    <ellipse cx="124" cy="94" rx="15" ry="17" fill="url(#mimo-eyeShine)" />
    <ellipse cx="124" cy="94" rx="15" ry="17" fill="none" stroke="#2B7A91" strokeWidth="1.5" />
    <ellipse cx="124" cy="98" rx="9" ry="11" fill="#1E5266" opacity="0.85" />
    <circle cx="129" cy="86" r="5.5" fill="#FFFFFF" />
    <circle cx="119" cy="98" r="2.2" fill="#FFFFFF" opacity="0.9" />

    <path d="M93 116 Q100 112 107 116 Q103 122 100 123 Q97 122 93 116 Z" fill="#FF9E92" />
    <path d="M88 120 Q100 130 112 120" stroke="#7A7F8C" strokeWidth="2.2" strokeLinecap="round" fill="none" />
  </>
);

const FaceHappy = () => (
  <>
    <ellipse cx="58" cy="106" rx="15" ry="11" fill="url(#mimo-cheekBlush)" />
    <ellipse cx="142" cy="106" rx="15" ry="11" fill="url(#mimo-cheekBlush)" />

    <path d="M62 94 Q76 78 90 94" fill="none" stroke="#3A3F4B" strokeWidth="5" strokeLinecap="round" />
    <path d="M110 94 Q124 78 138 94" fill="none" stroke="#3A3F4B" strokeWidth="5" strokeLinecap="round" />

    <path d="M93 110 Q100 106 107 110 Q103 116 100 117 Q97 116 93 110 Z" fill="#FF9E92" />

    <path d="M84 116 Q100 134 116 116 Q108 126 100 126 Q92 126 84 116 Z" fill="#C76B5D" />
    <path d="M84 116 Q100 134 116 116" fill="none" stroke="#7A7F8C" strokeWidth="2" strokeLinecap="round" />
    <ellipse cx="100" cy="120" rx="6" ry="3.5" fill="#FF8A7D" />
  </>
);

const FaceSad = () => (
  <>
    {/* no blush when sad */}
    <path d="M62 92 Q76 86 90 94" fill="none" stroke="#3A3F4B" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
    <ellipse cx="76" cy="98" rx="13" ry="13" fill="url(#mimo-eyeShine)" opacity="0.8" />
    <path d="M63 92 Q76 86 89 92 L89 98 Q76 91 63 98 Z" fill="url(#mimo-furHead)" />
    <ellipse cx="76" cy="100" rx="7" ry="8" fill="#1E5266" opacity="0.8" />
    <circle cx="80" cy="98" r="3.8" fill="#FFFFFF" />

    <path d="M110 94 Q124 86 138 92" fill="none" stroke="#3A3F4B" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
    <ellipse cx="124" cy="98" rx="13" ry="13" fill="url(#mimo-eyeShine)" opacity="0.8" />
    <path d="M111 92 Q124 86 137 92 L137 98 Q124 91 111 98 Z" fill="url(#mimo-furHead)" />
    <ellipse cx="124" cy="100" rx="7" ry="8" fill="#1E5266" opacity="0.8" />
    <circle cx="128" cy="98" r="3.8" fill="#FFFFFF" />

    <path d="M64 80 Q76 84 86 80" fill="none" stroke="#C9CDD4" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    <path d="M114 80 Q124 84 136 80" fill="none" stroke="#C9CDD4" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

    <path d="M93 116 Q100 112 107 116 Q103 122 100 123 Q97 122 93 116 Z" fill="#FF9E92" />
    <path d="M88 128 Q100 119 112 128" stroke="#7A7F8C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </>
);

const FaceThinking = () => (
  <>
    <ellipse cx="58" cy="110" rx="14" ry="10" fill="url(#mimo-cheekBlush)" opacity="0.7" />
    <ellipse cx="142" cy="110" rx="14" ry="10" fill="url(#mimo-cheekBlush)" opacity="0.7" />

    <ellipse cx="76" cy="94" rx="14" ry="16" fill="url(#mimo-eyeShine)" />
    <ellipse cx="76" cy="94" rx="14" ry="16" fill="none" stroke="#2B7A91" strokeWidth="1.5" />
    <ellipse cx="80" cy="92" rx="8" ry="10" fill="#1E5266" opacity="0.85" />
    <circle cx="83" cy="85" r="5" fill="#FFFFFF" />

    <ellipse cx="124" cy="94" rx="14" ry="16" fill="url(#mimo-eyeShine)" />
    <ellipse cx="124" cy="94" rx="14" ry="16" fill="none" stroke="#2B7A91" strokeWidth="1.5" />
    <ellipse cx="128" cy="92" rx="8" ry="10" fill="#1E5266" opacity="0.85" />
    <circle cx="131" cy="85" r="5" fill="#FFFFFF" />

    {/* one raised brow for a curious/pondering look */}
    <path d="M108 76 Q124 68 138 75" fill="none" stroke="#C9CDD4" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />

    <path d="M93 116 Q100 112 107 116 Q103 122 100 123 Q97 122 93 116 Z" fill="#FF9E92" />
    <ellipse cx="100" cy="125" rx="4.5" ry="3.5" fill="none" stroke="#7A7F8C" strokeWidth="2" strokeLinecap="round" />

    {/* thought-dot trail, floating in open space above the head */}
    <circle cx="148" cy="28" r="3.5" fill="#C9CDD4" opacity="0.8" />
    <circle cx="158" cy="18" r="2.5" fill="#C9CDD4" opacity="0.6" />
    <circle cx="166" cy="9" r="1.7" fill="#C9CDD4" opacity="0.45" />
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

  const variants = {
    idle: { y: [0, -10, 0], rotate: [0, 1.5, 0, -1.5, 0], transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } },
    happy: { scale: [1, 1.15, 1], y: [0, -18, 0], rotate: [0, -6, 6, 0], transition: { duration: 0.6 } },
    sad: { y: [0, 4, 0], rotate: [-4, 4, -4], transition: { duration: 1.6, repeat: Infinity } },
    thinking: { rotate: [0, -8, 8, 0], y: [0, -4, 0], transition: { duration: 2.6, repeat: Infinity } },
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
        whileHover={{ scale: 1.06, rotate: 4 }}
        whileTap={{ scale: 0.94 }}
        className="cursor-pointer"
        style={{ filter: 'drop-shadow(0px 10px 14px rgba(0,0,0,0.18))' }}
      >
        <svg
          width={pixelSize}
          height={pixelSize * (212 / 200)}
          viewBox="0 0 200 212"
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
