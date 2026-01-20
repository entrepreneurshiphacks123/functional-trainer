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

export function fromLocalDateKey(key: string) {
  const parts = key.split("-").map((x) => Number(x));
  const y = parts[0] ?? 1970;
  const m = parts[1] ?? 1;
  const d = parts[2] ?? 1;
  return new Date(y, m - 1, d);
}
