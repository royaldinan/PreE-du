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
  // Inisialisasi audio saat pertama kali ada interaksi user di mana saja
  useEffect(() => {
    const handleFirstInteraction = () => {
      // Coba mainkan BGM sekali saat user klik apa saja di aplikasi
      if (audioManager.enabled) {
        audioManager.play('bgm');
      }
      // Hapus listener setelah berhasil
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
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
