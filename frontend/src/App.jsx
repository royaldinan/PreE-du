import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import TrackOverview from './pages/TrackOverview';
import TopicPage from './pages/TopicPage';
import TrophyPage from './pages/Trophy';
import SoundButton from './components/SoundButton';
import AnimatedBackground from './components/AnimatedBackground';
import SceneBackground from './components/SceneBackground';
import { audioManager } from './utils/audioManager';
import './index.css';

// Background canvas yang temanya menyesuaikan track aktif (computational/
// critical/design) berdasarkan URL saat ini. Sebelumnya AnimatedBackground
// dipasang sekali secara global TANPA prop apa pun, sehingga seluruh sistem
// warna per-track yang sudah ditulis di komponennya tidak pernah terpakai.
const ThemedBackground = () => {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);
  const trackId = (segments[0] === 'track' || segments[0] === 'topic') ? segments[1] : 'default';
  return (
    <>
      <SceneBackground type={trackId || 'default'} />
      <AnimatedBackground type={trackId || 'default'} />
    </>
  );
};

function AppShell() {
  return (
    <div className="relative min-h-screen font-sans overflow-hidden">
      <ThemedBackground />
      <SoundButton />
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/track/:trackId" element={<TrackOverview />} />
          <Route path="/topic/:trackId/:topicId" element={<TopicPage />} />
          <Route path="/trophy" element={<TrophyPage />} />
        </Routes>
      </div>
    </div>
  );
}

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
    <Router>
      <AppShell />
    </Router>
  );
}

export default App;

