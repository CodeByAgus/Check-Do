// All colors live here so the look can be changed in one place.
export const colors = {
  backgroundGradient: ['#1b1f4b', '#4b2a7b', '#0f5c7a'],
  blobs: ['#ff6fb5', '#5ac8fa', '#a78bfa'],
  text: '#ffffff',
  textSoft: 'rgba(255,255,255,0.65)',
  glassBorder: 'rgba(255,255,255,0.35)',
  glassTint: 'rgba(255,255,255,0.10)',
};

// Chip color by urgency (measured in days left).
export const urgencyColors = {
  overdue: '#ff453a', // past due
  soon: '#ff9f0a', // 0-2 days
  week: '#ffd60a', // up to a week
  month: '#30d158', // up to a month
  later: '#5ac8fa', // more than a month
};
