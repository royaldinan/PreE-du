import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Mascot from '../components/Mascot';
import GameButton from '../components/GameButton';
import GameTile from '../components/GameTile';
import { audioManager } from '../utils/audioManager';
import { celebrateCorrectAnswer } from '../utils/confetti';
import { sparkleAt } from '../utils/sparkle';

const FactOpinionGame = ({ onComplete }) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [mascotMood, setMascotMood] = useState('idle');
  const [lockChoice, setLockChoice] = useState(false);
  // Status visual per-pilihan ('fact' | 'opinion') yang diklik
  const [tileStatus, setTileStatus] = useState({});

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

  const handleChoice = (choice, event) => {
    if (lockChoice) return;
    const current = rounds[currentRound - 1];
    const isCorrect = (choice === 'fact' && current.isFact) || (choice === 'opinion' && !current.isFact);

    if (isCorrect) {
      setLockChoice(true);
      setTileStatus({ [choice]: 'correct' });
      audioManager.playSfx('correct');
      sparkleAt(event.currentTarget);
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
          setTileStatus({});
        } else {
          // 0 jawaban benar -> kalah (0 bintang). Selain itu -> menang.
          const totalStars = newScore >= 8 ? 3 : newScore >= 5 ? 2 : newScore >= 1 ? 1 : 0;
          setGameComplete(true);
          onComplete(totalStars);
        }
      }, 1600);
    } else {
      setTileStatus({ [choice]: 'wrong' });
      audioManager.playSfx('wrong');
      setFeedback('Coba lagi! Pikirkan baik-baik 💪');
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
        <h3 className="heading-font text-2xl text-[#2B2D42] mb-4">🎉 Hebat! Semua ronde selesai!</h3>
        <p className="body-font text-lg text-[#6C757D] mb-6">Skor kamu: {score} dari 10</p>
        <GameButton onClick={resetGame} variant="blue" size="pill">Main Lagi</GameButton>
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
      <GameTile
        tone="highlight"
        motionKey={currentRound}
        animateProps={{ initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 } }}
        className="p-6 mb-6"
      >
        <p className="heading-font text-xl text-[#2B2D42]">{current.sentence}</p>
      </GameTile>
      <div className="flex justify-center gap-4">
        <GameButton onClick={(e) => handleChoice('fact', e)} disabled={lockChoice} variant="green" status={tileStatus.fact} size="pillLg">
          ✅ FAKTA
        </GameButton>
        <GameButton onClick={(e) => handleChoice('opinion', e)} disabled={lockChoice} variant="yellow" status={tileStatus.opinion} size="pillLg">
          💭 OPINI
        </GameButton>
      </div>
    </div>
  );
};

export default FactOpinionGame;

