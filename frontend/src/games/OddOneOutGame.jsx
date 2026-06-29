import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Mascot from '../components/Mascot';
import { audioManager } from '../utils/audioManager';
import { celebrateCorrectAnswer } from '../utils/confetti';

const OddOneOutGame = ({ onComplete }) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [mascotMood, setMascotMood] = useState('idle');
  const [lockChoice, setLockChoice] = useState(false);

  const rounds = [
    { items: ['🍎', '🍌', '🍇', '🚗'], correct: 3, explanation: 'Mobil bukan buah!' },
    { items: ['🐱', '🐶', '🐮', '🌸'], correct: 3, explanation: 'Bunga bukan hewan!' },
    { items: ['📕', '📓', '✏️', '🍕'], correct: 3, explanation: 'Pizza bukan alat tulis!' },
    { items: ['👟', '👞', '🧤', '👠'], correct: 2, explanation: 'Sarung tangan bukan sepatu!' },
    { items: ['☀️', '🌙', '⭐', '🐟'], correct: 3, explanation: 'Ikan bukan benda langit!' },
    { items: ['🎸', '🎹', '⚽', '🎺'], correct: 2, explanation: 'Bola bukan alat musik!' },
    { items: ['🥕', '🌽', '🍦', '🥬'], correct: 2, explanation: 'Es krim bukan sayuran!' },
    { items: ['🚲', '🚗', '✈️', '🛋️'], correct: 3, explanation: 'Sofa bukan kendaraan!' }
  ];

  const handleChoice = (index) => {
    if (lockChoice) return;

    if (index === rounds[currentRound - 1].correct) {
      setLockChoice(true);
      audioManager.playSfx('correct');
      celebrateCorrectAnswer();
      const newScore = score + 1;
      setScore(newScore);
      setFeedback(`Benar! ${rounds[currentRound - 1].explanation} 🎉`);
      setMascotMood('happy');
      setTimeout(() => {
        if (currentRound < 8) {
          setCurrentRound(currentRound + 1);
          setFeedback('');
          setLockChoice(false);
        } else {
          // 0 jawaban benar -> kalah (0 bintang). Selain itu -> menang.
          const totalStars = newScore >= 6 ? 3 : newScore >= 4 ? 2 : newScore >= 1 ? 1 : 0;
          setGameComplete(true);
          onComplete(totalStars);
        }
      }, 1600);
    } else {
      audioManager.playSfx('wrong');
      setFeedback('Coba lagi! Pikirkan mana yang berbeda 💪');
      setMascotMood('sad');
      setTimeout(() => setFeedback(''), 600);
    }
  };

  const resetGame = () => {
    setCurrentRound(1);
    setScore(0);
    setGameComplete(false);
    setLockChoice(false);
  };

  if (gameComplete) {
    return (
      <div className="text-center py-8">
        <Mascot mood="happy" size="large" />
        <h3 className="heading-font text-2xl text-[#2B2D42] mb-4">🎉 Hebat! Semua ronde selesai!</h3>
        <p className="body-font text-lg text-[#6C757D] mb-6">Skor kamu: {score} dari 8</p>
        <motion.button onClick={resetGame} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bouncy-button bg-[#4D96FF] text-white px-6 py-3 rounded-full font-bold">Main Lagi</motion.button>
      </div>
    );
  }

  const currentItems = rounds[currentRound - 1].items;

  return (
    <div className="text-center">
      <div className="mb-4"><Mascot mood={mascotMood} size="medium" /></div>
      <div className="flex justify-between items-center mb-4">
        <span className="body-font text-lg text-[#6C757D]">Ronde {currentRound}/8</span>
        <span className="body-font text-lg text-[#6C757D]">Skor: {score}</span>
      </div>
      <AnimatePresence mode="wait">
        {feedback && (
          <motion.div
            key={feedback}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`text-xl font-bold mb-4 ${feedback.includes('Benar') ? 'text-green-600' : 'text-orange-500'}`}
          >
            {feedback}
          </motion.div>
        )}
      </AnimatePresence>
      <p className="body-font text-lg text-[#6C757D] mb-6">Mana yang TIDAK sama dengan yang lain?</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {currentItems.map((item, index) => (
          <motion.button
            key={`${currentRound}-${index}`}
            onClick={() => handleChoice(index)}
            disabled={lockChoice}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.06 }}
            whileHover={!lockChoice ? { scale: 1.08 } : {}}
            whileTap={!lockChoice ? { scale: 0.94 } : {}}
            className="w-20 h-20 md:w-24 md:h-24 bg-[#4D96FF] text-white rounded-2xl text-4xl shadow-lg hover:bg-[#3A7BD5] transition-colors mx-auto disabled:opacity-70"
          >
            {item}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default OddOneOutGame;

