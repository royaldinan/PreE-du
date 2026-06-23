// localStorage utilities for PreE-du

const STORAGE_KEY = 'preedu_progress';

// Initialize default progress structure
const DEFAULT_PROGRESS = {
  computational: {
    completed: 0,
    topics: {
      sorting: { completed: false, stars: 0 },
      patterns: { completed: false, stars: 0 },
      algorithms: { completed: false, stars: 0 }
    }
  },
  critical: {
    completed: 0,
    topics: {
      oddOneOut: { completed: false, stars: 0 },
      factOpinion: { completed: false, stars: 0 },
      causeEffect: { completed: false, stars: 0 }
    }
  },
  design: {
    completed: 0,
    topics: {
      empathy: { completed: false, stars: 0 },
      ideation: { completed: false, stars: 0 },
      prototype: { completed: false, stars: 0 }
    }
  },
  totalStars: 0
};

export const getProgress = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_PROGRESS;
  } catch (error) {
    console.error('Error reading progress:', error);
    return DEFAULT_PROGRESS;
  }
};

export const saveProgress = (progress) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
};

export const updateTopicProgress = (track, topic, stars) => {
  const progress = getProgress();
  
  if (!progress[track].topics[topic].completed) {
    progress[track].completed += 1;
  }
  
  progress[track].topics[topic].completed = true;
  progress[track].topics[topic].stars = Math.max(progress[track].topics[topic].stars, stars);
  
  // Calculate total stars
  progress.totalStars = Object.keys(progress).reduce((total, trackKey) => {
    if (trackKey === 'totalStars') return total;
    return total + Object.values(progress[trackKey].topics).reduce((sum, topic) => sum + topic.stars, 0);
  }, 0);
  
  saveProgress(progress);
  return progress;
};

export const resetProgress = () => {
  saveProgress(DEFAULT_PROGRESS);
  return DEFAULT_PROGRESS;
};

export const getTrackProgress = (track) => {
  const progress = getProgress();
  return progress[track];
};
