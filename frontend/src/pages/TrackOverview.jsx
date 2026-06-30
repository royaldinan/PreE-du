import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProgress } from '../utils/localStorage';
import Mascot from '../components/Mascot';
import { audioManager } from '../utils/audioManager';
import { ArrowLeft, Star, Lock, CheckCircle2 } from 'lucide-react';

// ═══════════════════════════════════════════════════
// Posisi node di "peta jalur" — zig-zag naik ke atas.
// Koordinat dalam viewBox SVG (0-400 lebar, 0-520 tinggi).
// Node 1 di bawah, Node 3 di atas (pemain "naik" levelnya).
const NODE_POSITIONS = [
  { x: 90, y: 430 },   // topik 1 (bawah-kiri)
  { x: 310, y: 280 },  // topik 2 (tengah-kanan)
  { x: 90, y: 120 },   // topik 3 (atas-kiri)
];

// Jalur kurva bezier yang menghubungkan node
const PATH_D =
  'M 90 430 C 90 370, 310 340, 310 280 C 310 220, 90 180, 90 120';

const NodeBadge = ({ index, topic, topicProgress, trackColor, onClick }) => {
  const pos = NODE_POSITIONS[index];
  const isCompleted = topicProgress?.completed;
  const stars = topicProgress?.stars || 0;
  const isLocked = false; // semua topik selalu bisa diakses

  // Warna fill node: hijau jika selesai, track-color jika belum
  const nodeFill = isCompleted ? '#22c55e' : trackColor;
  const nodeStroke = isCompleted ? '#16a34a' : '#fff';

  return (
    <g
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      {/* Shadow node supaya terkesan embossed */}
      <circle cx={pos.x + 3} cy={pos.y + 5} r={46} fill="rgba(0,0,0,0.15)" />

      {/* Node lingkaran utama */}
      <circle cx={pos.x} cy={pos.y} r={46} fill={nodeFill} stroke={nodeStroke} strokeWidth={5} />

      {/* Inner highlight (memberi kesan 3D / glossy) */}
      <ellipse
        cx={pos.x - 8} cy={pos.y - 16}
        rx={20} ry={12}
        fill="rgba(255,255,255,0.35)"
      />

      {/* Nomor atau centang */}
      {isCompleted ? (
        <>
          <text x={pos.x} y={pos.y + 8} textAnchor="middle" fontSize="32" fill="#fff">✓</text>
        </>
      ) : (
        <text
          x={pos.x} y={pos.y + 10}
          textAnchor="middle"
          fontSize="28"
          fontWeight="900"
          fill="#fff"
          fontFamily="Fredoka, sans-serif"
        >
          {index + 1}
        </text>
      )}

      {/* Bintang di bawah node (jika selesai) */}
      {isCompleted && stars > 0 && (
        <g>
          {[...Array(stars)].map((_, si) => (
            <text
              key={si}
              x={pos.x - (stars - 1) * 11 + si * 22}
              y={pos.y + 68}
              textAnchor="middle"
              fontSize="18"
            >⭐</text>
          ))}
        </g>
      )}

      {/* Label teks di sisi node (kiri/kanan bergantian sesuai posisi) */}
      <foreignObject
        x={index % 2 === 0 ? pos.x + 56 : pos.x - 200}
        y={pos.y - 34}
        width="180"
        height="88"
      >
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            background: 'rgba(255,255,255,0.92)',
            borderRadius: '16px',
            padding: '10px 14px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <p style={{
            fontFamily: 'Fredoka, sans-serif',
            fontWeight: '700',
            fontSize: '14px',
            color: '#2B2D42',
            margin: 0,
            lineHeight: 1.3,
          }}>
            {topic.icon} {topic.title}
          </p>
          <p style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: '11px',
            color: '#6C757D',
            margin: '4px 0 0 0',
          }}>
            {topic.description}
          </p>
        </div>
      </foreignObject>
    </g>
  );
};

