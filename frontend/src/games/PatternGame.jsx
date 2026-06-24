import React, { useState, useEffect } from 'react';
import Mascot from '../components/Mascot';
import { audioManager } from '../utils/audioManager';

const PatternGame = ({ onComplete }) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [pattern, setPattern] = useState([]);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [mascotMood, setMascotMood] = useState('idle');

  const shapes = ['🔴', '🔵', '🟢', '🟡', '⭐', '❤️'];

  const generatePattern = (round) => {
    const patternLength = Math.min(3 + Math.floor(round / 2), 6);
    const selectedShapes = shapes.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    let pat = [];
    for (let i = 0; i < patternLength; i++) {
      pat.push(selectedShapes[i % selectedShapes.length]);
    }
    return pat;
  };

  useEffect(() => {
    if (currentRound <= 10 && !gameComplete) {
      const newPattern = generatePattern(currentRound);
      setPattern(newPattern.slice(0, -1));
      
      const correctAnswer = newPattern[newPattern.length - 1];
      const wrongOptions = shapes.filter(s => s !== correctAnswer).sort(() => 0.5 - Math.random()).slice(0, 2);
      const allOptions = [correctAnswer, ...wrongOptions].sort(() => 0.5 - Math.random());
      
      setOptions(allOptions);
      setFeedback('');
      setMascotMood('idle');
    }
  }, [currentRound, gameComplete]);

  const handleOptionClick = (option) => {
    const correctAnswer = pattern[pattern.length - 1] || generatePattern(currentRound)[pattern.length];
    
    if (option === correctAnswer) {
      audioManager.playSfx('correct');
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
      }, 1000);
    } else {
      audioManager.playSfx('wrong');
      setFeedback('Coba lagi! 💪');
      setMascotMood('sad');
      setTimeout(() => setFeedback(''), 500);
    }
  };

  const resetGame = () => {
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

      {feedback && (
        <div className={`text-xl font-bold mb-4 ${feedback.includes('Benar') ? 'text-green-600' : 'text-orange-500'}`}>
          {feedback}
        </div>
      )}

      <p className="body-font text-lg text-[#6C757D] mb-6">
        Apa yang selanjutnya? Pilih bentuk yang tepat!
      </p>

      <div className="bg-[#FEFAF6] rounded-2xl p-6 mb-8">
        <div className="flex flex-wrap justify-center gap-3 text-4xl md:text-5xl">
          {displayPattern.map((shape, index) => (
            <div
              key={index}
              className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-xl ${
                shape === '❓' ? 'bg-[#FFD166]' : 'bg-white shadow-md'
              }`}
            >
              {shape}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionClick(option)}
            className="w-20 h-20 md:w-24 md:h-24 bg-[#4D96FF] text-white rounded-2xl text-4xl shadow-lg hover:bg-[#3A7BD5] transition-all transform hover:scale-105"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PatternGame;
