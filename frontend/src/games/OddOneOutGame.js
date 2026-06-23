import React, { useState } from 'react';
import Mascot from '../components/Mascot';

const OddOneOutGame = ({ onComplete }) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [mascotMood, setMascotMood] = useState('idle');

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
    if (index === rounds[currentRound - 1].correct) {
      setScore(score + 1);
      setFeedback(`Benar! ${rounds[currentRound - 1].explanation} 🎉`);
      setMascotMood('happy');
      setTimeout(() => {
        if (currentRound < 8) {
          setCurrentRound(currentRound + 1);
          setFeedback('');
        } else {
          const totalStars = score + 1 >= 6 ? 3 : score + 1 >= 4 ? 2 : 1;
          setGameComplete(true);
          onComplete(totalStars);
        }
      }, 2000);
    } else {
      setFeedback('Coba lagi! Pikirkan mana yang berbeda 💪');
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
        <h3 className="heading-font text-2xl text-[#2B2D42] mb-4">🎉 Hebat! Semua ronde selesai!</h3>
        <p className="body-font text-lg text-[#6C757D] mb-6">Skor kamu: {score} dari 8</p>
        <button onClick={resetGame} className="bouncy-button bg-[#4D96FF] text-white px-6 py-3 rounded-full font-bold">Main Lagi</button>
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
      {feedback && <div className={`text-xl font-bold mb-4 ${feedback.includes('Benar') ? 'text-green-600' : 'text-orange-500'}`}>{feedback}</div>}
      <p className="body-font text-lg text-[#6C757D] mb-6">Mana yang TIDAK sama dengan yang lain?</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {currentItems.map((item, index) => (
          <button key={index} onClick={() => handleChoice(index)} className="w-20 h-20 md:w-24 md:h-24 bg-[#4D96FF] text-white rounded-2xl text-4xl shadow-lg hover:bg-[#3A7BD5] transition-all transform hover:scale-105 mx-auto">{item}</button>
        ))}
      </div>
    </div>
  );
};

export default OddOneOutGame;
