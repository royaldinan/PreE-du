import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import { audioManager } from '../utils/audioManager';

const TrackCard = ({ track, title, description, icon, color, completed, total }) => {
  const navigate = useNavigate();

  const goToTrack = () => {
    audioManager.playSfx('click');
    navigate(`/track/${track}`);
  };

  return (
    <div
      data-testid={`track-card-${track}`}
      onClick={goToTrack}
      className="chunky-card cursor-pointer p-8 h-full"
      style={{ backgroundColor: color }}
    >
      <div className="flex flex-col h-full">
        {/* Icon & Title */}
        <div className="flex items-start gap-4 mb-6">
          <div className="text-6xl float-animation" data-testid={`track-icon-${track}`}>
            {icon}
          </div>
          <div className="flex-1">
            <h2 className="heading-font text-3xl md:text-4xl text-white mb-2">
              {title}
            </h2>
            <p className="body-font text-lg text-white/90">
              {description}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-auto pt-6 border-t-4 border-white/30">
          <ProgressBar current={completed} total={total} color="rgba(255,255,255,0.9)" />
        </div>

        {/* Call to Action */}
        <button
          data-testid={`start-track-${track}`}
          className="bouncy-button mt-6 w-full bg-white text-[#2B2D42] py-4 px-8 rounded-full font-bold text-xl shadow-lg hover:shadow-xl"
          onClick={(e) => {
            e.stopPropagation();
            goToTrack();
          }}
        >
          {completed === 0 ? 'Mulai Belajar! 🚀' : completed === total ? 'Ulangi Lagi! ✨' : 'Lanjutkan Belajar! 💪'}
        </button>
      </div>
    </div>
  );
};

export default TrackCard;
