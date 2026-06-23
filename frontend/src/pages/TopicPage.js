Sekarang saya akan buat halaman TopicPage yang akan menampilkan intro, game online, dan real-life activity card. Saya akan mulai dengan struktur utama dan game pertama:
Action: file_editor create /app/frontend/src/pages/TopicPage.js --file-text "import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Mascot from '../components/Mascot';
import CompletionScreen from '../components/CompletionScreen';

// Import game components
import SortingGame from '../games/SortingGame';
import PatternGame from '../games/PatternGame';
import AlgorithmGame from '../games/AlgorithmGame';
import OddOneOutGame from '../games/OddOneOutGame';
import FactOpinionGame from '../games/FactOpinionGame';
import CauseEffectGame from '../games/CauseEffectGame';
import EmpathyGame from '../games/EmpathyGame';
import IdeationGame from '../games/IdeationGame';
import PrototypeGame from '../games/PrototypeGame';

// Import real-life components
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
  const [stage, setStage] = useState('intro'); // intro, game, reallife, completion
  const [gameResult, setGameResult] = useState(null);

  const topicContent = {
    // Computational Thinking
    sorting: {
      title: 'Mengurutkan Angka',
      icon: '🔢',
      color: '#4D96FF',
      intro: 'Hai! Hari ini kita akan belajar mengurutkan angka dari yang terkecil ke yang terbesar. Komputer sering melakukan ini untuk mengatur data. Yuk coba!',
      GameComponent: SortingGame,
      RealLifeComponent: SortingRealLife
    },
    patterns: {
      title: 'Menemukan Pola',
      icon: '🔴🔵',
      color: '#4D96FF',
      intro: 'Pola ada di mana-mana! Di alam, musik, bahkan di komputer. Ayo kita belajar mengenali dan melanjutkan pola!',
      GameComponent: PatternGame,
      RealLifeComponent: PatternRealLife
    },
    algorithms: {
      title: 'Instruksi Langkah demi Langkah',
      icon: '🤖',
      color: '#4D96FF',
      intro: 'Algoritma adalah langkah-langkah untuk menyelesaikan masalah. Seperti resep masakan! Mari kita buat instruksi untuk robot kita!',
      GameComponent: AlgorithmGame,
      RealLifeComponent: AlgorithmRealLife
    },
    // Critical Thinking
    oddOneOut: {
      title: 'Mana yang Berbeda?',
      icon: '🔍',
      color: '#6BCB77',
      intro: 'Belajar menemukan perbedaan membantu kita berpikir lebih tajam. Mari temukan mana yang tidak sama!',
      GameComponent: OddOneOutGame,
      RealLifeComponent: OddOneOutRealLife
    },
    factOpinion: {
      title: 'Fakta atau Opini?',
      icon: '💭',
      color: '#6BCB77',
      intro: 'Fakta itu benar untuk semua orang. Opini adalah pendapat pribadi. Yuk belajar membedakannya!',
      GameComponent: FactOpinionGame,
      RealLifeComponent: FactOpinionRealLife
    },
    causeEffect: {
      title: 'Apa Akibatnya?',
      icon: '⚡',
      color: '#6BCB77',
      intro: 'Setiap tindakan ada akibatnya! Mari belajar melihat hubungan sebab dan akibat.',
      GameComponent: CauseEffectGame,
      RealLifeComponent: CauseEffectRealLife
    },
    // Design Thinking
    empathy: {
      title: 'Apa Masalahnya?',
      icon: '❤️',
      color: '#9D4CDD',
      intro: 'Untuk membuat solusi yang baik, kita harus memahami masalahnya dulu. Yuk belajar empati!',
      GameComponent: EmpathyGame,
      RealLifeComponent: EmpathyRealLife
    },
    ideation: {
      title: 'Ide Sebanyak Mungkin!',
      icon: '💡',
      color: '#9D4CDD',
      intro: 'Semakin banyak ide, semakin banyak pilihan! Tidak ada ide yang salah. Ayo brainstorm!',
      GameComponent: IdeationGame,
      RealLifeComponent: IdeationRealLife
    },
    prototype: {
      title: 'Buat dan Coba!',
      icon: '🛠️',
      color: '#9D4CDD',
      intro: 'Cara terbaik mengetahui apakah ide kita bagus adalah dengan mencobanya! Mari buat prototipe!',
      GameComponent: PrototypeGame,
      RealLifeComponent: PrototypeRealLife
    }
  };

  const topic = topicContent[topicId];

  if (!topic) {
    navigate('/');
    return null;
  }

  const handleGameComplete = (result) => {
    setGameResult(result);
    setStage('reallife');
  };

  const handleRealLifeComplete = () => {
    setStage('completion');
  };

  const GameComponent = topic.GameComponent;
  const RealLifeComponent = topic.RealLifeComponent;

  return (
    <div className=\"min-h-screen bg-[#FEFAF6] py-8 px-4 md:px-8\" data-testid={`topic-page-${topicId}`}>
      <div className=\"max-w-5xl mx-auto\">
        {/* Header */}
        <div className=\"flex items-center gap-4 mb-8\">
          <button
            data-testid=\"back-button\"
            onClick={() => navigate(`/track/${trackId}`)}
            className=\"bouncy-button bg-white p-4 rounded-full shadow-lg\"
          >
            <ArrowLeft className=\"w-6 h-6 text-[#2B2D42]\" />
          </button>
          <div>
            <h1 className=\"heading-font text-3xl md:text-4xl text-[#2B2D42]\">
              {topic.icon} {topic.title}
            </h1>
          </div>
        </div>

        {/* Intro Stage */}
        {stage === 'intro' && (
          <div className=\"space-y-8\">
            <div
              className=\"rounded-[32px] p-8 md:p-12 shadow-xl\"
              style={{ backgroundColor: topic.color }}
            >
              <div className=\"flex flex-col md:flex-row items-center gap-8\">
                <Mascot mood=\"idle\" size=\"large\" />
                <div className=\"flex-1\">
                  <p className=\"body-font text-xl md:text-2xl text-white leading-relaxed\">
                    {topic.intro}
                  </p>
                </div>
              </div>
            </div>

            <div className=\"text-center\">
              <button
                data-testid=\"start-game-button\"
                onClick={() => setStage('game')}
                className=\"bouncy-button px-12 py-6 rounded-full font-bold text-2xl text-white shadow-xl\"
                style={{ backgroundColor: topic.color }}
              >
                Ayo Main! 🎮
              </button>
            </div>
          </div>
        )}

        {/* Game Stage */}
        {stage === 'game' && (
          <GameComponent onComplete={handleGameComplete} color={topic.color} />
        )}

        {/* Real Life Stage */}
        {stage === 'reallife' && (
          <RealLifeComponent
            onComplete={handleRealLifeComplete}
            color={topic.color}
            gameResult={gameResult}
          />
        )}

        {/* Completion Stage */}
        {stage === 'completion' && (
          <CompletionScreen
            trackId={trackId}
            topicId={topicId}
            stars={gameResult?.stars || 3}
            color={topic.color}
          />
        )}
      </div>
    </div>
  );
};

export default TopicPage;
"
Observation: Create successful: /app/frontend/src/pages/TopicPage.js