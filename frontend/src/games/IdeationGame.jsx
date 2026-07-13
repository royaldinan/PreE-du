import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Mascot from '../components/Mascot';
import GameButton from '../components/GameButton';
import GameTile from '../components/GameTile';
import { audioManager } from '../utils/audioManager';
import { celebrateCorrectAnswer } from '../utils/confetti';
import { sparkleAt } from '../utils/sparkle';

const MAX_IDEAS_PER_TOPIC = 5;

// Dirombak total dari game berbasis timer 60 detik (klik tombol lampu
// sebanyak-banyaknya sebelum waktu habis, ide otomatis diambil random dari
// bank) menjadi game berbasis 5 topik/soal PASTI, sama seperti game lain di
// aplikasi ini. Sekarang anak benar-benar MENGETIK idenya sendiri (bukan
// cuma klik tombol dan dapat ide acak dari bank) — ini lebih sesuai dengan
// tujuan melatih "Design Thinking / Ideation" yang sebenarnya: anak yang
// mengeluarkan ide, bukan mengklik ide yang sudah disediakan.
//
// Tidak ada jawaban "salah" di game ini (sama seperti versi lama) — semua
// ide yang berhasil diketik dan ditambahkan dianggap keberhasilan kecil.
const topics = [
  { problem: 'Tas sekolah terlalu berat', placeholder: 'Contoh: pakai tas beroda...' },
  { problem: 'Lupa bawa pensil ke sekolah', placeholder: 'Contoh: sedia pensil cadangan...' },
  { problem: 'Kamar berantakan', placeholder: 'Contoh: sedia kotak per kategori...' },
  { problem: 'Bosan saat hujan', placeholder: 'Contoh: menggambar atau mewarnai...' },
  { problem: 'Sepatu cepat kotor', placeholder: 'Contoh: bersihkan tiap minggu...' },
];

