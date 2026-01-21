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
  // Minimal approach: attach data-theme to <html> so CSS can react
  document.documentElement.setAttribute("data-theme", theme);

  // Also add/remove a class for convenience
  document.documentElement.classList.toggle("dark", theme === "dark");
}
