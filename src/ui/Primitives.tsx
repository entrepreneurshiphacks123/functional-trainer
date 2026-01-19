import React from "react";
import { colors, radius, font, page } from "./styles";

export function Screen({
  title,
  right,
  children,
}: {
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div style={wrap}>
      <div style={container}>
        <header style={header}>
          <h1 style={h1}>{title}</h1>
          {right ? <div>{right}</div> : null}
        </header>
        <div style={content}>{children}</div>
      </div>
    </div>
  );
}

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: colors.card,
        border: `1px solid ${colors.border}`,
        borderRadius: radius.xl,
        padding: 16,
      }}
    >
      {children}
    </div>
  );
}

export function Button({
  children,
  onClick,
  variant = "primary",
  icon,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  icon?: string;
}) {
  const base: React.CSSProperties = {
    width: "100%",
    borderRadius: radius.lg,
    padding: "14px 14px",
    border: "1px solid transparent",
    background: "var(--accent)",
color: "#FFFFFF",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
    transition: "transform 120ms ease, opacity 120ms ease",
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
  };

  const styles =
    variant === "ghost"
      ? {
          background: colors.card2,
          color: colors.text,
          border: `1px solid ${colors.border}`,
        }
      : {
          background: colors.accent,
          color: "#0B0D12",
        };

  return (
    <button
      onClick={onClick}
      style={{ ...base, ...styles }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.99)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <span style={{ display: "flex", gap: 10, alignItems: "center" }}>
        {icon ? <span style={{ fontSize: 18 }}>{icon}</span> : null}
        <span>{children}</span>
      </span>
      <span style={{ opacity: 0.6 }}>›</span>
    </button>
  );
}

export function TinyIconButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        borderRadius: 999,
        border: `1px solid ${colors.border}`,
        background: colors.card2,
        color: colors.text,
        padding: "8px 10px",
        fontSize: 13,
        cursor: "pointer",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {label}
    </button>
  );
}

export function Segmented({
  value,
  options,
  onChange,
  tone,
}: {
  value: string;
  options: Array<{ key: string; label: string }>;
  onChange: (v: string) => void;
  tone?: "good" | "warn" | "bad";
}) {
  const toneBg =
    tone === "good"
      ? "rgba(22,163,74,0.16)"
      : tone === "warn"
      ? "rgba(202,138,4,0.16)"
      : tone === "bad"
      ? "rgba(220,38,38,0.16)"
      : "transparent";

  return (
    <div
      style={{
        display: "inline-flex",
        padding: 4,
        borderRadius: 999,
        border: `1px solid ${colors.border}`,
        background: toneBg || colors.card2,
        gap: 2,
      }}
    >
      {options.map((o) => {
        const active = o.key === value;
        return (
          <button
            key={o.key}
            onClick={() => onChange(o.key)}
            style={{
              padding: "8px 10px",
              borderRadius: 999,
              border: `1px solid ${active ? colors.border : "transparent"}`,
              background: active ? colors.card : "transparent",
              color: colors.text,
              fontSize: 13,
              cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

const wrap: React.CSSProperties = {
  minHeight: "100vh",
  background: colors.bg,
  color: colors.text,
  fontFamily: font.system,
  padding:
    "max(16px, env(safe-area-inset-top)) 16px max(16px, env(safe-area-inset-bottom))",
};

const container: React.CSSProperties = {
  maxWidth: page.max,
  margin: "0 auto",
};

const header: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  marginBottom: 12,
};

const h1: React.CSSProperties = {
  margin: 0,
  fontSize: 22,
  letterSpacing: "-0.02em",
};

const content: React.CSSProperties = {
  display: "grid",
  gap: 12,
};
