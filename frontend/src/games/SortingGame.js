import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import Mascot from '../components/Mascot';

const SortingGame = ({ onComplete }) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [numbers, setNumbers] = useState([]);
  const [sortedNumbers, setSortedNumbers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [mascotMood, setMascotMood] = useState('idle');

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
      setFeedback('');
      setMascotMood('idle');
    }
  }, [currentRound, gameComplete]);

  const handleNumberClick = (num) => {
    if (sortedNumbers.includes(num)) return;
    
    const expectedNext = [...numbers].sort((a, b) => a - b)[sortedNumbers.length];
    
    if (num === expectedNext) {
      const newSorted = [...sortedNumbers, num];
      setSortedNumbers(newSorted);
      setFeedback('Benar! 🎉');
      setMascotMood('happy');
      
      if (newSorted.length === numbers.length) {
        setTimeout(() => {
          if (currentRound < 5) {
            setCurrentRound(currentRound + 1);
          } else {
            const totalStars = score >= 4 ? 3 : score >= 2 ? 2 : 1;
            setGameComplete(true);
            onComplete(totalStars);
          }
        }, 1000);
      } else {
        setTimeout(() => setFeedback(''), 500);
      }
    } else {
      setFeedback('Coba lagi! 💪');
      setMascotMood('sad');
      setTimeout(() => setFeedback(''), 500);
    }
  };

  const resetGame = () => {
    setCurrentRound(1);
    setScore(0);
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
        <button
          onClick={resetGame}
          className="bouncy-button bg-[#4D96FF] text-white px-6 py-3 rounded-full font-bold"
        >
          Main Lagi
        </button>
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

      {feedback && (
        <div className={`text-xl font-bold mb-4 ${feedback.includes('Benar') ? 'text-green-600' : 'text-orange-500'}`}>
          {feedback}
        </div>
      )}

      <p className="body-font text-lg text-[#6C757D] mb-6">
        Klik angka dari yang TERKECIL hingga TERBESAR!
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {numbers.map((num) => (
          <button
            key={num}
            onClick={() => handleNumberClick(num)}
            disabled={sortedNumbers.includes(num)}
            className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl font-bold text-2xl transition-all transform hover:scale-105 ${
              sortedNumbers.includes(num)
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#4D96FF] text-white shadow-lg hover:bg-[#3A7BD5]'
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      <div className="bg-[#FEFAF6] rounded-2xl p-4 min-h-[80px]">
        <p className="body-font text-sm text-[#6C757D] mb-2">Urutanmu:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {sortedNumbers.map((num) => (
            <div
              key={num}
              className="w-12 h-12 md:w-16 md:h-16 bg-[#6BCB77] text-white rounded-xl flex items-center justify-center font-bold text-xl"
            >
              {num}
            </div>
          ))}
          {sortedNumbers.length === 0 && (
            <span className="text-gray-400">Klik angka untuk mulai mengurutkan</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SortingGame;