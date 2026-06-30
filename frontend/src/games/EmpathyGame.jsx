import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Mascot from '../components/Mascot';
import GameButton from '../components/GameButton';
import GameTile from '../components/GameTile';
import { audioManager } from '../utils/audioManager';
import { celebrateCorrectAnswer } from '../utils/confetti';
import { sparkleAt } from '../utils/sparkle';

const EmpathyGame = ({ onComplete }) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [mascotMood, setMascotMood] = useState('idle');
  const [lockChoice, setLockChoice] = useState(false);
  // Status visual per-index opsi yang diklik
  const [tileStatus, setTileStatus] = useState({});

  const rounds = [
    { scenario: 'Tas sekolah Andi terlalu berat sampai sakit punggungnya', problem: 'Tas terlalu berat', options: ['Andi malas belajar', 'Tas terlalu berat', 'Andi ingin main'], correct: 1 },
    { scenario: 'Budi tidak bisa mencapai buku di rak paling atas', problem: 'Tidak bisa mencapai buku', options: ['Budi terlalu pendek', 'Buku terlalu mahal', 'Rak rusak'], correct: 0 },
    { scenario: 'Siti lupa membawa payung saat hujan deras', problem: 'Basah kuyup kehujanan', options: ['Siti suka hujan', 'Siti basah dan kedinginan', 'Hujan berhenti'], correct: 1 },
    { scenario: 'Rina jatuh dari sepeda dan lututnya terluka', problem: 'Lutut sakit dan berdarah', options: ['Rina senang bermain', 'Rina sakit dan butuh bantuan', 'Sepeda rusak'], correct: 1 },
    { scenario: 'Doni lapar tapi tidak punya uang untuk beli makan', problem: 'Perut lapar tanpa uang', options: ['Doni kenyang', 'Doni lapar dan sedih', 'Doni tidur'], correct: 1 },
    { scenario: 'Maya baru pindah sekolah dan belum punya teman', problem: 'Kesepian tanpa teman', options: ['Maya bahagia', 'Maya kesepian', 'Maya pintar'], correct: 1 }
  ];

  const handleChoice = (index, event) => {
    if (lockChoice) return;

    if (index === rounds[currentRound - 1].correct) {
      setLockChoice(true);
      setTileStatus({ [index]: 'correct' });
      audioManager.playSfx('correct');
      sparkleAt(event.currentTarget);
      celebrateCorrectAnswer();
      const newScore = score + 1;
      setScore(newScore);
      setFeedback('Benar! Kamu mengerti perasaan mereka! 🎉');
      setMascotMood('happy');
      setTimeout(() => {
        if (currentRound < 6) {
          setCurrentRound(currentRound + 1);
          setFeedback('');
          setLockChoice(false);
          setTileStatus({});
        } else {
          // 0 jawaban benar -> kalah (0 bintang). Selain itu -> menang.
          const totalStars = newScore >= 5 ? 3 : newScore >= 3 ? 2 : newScore >= 1 ? 1 : 0;
          setGameComplete(true);
          onComplete(totalStars);
        }
      }, 1300);
    } else {
      setTileStatus({ [index]: 'wrong' });
      audioManager.playSfx('wrong');
      setFeedback('Coba lagi! Pikirkan apa yang mereka rasakan 💪');
      setMascotMood('sad');
      setTimeout(() => {
        setFeedback('');
        setTileStatus({});
      }, 600);
    }
  };

  const resetGame = () => {
    setCurrentRound(1);
    setScore(0);
    setGameComplete(false);
    setLockChoice(false);
    setTileStatus({});
  };

  if (gameComplete) {
    return (
      <div className="text-center py-8">
        <Mascot mood="happy" size="large" />
        <h3 className="heading-font text-2xl text-[#2B2D42] mb-4">🎉 Hebat! Kamu sangat peka!</h3>
        <p className="body-font text-lg text-[#6C757D] mb-6">Skor kamu: {score} dari 6</p>
        <GameButton onClick={resetGame} variant="blue" size="pill">Main Lagi</GameButton>
      </div>
    );
  }

  const current = rounds[currentRound - 1];

  return (
    <div className="text-center">
      <div className="mb-4"><Mascot mood={mascotMood} size="medium" /></div>
      <div className="flex justify-between items-center mb-4">
        <span className="body-font text-lg text-[#6C757D]">Ronde {currentRound}/6</span>
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
      <p className="body-font text-lg text-[#6C757D] mb-4">Apa MASALAH yang mereka alami?</p>
      <GameTile
        tone="highlight"
        motionKey={currentRound}
        animateProps={{ initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 } }}
        className="p-6 mb-6"
      >
        <p className="heading-font text-lg text-[#2B2D42]">{current.scenario}</p>
      </GameTile>
      <div className="space-y-3">
        {current.options.map((option, index) => (
          <GameButton
            key={`${currentRound}-${index}`}
            onClick={(e) => handleChoice(index, e)}
            disabled={lockChoice}
            variant="white"
            status={tileStatus[index]}
            size="wide"
            motionProps={{
              initial: { opacity: 0, x: -10 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: index * 0.08 },
            }}
          >
            {option}
          </GameButton>
        ))}
      </div>
    </div>
  );
};

export default EmpathyGame;

