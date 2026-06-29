import React from 'react';
import { motion } from 'framer-motion';

// Kumpulan ornamen SVG statis bertema anak-anak. Dipakai untuk mempercantik
// sudut-sudut halaman (header, kartu kosong, dsb) dengan elemen yang lebih
// "menggambar" dibanding emoji polos, tapi tetap ringan (SVG kecil, bukan
// gambar raster) dan mudah di-reuse di banyak tempat.

export const CloudDecoration = ({ className = '', delay = 0 }) => (
  <motion.svg
    viewBox="0 0 120 70"
    className={className}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: [0, -8, 0] }}
    transition={{ opacity: { duration: 0.6, delay }, y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay } }}
  >
    <ellipse cx="35" cy="45" rx="28" ry="20" fill="white" opacity="0.85" />
    <ellipse cx="60" cy="32" rx="32" ry="26" fill="white" opacity="0.85" />
    <ellipse cx="88" cy="45" rx="26" ry="19" fill="white" opacity="0.85" />
    <ellipse cx="60" cy="50" rx="45" ry="16" fill="white" opacity="0.85" />
  </motion.svg>
);

export const StarSparkle = ({ className = '', color = '#FFD166', delay = 0 }) => (
  <motion.svg
    viewBox="0 0 40 40"
    className={className}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.1, 0.8], rotate: [0, 15, 0] }}
    transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay }}
  >
    <path
      d="M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z"
      fill={color}
    />
  </motion.svg>
);

export const BalloonDecoration = ({ className = '', color = '#FF6B6B', delay = 0 }) => (
  <motion.svg
    viewBox="0 0 60 110"
    className={className}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: [0, -14, 0], rotate: [-3, 3, -3] }}
    transition={{ opacity: { duration: 0.6, delay }, y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay }, rotate: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay } }}
  >
    <ellipse cx="30" cy="35" rx="26" ry="32" fill={color} />
    <ellipse cx="22" cy="22" rx="8" ry="11" fill="white" opacity="0.3" />
    <path d="M30 67 L26 74 L34 74 Z" fill={color} />
    <line x1="30" y1="74" x2="30" y2="108" stroke="#999" strokeWidth="1.5" />
  </motion.svg>
);

export const RainbowArc = ({ className = '' }) => (
  <svg viewBox="0 0 200 100" className={className}>
    <path d="M10 100 A90 90 0 0 1 190 100" fill="none" stroke="#FF6B6B" strokeWidth="10" />
    <path d="M25 100 A75 75 0 0 1 175 100" fill="none" stroke="#FFD166" strokeWidth="10" />
    <path d="M40 100 A60 60 0 0 1 160 100" fill="none" stroke="#6BCB77" strokeWidth="10" />
    <path d="M55 100 A45 45 0 0 1 145 100" fill="none" stroke="#4D96FF" strokeWidth="10" />
    <path d="M70 100 A30 30 0 0 1 130 100" fill="none" stroke="#9D4CDD" strokeWidth="10" />
  </svg>
);

export default {
  CloudDecoration,
  StarSparkle,
  BalloonDecoration,
  RainbowArc,
};
