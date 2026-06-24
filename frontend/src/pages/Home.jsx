import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TrackCard from '../components/TrackCard';
import Mascot from '../components/Mascot';
import { getProgress } from '../utils/localStorage';
import { audioManager } from '../utils/audioManager';
import { Trophy } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    setProgress(getProgress());
    audioManager.playBgm('mainMenu');
  }, []);

  if (!progress) return null;

  const tracks = [
    {
      track: 'computational',
      title: 'Berpikir Komputasional',
      description: 'Belajar cara komputer berpikir! Mengurutkan, menemukan pola, dan membuat langkah-langkah.',
      icon: '🧠',
      color: '#4D96FF',
      completed: progress.computational.completed,
      total: 3
    },
    {
      track: 'critical',
      title: 'Berpikir Kritis',
      description: 'Belajar bertanya dan berpikir lebih dalam! Mencari perbedaan dan memahami sebab-akibat.',
      icon: '🔍',
      color: '#6BCB77',
      completed: progress.critical.completed,
      total: 3
    },
    {
      track: 'design',
      title: 'Berpikir Desain',
      description: 'Belajar membuat solusi kreatif! Memahami masalah dan menciptakan ide-ide baru.',
      icon: '🎨',
      color: '#9D4CDD',
      completed: progress.design.completed,
      total: 3
    }
  ];

  return (
    <div className="min-h-screen bg-[#FEFAF6] py-8 px-4 md:px-8" data-testid="home-page">
      {/* Header with Mascot */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <div className="flex-1 text-center md:text-left">
            <h1 className="heading-font text-4xl sm:text-5xl lg:text-6xl text-[#2B2D42] mb-4">
              PreE-du 🌟
            </h1>
            <p className="body-font text-xl md:text-2xl text-[#6C757D] leading-relaxed">
              Belajar sambil bermain — khusus untuk kamu!
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Mascot mood="idle" size="large" />
            <button
              data-testid="trophy-button"
              onClick={() => {
                audioManager.playSfx('click');
                navigate('/trophy');
              }}
              className="bouncy-button bg-[#FFD166] text-[#2B2D42] px-6 py-3 rounded-full font-bold text-lg flex items-center gap-2 shadow-lg"
            >
              <Trophy className="w-6 h-6" />
              Trofi Ku ({progress.totalStars} ⭐)
            </button>
          </div>
        </div>
      </div>

      {/* Track Cards Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tracks.map((track) => (
            <TrackCard key={track.track} {...track} />
          ))}
        </div>
      </div>

      {/* Fun Footer Message */}
      <div className="max-w-7xl mx-auto mt-12 text-center">
        <div className="bg-white rounded-[32px] p-8 shadow-xl border-4 border-[#FFD166]/30">
          <p className="body-font text-xl text-[#2B2D42] leading-relaxed">
            💡 <strong>Setiap topik</strong> punya permainan online DAN aktivitas seru di dunia nyata! Mainkan semuanya dan kumpulkan bintang! ⭐
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
