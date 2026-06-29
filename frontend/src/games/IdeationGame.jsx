import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Mascot from '../components/Mascot';
import { audioManager } from '../utils/audioManager';
import { celebrateCorrectAnswer } from '../utils/confetti';

const IdeationGame = ({ onComplete }) => {
  const [ideas, setIdeas] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameComplete, setGameComplete] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [mascotMood, setMascotMood] = useState('idle');
  const [isPlaying, setIsPlaying] = useState(false);

  const problems = [
    'Tas sekolah terlalu berat',
    'Lupa bawa pensil ke sekolah',
    'Kamar berantakan',
    'Bosan saat hujan',
    'Susah bangun pagi',
    'Sepatu cepat kotor'
  ];

  // Sebelumnya problem selalu index 0 ("Tas sekolah terlalu berat") karena
  // currentRound tidak pernah berubah selama sesi bermain. Sekarang dipilih
  // acak sekali per sesi supaya bervariasi tiap kali game dimulai/diulang.
  const [problemIndex, setProblemIndex] = useState(() => Math.floor(Math.random() * problems.length));

  const ideaEmojis = ['💡', '✨', '🌟', '🎨', '🚀', '⭐', '🔥', '💫', '🎯', '🏆'];

  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && isPlaying) {
      endGame();
    }
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    audioManager.playSfx('click');
    setIsPlaying(true);
    setTimeLeft(60);
    setIdeas([]);
    setFeedback('');
  };

  const addIdea = () => {
    if (!isPlaying) return;
    // Tidak ada jawaban "salah" di game ini — setiap ide yang berhasil
    // dikumpulkan dianggap sebagai keberhasilan kecil (SFX correct).
    audioManager.playSfx('correct');
    celebrateCorrectAnswer();
    const randomEmoji = ideaEmojis[Math.floor(Math.random() * ideaEmojis.length)];
    setIdeas([...ideas, randomEmoji]);
    setMascotMood('happy');
    setTimeout(() => setMascotMood('idle'), 500);
  };

  const endGame = () => {
    setIsPlaying(false);
    setGameComplete(true);
    // 0 ide terkumpul -> kalah (0 bintang). Selain itu -> menang.
    const totalStars = ideas.length >= 8 ? 3 : ideas.length >= 5 ? 2 : ideas.length >= 1 ? 1 : 0;
    setFeedback(`Kamu dapat ${ideas.length} ide!`);
    onComplete(totalStars);
  };

  const resetGame = () => {
    audioManager.playSfx('click');
    setGameComplete(false);
    setIdeas([]);
    setTimeLeft(60);
    setIsPlaying(false);
    setProblemIndex(Math.floor(Math.random() * problems.length));
  };

  if (gameComplete) {
    return (
      <div className="text-center py-8">
        <Mascot mood="happy" size="large" />
        <h3 className="heading-font text-2xl text-[#2B2D42] mb-4">🎉 Hebat! Banyak ide kreatif!</h3>
        <p className="body-font text-lg text-[#6C757D] mb-6">Kamu mengumpulkan {ideas.length} ide!</p>
        <motion.button onClick={resetGame} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bouncy-button bg-[#4D96FF] text-white px-6 py-3 rounded-full font-bold">Main Lagi</motion.button>
      </div>
    );
  }

  const currentProblem = problems[problemIndex];

  return (
    <div className="text-center">
      <div className="mb-4"><Mascot mood={mascotMood} size="medium" /></div>
      {!isPlaying ? (
        <>
          <p className="body-font text-lg text-[#6C757D] mb-6">Masalah: <span className="font-bold">{currentProblem}</span></p>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={startGame} className="bouncy-button bg-[#FFD166] text-[#2B2D42] px-8 py-4 rounded-full font-bold text-xl">Mulai Brainstorm! ⏱️</motion.button>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <span className="body-font text-lg text-[#6C757D]">Waktu: {timeLeft}s</span>
            <span className="body-font text-lg text-[#6C757D]">Ide: {ideas.length}</span>
          </div>
          <p className="body-font text-lg text-[#6C757D] mb-4">Klik tombol secepatnya untuk kumpulkan ide!</p>
          <p className="heading-font text-xl text-[#2B2D42] mb-6">{currentProblem}</p>
          <motion.button
            onClick={addIdea}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.88, rotate: -8 }}
            className="bouncy-button w-32 h-32 bg-[#9D4CDD] text-white rounded-full font-bold text-4xl shadow-xl"
          >
            💡
          </motion.button>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <AnimatePresence>
              {ideas.map((emoji, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="text-3xl"
                >
                  {emoji}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
};

export default IdeationGame;

