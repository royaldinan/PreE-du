import React, { useState } from 'react';
import Mascot from '../components/Mascot';

const CauseEffectGame = ({ onComplete }) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [mascotMood, setMascotMood] = useState('idle');

  const rounds = [
    { cause: 'Tidak minum air seharian', effects: ['Haus dan lemas', 'Menjadi lebih tinggi', 'Bisa terbang'], correct: 0 },
    { cause: 'Belajar setiap hari', effects: ['Menjadi pintar', 'Menjadi lapar terus', 'Bisa tidur siang'], correct: 0 },
    { cause: 'Hujan deras turun', effects: ['Tanah menjadi kering', 'Jalanan basah', 'Matahari bersinar'], correct: 1 },
    { cause: 'Makan terlalu banyak permen', effects: ['Gigi sehat', 'Gigi sakit', 'Rambut tumbuh cepat'], correct: 1 },
    { cause: 'Tidur larut malam', effects: ['Bangun segar', 'Mengantuk di sekolah', 'Lapar terus'], correct: 1 },
    { cause: 'Olahraga teratur', effects: ['Tubuh lemah', 'Tubuh sehat dan kuat', 'Susah berjalan'], correct: 1 },
    { cause: 'Tidak sarapan pagi', effects: ['Semangat belajar', 'Lemas dan sulit konsentrasi', 'Menjadi lebih tinggi'], correct: 1 },
    { cause: 'Menyiram tanaman setiap hari', effects: ['Tanaman layu', 'Tanaman tumbuh subur', 'Tanaman hilang'], correct: 1 }
  ];

  const handleChoice = (index) => {
    if (index === rounds[currentRound - 1].correct) {
      setScore(score + 1);
      setFeedback('Benar! Itu akibat yang tepat! 🎉');
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
      }, 1500);
    } else {
      setFeedback('Coba lagi! Pikirkan apa yang akan terjadi 💪');
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

  const current = rounds[currentRound - 1];

  return (
    <div className="text-center">
      <div className="mb-4"><Mascot mood={mascotMood} size="medium" /></div>
      <div className="flex justify-between items-center mb-4">
        <span className="body-font text-lg text-[#6C757D]">Ronde {currentRound}/8</span>
        <span className="body-font text-lg text-[#6C757D]">Skor: {score}</span>
      </div>
      {feedback && <div className={`text-xl font-bold mb-4 ${feedback.includes('Benar') ? 'text-green-600' : 'text-orange-500'}`}>{feedback}</div>}
      <p className="body-font text-lg text-[#6C757D] mb-4">Apa AKIBAT dari ini?</p>
      <div className="bg-[#FEFAF6] rounded-2xl p-6 mb-6 shadow-lg">
        <p className="heading-font text-xl text-[#2B2D42]">{current.cause}</p>
      </div>
      <div className="space-y-3">
        {current.effects.map((effect, index) => (
          <button key={index} onClick={() => handleChoice(index)} className="w-full bg-white hover:bg-[#4D96FF] hover:text-white text-[#2B2D42] px-6 py-4 rounded-xl font-bold text-lg shadow-md transition-all transform hover:scale-102">{effect}</button>
        ))}
      </div>
    </div>
  );
};

export default CauseEffectGame;
