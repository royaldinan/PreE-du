import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Mascot from '../components/Mascot';
import { audioManager } from '../utils/audioManager';
import { celebrateCorrectAnswer } from '../utils/confetti';

const FactOpinionGame = ({ onComplete }) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [mascotMood, setMascotMood] = useState('idle');
  const [lockChoice, setLockChoice] = useState(false);

  const rounds = [
    { sentence: 'Kucing adalah hewan', isFact: true, explanation: 'Ini fakta karena bisa dibuktikan!' },
    { sentence: 'Kucing itu lucu', isFact: false, explanation: 'Ini opini karena perasaan tiap orang beda!' },
    { sentence: 'Matahari terbit dari timur', isFact: true, explanation: 'Ini fakta karena selalu benar!' },
    { sentence: 'Es krim rasa cokelat paling enak', isFact: false, explanation: 'Ini opini karena selera beda-beda!' },
    { sentence: 'Air diperlukan untuk hidup', isFact: true, explanation: 'Ini fakta karena semua makhluk butuh air!' },
    { sentence: 'Sepak bola olahraga paling seru', isFact: false, explanation: 'Ini opini karena tiap orang punya olahraga favorit!' },
    { sentence: 'Satu minggu ada 7 hari', isFact: true, explanation: 'Ini fakta karena sudah ditentukan!' },
    { sentence: 'Hari Senin hari yang membosankan', isFact: false, explanation: 'Ini opini karena ada yang suka hari Senin!' },
    { sentence: 'Bumi mengelilingi Matahari', isFact: true, explanation: 'Ini fakta karena sudah terbukti ilmiah!' },
    { sentence: 'Warna biru warna paling cantik', isFact: false, explanation: 'Ini opini karena warna favorit beda-beda!' }
  ];

  const handleChoice = (choice) => {
    if (lockChoice) return;
    const current = rounds[currentRound - 1];
    const isCorrect = (choice === 'fact' && current.isFact) || (choice === 'opinion' && !current.isFact);

    if (isCorrect) {
      setLockChoice(true);
      audioManager.playSfx('correct');
      celebrateCorrectAnswer();
      const newScore = score + 1;
      setScore(newScore);
      setFeedback(`Benar! ${current.explanation} 🎉`);
      setMascotMood('happy');
      setTimeout(() => {
        if (currentRound < 10) {
          setCurrentRound(currentRound + 1);
          setFeedback('');
          setLockChoice(false);
        } else {
          // 0 jawaban benar -> kalah (0 bintang). Selain itu -> menang.
          const totalStars = newScore >= 8 ? 3 : newScore >= 5 ? 2 : newScore >= 1 ? 1 : 0;
          setGameComplete(true);
          onComplete(totalStars);
        }
      }, 1600);
    } else {
      audioManager.playSfx('wrong');
      setFeedback('Coba lagi! Pikirkan baik-baik 💪');
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
        <p className="body-font text-lg text-[#6C757D] mb-6">Skor kamu: {score} dari 10</p>
        <motion.button onClick={resetGame} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bouncy-button bg-[#4D96FF] text-white px-6 py-3 rounded-full font-bold">Main Lagi</motion.button>
      </div>
    );
  }

  const current = rounds[currentRound - 1];

  return (
    <div className="text-center">
      <div className="mb-4"><Mascot mood={mascotMood} size="medium" /></div>
      <div className="flex justify-between items-center mb-4">
        <span className="body-font text-lg text-[#6C757D]">Ronde {currentRound}/10</span>
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
      <p className="body-font text-lg text-[#6C757D] mb-4">Apakah ini FAKTA atau OPINI?</p>
      <motion.div
        key={currentRound}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 mb-6 shadow-lg"
      >
        <p className="heading-font text-xl text-[#2B2D42]">{current.sentence}</p>
      </motion.div>
      <div className="flex justify-center gap-4">
        <motion.button whileHover={!lockChoice ? { scale: 1.05 } : {}} whileTap={!lockChoice ? { scale: 0.95 } : {}} onClick={() => handleChoice('fact')} disabled={lockChoice} className="bouncy-button bg-[#6BCB77] text-white px-8 py-4 rounded-full font-bold text-lg disabled:opacity-70">✅ FAKTA</motion.button>
        <motion.button whileHover={!lockChoice ? { scale: 1.05 } : {}} whileTap={!lockChoice ? { scale: 0.95 } : {}} onClick={() => handleChoice('opinion')} disabled={lockChoice} className="bouncy-button bg-[#FFD166] text-[#2B2D42] px-8 py-4 rounded-full font-bold text-lg disabled:opacity-70">💭 OPINI</motion.button>
      </div>
    </div>
  );
};

export default FactOpinionGame;

