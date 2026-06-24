import React, { useState, useEffect } from 'react';
import Mascot from '../components/Mascot';
import { audioManager } from '../utils/audioManager';

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

  const generateLevel = (level) => {
    const target = { 
      x: Math.min(level + 1, gridSize - 1), 
      y: Math.min(level + 1, gridSize - 1) 
    };
    const obs = [];
    if (level > 1) {
      const numObstacles = Math.min(level - 1, 4);
      while (obs.length < numObstacles) {
        const pos = { 
          x: Math.floor(Math.random() * gridSize), 
          y: Math.floor(Math.random() * gridSize) 
        };
        if ((pos.x !== 0 || pos.y !== 0) && (pos.x !== target.x || pos.y !== target.y)) {
          if (!obs.some(o => o.x === pos.x && o.y === pos.y)) {
            obs.push(pos);
          }
        }
      }
    }
    return { target, obstacles: obs };
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
      <div className="mb-4">
        <Mascot mood={mascotMood} size="medium" />
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <span className="body-font text-lg text-[#6C757D]">Level {currentLevel}/5</span>
        <span className="body-font text-lg text-[#6C757D]">Skor: {score}</span>
      </div>

      {feedback && (
        <div className={`text-xl font-bold mb-4 ${feedback.includes('Hore') ? 'text-green-600' : 'text-orange-500'}`}>
          {feedback}
        </div>
      )}

      <p className="body-font text-lg text-[#6C757D] mb-4">
        Buat instruksi untuk mencapai target! ⭐
      </p>

      <div className="bg-[#FEFAF6] rounded-2xl p-4 mb-6 inline-block">
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
          {Array.from({ length: gridSize * gridSize }).map((_, i) => {
            const x = i % gridSize;
            const y = Math.floor(i / gridSize);
            const isPlayer = playerPos.x === x && playerPos.y === y;
            const isTarget = targetPos.x === x && targetPos.y === y;
            const isObstacle = obstacles.some(o => o.x === x && o.y === y);
            
            return (
              <div
                key={i}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center text-xl ${
                  isPlayer ? 'bg-[#4D96FF]' : isTarget ? 'bg-[#FFD166]' : isObstacle ? 'bg-red-400' : 'bg-white'
                }`}
              >
                {isPlayer ? '🤖' : isTarget ? '⭐' : isObstacle ? '🚫' : ''}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center gap-2 mb-4">
        <button onClick={() => addInstruction('up')} disabled={isRunning} className="w-14 h-14 bg-[#4D96FF] text-white rounded-xl text-2xl shadow-lg hover:bg-[#3A7BD5] disabled:opacity-50">⬆️</button>
      </div>
      <div className="flex justify-center gap-2 mb-4">
        <button onClick={() => addInstruction('left')} disabled={isRunning} className="w-14 h-14 bg-[#4D96FF] text-white rounded-xl text-2xl shadow-lg hover:bg-[#3A7BD5] disabled:opacity-50">⬅️</button>
        <button onClick={() => addInstruction('down')} disabled={isRunning} className="w-14 h-14 bg-[#4D96FF] text-white rounded-xl text-2xl shadow-lg hover:bg-[#3A7BD5] disabled:opacity-50">⬇️</button>
        <button onClick={() => addInstruction('right')} disabled={isRunning} className="w-14 h-14 bg-[#4D96FF] text-white rounded-xl text-2xl shadow-lg hover:bg-[#3A7BD5] disabled:opacity-50">➡️</button>
      </div>

      <div className="bg-white rounded-xl p-4 mb-4 min-h-[50px]">
        <p className="body-font text-sm text-[#6C757D] mb-2">Instruksimu:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {instructions.map((dir, i) => (
            <span key={i} className="bg-[#6BCB77] text-white px-3 py-1 rounded-lg">
              {dir === 'up' ? '⬆️' : dir === 'down' ? '⬇️' : dir === 'left' ? '⬅️' : '➡️'}
            </span>
          ))}
          {instructions.length === 0 && <span className="text-gray-400">Klik tombol panah untuk menambah instruksi</span>}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button onClick={clearInstructions} disabled={isRunning} className="bouncy-button bg-gray-400 text-white px-6 py-3 rounded-full font-bold disabled:opacity-50">
          Hapus
        </button>
        <button onClick={runInstructions} disabled={isRunning || instructions.length === 0} className="bouncy-button bg-[#FFD166] text-[#2B2D42] px-6 py-3 rounded-full font-bold disabled:opacity-50">
          Jalankan! 🚀
        </button>
      </div>
    </div>
  );
};

export default AlgorithmGame;
