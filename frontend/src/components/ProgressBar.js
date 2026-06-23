import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ current, total, color = '#4D96FF' }) => {
  const percentage = (current / total) * 100;

  return (
    <div data-testid="progress-bar" className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-bold text-[#2B2D42] body-font">
          {current} dari {total} topik selesai
        </span>
        <span className="text-lg font-bold" style={{ color }}>
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="w-full h-8 bg-white/50 rounded-full border-4 border-white/80 overflow-hidden shadow-inner">
        <motion.div
          data-testid="progress-fill"
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: 1,
            ease: 'easeOut'
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
