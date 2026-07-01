import React from 'react';
import { motion } from 'framer-motion';
import GameTile from './GameTile';

// RealLifeCard — brings the 9 reallife/*.jsx activity pages onto the same
// tactile GameTile visual language (gradient surface, soft inset highlight,
// offset shadow) the rest of the app already uses, instead of the flat
// `bg-[#FEFAF6] rounded-2xl p-6` / `bg-[#FFD166] rounded-2xl p-6` divs they
// used before.
//
// Every one of the 9 pages follows the same 4-section pattern: 3 cream
// "paper" sections (Tujuan/Bahan/Langkah) + 1 yellow "tips" section. Rather
// than have each page hand-pick a tone, RealLifeCard infers it from the
// `tone` prop's intent (paper vs placeholder) so call sites read declaratively.
//
// `index` drives a staggered fade-in (consistent with how GameTile is used
// elsewhere for sequential reveals) — purely cosmetic, safe to ignore if a
// page wants all 4 sections to appear at once.

const RealLifeCard = ({ icon, title, tone = 'paper', index = 0, children }) => {
  return (
    <GameTile
      tone={tone}
      className="p-6"
      as={motion.div}
      animateProps={{
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.35, delay: index * 0.08 },
      }}
    >
      <h3 className="heading-font text-xl text-[#2B2D42] mb-4">
        {icon} {title}
      </h3>
      {children}
    </GameTile>
  );
};

export default RealLifeCard;
