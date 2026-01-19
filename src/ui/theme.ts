export type Theme = "dark" | "light";

const THEME_KEY = "training:theme:v1";

export function loadTheme(): Theme {
  const v = localStorage.getItem(THEME_KEY);
  return v === "light" ? "light" : "dark";
}

export function saveTheme(t: Theme) {
  localStorage.setItem(THEME_KEY, t);
}

export function applyTheme(t: Theme) {
  const r = document.documentElement;

  if (t === "light") {
    r.style.setProperty("--bg", "#F6F7FB");
    r.style.setProperty("--card", "#FFFFFF");
    r.style.setProperty("--card2", "#FFFFFF");
    r.style.setProperty("--border", "rgba(15, 23, 42, 0.10)");
    r.style.setProperty("--text", "rgba(15, 23, 42, 0.92)");
    r.style.setProperty("--muted", "rgba(15, 23, 42, 0.60)");
    r.style.setProperty("--accent", "#3B5BFF");
    r.style.setProperty("--good", "#16A34A");
    r.style.setProperty("--warn", "#CA8A04");
    r.style.setProperty("--bad", "#DC2626");
  } else {
    r.style.setProperty("--bg", "#0E1116");
    r.style.setProperty("--card", "#151922");
    r.style.setProperty("--card2", "#1A1F2B");
    r.style.setProperty("--border", "rgba(255,255,255,0.08)");
    r.style.setProperty("--text", "rgba(255,255,255,0.94)");
    r.style.setProperty("--muted", "rgba(255,255,255,0.60)");
    r.style.setProperty("--accent", "#7C5CFF");
    r.style.setProperty("--good", "#2EE59D");
    r.style.setProperty("--warn", "#FFD36E");
    r.style.setProperty("--bad", "#FF5C7C");
  }

  // Update the browser theme-color for a cleaner feel
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", t === "light" ? "#F6F7FB" : "#0E1116");
}
