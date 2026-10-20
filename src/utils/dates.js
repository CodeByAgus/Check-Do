import { urgencyColors } from '../theme/colors';

const DAY_MS = 24 * 60 * 60 * 1000;

// Units a chip cycles through when tapped.
export const UNITS = ['days', 'weeks', 'months'];

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function addDays(days) {
  return startOfDay(new Date(Date.now() + days * DAY_MS)).getTime();
}

// Whole days between today and the due date (negative = overdue).
export function daysLeft(dueTimestamp) {
  return Math.round((startOfDay(dueTimestamp) - startOfDay(Date.now())) / DAY_MS);
}

// Text shown inside the chip, e.g. "3 d", "2 sem", "1 mes".
export function formatLeft(days, unit) {
  const abs = Math.abs(days);
  if (unit === 'weeks') return `${Math.round(abs / 7)} sem`;
  if (unit === 'months') return `${Math.round(abs / 30)} mes`;
  return `${abs} d`;
}

export function urgencyColor(days) {
  if (days < 0) return urgencyColors.overdue;
  if (days <= 2) return urgencyColors.soon;
  if (days <= 7) return urgencyColors.week;
  if (days <= 30) return urgencyColors.month;
  return urgencyColors.later;
}

export function nextUnit(unit) {
  return UNITS[(UNITS.indexOf(unit) + 1) % UNITS.length];
}
