import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProgress, resetProgress } from '../utils/localStorage';
import Mascot from '../components/Mascot';
import { audioManager } from '../utils/audioManager';
import { Star, RotateCcw, Home } from 'lucide-react';

const TrophyPage = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    setProgress(getProgress());
    // Halaman Trofi Ku termasuk bagian "menu", pakai BGM main menu yang sama
    // dengan Beranda — tidak di-restart kalau memang sudah main dari Home.
    audioManager.playBgm('mainMenu');
  }, []);

  if (!progress) return null;

  const totalTopics = 9;
  const completedTopics = progress.computational.completed + progress.critical.completed + progress.design.completed;
  const percentage = Math.round((completedTopics / totalTopics) * 100);

  const handleReset = () => {
    if (window.confirm('Yakin ingin menghapus semua progress?')) {
      resetProgress();
      setProgress(getProgress());
    }
  };

  return (
    <div className="min-h-screen bg-[#FEFAF6] py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => {
              audioManager.playSfx('click');
              navigate('/');
            }}
            className="bouncy-button bg-white text-[#2B2D42] px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg"
          >
            <Home className="w-5 h-5" />
            Kembali
          </button>
          <button
            onClick={() => {
              audioManager.playSfx('click');
              handleReset();
            }}
            className="bouncy-button bg-[#FF6B6B] text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            Reset Progress
          </button>
        </div>

        {/* Trophy Display */}
        <div className="bg-white rounded-[32px] p-8 shadow-xl mb-8 text-center">
          <div className="flex justify-center mb-6">
            <Mascot mood={progress.totalStars >= 15 ? 'happy' : 'idle'} size="large" />
          </div>
          
          <h1 className="heading-font text-4xl md:text-5xl text-[#2B2D42] mb-4">
            🏆 Trofi Ku 🏆
          </h1>
          
          <div className="bg-[#FFD166]/20 rounded-2xl p-8 mb-8">
            <div className="text-8xl mb-4">
              {percentage === 100 ? '🏆' : percentage >= 50 ? '🥈' : '🥉'}
            </div>
            <p className="body-font text-2xl text-[#2B2D42] mb-2">
              Total Bintang: <span className="heading-font text-4xl text-[#FFD166]">{progress.totalStars}</span> / 27 ⭐
            </p>
            <p className="body-font text-xl text-[#6C757D]">
              Topik Selesai: {completedTopics} dari {totalTopics} ({percentage}%)
            </p>
          </div>

          {/* Achievement Messages */}
          <div className="space-y-4">
            {progress.totalStars === 0 && (
              <p className="body-font text-xl text-[#6C757D]">
                💪 Ayo mulai belajar dan kumpulkan bintang pertamamu!
              </p>
            )}
            {progress.totalStars > 0 && progress.totalStars < 9 && (
              <p className="body-font text-xl text-[#6C757D]">
                🌟 Bagus! Terus semangat belajarnya!
              </p>
            )}
            {progress.totalStars >= 9 && progress.totalStars < 18 && (
              <p className="body-font text-xl text-[#6BCB77]">
                🎉 Hebat! Kamu sudah mengumpulkan banyak bintang!
              </p>
            )}
            {progress.totalStars >= 18 && progress.totalStars < 27 && (
              <p className="body-font text-xl text-[#4D96FF]">
                🚀 Luar biasa! Hampir sempurna!
              </p>
            )}
            {progress.totalStars === 27 && (
              <p className="heading-font text-2xl text-[#9D4CDD]">
                🎊 SELAMAT! KAMU SUDAH MENYELESAIKAN SEMUA TOPIK! 🎊
              </p>
            )}
          </div>
        </div>

        {/* Track Breakdown */}
        <div className="bg-white rounded-[32px] p-8 shadow-xl">
          <h2 className="heading-font text-2xl text-[#2B2D42] mb-6 text-center">
            Detail Progress per Track
          </h2>
          
          <div className="space-y-6">
            {/* Computational Thinking */}
            <div className="bg-[#4D96FF]/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="heading-font text-xl text-[#4D96FF]">🧠 Berpikir Komputasional</h3>
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-6 h-6 ${
                        i < progress.computational.topics.sorting?.stars ? 'fill-[#FFD166] text-[#FFD166]' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-2 text-sm body-font text-[#6C757D]">
                <div className="flex justify-between">
                  <span>Mengurutkan Angka:</span>
                  <span>{progress.computational.topics.sorting?.stars || 0} ⭐</span>
                </div>
                <div className="flex justify-between">
                  <span>Menemukan Pola:</span>
                  <span>{progress.computational.topics.patterns?.stars || 0} ⭐</span>
                </div>
                <div className="flex justify-between">
                  <span>Instruksi Langkah:</span>
                  <span>{progress.computational.topics.algorithms?.stars || 0} ⭐</span>
                </div>
              </div>
            </div>

            {/* Critical Thinking */}
            <div className="bg-[#6BCB77]/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="heading-font text-xl text-[#6BCB77]">🔍 Berpikir Kritis</h3>
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-6 h-6 ${
                        i < progress.critical.topics.oddOneOut?.stars ? 'fill-[#FFD166] text-[#FFD166]' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-2 text-sm body-font text-[#6C757D]">
                <div className="flex justify-between">
                  <span>Mana yang Berbeda:</span>
                  <span>{progress.critical.topics.oddOneOut?.stars || 0} ⭐</span>
                </div>
                <div className="flex justify-between">
                  <span>Fakta atau Opini:</span>
                  <span>{progress.critical.topics.factOpinion?.stars || 0} ⭐</span>
                </div>
                <div className="flex justify-between">
                  <span>Apa Akibatnya:</span>
                  <span>{progress.critical.topics.causeEffect?.stars || 0} ⭐</span>
                </div>
              </div>
            </div>

            {/* Design Thinking */}
            <div className="bg-[#9D4CDD]/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="heading-font text-xl text-[#9D4CDD]">🎨 Berpikir Desain</h3>
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-6 h-6 ${
                        i < progress.design.topics.empathy?.stars ? 'fill-[#FFD166] text-[#FFD166]' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-2 text-sm body-font text-[#6C757D]">
                <div className="flex justify-between">
                  <span>Apa Masalahnya:</span>
                  <span>{progress.design.topics.empathy?.stars || 0} ⭐</span>
                </div>
                <div className="flex justify-between">
                  <span>Ide Sebanyak Mungkin:</span>
                  <span>{progress.design.topics.ideation?.stars || 0} ⭐</span>
                </div>
                <div className="flex justify-between">
                  <span>Buat dan Coba:</span>
                  <span>{progress.design.topics.prototype?.stars || 0} ⭐</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrophyPage;
