import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getProgress, updateTopicProgress } from '../utils/localStorage';
import Mascot from '../components/Mascot';
import { BalloonDecoration, StarSparkle } from '../components/Decorations';
import { audioManager } from '../utils/audioManager';
import { celebrateWin, celebrateBigWin } from '../utils/confetti';
import { ArrowLeft, Star, Printer, Play } from 'lucide-react';

// Import all games
import SortingGame from '../games/SortingGame';
import PatternGame from '../games/PatternGame';
import AlgorithmGame from '../games/AlgorithmGame';
import OddOneOutGame from '../games/OddOneOutGame';
import FactOpinionGame from '../games/FactOpinionGame';
import CauseEffectGame from '../games/CauseEffectGame';
import EmpathyGame from '../games/EmpathyGame';
import IdeationGame from '../games/IdeationGame';
import PrototypeGame from '../games/PrototypeGame';

// Import all real life activities
import SortingRealLife from '../reallife/SortingRealLife';
import PatternRealLife from '../reallife/PatternRealLife';
import AlgorithmRealLife from '../reallife/AlgorithmRealLife';
import OddOneOutRealLife from '../reallife/OddOneOutRealLife';
import FactOpinionRealLife from '../reallife/FactOpinionRealLife';
import CauseEffectRealLife from '../reallife/CauseEffectRealLife';
import EmpathyRealLife from '../reallife/EmpathyRealLife';
import IdeationRealLife from '../reallife/IdeationRealLife';
import PrototypeRealLife from '../reallife/PrototypeRealLife';

