import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Mascot from '../components/Mascot';
import GameButton from '../components/GameButton';
import GameTile from '../components/GameTile';
import { audioManager } from '../utils/audioManager';
import { celebrateCorrectAnswer } from '../utils/confetti';
import { sparkleAt } from '../utils/sparkle';

const PrototypeGame = ({ onComplete }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [selectedParts, setSelectedParts] = useState([]);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [mascotMood, setMascotMood] = useState('idle');
  const [lockChoice, setLockChoice] = useState(false);
  // Status pada tombol "Cek Solusi!" itu sendiri setelah dicek — di game
  // ini reaksi benar/salah bukan per-part yang diklik (karena user pilih
  // 3 part dulu sebelum dicek sekaligus), tapi pada tombol cek itu.
  const [solutionStatus, setSolutionStatus] = useState(null);

  // Tiap level: "parts" adalah semua pilihan yang ditampilkan, "correctParts"
  // adalah bagian-bagian yang benar-benar relevan untuk solusi (dicocokkan
  // by value, bukan posisi index — sebelumnya ini bug, lihat PROGRESS.md).
  const levels = [
    {
      problem: 'Buku sering jatuh dari meja',
      correctParts: ['🪵 Kayu', '📎 Klip', '📏 Penggaris'],
      parts: ['📚 Buku', '🪵 Kayu', '📎 Klip', '🧻 Kertas', '📏 Penggaris'],
    },
    {
      problem: 'Pensil sering patah',
      correctParts: ['🔧 Obeng', '📦 Kotak', '🧵 Benang'],
      parts: ['✏️ Pensil', '🔧 Obeng', '📦 Kotak', '🎨 Cat', '🧵 Benang'],
    },
    {
      problem: 'Sepatu cepat kotor',
      correctParts: ['🧼 Sabun', '🌂 Payung', '👟 Sepatu'],
      parts: ['👟 Sepatu', '🧼 Sabun', '🌂 Payung', '🍕 Pizza', '⚽ Bola'],
    },
    {
      problem: 'Tas terlalu berat',
      correctParts: ['🎈 Balon', '⚙️ Roda', '🎒 Tas'],
      parts: ['🎒 Tas', '🎈 Balon', '⚙️ Roda', '🍭 Permen', '📱 HP'],
    },
    {
      problem: 'Kamar gelap di siang hari',
      correctParts: ['💡 Lampu', '🪞 Cermin', '🚪 Pintu'],
      parts: ['💡 Lampu', '🪞 Cermin', '🖼️ Lukisan', '🛏️ Kasur', '🚪 Pintu'],
    },
  ];

  const handlePartClick = (part, event) => {
    if (lockChoice) return;
    audioManager.playSfx('click');
    if (selectedParts.includes(part)) {
      setSelectedParts(selectedParts.filter((p) => p !== part));
    } else if (selectedParts.length < 3) {
      sparkleAt(event.currentTarget, { count: 5 });
      setSelectedParts([...selectedParts, part]);
    }
  };

  const checkSolution = () => {
    const current = levels[currentLevel - 1];
    const correctCount = selectedParts.filter((p) => current.correctParts.includes(p)).length;

    // Butuh minimal 2 dari 3 part yang dipilih benar-benar relevan dengan solusi.
    if (correctCount >= 2) {
      setLockChoice(true);
      setSolutionStatus('correct');
      audioManager.playSfx('correct');
      celebrateCorrectAnswer();
      const newScore = score + 1;
      setScore(newScore);
      setFeedback('Hebat! Solusi yang kreatif! 🎉');
      setMascotMood('happy');
      setTimeout(() => {
        if (currentLevel < 5) {
          setCurrentLevel(currentLevel + 1);
          setSelectedParts([]);
          setFeedback('');
          setLockChoice(false);
          setSolutionStatus(null);
        } else {
          // 0 level berhasil -> kalah (0 bintang). Selain itu -> menang.
          const totalStars = newScore >= 4 ? 3 : newScore >= 2 ? 2 : newScore >= 1 ? 1 : 0;
          setGameComplete(true);
          onComplete(totalStars);
        }
      }, 1400);
    } else {
      setSolutionStatus('wrong');
      audioManager.playSfx('wrong');
      setFeedback('Coba pilih bagian yang lebih tepat! 💪');
      setMascotMood('sad');
      setTimeout(() => {
        setFeedback('');
        setSolutionStatus(null);
      }, 700);
    }
  };

  const resetGame = () => {
    setCurrentLevel(1);
    setScore(0);
    setGameComplete(false);
    setSelectedParts([]);
    setLockChoice(false);
    setSolutionStatus(null);
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
      <AnimatePresence mode="wait">
        {feedback && (
          <motion.div
            key={feedback}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`text-xl font-bold mb-4 ${feedback.includes('Hebat') ? 'text-green-600' : 'text-orange-500'}`}
          >
            {feedback}
          </motion.div>
        )}
      </AnimatePresence>
      <p className="body-font text-lg text-[#6C757D] mb-4">Masalah: <span className="font-bold">{current.problem}</span></p>
      <p className="body-font text-md text-[#6C757D] mb-6">Pilih 3 bagian untuk membuat solusi!</p>
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {current.parts.map((part, index) => (
          <GameButton
            key={part}
            onClick={(e) => handlePartClick(part, e)}
            disabled={lockChoice}
            variant={selectedParts.includes(part) ? 'green' : 'white'}
            size="labelTile"
            motionProps={{
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: index * 0.05 },
            }}
          >
            {part}
          </GameButton>
        ))}
      </div>
      <GameTile tone="well" className="p-4 mb-6 min-h-[60px]">
        <p className="body-font text-sm text-[#6C757D] mb-2">Solusimu:</p>
        <div className="flex flex-wrap justify-center gap-2">
          <AnimatePresence>
            {selectedParts.map((part) => (
              <motion.span
                key={part}
                initial={{ opacity: 0, scale: 0.5, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-white px-3 py-1 rounded-lg font-bold relative overflow-hidden inline-block"
                style={{
                  background: 'linear-gradient(155deg, #C08AF0 0%, #9D4CDD 60%, #9D4CDD 100%)',
                  boxShadow: '0 2px 0 0 #7C32B8, 0 3px 6px rgba(0,0,0,0.12)',
                }}
              >
                <span
                  className="pointer-events-none absolute inset-x-0 top-0 h-1/2 opacity-50"
                  style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%)' }}
                />
                <span className="relative z-10">{part}</span>
              </motion.span>
            ))}
          </AnimatePresence>
          {selectedParts.length === 0 && <span className="text-gray-400">Klik bagian untuk memilih</span>}
        </div>
      </GameTile>
      <GameButton
        onClick={checkSolution}
        disabled={selectedParts.length < 3 || lockChoice}
        variant="yellow"
        status={solutionStatus}
        size="pillLg"
      >
        Cek Solusi! 🔍
      </GameButton>
    </div>
  );
};

export default PrototypeGame;

