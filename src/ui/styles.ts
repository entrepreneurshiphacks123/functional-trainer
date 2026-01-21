// src/ui/styles.ts

export const font = {
  system:
    'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
} as const;

export const colors = {
  bg: "var(--bg)",
  text: "var(--text)",
} as const;

/**
 * Call once on app start or when theme changes if you want.
 * Right now we rely on CSS variables existing on :root (recommended).
 * This file just exists so Primitives can import it.
 */
