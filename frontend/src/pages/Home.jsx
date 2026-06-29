import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import TrackCard from '../components/TrackCard';
import Mascot from '../components/Mascot';
import { CloudDecoration, StarSparkle, BalloonDecoration } from '../components/Decorations';
import { getProgress } from '../utils/localStorage';
import { audioManager } from '../utils/audioManager';
import { Trophy } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    setProgress(getProgress());
    audioManager.playBgm('mainMenu');
  }, []);

  if (!progress) return null;

  const tracks = [
    {
      track: 'computational',
      title: 'Berpikir Komputasional',
      description: 'Belajar cara komputer berpikir! Mengurutkan, menemukan pola, dan membuat langkah-langkah.',
      icon: '🧠',
      color: '#4D96FF',
      completed: progress.computational.completed,
      total: 3
    },
    {
      track: 'critical',
      title: 'Berpikir Kritis',
      description: 'Belajar bertanya dan berpikir lebih dalam! Mencari perbedaan dan memahami sebab-akibat.',
      icon: '🔍',
      color: '#6BCB77',
      completed: progress.critical.completed,
      total: 3
    },
    {
      track: 'design',
      title: 'Berpikir Desain',
      description: 'Belajar membuat solusi kreatif! Memahami masalah dan menciptakan ide-ide baru.',
      icon: '🎨',
      color: '#9D4CDD',
      completed: progress.design.completed,
      total: 3
    }
  ];

  return (
    <div className="min-h-screen bg-[#FEFAF6] py-8 px-4 md:px-8 overflow-hidden" data-testid="home-page">
      {/* Header with Mascot */}
      <div className="max-w-7xl mx-auto mb-12 relative">
        {/* Ornamen dekoratif — awan, bintang, balon mengambang di sekitar
            header. Posisi absolute, disembunyikan di layar kecil supaya
            tidak menutupi konten pada mobile. */}
        <CloudDecoration className="hidden lg:block absolute -top-6 left-0 w-28 pointer-events-none" delay={0} />
        <CloudDecoration className="hidden lg:block absolute top-2 right-10 w-20 pointer-events-none" delay={0.4} />
        <StarSparkle className="hidden md:block absolute top-0 left-[28%] w-8 pointer-events-none" delay={0.2} />
        <StarSparkle className="hidden md:block absolute bottom-0 right-[22%] w-6 pointer-events-none" color="#6BCB77" delay={0.9} />
        <BalloonDecoration className="hidden lg:block absolute -top-4 right-0 w-10 pointer-events-none" color="#9D4CDD" delay={0.3} />

        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8 relative"
        >
          <div className="flex-1 text-center md:text-left">
            <h1 className="heading-font text-4xl sm:text-5xl lg:text-6xl text-[#2B2D42] mb-4">
              PreE-du <motion.span
                className="inline-block"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
              >🌟</motion.span>
            </h1>
            <p className="body-font text-xl md:text-2xl text-[#6C757D] leading-relaxed">
              Belajar sambil bermain — khusus untuk kamu!
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Mascot mood="idle" size="large" />
            <motion.button
              data-testid="trophy-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                audioManager.playSfx('click');
                navigate('/trophy');
              }}
              className="bouncy-button bg-[#FFD166] text-[#2B2D42] px-6 py-3 rounded-full font-bold text-lg flex items-center gap-2 shadow-lg"
            >
              <Trophy className="w-6 h-6" />
              Trofi Ku ({progress.totalStars} ⭐)
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Track Cards Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tracks.map((track, index) => (
            <motion.div
              key={track.track}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.12, duration: 0.5 }}
            >
              <TrackCard {...track} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fun Footer Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="max-w-7xl mx-auto mt-12 text-center"
      >
        <div className="chunky-card bg-white p-8 border-4 border-[#FFD166]/30">
          <p className="body-font text-xl text-[#2B2D42] leading-relaxed">
            💡 <strong>Setiap topik</strong> punya permainan online DAN aktivitas seru di dunia nyata! Mainkan semuanya dan kumpulkan bintang! ⭐
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;

