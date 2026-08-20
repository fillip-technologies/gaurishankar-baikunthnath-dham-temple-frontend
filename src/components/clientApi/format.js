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
