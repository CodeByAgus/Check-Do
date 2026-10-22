import { urgencyColors } from '../theme/colors';

const DAY_MS = 24 * 60 * 60 * 1000;

// Units a chip cycles through when tapped; "date" shows the due date itself.
export const UNITS = ['days', 'weeks', 'months', 'date'];

export const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

const pad = (n) => String(n).padStart(2, '0');

// Dates are always shown as dd/mm/yyyy.
export function formatDMY(timestamp) {
  const d = new Date(timestamp);
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}

// Tomorrow at local midnight, the default value of the calendar.
export function tomorrow() {
  return startOfDay(Date.now() + DAY_MS).getTime();
}

// Whole days between today and the due date (negative = overdue).
export function daysLeft(dueTimestamp) {
  return Math.round((startOfDay(dueTimestamp) - startOfDay(Date.now())) / DAY_MS);
}

// Text shown inside the chip, e.g. "3 d", "2 sem", "1 mes" or "25/12/2026".
export function formatChip(dueTimestamp, unit) {
  if (unit === 'date') return formatDMY(dueTimestamp);
  const abs = Math.abs(daysLeft(dueTimestamp));
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

// Cells for one month grid, Monday first: leading nulls, then day numbers.
export function monthCells(year, month) {
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  const total = new Date(year, month + 1, 0).getDate();
  return [...Array(offset).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)];
}
