import React, { useState } from 'react';
import Mascot from '../components/Mascot';
import { audioManager } from '../utils/audioManager';

const PrototypeGame = ({ onComplete }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [selectedParts, setSelectedParts] = useState([]);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [mascotMood, setMascotMood] = useState('idle');

  const levels = [
    { problem: 'Buku sering jatuh dari meja', needed: ['alas', 'penahan', 'penguat'], parts: ['📚 Buku', '🪵 Kayu', '📎 Klip', '🧻 Kertas', '📏 Penggaris'] },
    { problem: 'Pensil sering patah', needed: ['pelindung', 'pengasah', 'tempat'], parts: ['✏️ Pensil', '🔧 Obeng', '📦 Kotak', '🎨 Cat', '🧵 Benang'] },
    { problem: 'Sepatu cepat kotor', needed: ['pelindung', 'pembersih', 'penyimpan'], parts: ['👟 Sepatu', '🧼 Sabun', '🌂 Payung', '🍕 Pizza', '⚽ Bola'] },
    { problem: 'Tas terlalu berat', needed: ['ringan', 'roda', 'bantalan'], parts: ['🎒 Tas', '🎈 Balon', '⚙️ Roda', '🍭 Permen', '📱 HP'] },
    { problem: 'Kamar gelap di siang hari', needed: ['cermin', 'jendela', 'cahaya'], parts: ['💡 Lampu', '🪞 Cermin', '🖼️ Lukisan', '🛏️ Kasur', '🚪 Pintu'] }
  ];

  const handlePartClick = (part) => {
    audioManager.playSfx('click');
    if (selectedParts.includes(part)) {
      setSelectedParts(selectedParts.filter(p => p !== part));
    } else if (selectedParts.length < 3) {
      setSelectedParts([...selectedParts, part]);
    }
  };

  const checkSolution = () => {
    const current = levels[currentLevel - 1];
    const correctCount = selectedParts.filter(p => current.needed.some(n => p.includes(n) || current.parts.indexOf(p) < 3)).length;
    
    if (correctCount >= 2) {
      audioManager.playSfx('correct');
      const newScore = score + 1;
      setScore(newScore);
      setFeedback('Hebat! Solusi yang kreatif! 🎉');
      setMascotMood('happy');
      setTimeout(() => {
        if (currentLevel < 5) {
          setCurrentLevel(currentLevel + 1);
          setSelectedParts([]);
          setFeedback('');
        } else {
          // 0 level berhasil -> kalah (0 bintang). Selain itu -> menang.
          const totalStars = newScore >= 4 ? 3 : newScore >= 2 ? 2 : newScore >= 1 ? 1 : 0;
          setGameComplete(true);
          onComplete(totalStars);
        }
      }, 1500);
    } else {
      audioManager.playSfx('wrong');
      setFeedback('Coba pilih bagian yang lebih tepat! 💪');
      setMascotMood('sad');
      setTimeout(() => setFeedback(''), 500);
    }
  };

  const resetGame = () => {
    setCurrentLevel(1);
    setScore(0);
    setGameComplete(false);
    setSelectedParts([]);
  };

  if (gameComplete) {
    return (
      <div className="text-center py-8">
        <Mascot mood="happy" size="large" />
        <h3 className="heading-font text-2xl text-[#2B2D42] mb-4">🎉 Hebat! Kamu inovator cilik!</h3>
        <p className="body-font text-lg text-[#6C757D] mb-6">Skor kamu: {score} dari 5</p>
        <button onClick={resetGame} className="bouncy-button bg-[#4D96FF] text-white px-6 py-3 rounded-full font-bold">Main Lagi</button>
      </div>
    );
  }

  const current = levels[currentLevel - 1];

  return (
    <div className="text-center">
      <div className="mb-4"><Mascot mood={mascotMood} size="medium" /></div>
      <div className="flex justify-between items-center mb-4">
        <span className="body-font text-lg text-[#6C757D]">Level {currentLevel}/5</span>
        <span className="body-font text-lg text-[#6C757D]">Skor: {score}</span>
      </div>
      {feedback && <div className={`text-xl font-bold mb-4 ${feedback.includes('Hebat') ? 'text-green-600' : 'text-orange-500'}`}>{feedback}</div>}
      <p className="body-font text-lg text-[#6C757D] mb-4">Masalah: <span className="font-bold">{current.problem}</span></p>
      <p className="body-font text-md text-[#6C757D] mb-6">Pilih 3 bagian untuk membuat solusi!</p>
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {current.parts.map((part, index) => (
          <button key={index} onClick={() => handlePartClick(part)} className={`w-24 h-24 rounded-2xl font-bold text-lg shadow-lg transition-all transform hover:scale-105 ${selectedParts.includes(part) ? 'bg-[#6BCB77] text-white ring-4 ring-[#4D96FF]' : 'bg-white text-[#2B2D42]'}`}>{part}</button>
        ))}
      </div>
      <div className="bg-[#FEFAF6] rounded-xl p-4 mb-6 min-h-[60px]">
        <p className="body-font text-sm text-[#6C757D] mb-2">Solusimu:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {selectedParts.map((part, i) => (
            <span key={i} className="bg-[#9D4CDD] text-white px-3 py-1 rounded-lg">{part}</span>
          ))}
          {selectedParts.length === 0 && <span className="text-gray-400">Klik bagian untuk memilih</span>}
        </div>
      </div>
      <button onClick={checkSolution} disabled={selectedParts.length < 3} className="bouncy-button bg-[#FFD166] text-[#2B2D42] px-8 py-4 rounded-full font-bold text-xl disabled:opacity-50">Cek Solusi! 🔍</button>
    </div>
  );
};

export default PrototypeGame;
