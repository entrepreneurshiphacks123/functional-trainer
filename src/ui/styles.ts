export const colors = {
  bg: "#0E1116",        // slightly softer than pure black
  card: "#151922",      // flat card
  card2: "#1A1F2B",     // subtle elevation
  border: "rgba(255,255,255,0.08)",
  text: "rgba(255,255,255,0.94)",
  muted: "rgba(255,255,255,0.60)",
  accent: "#7C5CFF",
  good: "#2EE59D",
  warn: "#FFD36E",
  bad: "#FF5C7C",
};


export const shadow = {
  soft: "0 12px 40px rgba(0,0,0,0.35)",
};

export const radius = {
  xl: 22,
  lg: 16,
  md: 14,
};

export const font = {
  system:
    '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, Segoe UI, Roboto, Helvetica, Arial',
};

export const page = {
  max: 560,
};

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
