import React from 'react';

// Scene latar berlapis (langit + siluet bukit/awan besar) per track.
// Sebelumnya satu-satunya background adalah warna solid + partikel kecil
// di canvas (AnimatedBackground.jsx), yang efeknya nyaris tak terlihat
// karena opacity rendah dan ukurannya kecil dibanding viewport. Komponen
// ini menambahkan lapisan "tempat" yang lebih jelas: gradasi langit dua
// warna dan siluet pegunungan/awan besar yang fixed di posisinya, supaya
// tiap track punya nuansa scene yang langsung kelihatan dari layar
// manapun, sebelum partikel ambient (AnimatedBackground) ditumpuk di atasnya.
//
// Ini SVG statis (bukan canvas), jadi ringan -- tidak butuh animation
// frame loop sama sekali. Diberi viewBox lebar (1600) supaya skala tetap
// proporsional di layar lebar tanpa terlihat meregang.

const SCENES = {
  default: {
    skyTop: '#BFE3FF',
    skyBottom: '#FEFAF6',
    hillFar: '#A8D8B9',
    hillNear: '#6BCB77',
    cloudColor: '#FFFFFF',
  },
  computational: {
    skyTop: '#AFD6FF',
    skyBottom: '#FEFAF6',
    hillFar: '#9CC4F0',
    hillNear: '#4D96FF',
    cloudColor: '#FFFFFF',
  },
  critical: {
    skyTop: '#BCEAC9',
    skyBottom: '#FEFAF6',
    hillFar: '#9ED6AE',
    hillNear: '#6BCB77',
    cloudColor: '#FFFFFF',
  },
  design: {
    skyTop: '#E3C9FB',
    skyBottom: '#FEFAF6',
    hillFar: '#CBA8EE',
    hillNear: '#9D4CDD',
    cloudColor: '#FFFFFF',
  },
};

const SceneBackground = ({ type = 'default' }) => {
  const scene = SCENES[type] || SCENES.default;
  const gradId = `sky-${type}`;

  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={scene.skyTop} />
          <stop offset="100%" stopColor={scene.skyBottom} />
        </linearGradient>
      </defs>

      {/* Langit gradasi mengisi seluruh viewport */}
      <rect x="0" y="0" width="1600" height="900" fill={`url(#${gradId})`} />

      {/* Matahari/sumber cahaya lembut di pojok atas */}
      <circle cx="1320" cy="140" r="90" fill={scene.cloudColor} opacity="0.35" />
      <circle cx="1320" cy="140" r="55" fill={scene.cloudColor} opacity="0.55" />

      {/* Awan besar statis -- jauh lebih terlihat dibanding partikel kecil
          di canvas sebelumnya. Bentuk dari overlap ellipse, sama seperti
          teknik 'cloud' di AnimatedBackground tapi ukuran skala scene. */}
      <g opacity="0.8">
        <ellipse cx="260" cy="160" rx="120" ry="46" fill={scene.cloudColor} />
        <ellipse cx="340" cy="130" rx="100" ry="56" fill={scene.cloudColor} />
        <ellipse cx="420" cy="165" rx="110" ry="42" fill={scene.cloudColor} />
      </g>
      <g opacity="0.6">
        <ellipse cx="980" cy="230" rx="90" ry="34" fill={scene.cloudColor} />
        <ellipse cx="1050" cy="210" rx="75" ry="40" fill={scene.cloudColor} />
        <ellipse cx="1115" cy="232" rx="80" ry="30" fill={scene.cloudColor} />
      </g>

      {/* Siluet bukit jauh (lebih pucat, di belakang) */}
      <path
        d="M0,560 Q150,480 320,540 T700,520 T1100,560 T1600,510 V900 H0 Z"
        fill={scene.hillFar}
        opacity="0.55"
      />

      {/* Siluet bukit dekat (warna track, paling depan) */}
      <path
        d="M0,680 Q200,600 450,660 T900,640 T1300,670 T1600,630 V900 H0 Z"
        fill={scene.hillNear}
        opacity="0.5"
      />

      {/* Sedikit tekstur rumput/bunga kecil di kaki bukit dekat, supaya
          tidak terasa kosong polos di area yang paling dekat ke konten */}
      <g opacity="0.35">
        {[120, 260, 410, 560, 720, 880, 1040, 1200, 1360, 1500].map((x, i) => (
          <circle key={x} cx={x} cy={850 - (i % 3) * 8} r="6" fill={scene.hillNear} />
        ))}
      </g>
    </svg>
  );
};

export default SceneBackground;
