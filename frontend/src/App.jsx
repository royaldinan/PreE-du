import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TrackOverview from './pages/TrackOverview';
import TopicPage from './pages/TopicPage';
import TrophyPage from './pages/Trophy';
import SoundButton from './components/SoundButton';
import AnimatedBackground from './components/AnimatedBackground';
import { audioManager } from './utils/audioManager';
import './index.css';

function App() {
  // Buka kunci audio browser saat interaksi pertama user di mana saja.
  // Setelah ini, BGM yang sedang "menunggu" (di-set sebelum interaksi user)
  // akan otomatis lanjut diputar.
  useEffect(() => {
    const handleFirstInteraction = async () => {
      const success = await audioManager.unlock();
      if (success) {
        if (!audioManager.isMuted && audioManager.bgmAudio && audioManager.bgmAudio.paused) {
          audioManager.bgmAudio.play().catch(() => {});
        }
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
      }
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  return (
    <div className="relative min-h-screen font-sans overflow-hidden">
      <AnimatedBackground />
      <SoundButton />
      <div className="relative z-10">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/track/:trackId" element={<TrackOverview />} />
            <Route path="/topic/:trackId/:topicId" element={<TopicPage />} />
            <Route path="/trophy" element={<TrophyPage />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
