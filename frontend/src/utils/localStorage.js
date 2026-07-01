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

// Deep-merge stored progress on top of the default shape so older or
// partially-corrupted localStorage data (e.g. saved before a new topic
// was added, or a manually-edited/truncated value) always ends up with
// every track.topics.topic key present. Without this, updateTopicProgress
// throws "Cannot read properties of undefined" the moment it touches a
// topic that isn't in the stored data.
const mergeTopic = (defaultTopic, storedTopic) => {
  if (!storedTopic || typeof storedTopic !== 'object') return { ...defaultTopic };
  return {
    completed: typeof storedTopic.completed === 'boolean' ? storedTopic.completed : defaultTopic.completed,
    stars: typeof storedTopic.stars === 'number' ? storedTopic.stars : defaultTopic.stars,
  };
};

const mergeTrack = (defaultTrack, storedTrack) => {
  if (!storedTrack || typeof storedTrack !== 'object') return structuredClone(defaultTrack);
  const storedTopics = storedTrack.topics && typeof storedTrack.topics === 'object' ? storedTrack.topics : {};
  const topics = Object.keys(defaultTrack.topics).reduce((acc, topicKey) => {
    acc[topicKey] = mergeTopic(defaultTrack.topics[topicKey], storedTopics[topicKey]);
    return acc;
  }, {});
  return {
    completed: typeof storedTrack.completed === 'number' ? storedTrack.completed : defaultTrack.completed,
    topics,
  };
};

const mergeWithDefaults = (stored) => {
  if (!stored || typeof stored !== 'object') return structuredClone(DEFAULT_PROGRESS);
  const merged = Object.keys(DEFAULT_PROGRESS).reduce((acc, key) => {
    if (key === 'totalStars') return acc;
    acc[key] = mergeTrack(DEFAULT_PROGRESS[key], stored[key]);
    return acc;
  }, {});
  merged.totalStars = typeof stored.totalStars === 'number' ? stored.totalStars : 0;
  return merged;
};

export const getProgress = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? mergeWithDefaults(JSON.parse(stored)) : structuredClone(DEFAULT_PROGRESS);
  } catch (error) {
    console.error('Error reading progress:', error);
    return structuredClone(DEFAULT_PROGRESS);
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
  const fresh = structuredClone(DEFAULT_PROGRESS);
  saveProgress(fresh);
  return fresh;
};

export const getTrackProgress = (track) => {
  const progress = getProgress();
  return progress[track];
};
