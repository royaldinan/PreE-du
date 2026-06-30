import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Mascot from '../components/Mascot';
import GameButton from '../components/GameButton';
import GameTile from '../components/GameTile';
import { audioManager } from '../utils/audioManager';
import { celebrateCorrectAnswer } from '../utils/confetti';
import { sparkleAt } from '../utils/sparkle';

// Shuffle non-mutating (Fisher-Yates di atas salinan array)
const shuffle = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const SHAPES = ['🔴', '🔵', '🟢', '🟡', '⭐', '❤️'];

const PatternGame = ({ onComplete }) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [pattern, setPattern] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [mascotMood, setMascotMood] = useState('idle');
  const [lockChoice, setLockChoice] = useState(false);
  const [tileStatus, setTileStatus] = useState({});
  const lastShapeSetRef = useRef(null);

  const generateRound = (round) => {
    const patternLength = Math.min(3 + Math.floor(round / 2), 6);

    // Pilih 3 bentuk berbeda, hindari memakai set bentuk identik dengan ronde
    // sebelumnya supaya pola terasa beda tiap ronde.
    let selectedShapes;
    let attempts = 0;
    do {
      selectedShapes = shuffle(SHAPES).slice(0, 3);
      attempts += 1;
    } while (
      lastShapeSetRef.current &&
      attempts < 5 &&
      selectedShapes.every((s) => lastShapeSetRef.current.includes(s))
    );
    lastShapeSetRef.current = selectedShapes;

    // Pola berulang: bentuk[0], bentuk[1], bentuk[2], bentuk[0], ...
    const fullPattern = Array.from(
      { length: patternLength },
      (_, i) => selectedShapes[i % selectedShapes.length]
    );

    const answer = fullPattern[fullPattern.length - 1];
    const visiblePattern = fullPattern.slice(0, -1);

    const wrongOptions = shuffle(SHAPES.filter((s) => s !== answer)).slice(0, 2);
    const allOptions = shuffle([answer, ...wrongOptions]);

    return { visiblePattern, answer, allOptions };
  };

  useEffect(() => {
    if (currentRound <= 10 && !gameComplete) {
      const { visiblePattern, answer, allOptions } = generateRound(currentRound);
      setPattern(visiblePattern);
      setCorrectAnswer(answer);
      setOptions(allOptions);
      setFeedback('');
      setMascotMood('idle');
      setLockChoice(false);
      setTileStatus({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRound, gameComplete]);

  const handleOptionClick = (option, event) => {
    if (lockChoice) return;

    if (option === correctAnswer) {
      setLockChoice(true);
      audioManager.playSfx('correct');
      sparkleAt(event.currentTarget);
      setTileStatus({ [option]: 'correct' });
      celebrateCorrectAnswer();
      const newScore = score + 1;
      setScore(newScore);
      setFeedback('Benar! 🎉');
      setMascotMood('happy');

      setTimeout(() => {
        if (currentRound < 10) {
          setCurrentRound(currentRound + 1);
        } else {
          // 0 jawaban benar -> kalah (0 bintang). Selain itu -> menang.
          const totalStars = newScore >= 8 ? 3 : newScore >= 5 ? 2 : newScore >= 1 ? 1 : 0;
          setGameComplete(true);
          onComplete(totalStars);
        }
      }, 900);
    } else {
      audioManager.playSfx('wrong');
      setTileStatus({ [option]: 'wrong' });
      setFeedback('Coba lagi! 💪');
      setMascotMood('sad');
      setTimeout(() => {
        setFeedback('');
        setTileStatus({});
      }, 500);
    }
  };

  const resetGame = () => {
    lastShapeSetRef.current = null;
    setCurrentRound(1);
    setScore(0);
    setGameComplete(false);
  };

  if (gameComplete) {
    return (
      <div className="text-center py-8">
        <Mascot mood="happy" size="large" />
        <h3 className="heading-font text-2xl text-[#2B2D42] mb-4">
          🎉 Hebat! Kamu sudah menyelesaikan semua ronde!
        </h3>
        <p className="body-font text-lg text-[#6C757D] mb-6">
          Skor kamu: {score} dari 10
        </p>
        <button
          onClick={resetGame}
          className="bouncy-button bg-[#4D96FF] text-white px-6 py-3 rounded-full font-bold"
        >
          Main Lagi
        </button>
      </div>
    );
  }

  const displayPattern = [...pattern, '❓'];

  return (
    <div className="text-center">
      <div className="mb-6">
        <Mascot mood={mascotMood} size="medium" />
      </div>

      <div className="flex justify-between items-center mb-6">
        <span className="body-font text-lg text-[#6C757D]">
          Ronde {currentRound}/10
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
        Apa yang selanjutnya? Pilih bentuk yang tepat!
      </p>

      <GameTile tone="well" className="p-6 mb-8">
        <div className="flex flex-wrap justify-center gap-3 text-4xl md:text-5xl">
          {displayPattern.map((shape, index) => (
            <motion.div
              key={`${currentRound}-${index}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.08 }}
              style={
                shape === '❓'
                  ? { background: 'linear-gradient(165deg, #FFF8E1 0%, #FFEFC2 100%)', border: '1.5px solid rgba(255, 209, 102, 0.6)', boxShadow: '0 3px 0 0 rgba(232,174,61,0.4), 0 6px 14px rgba(43,45,66,0.08)' }
                  : { background: 'linear-gradient(165deg, #FFFFFF 0%, #FBF7F0 100%)', border: '1.5px solid rgba(43,45,66,0.08)', boxShadow: '0 2px 0 0 rgba(43,45,66,0.06), 0 4px 10px rgba(43,45,66,0.06)' }
              }
              className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-xl relative overflow-hidden"
            >
              <span
                className="pointer-events-none absolute inset-x-0 top-0 h-1/3 opacity-60"
                style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%)' }}
              />
              <span className="relative z-10">{shape}</span>
            </motion.div>
          ))}
        </div>
      </GameTile>

      <div className="flex flex-wrap justify-center gap-4">
        {options.map((option) => (
          <GameButton
            key={option}
            onClick={(e) => handleOptionClick(option, e)}
            disabled={lockChoice}
            variant="blue"
            status={tileStatus[option]}
            size="tileLg"
          >
            {option}
          </GameButton>
        ))}
      </div>
    </div>
  );
};

export default PatternGame;