const TopicPage = () => {
  const { trackId, topicId } = useParams();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [showRealLife, setShowRealLife] = useState(false);
  const [topicComplete, setTopicComplete] = useState(false);
  const [stars, setStars] = useState(0);
  const [mascotMood, setMascotMood] = useState('idle');

  useEffect(() => {
    setProgress(getProgress());
    // BGM diatur per-track (computational/critical/design), sama dengan
    // BGM yang sudah main di TrackOverview track ini — tidak di-restart.
    audioManager.playBgm(trackId);
  }, [trackId]);

  if (!progress) return null;

  const gameComponents = {
    sorting: SortingGame,
    patterns: PatternGame,
    algorithms: AlgorithmGame,
    oddOneOut: OddOneOutGame,
    factOpinion: FactOpinionGame,
    causeEffect: CauseEffectGame,
    empathy: EmpathyGame,
    ideation: IdeationGame,
    prototype: PrototypeGame
  };

  const realLifeComponents = {
    sorting: SortingRealLife,
    patterns: PatternRealLife,
    algorithms: AlgorithmRealLife,
    oddOneOut: OddOneOutRealLife,
    factOpinion: FactOpinionRealLife,
    causeEffect: CauseEffectRealLife,
    empathy: EmpathyRealLife,
    ideation: IdeationRealLife,
    prototype: PrototypeRealLife
  };

  const GameComponent = gameComponents[topicId];
  const RealLifeComponent = realLifeComponents[topicId];

  const handleGameComplete = (earnedStars) => {
    setGameComplete(true);
    setStars(earnedStars);

    // Keputusan menang/kalah: 0 bintang (semua jawaban salah) = kalah,
    // 1-3 bintang = menang. Lihat juga komentar di tiap file game/*.jsx.
    if (earnedStars === 0) {
      setMascotMood('sad');
      audioManager.playSfx('lose');
    } else {
      setMascotMood('happy');
      audioManager.playSfx('win');
      if (earnedStars >= 3) {
        celebrateBigWin();
      } else {
        celebrateWin();
      }
    }
  };

  const handleTopicComplete = () => {
    audioManager.playSfx('click');
    updateTopicProgress(trackId, topicId, stars);
    setTopicComplete(true);
    if (stars >= 3) celebrateBigWin();
  };

  const handlePrint = () => {
    audioManager.playSfx('click');
    window.print();
  };

  const handleStartRealLife = () => {
    audioManager.playSfx('click');
    setShowRealLife(true);
  };

  const handleBackToTrack = () => {
    audioManager.playSfx('click');
    navigate(`/track/${trackId}`);
  };

  const topicTitles = {
    sorting: 'Mengurutkan Angka',
    patterns: 'Menemukan Pola',
    algorithms: 'Instruksi Langkah demi Langkah',
    oddOneOut: 'Mana yang Berbeda?',
    factOpinion: 'Fakta atau Opini?',
    causeEffect: 'Apa Akibatnya?',
    empathy: 'Apa Masalahnya?',
    ideation: 'Ide Sebanyak Mungkin!',
    prototype: 'Buat dan Coba!'
  };

  const trackColors = {
    computational: '#4D96FF',
    critical: '#6BCB77',
    design: '#9D4CDD'
  };

  return (
    <div className="min-h-screen py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.button
          onClick={handleBackToTrack}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          className="bouncy-button bg-white text-[#2B2D42] px-6 py-3 rounded-full font-bold mb-8 flex items-center gap-2 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali
        </motion.button>

        {/* Topic Header */}
        <div className="chunky-card glass-card p-8 mb-8 text-center">
          <div className="flex justify-center mb-4">
            <Mascot mood={mascotMood} size="large" />
          </div>
          <h1
            className="heading-font text-3xl md:text-4xl mb-2"
            style={{ color: trackColors[trackId] }}
          >
            {topicTitles[topicId]}
          </h1>
          <p className="body-font text-lg text-[#6C757D]">
            Selesaikan permainan online, lalu coba aktivitas di dunia nyata!
          </p>
        </div>

        <AnimatePresence mode="wait">
          {/* Game Section */}
          {!gameComplete && !showRealLife && (
            <motion.div
              key="game"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="chunky-card glass-card p-8 mb-8"
            >
              <div className="text-center mb-6">
                <h2 className="heading-font text-2xl text-[#2B2D42] mb-2">
                  🎮 Permainan Online
                </h2>
                <p className="body-font text-lg text-[#6C757D]">
                  Mainkan game ini dulu, yuk!
                </p>
              </div>
              <GameComponent onComplete={handleGameComplete} />
            </motion.div>
          )}

          {/* Real Life Section Button */}
          {gameComplete && !showRealLife && !topicComplete && (
            <motion.div
              key="bridge"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="chunky-card glass-card p-8 mb-8 text-center"
            >
              <div className="flex justify-center mb-6">
                <Mascot mood="happy" size="large" />
              </div>
              <h2 className="heading-font text-2xl text-[#2B2D42] mb-4">
                🎉 Hebat! Kamu dapat {stars} bintang!
              </h2>
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.15 + i * 0.12, type: 'spring', stiffness: 220 }}
                  >
                    <Star className={`w-10 h-10 ${i < stars ? 'fill-[#FFD166] text-[#FFD166]' : 'text-gray-200'}`} />
                  </motion.div>
                ))}
              </div>
              <motion.button
                onClick={handleStartRealLife}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="bouncy-button bg-[#6BCB77] text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg flex items-center gap-3 mx-auto"
              >
                <Play className="w-6 h-6" />
                Sekarang Kita Main Beneran! 🎊
              </motion.button>
            </motion.div>
          )}

          {/* Real Life Activity */}
          {showRealLife && !topicComplete && (
            <motion.div
              key="reallife"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="chunky-card glass-card p-8 mb-8 print:shadow-none"
            >
              <div className="flex items-center justify-between mb-6 no-print">
                <h2 className="heading-font text-2xl text-[#2B2D42]">
                  📋 Aktivitas Dunia Nyata
                </h2>
                <button
                  onClick={handlePrint}
                  className="bouncy-button bg-[#4D96FF] text-white px-4 py-2 rounded-full font-bold flex items-center gap-2"
                >
                  <Printer className="w-5 h-5" />
                  Cetak
                </button>
              </div>
              <RealLifeComponent />
              <motion.button
                onClick={handleTopicComplete}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="bouncy-button mt-8 w-full bg-[#FFD166] text-[#2B2D42] py-4 px-8 rounded-full font-bold text-xl shadow-lg"
              >
                ✅ Saya Sudah Selesai!
              </motion.button>
            </motion.div>
          )}

          {/* Completion Screen */}
          {topicComplete && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              className="chunky-card glass-card p-8 mb-8 text-center relative overflow-hidden"
            >
              <BalloonDecoration className="hidden sm:block absolute top-2 left-2 w-10 pointer-events-none" color="#FF6B6B" delay={0} />
              <BalloonDecoration className="hidden sm:block absolute top-2 right-4 w-9 pointer-events-none" color="#4D96FF" delay={0.25} />
              <StarSparkle className="hidden sm:block absolute bottom-4 left-8 w-8 pointer-events-none" delay={0.5} />
              <StarSparkle className="hidden sm:block absolute bottom-6 right-10 w-7 pointer-events-none" color="#9D4CDD" delay={0.8} />
              <motion.div
                className="text-6xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              >
                🎊
              </motion.div>
              <h2 className="heading-font text-3xl text-[#2B2D42] mb-4">
                SELAMAT! TOPIK SELESAI!
              </h2>
              <div className="flex justify-center gap-2 mb-6">
                {[...Array(stars)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2 + i * 0.15, type: 'spring', stiffness: 220 }}
                  >
                    <Star className="w-12 h-12 fill-[#FFD166] text-[#FFD166]" />
                  </motion.div>
                ))}
              </div>
              <p className="body-font text-xl text-[#6C757D] mb-8">
                Kamu sudah menyelesaikan topik ini dengan {stars} bintang!
              </p>
              <motion.button
                onClick={() => {
                  audioManager.playSfx('click');
                  navigate(`/track/${trackId}`);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="bouncy-button bg-[#4D96FF] text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg"
              >
                Lanjut ke Topik Berikutnya →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TopicPage;

