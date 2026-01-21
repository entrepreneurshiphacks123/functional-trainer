export type Theme = "light" | "dark";

const THEME_KEY = "training_os_theme_v1";

export function loadTheme(): Theme {
  try {
    const raw = localStorage.getItem(THEME_KEY);
    return raw === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

export function saveTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // ignore
  }
}

export function applyTheme(theme: Theme) {
  // Use a single, consistent hook that CSS can read.
  document.documentElement.setAttribute("data-theme", theme);
}
