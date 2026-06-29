import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProgress } from '../utils/localStorage';
import Mascot from '../components/Mascot';
import { audioManager } from '../utils/audioManager';
import { ArrowLeft, Star } from 'lucide-react';

const TrackOverview = () => {
  const { trackId } = useParams();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    setProgress(getProgress());
    // BGM diatur per-track (computational/critical/design), bukan per-topik.
    audioManager.playBgm(trackId);
  }, [trackId]);

  if (!progress) return null;

  const trackData = {
    computational: {
      title: '🧠 Berpikir Komputasional',
      color: '#4D96FF',
      topics: [
        { id: 'sorting', title: 'Mengurutkan Angka', description: 'Belajar mengurutkan dari yang terkecil ke terbesar!', icon: '🔢' },
        { id: 'patterns', title: 'Menemukan Pola', description: 'Cari tahu pola berikutnya dalam urutan!', icon: '🔷' },
        { id: 'algorithms', title: 'Instruksi Langkah demi Langkah', description: 'Buat langkah-langkah untuk menyelesaikan masalah!', icon: '📝' }
      ]
    },
    critical: {
      title: '🔍 Berpikir Kritis',
      color: '#6BCB77',
      topics: [
        { id: 'oddOneOut', title: 'Mana yang Berbeda?', description: 'Temukan benda yang tidak sama dengan lainnya!', icon: '❓' },
        { id: 'factOpinion', title: 'Fakta atau Opini?', description: 'Bedakan antara fakta dan pendapat!', icon: '💭' },
        { id: 'causeEffect', title: 'Apa Akibatnya?', description: 'Pelajari sebab dan akibat!', icon: '⚡' }
      ]
    },
    design: {
      title: '🎨 Berpikir Desain',
      color: '#9D4CDD',
      topics: [
        { id: 'empathy', title: 'Apa Masalahnya?', description: 'Pahami perasaan dan masalah orang lain!', icon: '❤️' },
        { id: 'ideation', title: 'Ide Sebanyak Mungkin!', description: 'Buat banyak ide kreatif!', icon: '💡' },
        { id: 'prototype', title: 'Buat dan Coba!', description: 'Bangun solusi dan uji coba!', icon: '🛠️' }
      ]
    }
  };

  const track = trackData[trackId];
  if (!track) return <div>Track tidak ditemukan</div>;

  const trackProgress = progress[trackId];

  return (
    <div className="min-h-screen bg-[#FEFAF6] py-8 px-4 md:px-8" style={{ backgroundColor: track.color }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <button
          onClick={() => {
            audioManager.playSfx('click');
            navigate('/');
          }}
          className="bouncy-button bg-white text-[#2B2D42] px-6 py-3 rounded-full font-bold mb-8 flex items-center gap-2 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali
        </button>

        <div className="bg-white rounded-[32px] p-8 shadow-xl mb-8">
          <div className="flex items-center gap-6 mb-6">
            <Mascot mood="idle" size="large" />
            <h1 className="heading-font text-4xl md:text-5xl text-[#2B2D42]">
              {track.title}
            </h1>
          </div>

          <p className="body-font text-xl text-[#6C757D] mb-6">
            Pilih topik untuk memulai petualangan belajarmu!
          </p>

          {/* Progress */}
          <div className="bg-[#FEFAF6] rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Star className="w-8 h-8 fill-[#FFD166] text-[#FFD166]" />
              <span className="heading-font text-2xl text-[#2B2D42]">
                Progress: {trackProgress.completed} dari 3 topik selesai
              </span>
            </div>
            <div className="w-full h-6 bg-white rounded-full overflow-hidden border-4 border-[#2B2D42]/20">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${(trackProgress.completed / 3) * 100}%`,
                  backgroundColor: track.color 
                }}
              />
            </div>
          </div>
        </div>

        {/* Topic Cards */}
        <div className="space-y-6">
          {track.topics.map((topic, index) => {
            const topicProgress = trackProgress.topics[topic.id];
            const isCompleted = topicProgress?.completed;

            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.015, x: 4 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => {
                  audioManager.playSfx('click');
                  navigate(`/topic/${trackId}/${topic.id}`);
                }}
                className="chunky-card cursor-pointer bg-white p-6 flex items-center gap-6"
              >
                <div className="text-5xl float-animation">{topic.icon}</div>
                <div className="flex-1">
                  <h3 className="heading-font text-2xl text-[#2B2D42] mb-2">
                    {index + 1}. {topic.title}
                  </h3>
                  <p className="body-font text-lg text-[#6C757D]">
                    {topic.description}
                  </p>
                </div>
                {isCompleted && (
                  <div className="flex gap-1">
                    {[...Array(topicProgress.stars)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-[#FFD166] text-[#FFD166]" />
                    ))}
                  </div>
                )}
                {!isCompleted && (
                  <div className="text-3xl">▶️</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrackOverview;
