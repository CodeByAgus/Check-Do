import { urgencyColors } from '../theme/colors';

const DAY_MS = 24 * 60 * 60 * 1000;

// Units a chip cycles through when tapped.
export const UNITS = ['days', 'weeks', 'months'];

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

const pad = (n) => String(n).padStart(2, '0');

// Date typed by the user is always dd/mm/yyyy.
export function formatDMY(timestamp) {
  const d = new Date(timestamp);
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}

// Tomorrow, used as the default value of the date field.
export function tomorrowDMY() {
  return formatDMY(startOfDay(Date.now()).getTime() + DAY_MS);
}

// Keeps only digits and inserts the slashes while typing: "25122026" -> "25/12/2026".
export function maskDMY(text) {
  const digits = text.replace(/\D/g, '').slice(0, 8);
  return [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4)].filter(Boolean).join('/');
}

// "dd/mm/yyyy" -> timestamp at local midnight, or null if it is not a real date.
export function parseDMY(text) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(text);
  if (!match) return null;
  const [day, month, year] = match.slice(1).map(Number);
  const date = new Date(year, month - 1, day);
  // Rejects overflow such as 31/02 (JS would silently roll it into March).
  const valid = date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  return valid ? date.getTime() : null;
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
