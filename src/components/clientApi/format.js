// ── Shared date helpers ───────────────────────────────────────────────────────

// Returns DD-MM-YY  e.g. "10-09-26"
export const formatDate = (value) => {
  if (!value || value === '—') return value || '—';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yy = String(d.getFullYear()).slice(-2);
  return `${dd}-${mm}-${yy}`;
};

// Returns DD-MM-YY HH:MM  e.g. "10-09-26 14:30"
export const formatDateTime = (value) => {
  if (!value) return '—';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  const dd  = String(d.getDate()).padStart(2, '0');
  const mm  = String(d.getMonth() + 1).padStart(2, '0');
  const yy  = String(d.getFullYear()).slice(-2);
  const hh  = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${dd}-${mm}-${yy} ${hh}:${min}`;
};

// ─────────────────────────────────────────────────────────────────────────────

// Formats an ISO date string (or Date) into a readable publication date, e.g.
// "14 August 2026". Returns '' for empty/invalid input so callers can hide it.
export const formatMediaDate = (value, lang = 'en') => {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return typeof value === 'string' ? value : '';
  return d.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

// Converts an ISO datetime into the yyyy-mm-dd value an <input type="date"> needs.
export const toDateInputValue = (value) => {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return d.toISOString().slice(0, 10);
};
