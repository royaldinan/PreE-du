import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Mascot from '../components/Mascot';
import GameButton from '../components/GameButton';
import GameTile from '../components/GameTile';
import { audioManager } from '../utils/audioManager';
import { celebrateCorrectAnswer } from '../utils/confetti';
import { sparkleAt } from '../utils/sparkle';

const SortingGame = ({ onComplete }) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [numbers, setNumbers] = useState([]);
  const [sortedNumbers, setSortedNumbers] = useState([]);
  // "score" = jumlah ronde yang diselesaikan TANPA satu pun klik salah
  // (ronde "sempurna"). Dipakai untuk menentukan bintang & menang/kalah.
  const [score, setScore] = useState(0);
  const [missedThisRound, setMissedThisRound] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [mascotMood, setMascotMood] = useState('idle');
  // Status visual per-angka: { [num]: 'correct' | 'wrong' } untuk reaksi
  // lokal sesaat sebelum kartu pindah ke "Urutanmu" atau di-reset.
  const [tileStatus, setTileStatus] = useState({});

  const generateRound = (round) => {
    const count = Math.min(3 + round, 8);
    const nums = [];
    while (nums.length < count) {
      const num = Math.floor(Math.random() * 50) + 1;
      if (!nums.includes(num)) nums.push(num);
    }
    return nums;
  };

  useEffect(() => {
    if (currentRound <= 5 && !gameComplete) {
      setNumbers(generateRound(currentRound));
      setSortedNumbers([]);
      setMissedThisRound(false);
      setFeedback('');
      setMascotMood('idle');
      setTileStatus({});
    }
  }, [currentRound, gameComplete]);

  const handleNumberClick = (num, event) => {
    if (sortedNumbers.includes(num)) return;

    const expectedNext = [...numbers].sort((a, b) => a - b)[sortedNumbers.length];

    if (num === expectedNext) {
      audioManager.playSfx('correct');
      sparkleAt(event.currentTarget);
      setTileStatus((s) => ({ ...s, [num]: 'correct' }));
      const newSorted = [...sortedNumbers, num];
      setSortedNumbers(newSorted);
      setFeedback('Benar! 🎉');
      setMascotMood('happy');

      if (newSorted.length === numbers.length) {
        celebrateCorrectAnswer();
        // Ronde selesai. Hanya tambah skor kalau ronde ini sempurna
        // (tidak pernah klik salah sepanjang ronde).
        const newScore = missedThisRound ? score : score + 1;
        setScore(newScore);

        setTimeout(() => {
          if (currentRound < 5) {
            setCurrentRound(currentRound + 1);
          } else {
            // 0 ronde sempurna -> kalah (0 bintang). Selain itu -> menang.
            const totalStars = newScore >= 4 ? 3 : newScore >= 2 ? 2 : newScore >= 1 ? 1 : 0;
            setGameComplete(true);
            onComplete(totalStars);
          }
        }, 1000);
      } else {
        setTimeout(() => setFeedback(''), 500);
      }
    } else {
      audioManager.playSfx('wrong');
      setMissedThisRound(true);
      setTileStatus((s) => ({ ...s, [num]: 'wrong' }));
      setFeedback('Coba lagi! 💪');
      setMascotMood('sad');
      setTimeout(() => {
        setFeedback('');
        setTileStatus((s) => ({ ...s, [num]: null }));
      }, 500);
    }
  };

  const resetGame = () => {
    setCurrentRound(1);
    setScore(0);
    setMissedThisRound(false);
    setGameComplete(false);
    setNumbers(generateRound(1));
    setSortedNumbers([]);
  };

  if (gameComplete) {
    return (
      <div className="text-center py-8">
        <Mascot mood="happy" size="large" />
        <h3 className="heading-font text-2xl text-[#2B2D42] mb-4">
          🎉 Hebat! Kamu sudah menyelesaikan semua ronde!
        </h3>
        <p className="body-font text-lg text-[#6C757D] mb-6">
          Skor kamu: {score} dari 5
        </p>
        <GameButton onClick={resetGame} variant="blue" size="pill">
          Main Lagi
        </GameButton>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="mb-6">
        <Mascot mood={mascotMood} size="medium" />
      </div>

      <div className="flex justify-between items-center mb-6">
        <span className="body-font text-lg text-[#6C757D]">
          Ronde {currentRound}/5
        </span>
        <span className="body-font text-lg text-[#6C757D]">
          Skor: {score}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {feedback && (
          <motion.div
            key={feedback}
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className={`text-xl font-bold mb-4 ${feedback.includes('Benar') ? 'text-green-600' : 'text-orange-500'}`}
          >
            {feedback}
          </motion.div>
        )}
      </AnimatePresence>

      <p className="body-font text-lg text-[#6C757D] mb-6">
        Klik angka dari yang TERKECIL hingga TERBESAR!
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {numbers.map((num, index) => (
          <GameButton
            key={num}
            onClick={(e) => handleNumberClick(num, e)}
            disabled={sortedNumbers.includes(num)}
            variant={sortedNumbers.includes(num) ? 'done' : 'blue'}
            status={tileStatus[num]}
            size="tile"
            motionProps={{
              initial: { opacity: 0, scale: 0.6 },
              animate: { opacity: 1, scale: 1 },
              transition: { delay: index * 0.05 },
            }}
          >
            {num}
          </GameButton>
        ))}
      </div>

      <GameTile tone="well" className="p-4 min-h-[80px]">
        <p className="body-font text-sm text-[#6C757D] mb-2">Urutanmu:</p>
        <div className="flex flex-wrap justify-center gap-2">
          <AnimatePresence>
            {sortedNumbers.map((num) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, scale: 0.5, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center font-bold text-xl text-white relative overflow-hidden"
                style={{
                  background: 'linear-gradient(155deg, #8EDD96 0%, #6BCB77 60%, #6BCB77 100%)',
                  boxShadow: '0 3px 0 0 #4AA957, 0 5px 8px rgba(0,0,0,0.15)',
                }}
              >
                <span
                  className="pointer-events-none absolute inset-x-0 top-0 h-1/2 opacity-50"
                  style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%)' }}
                />
                <span className="relative z-10">{num}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          {sortedNumbers.length === 0 && (
            <span className="text-gray-400">Klik angka untuk mulai mengurutkan</span>
          )}
        </div>
      </GameTile>
    </div>
  );
};

export default SortingGame;

