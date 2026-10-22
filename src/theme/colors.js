// All colors live here so the look can be changed in one place.
export const colors = {
  outer: '#9ecbf0', // page background behind the app on wide screens
  primary: '#3d8fe0', // main blue
  surface: '#ffffff',
  ink: '#1f2a44', // main text
  inkSoft: '#7a869a', // secondary text
  line: '#d9e6f5', // thin borders
  tint: '#eaf3fd', // light blue fill
  onPrimary: '#ffffff',
};

// Chip color by urgency (measured in days left).
export const urgencyColors = {
  overdue: '#ff453a', // past due
  soon: '#ff9f0a', // 0-2 days
  week: '#ffd60a', // up to a week
  month: '#30d158', // up to a month
  later: '#5ac8fa', // more than a month
};

// Task categories shown as chips in the create screen and as an icon on each card.
export const categories = [
  { id: 'work', label: 'Trabajo', icon: '💼' },
  { id: 'personal', label: 'Personal', icon: '🙂' },
  { id: 'study', label: 'Estudio', icon: '📚' },
  { id: 'home', label: 'Hogar', icon: '🏠' },
];

// Tasks saved before categories existed fall back to the first one.
export const getCategory = (id) => categories.find((c) => c.id === id) ?? categories[1];