// ═══════════════════════════════════════════════════
const TrackOverview = () => {
  const { trackId } = useParams();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    setProgress(getProgress());
    audioManager.playBgm(trackId);
  }, [trackId]);

  if (!progress) return null;

  const trackData = {
    computational: {
      title: 'Berpikir Komputasional',
      emoji: '🧠',
      color: '#4D96FF',
      topics: [
        { id: 'sorting', title: 'Mengurutkan Angka', description: 'Urutkan dari terkecil ke terbesar!', icon: '🔢' },
        { id: 'patterns', title: 'Menemukan Pola', description: 'Cari pola berikutnya!', icon: '🔷' },
        { id: 'algorithms', title: 'Instruksi Langkah', description: 'Buat langkah-langkah jawaban!', icon: '📝' }
      ]
    },
    critical: {
      title: 'Berpikir Kritis',
      emoji: '🔍',
      color: '#6BCB77',
      topics: [
        { id: 'oddOneOut', title: 'Mana yang Berbeda?', description: 'Temukan yang tidak sama!', icon: '❓' },
        { id: 'factOpinion', title: 'Fakta atau Opini?', description: 'Bedakan fakta & pendapat!', icon: '💭' },
        { id: 'causeEffect', title: 'Apa Akibatnya?', description: 'Pelajari sebab dan akibat!', icon: '⚡' }
      ]
    },
    design: {
      title: 'Berpikir Desain',
      emoji: '🎨',
      color: '#9D4CDD',
      topics: [
        { id: 'empathy', title: 'Apa Masalahnya?', description: 'Pahami masalah orang lain!', icon: '❤️' },
        { id: 'ideation', title: 'Ide Sebanyak Mungkin!', description: 'Ciptakan ide-ide kreatif!', icon: '💡' },
        { id: 'prototype', title: 'Buat dan Coba!', description: 'Bangun dan uji solusimu!', icon: '🛠️' }
      ]
    }
  };

  const track = trackData[trackId];
  if (!track) return <div>Track tidak ditemukan</div>;

  const trackProgress = progress[trackId];

  return (
    <div className="min-h-screen py-6 px-4" data-testid={`track-${trackId}-page`}>
      <div className="max-w-2xl mx-auto">

        {/* Tombol Kembali */}
        <motion.button
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}
          onClick={() => { audioManager.playSfx('click'); navigate('/'); }}
          className="bouncy-button glass-card text-[#2B2D42] px-5 py-3 rounded-full font-bold mb-6 flex items-center gap-2 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" /> Kembali
        </motion.button>

        {/* Header kartu */}
        <motion.div
          initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-6 mb-6 text-center shadow-xl"
        >
          <div className="flex items-center justify-center gap-4 mb-3">
            <Mascot mood="idle" size="medium" />
            <div>
              <h1 className="heading-font text-3xl md:text-4xl text-[#2B2D42]">
                {track.emoji} {track.title}
              </h1>
              <p className="body-font text-[#6C757D] mt-1">
                Ikuti jalur petualangan belajarmu!
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-3 mt-4">
            <Star className="w-6 h-6 fill-[#FFD166] text-[#FFD166] shrink-0" />
            <div className="flex-1 h-5 bg-white/60 rounded-full overflow-hidden border-2 border-white/80">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: track.color }}
                initial={{ width: 0 }}
                animate={{ width: `${(trackProgress.completed / 3) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
            <span className="body-font text-sm font-bold text-[#2B2D42] shrink-0">
              {trackProgress.completed}/3
            </span>
          </div>
        </motion.div>

        {/* ══════════════════════════════════
            PETA JALUR — SVG node 3D / embossed
            Menggantikan list card vertikal datar
            yang sebelumnya terasa seperti
            daftar menu biasa.
            ══════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="glass-card rounded-3xl p-4 shadow-xl"
        >
          <svg
            viewBox="0 0 400 560"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', overflow: 'visible' }}
          >
            {/* Jalur utama (putus-putus, bergelombang) */}
            <path
              d={PATH_D}
              fill="none"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <motion.path
              d={PATH_D}
              fill="none"
              stroke={track.color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="18 14"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
            />

            {/* Node tiap topik */}
            {track.topics.map((topic, index) => {
              const topicProgress = trackProgress.topics[topic.id];
              return (
                <NodeBadge
                  key={topic.id}
                  index={index}
                  topic={topic}
                  topicProgress={topicProgress}
                  trackColor={track.color}
                  onClick={() => {
                    audioManager.playSfx('click');
                    navigate(`/topic/${trackId}/${topic.id}`);
                  }}
                />
              );
            })}

            {/* Ikon finish di atas jalur */}
            <text x="90" y="50" textAnchor="middle" fontSize="32">🏁</text>
            <text x="90" y="490" textAnchor="middle" fontSize="32">🚀</text>
          </svg>
        </motion.div>

        {/* Hint kecil */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="text-center body-font text-white/80 text-sm mt-4 drop-shadow"
        >
          Klik node untuk mulai bermain! 🎯
        </motion.p>
      </div>
    </div>
  );
};

export default TrackOverview;
