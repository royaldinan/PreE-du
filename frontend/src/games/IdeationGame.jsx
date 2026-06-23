import React, { useState, useEffect } from 'react';
import Mascot from '../components/Mascot';

const IdeationGame = ({ onComplete }) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [ideas, setIdeas] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameComplete, setGameComplete] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [mascotMood, setMascotMood] = useState('idle');
  const [isPlaying, setIsPlaying] = useState(false);

  const problems = [
    'Tas sekolah terlalu berat',
    'Lupa bawa pensil ke sekolah',
    'Kamar berantakan',
    'Bosan saat hujan',
    'Susah bangun pagi',
    'Sepatu cepat kotor'
  ];

  const ideaEmojis = ['💡', '✨', '🌟', '🎨', '🚀', '⭐', '🔥', '💫', '🎯', '🏆'];

  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && isPlaying) {
      endGame();
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setIsPlaying(true);
    setTimeLeft(60);
    setIdeas([]);
    setFeedback('');
  };

  const addIdea = () => {
    if (!isPlaying) return;
    const randomEmoji = ideaEmojis[Math.floor(Math.random() * ideaEmojis.length)];
    setIdeas([...ideas, randomEmoji]);
    setMascotMood('happy');
    setTimeout(() => setMascotMood('idle'), 500);
  };

  const endGame = () => {
    setIsPlaying(false);
    setGameComplete(true);
    const totalStars = ideas.length >= 8 ? 3 : ideas.length >= 5 ? 2 : 1;
    setFeedback(`Kamu dapat ${ideas.length} ide!`);
    onComplete(totalStars);
  };

  const resetGame = () => {
    setCurrentRound(1);
    setGameComplete(false);
    setIdeas([]);
    setTimeLeft(60);
    setIsPlaying(false);
  };

  if (gameComplete) {
    return (
      <div className="text-center py-8">
        <Mascot mood="happy" size="large" />
        <h3 className="heading-font text-2xl text-[#2B2D42] mb-4">🎉 Hebat! Banyak ide kreatif!</h3>
        <p className="body-font text-lg text-[#6C757D] mb-6">Kamu mengumpulkan {ideas.length} ide!</p>
        <button onClick={resetGame} className="bouncy-button bg-[#4D96FF] text-white px-6 py-3 rounded-full font-bold">Main Lagi</button>
      </div>
    );
  }

  const currentProblem = problems[(currentRound - 1) % problems.length];

  return (
    <div className="text-center">
      <div className="mb-4"><Mascot mood={mascotMood} size="medium" /></div>
      {!isPlaying ? (
        <>
          <p className="body-font text-lg text-[#6C757D] mb-6">Masalah: <span className="font-bold">{currentProblem}</span></p>
          <button onClick={startGame} className="bouncy-button bg-[#FFD166] text-[#2B2D42] px-8 py-4 rounded-full font-bold text-xl">Mulai Brainstorm! ⏱️</button>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <span className="body-font text-lg text-[#6C757D]">Waktu: {timeLeft}s</span>
            <span className="body-font text-lg text-[#6C757D]">Ide: {ideas.length}</span>
          </div>
          <p className="body-font text-lg text-[#6C757D] mb-4">Klik tombol secepatnya untuk kumpulkan ide!</p>
          <p className="heading-font text-xl text-[#2B2D42] mb-6">{currentProblem}</p>
          <button onClick={addIdea} className="bouncy-button w-32 h-32 bg-[#9D4CDD] text-white rounded-full font-bold text-4xl shadow-xl">💡</button>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {ideas.map((emoji, i) => (
              <span key={i} className="text-3xl animate-bounce">{emoji}</span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default IdeationGame;
