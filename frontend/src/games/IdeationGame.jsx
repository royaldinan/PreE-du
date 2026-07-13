import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Mascot from '../components/Mascot';
import GameButton from '../components/GameButton';
import GameTile from '../components/GameTile';
import { audioManager } from '../utils/audioManager';
import { celebrateCorrectAnswer } from '../utils/confetti';
import { sparkleAt } from '../utils/sparkle';

const IdeationGame = ({ onComplete }) => {
  const [ideas, setIdeas] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameComplete, setGameComplete] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [mascotMood, setMascotMood] = useState('idle');
  const [isPlaying, setIsPlaying] = useState(false);
  // Sama seperti tileStatus di game lain — di-set 'pulse' sesaat lalu
  // di-reset ke null lewat timeout, supaya animasi bounce GameButton
  // ter-retrigger TIAP klik (karena trigger-nya adalah perubahan prop
  // status, bukan cuma re-render dengan array animate yang sama).
  const [buttonStatus, setButtonStatus] = useState(null);

  // Tiap masalah punya bank ide konkrit sendiri (bukan cuma emoji acak yang
  // gak nyambung ke masalahnya). Bank sengaja dibuat 8 ide per masalah supaya
  // anak masih bisa dapat ide baru tiap klik sampai mendekati batas waktu.
  const problems = [
    {
      problem: 'Tas sekolah terlalu berat',
      ideas: [
        '🎒 Pakai tas beroda',
        '📚 Bawa buku sesuai jadwal aja',
        '🗄️ Simpan buku cadangan di loker',
        '📱 Pakai e-book buat buku tebal',
        '⚖️ Timbang tas tiap pagi',
        '🎈 Tas dari bahan ringan',
        '📋 Bikin checklist barang wajib',
        '👨‍👩‍👧 Bagi barang bawa gantian sama teman',
      ],
    },
    {
      problem: 'Lupa bawa pensil ke sekolah',
      ideas: [
        '📝 Sedia pensil cadangan di tas',
        '🗒️ Tempel catatan pengingat di pintu',
        '🖊️ Simpan 1 pensil permanen di laci sekolah',
        '⏰ Cek perlengkapan pas alarm bangun',
        '🎒 Gantung pensil case di tas',
        '👬 Pinjam teman sebangku',
        '📦 Sedia kotak alat tulis di rumah',
        '✅ Checklist sebelum berangkat',
      ],
    },
    {
      problem: 'Kamar berantakan',
      ideas: [
        '🗃️ Sedia kotak untuk tiap kategori barang',
        '⏱️ Rapikan 5 menit tiap malam',
        '🏷️ Kasih label di rak',
        '🧸 Mainan balik ke keranjang habis main',
        '👕 Baju kotor langsung ke keranjang cucian',
        '📅 Jadwal beres-beres mingguan',
        '🎵 Rapikan sambil dengar musik',
        '👨‍👩‍👧 Beres-beres bareng keluarga',
      ],
    },
    {
      problem: 'Bosan saat hujan',
      ideas: [
        '🎨 Menggambar atau mewarnai',
        '📖 Baca buku cerita',
        '🧩 Main puzzle',
        '🎲 Main board game keluarga',
        '🍪 Bikin camilan sederhana',
        '🎬 Nonton film favorit',
        '🖐️ Origami atau kerajinan tangan',
        '📞 Telepon teman untuk ngobrol',
      ],
    },
    {
      problem: 'Susah bangun pagi',
      ideas: [
        '⏰ Alarm diletakkan jauh dari tempat tidur',
        '🌅 Buka gorden malam sebelum tidur',
        '🛏️ Tidur lebih awal',
        '🎵 Alarm dengan lagu favorit',
        '💧 Minum air putih begitu bangun',
        '📅 Siapkan baju sekolah malam sebelumnya',
        '🧘 Peregangan ringan begitu bangun',
        '👨‍👩‍👧 Minta dibangunkan orang tua',
      ],
    },
    {
      problem: 'Sepatu cepat kotor',
      ideas: [
        '🧼 Bersihkan sepatu tiap minggu',
        '☔ Pakai pelindung sepatu saat hujan',
        '👟 Sedia sepatu khusus main di luar',
        '🧽 Semprot anti air di sepatu',
        '🚪 Sedia keset di depan pintu',
        '🧦 Ganti kaus kaki tiap hari',
        '📦 Simpan sepatu di rak tertutup',
        '👞 Punya sepatu cadangan',
      ],
    },
  ];

  // Sebelumnya problem selalu index 0 ("Tas sekolah terlalu berat") karena
  // currentRound tidak pernah berubah selama sesi bermain. Sekarang dipilih
  // acak sekali per sesi supaya bervariasi tiap kali game dimulai/diulang.
  const [problemIndex, setProblemIndex] = useState(() => Math.floor(Math.random() * problems.length));

  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && isPlaying) {
      endGame();
    }
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    audioManager.playSfx('click');
    setIsPlaying(true);
    setTimeLeft(60);
    setIdeas([]);
    setFeedback('');
    setButtonStatus(null);
  };

  const addIdea = (event) => {
    if (!isPlaying) return;
    // Tidak ada jawaban "salah" di game ini — setiap ide yang berhasil
    // dikumpulkan dianggap sebagai keberhasilan kecil (SFX correct).
    audioManager.playSfx('correct');
    sparkleAt(event.currentTarget, { count: 6 });
    celebrateCorrectAnswer();

    const pool = problems[problemIndex].ideas;
    // Prioritaskan ide yang belum pernah muncul di sesi ini supaya anak
    // lihat variasi ide baru tiap klik. Kalau semua 8 ide di pool sudah
    // pernah muncul, baru boleh ambil random dari seluruh pool lagi
    // (tombol tetap bisa dipencet sampai waktu habis).
    const unused = pool.filter((idea) => !ideas.includes(idea));
    const source = unused.length > 0 ? unused : pool;
    const nextIdea = source[Math.floor(Math.random() * source.length)];

    setIdeas((prev) => [...prev, nextIdea]);
    setMascotMood('happy');
    setButtonStatus('pulse');
    setTimeout(() => {
      setMascotMood('idle');
      setButtonStatus(null);
    }, 280);
  };

  const endGame = () => {
    setIsPlaying(false);
    setGameComplete(true);
    // 0 ide terkumpul -> kalah (0 bintang). Selain itu -> menang.
    const totalStars = ideas.length >= 8 ? 3 : ideas.length >= 5 ? 2 : ideas.length >= 1 ? 1 : 0;
    setFeedback(`Kamu dapat ${ideas.length} ide!`);
    onComplete(totalStars);
  };

  const resetGame = () => {
    audioManager.playSfx('click');
    setGameComplete(false);
    setIdeas([]);
    setTimeLeft(60);
    setIsPlaying(false);
    setButtonStatus(null);
    setProblemIndex(Math.floor(Math.random() * problems.length));
  };

  if (gameComplete) {
    return (
      <div className="text-center py-8">
        <Mascot mood="happy" size="large" />
        <h3 className="heading-font text-2xl text-[#2B2D42] mb-4">🎉 Hebat! Banyak ide kreatif!</h3>
        <p className="body-font text-lg text-[#6C757D] mb-6">Kamu mengumpulkan {ideas.length} ide!</p>
        <GameButton onClick={resetGame} variant="blue" size="pillLg">Main Lagi</GameButton>
      </div>
    );
  }

  const currentProblem = problems[problemIndex].problem;

  return (
    <div className="text-center">
      <div className="mb-4"><Mascot mood={mascotMood} size="medium" /></div>
      {!isPlaying ? (
        <>
          <p className="body-font text-lg text-[#6C757D] mb-6">Masalah: <span className="font-bold">{currentProblem}</span></p>
          <GameButton onClick={startGame} variant="yellow" size="pillLg">Mulai Brainstorm! ⏱️</GameButton>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <span className="body-font text-lg text-[#6C757D]">Waktu: {timeLeft}s</span>
            <span className="body-font text-lg text-[#6C757D]">Ide: {ideas.length}</span>
          </div>
          <p className="body-font text-lg text-[#6C757D] mb-4">Klik tombol secepatnya untuk kumpulkan ide!</p>
          <p className="heading-font text-xl text-[#2B2D42] mb-6">{currentProblem}</p>
          {/* Dibungkus motion.div terpisah supaya tetap bisa menambahkan
              rotate playful saat tap (whileTap GameButton sendiri fixed
              ke y-translate untuk konsistensi semua game). */}
          <motion.div className="inline-block" whileTap={{ rotate: -8 }}>
            <GameButton onClick={addIdea} variant="purple" status={buttonStatus} size="bigCircle">
              💡
            </GameButton>
          </motion.div>
          <GameTile tone="well" className="mt-6 p-4 min-h-[64px]">
            <div className="flex flex-wrap justify-center gap-2">
              <AnimatePresence>
                {ideas.map((idea, i) => (
                  <motion.span
                    key={`${idea}-${i}`}
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
              {ideas.length === 0 && <span className="text-gray-400 self-center">Ide-idemu akan muncul di sini</span>}
            </div>
          </GameTile>
        </>
      )}
    </div>
  );
};

export default IdeationGame;

