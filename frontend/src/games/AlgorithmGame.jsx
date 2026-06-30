import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Mascot from '../components/Mascot';
import GameButton from '../components/GameButton';
import GameTile from '../components/GameTile';
import { audioManager } from '../utils/audioManager';
import { celebrateCorrectAnswer } from '../utils/confetti';

const AlgorithmGame = ({ onComplete }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [instructions, setInstructions] = useState([]);
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 3, y: 3 });
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [mascotMood, setMascotMood] = useState('idle');
  const [isRunning, setIsRunning] = useState(false);

  const gridSize = 5;

  // BFS sederhana untuk memastikan target masih bisa dicapai dari (0,0)
  // tanpa menabrak obstacle apa pun (hanya gerak atas/bawah/kiri/kanan).
  const isReachable = (target, obs) => {
    const obsSet = new Set(obs.map((o) => `${o.x},${o.y}`));
    const visited = new Set(['0,0']);
    const queue = [{ x: 0, y: 0 }];

    while (queue.length > 0) {
      const cur = queue.shift();
      if (cur.x === target.x && cur.y === target.y) return true;

      const neighbors = [
        { x: cur.x, y: cur.y - 1 },
        { x: cur.x, y: cur.y + 1 },
        { x: cur.x - 1, y: cur.y },
        { x: cur.x + 1, y: cur.y },
      ];
      for (const n of neighbors) {
        if (n.x < 0 || n.x >= gridSize || n.y < 0 || n.y >= gridSize) continue;
        const key = `${n.x},${n.y}`;
        if (visited.has(key) || obsSet.has(key)) continue;
        visited.add(key);
        queue.push(n);
      }
    }
    return false;
  };

  const generateLevel = (level) => {
    const target = {
      x: Math.min(level + 1, gridSize - 1),
      y: Math.min(level + 1, gridSize - 1)
    };
    const numObstacles = level > 1 ? Math.min(level - 1, 4) : 0;

    // Sebelumnya, obstacle ditempatkan murni acak tanpa pernah memeriksa
    // apakah target masih bisa dicapai. Sekitar 2% kemunculan level
    // (terutama level dengan target di pojok grid, mis. (4,4)) berakhir
    // dengan obstacle yang mengepung target dari segala sisi sehingga
    // TIDAK ADA jalur valid sama sekali -- pemain tidak mungkin menang
    // apa pun instruksi yang dicoba. Sekarang setiap kandidat susunan
    // obstacle diverifikasi dengan BFS sebelum dipakai; jika tidak
    // reachable, susunan diulang dari awal (maksimal 50 percobaan,
    // lalu fallback ke grid tanpa obstacle sama sekali supaya level
    // tetap selalu bisa dimenangkan).
    for (let attempt = 0; attempt < 50; attempt++) {
      const obs = [];
      while (obs.length < numObstacles) {
        const pos = {
          x: Math.floor(Math.random() * gridSize),
          y: Math.floor(Math.random() * gridSize)
        };
        if ((pos.x !== 0 || pos.y !== 0) && (pos.x !== target.x || pos.y !== target.y)) {
          if (!obs.some((o) => o.x === pos.x && o.y === pos.y)) {
            obs.push(pos);
          }
        }
      }
      if (isReachable(target, obs)) {
        return { target, obstacles: obs };
      }
    }
    // Fallback (sangat jarang tercapai): tanpa obstacle, target dari (0,0)
    // pada grid kosong selalu reachable.
    return { target, obstacles: [] };
  };

  useEffect(() => {
    if (currentLevel <= 5 && !gameComplete) {
      const levelData = generateLevel(currentLevel);
      setTargetPos(levelData.target);
      setObstacles(levelData.obstacles);
      setPlayerPos({ x: 0, y: 0 });
      setInstructions([]);
      setFeedback('');
      setMascotMood('idle');
      setIsRunning(false);
    }
  }, [currentLevel, gameComplete]);

  const addInstruction = (dir) => {
    if (isRunning || instructions.length >= 10) return;
    setInstructions([...instructions, dir]);
  };

  const runInstructions = async () => {
    if (instructions.length === 0 || isRunning) return;
    setIsRunning(true);
    setFeedback('');
    
    let pos = { x: 0, y: 0 };
    for (let i = 0; i < instructions.length; i++) {
      const dir = instructions[i];
      let newPos = { ...pos };
      
      if (dir === 'up') newPos.y = Math.max(0, pos.y - 1);
      else if (dir === 'down') newPos.y = Math.min(gridSize - 1, pos.y + 1);
      else if (dir === 'left') newPos.x = Math.max(0, pos.x - 1);
      else if (dir === 'right') newPos.x = Math.min(gridSize - 1, pos.x + 1);

      if (obstacles.some(o => o.x === newPos.x && o.y === newPos.y)) {
        audioManager.playSfx('wrong');
        setFeedback('Aduh! Nabrak rintangan! 💥');
        setMascotMood('sad');
        setTimeout(() => {
          setIsRunning(false);
          setPlayerPos({ x: 0, y: 0 });
        }, 1000);
        return;
      }

      pos = newPos;
      setPlayerPos(pos);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    if (pos.x === targetPos.x && pos.y === targetPos.y) {
      audioManager.playSfx('correct');
      celebrateCorrectAnswer();
      setFeedback('Hore! Sampai tujuan! 🎉');
      setMascotMood('happy');
      const newScore = score + 1;
      setScore(newScore);
      setTimeout(() => {
        if (currentLevel < 5) {
          setCurrentLevel(currentLevel + 1);
        } else {
          // 0 level berhasil dicapai -> kalah (0 bintang). Selain itu -> menang.
          const totalStars = newScore >= 4 ? 3 : newScore >= 2 ? 2 : newScore >= 1 ? 1 : 0;
          setGameComplete(true);
          onComplete(totalStars);
        }
        setIsRunning(false);
      }, 1000);
    } else {
      audioManager.playSfx('wrong');
      setFeedback('Belum sampai! Coba lagi! 💪');
      setMascotMood('sad');
      setTimeout(() => {
        setIsRunning(false);
        setPlayerPos({ x: 0, y: 0 });
      }, 1000);
    }
  };

  const resetGame = () => {
    setCurrentLevel(1);
    setScore(0);
    setGameComplete(false);
  };

  const clearInstructions = () => {
    if (isRunning) return;
    setInstructions([]);
    setPlayerPos({ x: 0, y: 0 });
  };

  if (gameComplete) {
    return (
      <div className="text-center py-8">
        <Mascot mood="happy" size="large" />
        <h3 className="heading-font text-2xl text-[#2B2D42] mb-4">
          🎉 Hebat! Kamu sudah menyelesaikan semua level!
        </h3>
        <p className="body-font text-lg text-[#6C757D] mb-6">
          Skor kamu: {score} dari 5
        </p>
        <motion.button
          onClick={resetGame}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bouncy-button bg-[#4D96FF] text-white px-6 py-3 rounded-full font-bold"
        >
          Main Lagi
        </motion.button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="mb-4">
        <Mascot mood={mascotMood} size="medium" />
      </div>

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
            className={`text-xl font-bold mb-4 ${feedback.includes('Hore') ? 'text-green-600' : 'text-orange-500'}`}
          >
            {feedback}
          </motion.div>
        )}
      </AnimatePresence>

      <p className="body-font text-lg text-[#6C757D] mb-4">
        Buat instruksi untuk mencapai target! ⭐
      </p>

      <GameTile tone="well" className="p-4 mb-6 inline-block">
        <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
          {Array.from({ length: gridSize * gridSize }).map((_, i) => {
            const x = i % gridSize;
            const y = Math.floor(i / gridSize);
            const isPlayer = playerPos.x === x && playerPos.y === y;
            const isTarget = targetPos.x === x && targetPos.y === y;
            const isObstacle = obstacles.some(o => o.x === x && o.y === y);

            const cellStyle = isPlayer
              ? { background: 'linear-gradient(155deg, #6FB1FF 0%, #4D96FF 60%, #4D96FF 100%)', boxShadow: '0 3px 0 0 #2D6FD4, 0 5px 8px rgba(0,0,0,0.15)' }
              : isTarget
              ? { background: 'linear-gradient(155deg, #FFE08A 0%, #FFD166 60%, #FFD166 100%)', boxShadow: '0 3px 0 0 #E8AE3D, 0 5px 8px rgba(0,0,0,0.15)' }
              : isObstacle
              ? { background: 'linear-gradient(155deg, #FF9B8A 0%, #F87060 60%, #F87060 100%)', boxShadow: '0 3px 0 0 #D4503F, 0 5px 8px rgba(0,0,0,0.15)' }
              : { background: 'linear-gradient(165deg, #FFFFFF 0%, #FBF7F0 100%)', boxShadow: 'inset 0 1px 3px rgba(43,45,66,0.06)', border: '1px solid rgba(43,45,66,0.06)' };

            return (
              <motion.div
                key={i}
                animate={isPlayer ? { scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 0.3 }}
                style={cellStyle}
                className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center text-xl relative overflow-hidden"
              >
                {(isPlayer || isTarget || isObstacle) && (
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-1/2 opacity-50"
                    style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%)' }}
                  />
                )}
                <span className="relative z-10">{isPlayer ? '🤖' : isTarget ? '⭐' : isObstacle ? '🚫' : ''}</span>
              </motion.div>
            );
          })}
        </div>
      </GameTile>

      <div className="flex justify-center gap-2 mb-4">
        <GameButton onClick={() => addInstruction('up')} disabled={isRunning} variant="blue" size="tileSm">⬆️</GameButton>
      </div>
      <div className="flex justify-center gap-2 mb-4">
        <GameButton onClick={() => addInstruction('left')} disabled={isRunning} variant="blue" size="tileSm">⬅️</GameButton>
        <GameButton onClick={() => addInstruction('down')} disabled={isRunning} variant="blue" size="tileSm">⬇️</GameButton>
        <GameButton onClick={() => addInstruction('right')} disabled={isRunning} variant="blue" size="tileSm">➡️</GameButton>
      </div>

      <GameTile tone="well" className="p-4 mb-4 min-h-[50px]">
        <p className="body-font text-sm text-[#6C757D] mb-2">Instruksimu:</p>
        <div className="flex flex-wrap justify-center gap-2">
          <AnimatePresence>
            {instructions.map((dir, i) => (
              <motion.span
                key={`${i}-${dir}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-white px-3 py-1 rounded-lg font-bold relative overflow-hidden inline-block"
                style={{
                  background: 'linear-gradient(155deg, #8EDD96 0%, #6BCB77 60%, #6BCB77 100%)',
                  boxShadow: '0 2px 0 0 #4AA957, 0 3px 6px rgba(0,0,0,0.12)',
                }}
              >
                <span
                  className="pointer-events-none absolute inset-x-0 top-0 h-1/2 opacity-50"
                  style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%)' }}
                />
                <span className="relative z-10">{dir === 'up' ? '⬆️' : dir === 'down' ? '⬇️' : dir === 'left' ? '⬅️' : '➡️'}</span>
              </motion.span>
            ))}
          </AnimatePresence>
          {instructions.length === 0 && <span className="text-gray-400">Klik tombol panah untuk menambah instruksi</span>}
        </div>
      </GameTile>

      <div className="flex justify-center gap-4">
        <GameButton onClick={clearInstructions} disabled={isRunning} variant="done" size="pill">
          Hapus
        </GameButton>
        <GameButton onClick={runInstructions} disabled={isRunning || instructions.length === 0} variant="yellow" size="pillLg">
          Jalankan! 🚀
        </GameButton>
      </div>
    </div>
  );
};

export default AlgorithmGame;