const IdeationGame = ({ onComplete }) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [ideaInput, setIdeaInput] = useState('');
  // Menampung ide per topik: { 1: ['ide a', 'ide b'], 2: [...], ... }
  // supaya jumlah ide tiap ronde tetap kalau anak sempat maju-mundur
  // (walau saat ini tidak ada tombol mundur, struktur ini tetap lebih
  // aman daripada satu array datar yang di-reset tiap ganti topik).
  const [ideasByRound, setIdeasByRound] = useState({});
  const [gameComplete, setGameComplete] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [mascotMood, setMascotMood] = useState('idle');
  const [inputStatus, setInputStatus] = useState(null); // null | 'shake' (ide kosong/duplikat)

  const currentIdeas = ideasByRound[currentRound] || [];
  const totalIdeas = Object.values(ideasByRound).reduce((sum, arr) => sum + arr.length, 0);

  const addIdea = (event) => {
    const trimmed = ideaInput.trim();
    if (!trimmed) {
      setInputStatus('shake');
      setTimeout(() => setInputStatus(null), 400);
      return;
    }
    // Cegah ide duplikat persis di topik yang sama (perbandingan tidak
    // case-sensitive supaya "Baju" dan "baju" tetap dianggap sama).
    if (currentIdeas.some((idea) => idea.toLowerCase() === trimmed.toLowerCase())) {
      setInputStatus('shake');
      setFeedback('Ide itu sudah kamu tulis! Coba ide lain 💭');
      setTimeout(() => {
        setInputStatus(null);
        setFeedback('');
      }, 900);
      return;
    }
    if (currentIdeas.length >= MAX_IDEAS_PER_TOPIC) return;

    audioManager.playSfx('correct');
    if (event) sparkleAt(event.currentTarget, { count: 6 });
    celebrateCorrectAnswer();

    setIdeasByRound((prev) => ({
      ...prev,
      [currentRound]: [...(prev[currentRound] || []), trimmed],
    }));
    setIdeaInput('');
    setMascotMood('happy');
    setTimeout(() => setMascotMood('thinking'), 400);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addIdea(event);
    }
  };

  const goToNextRound = () => {
    audioManager.playSfx('click');
    if (currentRound < 5) {
      setCurrentRound(currentRound + 1);
      setIdeaInput('');
      setFeedback('');
      setMascotMood('idle');
    } else {
      // 0 ide terkumpul sepanjang 5 topik -> kalah (0 bintang).
      const totalStars =
        totalIdeas >= 15 ? 3 : totalIdeas >= 8 ? 2 : totalIdeas >= 1 ? 1 : 0;
      setGameComplete(true);
      onComplete(totalStars);
    }
  };

  const resetGame = () => {
    audioManager.playSfx('click');
    setCurrentRound(1);
    setIdeaInput('');
    setIdeasByRound({});
    setGameComplete(false);
    setFeedback('');
    setMascotMood('idle');
    setInputStatus(null);
  };

  if (gameComplete) {
    return (
      <div className="text-center py-8">
        <Mascot mood="happy" size="large" />
        <h3 className="heading-font text-2xl text-[#2B2D42] mb-4">🎉 Hebat! Banyak ide kreatif!</h3>
        <p className="body-font text-lg text-[#6C757D] mb-6">Kamu mengumpulkan {totalIdeas} ide dari 5 topik!</p>
        <GameButton onClick={resetGame} variant="blue" size="pillLg">Main Lagi</GameButton>
      </div>
    );
  }

  const current = topics[currentRound - 1];
  const canAddMore = currentIdeas.length < MAX_IDEAS_PER_TOPIC;

  return (
    <div className="text-center">
      <div className="mb-4"><Mascot mood={mascotMood} size="medium" /></div>
      <div className="flex justify-between items-center mb-4">
        <span className="body-font text-lg text-[#6C757D]">Topik {currentRound}/5</span>
        <span className="body-font text-lg text-[#6C757D]">Ide: {currentIdeas.length}/{MAX_IDEAS_PER_TOPIC}</span>
      </div>
      <AnimatePresence mode="wait">
        {feedback && (
          <motion.div
            key={feedback}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-lg font-bold mb-4 text-orange-500"
          >
            {feedback}
          </motion.div>
        )}
      </AnimatePresence>
      <p className="body-font text-lg text-[#6C757D] mb-2">Berikan ide untuk masalah ini:</p>
      <GameTile
        tone="highlight"
        motionKey={currentRound}
        animateProps={{ initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 } }}
        className="p-6 mb-6"
      >
        <p className="heading-font text-xl text-[#2B2D42]">{current.problem}</p>
      </GameTile>

      {/* Input teks — elemen baru di aplikasi ini (game lain semua berbasis
          klik pilihan). Dibungkus motion.div sendiri (bukan lewat GameButton
          yang memang khusus <button>) supaya tetap dapat animasi shake yang
          konsisten dengan reaksi "wrong" di game lain saat ide kosong/duplikat. */}
      <motion.div
        animate={inputStatus === 'shake' ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col sm:flex-row gap-3 justify-center items-stretch mb-6 max-w-lg mx-auto"
      >
        <input
          type="text"
          value={ideaInput}
          onChange={(e) => setIdeaInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          disabled={!canAddMore}
          placeholder={canAddMore ? current.placeholder : 'Topik ini sudah penuh ide!'}
          maxLength={60}
          className="body-font flex-1 px-4 py-3 text-base rounded-2xl border-2 border-[#E5E0D5] focus:border-[#9D4CDD] focus:outline-none disabled:bg-[#F3EFE6] disabled:cursor-not-allowed transition-colors"
          style={{ background: canAddMore ? '#FFFFFF' : '#F3EFE6', color: '#2B2D42' }}
        />
        <GameButton
          onClick={addIdea}
          disabled={!canAddMore}
          variant="purple"
          size="pill"
          className="shrink-0"
        >
          Tambah Ide 💡
        </GameButton>
      </motion.div>

      <GameTile tone="well" className="p-4 mb-6 min-h-[64px]">
        <p className="body-font text-sm text-[#6C757D] mb-2">Ide-idemu:</p>
        <div className="flex flex-wrap justify-center gap-2">
          <AnimatePresence>
            {currentIdeas.map((idea, i) => (
              <motion.span
                key={`${currentRound}-${idea}-${i}`}
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="text-white px-3 py-1.5 rounded-lg font-bold text-sm relative overflow-hidden inline-block text-left"
                style={{
                  background: 'linear-gradient(155deg, #FFD874 0%, #F5A623 60%, #F5A623 100%)',
                  boxShadow: '0 2px 0 0 #C97F0E, 0 3px 6px rgba(0,0,0,0.12)',
                  color: '#5A3B00',
                }}
              >
                <span
                  className="pointer-events-none absolute inset-x-0 top-0 h-1/2 opacity-50"
                  style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%)' }}
                />
                <span className="relative z-10">{idea}</span>
              </motion.span>
            ))}
          </AnimatePresence>
          {currentIdeas.length === 0 && <span className="text-gray-400 self-center">Ketik ide lalu tekan "Tambah Ide"</span>}
        </div>
      </GameTile>

      <GameButton
        onClick={goToNextRound}
        disabled={currentIdeas.length === 0}
        variant="yellow"
        size="pillLg"
      >
        {currentRound < 5 ? 'Topik Berikutnya ➡️' : 'Selesai! 🎉'}
      </GameButton>
    </div>
  );
};

export default IdeationGame;
