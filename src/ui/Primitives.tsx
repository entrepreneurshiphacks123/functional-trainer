import React from "react";
import { colors, font } from "./styles";

type CSS = React.CSSProperties;

const wrap: CSS = {
  minHeight: "100vh",
  background: colors.bg,
  color: colors.text,
  fontFamily: font.system,
  padding:
    "max(16px, env(safe-area-inset-top)) 16px max(16px, env(safe-area-inset-bottom))",
};

const shell: CSS = {
  maxWidth: 560,
  margin: "0 auto",
  display: "grid",
  gap: 12,
};

function pressHandlers() {
  return {
    onPointerDown: (e: React.PointerEvent<HTMLElement>) => {
      const el = e.currentTarget as HTMLElement;
      el.style.transform = "scale(0.985)";
      el.style.filter = "brightness(0.98)";
    },
    onPointerUp: (e: React.PointerEvent<HTMLElement>) => {
      const el = e.currentTarget as HTMLElement;
      el.style.transform = "scale(1)";
      el.style.filter = "brightness(1)";
    },
    onPointerCancel: (e: React.PointerEvent<HTMLElement>) => {
      const el = e.currentTarget as HTMLElement;
      el.style.transform = "scale(1)";
      el.style.filter = "brightness(1)";
    },
    onPointerLeave: (e: React.PointerEvent<HTMLElement>) => {
      const el = e.currentTarget as HTMLElement;
      el.style.transform = "scale(1)";
      el.style.filter = "brightness(1)";
    },
  };
}

export function Screen({
  title,
  right,
  children,
}: {
  title?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div style={wrap}>
      <div style={shell}>
        {(title || right) && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: 12,
              marginBottom: 2,
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: 850,
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
              }}
            >
              {title ?? ""}
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {right ?? null}
            </div>
          </div>
        )}

        {children}
      </div>
    </div>
  );
}

export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 18,
        padding: 14,
        boxShadow: "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

type ButtonVariant = "primary" | "ghost";

export function Button({
  children,
  icon,
  variant = "primary",
  onClick,
  disabled,
  style,
  type = "button",
}: {
  children: React.ReactNode;
  icon?: string;
  variant?: ButtonVariant;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
}) {
  const base: CSS = {
    width: "100%",
    borderRadius: 14,
    padding: "12px 12px",
    border: "1px solid var(--border)",
    background: "var(--card2)",
    color: "var(--text)",
    fontSize: 15,
    fontWeight: 850,
    letterSpacing: "-0.01em",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.55 : 1,
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
    transition:
      "transform 120ms ease, filter 120ms ease, background 120ms ease, border-color 120ms ease, opacity 120ms ease",
    transform: "translateZ(0)",
  };

  const v: CSS =
    variant === "primary"
      ? {
          background: "var(--accent)",
          color: "#FFFFFF", // <- key: white text
          border: "1px solid rgba(255,255,255,0.10)",
        }
      : {
          background: "transparent",
          color: "var(--text)",
          border: "1px solid var(--border)",
        };

  const handlers = disabled ? {} : pressHandlers();

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      style={{ ...base, ...v, ...style }}
      {...handlers}
    >
      {icon ? <span aria-hidden="true">{icon}</span> : null}
      <span>{children}</span>
    </button>
  );
}

export function TinyIconButton({
  label,
  onClick,
  title,
}: {
  label: string;
  onClick: () => void;
  title?: string;
}) {
  const handlers = pressHandlers();

  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        borderRadius: 12,
        border: "1px solid var(--border)",
        background: "var(--card2)",
        color: "var(--text)",
        padding: "10px 10px",
        fontSize: 14,
        fontWeight: 850,
        cursor: "pointer",
        lineHeight: 1,
        WebkitTapHighlightColor: "transparent",
        transition:
          "transform 120ms ease, filter 120ms ease, background 120ms ease, border-color 120ms ease",
        transform: "translateZ(0)",
      }}
      {...handlers}
    >
      {label}
    </button>
  );
}
