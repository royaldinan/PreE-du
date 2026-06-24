import React, { useState } from 'react';
import Mascot from '../components/Mascot';
import { audioManager } from '../utils/audioManager';

const EmpathyGame = ({ onComplete }) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [mascotMood, setMascotMood] = useState('idle');

  const rounds = [
    { scenario: 'Tas sekolah Andi terlalu berat sampai sakit punggungnya', problem: 'Tas terlalu berat', options: ['Andi malas belajar', 'Tas terlalu berat', 'Andi ingin main'], correct: 1 },
    { scenario: 'Budi tidak bisa mencapai buku di rak paling atas', problem: 'Tidak bisa mencapai buku', options: ['Budi terlalu pendek', 'Buku terlalu mahal', 'Rak rusak'], correct: 0 },
    { scenario: 'Siti lupa membawa payung saat hujan deras', problem: 'Basah kuyup kehujanan', options: ['Siti suka hujan', 'Siti basah dan kedinginan', 'Hujan berhenti'], correct: 1 },
    { scenario: 'Rina jatuh dari sepeda dan lututnya terluka', problem: 'Lutut sakit dan berdarah', options: ['Rina senang bermain', 'Rina sakit dan butuh bantuan', 'Sepeda rusak'], correct: 1 },
    { scenario: 'Doni lapar tapi tidak punya uang untuk beli makan', problem: 'Perut lapar tanpa uang', options: ['Doni kenyang', 'Doni lapar dan sedih', 'Doni tidur'], correct: 1 },
    { scenario: 'Maya baru pindah sekolah dan belum punya teman', problem: 'Kesepian tanpa teman', options: ['Maya bahagia', 'Maya kesepian', 'Maya pintar'], correct: 1 }
  ];

  const handleChoice = (index) => {
    if (index === rounds[currentRound - 1].correct) {
      audioManager.playSfx('correct');
      const newScore = score + 1;
      setScore(newScore);
      setFeedback('Benar! Kamu mengerti perasaan mereka! 🎉');
      setMascotMood('happy');
      setTimeout(() => {
        if (currentRound < 6) {
          setCurrentRound(currentRound + 1);
          setFeedback('');
        } else {
          // 0 jawaban benar -> kalah (0 bintang). Selain itu -> menang.
          const totalStars = newScore >= 5 ? 3 : newScore >= 3 ? 2 : newScore >= 1 ? 1 : 0;
          setGameComplete(true);
          onComplete(totalStars);
        }
      }, 1500);
    } else {
      audioManager.playSfx('wrong');
      setFeedback('Coba lagi! Pikirkan apa yang mereka rasakan 💪');
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
        <h3 className="heading-font text-2xl text-[#2B2D42] mb-4">🎉 Hebat! Kamu sangat peka!</h3>
        <p className="body-font text-lg text-[#6C757D] mb-6">Skor kamu: {score} dari 6</p>
        <button onClick={resetGame} className="bouncy-button bg-[#4D96FF] text-white px-6 py-3 rounded-full font-bold">Main Lagi</button>
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
      {feedback && <div className={`text-xl font-bold mb-4 ${feedback.includes('Benar') ? 'text-green-600' : 'text-orange-500'}`}>{feedback}</div>}
      <p className="body-font text-lg text-[#6C757D] mb-4">Apa MASALAH yang mereka alami?</p>
      <div className="bg-[#FEFAF6] rounded-2xl p-6 mb-6 shadow-lg">
        <p className="heading-font text-lg text-[#2B2D42]">{current.scenario}</p>
      </div>
      <div className="space-y-3">
        {current.options.map((option, index) => (
          <button key={index} onClick={() => handleChoice(index)} className="w-full bg-white hover:bg-[#9D4CDD] hover:text-white text-[#2B2D42] px-6 py-4 rounded-xl font-bold text-lg shadow-md transition-all transform hover:scale-102">{option}</button>
        ))}
      </div>
    </div>
  );
};

export default EmpathyGame;
