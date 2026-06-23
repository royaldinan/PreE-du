import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProgress, updateTopicProgress } from '../utils/localStorage';
import Mascot from '../components/Mascot';
import { ArrowLeft, Star, Printer, Play } from 'lucide-react';

// Import all games
import SortingGame from '../games/SortingGame';
import PatternGame from '../games/PatternGame';
import AlgorithmGame from '../games/AlgorithmGame';
import OddOneOutGame from '../games/OddOneOutGame';
import FactOpinionGame from '../games/FactOpinionGame';
import CauseEffectGame from '../games/CauseEffectGame';
import EmpathyGame from '../games/EmpathyGame';
import IdeationGame from '../games/IdeationGame';
import PrototypeGame from '../games/PrototypeGame';

// Import all real life activities
import SortingRealLife from '../reallife/SortingRealLife';
import PatternRealLife from '../reallife/PatternRealLife';
import AlgorithmRealLife from '../reallife/AlgorithmRealLife';
import OddOneOutRealLife from '../reallife/OddOneOutRealLife';
import FactOpinionRealLife from '../reallife/FactOpinionRealLife';
import CauseEffectRealLife from '../reallife/CauseEffectRealLife';
import EmpathyRealLife from '../reallife/EmpathyRealLife';
import IdeationRealLife from '../reallife/IdeationRealLife';
import PrototypeRealLife from '../reallife/PrototypeRealLife';

const TopicPage = () => {
  const { trackId, topicId } = useParams();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [showRealLife, setShowRealLife] = useState(false);
  const [topicComplete, setTopicComplete] = useState(false);
  const [stars, setStars] = useState(0);
  const [mascotMood, setMascotMood] = useState('idle');

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  if (!progress) return null;

  const gameComponents = {
    sorting: SortingGame,
    patterns: PatternGame,
    algorithms: AlgorithmGame,
    oddOneOut: OddOneOutGame,
    factOpinion: FactOpinionGame,
    causeEffect: CauseEffectGame,
    empathy: EmpathyGame,
    ideation: IdeationGame,
    prototype: PrototypeGame
  };

  const realLifeComponents = {
    sorting: SortingRealLife,
    patterns: PatternRealLife,
    algorithms: AlgorithmRealLife,
    oddOneOut: OddOneOutRealLife,
    factOpinion: FactOpinionRealLife,
    causeEffect: CauseEffectRealLife,
    empathy: EmpathyRealLife,
    ideation: IdeationRealLife,
    prototype: PrototypeRealLife
  };

  const GameComponent = gameComponents[topicId];
  const RealLifeComponent = realLifeComponents[topicId];

  const handleGameComplete = (earnedStars) => {
    setGameComplete(true);
    setStars(earnedStars);
    setMascotMood('happy');
  };

  const handleTopicComplete = () => {
    updateTopicProgress(trackId, topicId, stars);
    setTopicComplete(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const topicTitles = {
    sorting: 'Mengurutkan Angka',
    patterns: 'Menemukan Pola',
    algorithms: 'Instruksi Langkah demi Langkah',
    oddOneOut: 'Mana yang Berbeda?',
    factOpinion: 'Fakta atau Opini?',
    causeEffect: 'Apa Akibatnya?',
    empathy: 'Apa Masalahnya?',
    ideation: 'Ide Sebanyak Mungkin!',
    prototype: 'Buat dan Coba!'
  };

  const trackColors = {
    computational: '#4D96FF',
    critical: '#6BCB77',
    design: '#9D4CDD'
  };

  return (
    <div className="min-h-screen bg-[#FEFAF6] py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate(`/track/${trackId}`)}
          className="bouncy-button bg-white text-[#2B2D42] px-6 py-3 rounded-full font-bold mb-8 flex items-center gap-2 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali
        </button>

        {/* Topic Header */}
        <div className="bg-white rounded-[32px] p-8 shadow-xl mb-8 text-center">
          <div className="flex justify-center mb-4">
            <Mascot mood={mascotMood} size="large" />
          </div>
          <h1 
            className="heading-font text-3xl md:text-4xl text-[#2B2D42] mb-2"
            style={{ color: trackColors[trackId] }}
          >
            {topicTitles[topicId]}
          </h1>
          <p className="body-font text-lg text-[#6C757D]">
            Selesaikan permainan online, lalu coba aktivitas di dunia nyata!
          </p>
        </div>

        {/* Game Section */}
        {!gameComplete && !showRealLife && (
          <div className="bg-white rounded-[32px] p-8 shadow-xl mb-8">
            <div className="text-center mb-6">
              <h2 className="heading-font text-2xl text-[#2B2D42] mb-2">
                🎮 Permainan Online
              </h2>
              <p className="body-font text-lg text-[#6C757D]">
                Mainkan game ini dulu, yuk!
              </p>
            </div>
            <GameComponent onComplete={handleGameComplete} />
          </div>
        )}

        {/* Real Life Section Button */}
        {gameComplete && !showRealLife && !topicComplete && (
          <div className="bg-white rounded-[32px] p-8 shadow-xl mb-8 text-center">
            <div className="flex justify-center mb-6">
              <Mascot mood="happy" size="large" />
            </div>
            <h2 className="heading-font text-2xl text-[#2B2D42] mb-4">
              🎉 Hebat! Kamu dapat {stars} bintang!
            </h2>
            <button
              onClick={() => setShowRealLife(true)}
              className="bouncy-button bg-[#6BCB77] text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg flex items-center gap-3 mx-auto"
            >
              <Play className="w-6 h-6" />
              Sekarang Kita Main Beneran! 🎊
            </button>
          </div>
        )}

        {/* Real Life Activity */}
        {showRealLife && !topicComplete && (
          <div className="bg-white rounded-[32px] p-8 shadow-xl mb-8 print:shadow-none">
            <div className="flex items-center justify-between mb-6 no-print">
              <h2 className="heading-font text-2xl text-[#2B2D42]">
                📋 Aktivitas Dunia Nyata
              </h2>
              <button
                onClick={handlePrint}
                className="bouncy-button bg-[#4D96FF] text-white px-4 py-2 rounded-full font-bold flex items-center gap-2"
              >
                <Printer className="w-5 h-5" />
                Cetak
              </button>
            </div>
            <RealLifeComponent />
            <button
              onClick={handleTopicComplete}
              className="bouncy-button mt-8 w-full bg-[#FFD166] text-[#2B2D42] py-4 px-8 rounded-full font-bold text-xl shadow-lg"
            >
              ✅ Saya Sudah Selesai!
            </button>
          </div>
        )}

        {/* Completion Screen */}
        {topicComplete && (
          <div className="bg-white rounded-[32px] p-8 shadow-xl mb-8 text-center">
            <div className="text-6xl mb-4">🎊</div>
            <h2 className="heading-font text-3xl text-[#2B2D42] mb-4">
              SELAMAT! TOPIK SELESAI!
            </h2>
            <div className="flex justify-center gap-2 mb-6">
              {[...Array(stars)].map((_, i) => (
                <Star key={i} className="w-12 h-12 fill-[#FFD166] text-[#FFD166]" />
              ))}
            </div>
            <p className="body-font text-xl text-[#6C757D] mb-8">
              Kamu sudah menyelesaikan topik ini dengan {stars} bintang!
            </p>
            <button
              onClick={() => navigate(`/track/${trackId}`)}
              className="bouncy-button bg-[#4D96FF] text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg"
            >
              Lanjut ke Topik Berikutnya →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicPage;
