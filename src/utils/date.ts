export function pad2(n: number) {
  return String(n).padStart(2, "0");
}

// Local date key (YYYY-MM-DD) using local timezone (fixes calendar issues)
export function toLocalDateKey(d: Date = new Date()) {
  const y = d.getFullYear();
  const m = pad2(d.getMonth() + 1);
  const day = pad2(d.getDate());
  return `${y}-${m}-${day}`;
}
