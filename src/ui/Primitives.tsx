import React from "react";
import { colors, radius, shadow, font, page } from "./styles";

export function Screen({
  title,
  subtitle,
  children,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div style={wrap}>
      <div style={container}>
        <header style={header}>
          <div>
            <div style={eyebrow}>Training OS</div>
            <h1 style={h1}>{title}</h1>
            {subtitle ? <p style={sub}>{subtitle}</p> : null}
          </div>
          {right ? <div>{right}</div> : null}
        </header>

        <div style={content}>{children}</div>
      </div>
    </div>
  );
}

export function Card({
  children,
  subtle,
}: {
  children: React.ReactNode;
  subtle?: boolean;
}) {
  return (
    <div
      style={{
        background: subtle ? colors.card : colors.card2,
        border: `1px solid ${colors.border}`,
        borderRadius: radius.xl,
        padding: 16,
        boxShadow: shadow.soft,
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
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "danger";
  icon?: string;
  disabled?: boolean;
}) {
  const base: React.CSSProperties = {
    width: "100%",
    borderRadius: radius.lg,
    padding: "14px 14px",
    border: "1px solid transparent",
    fontSize: 16,
    fontWeight: 650,
    cursor: disabled ? "not-allowed" : "pointer",
    display: "flex",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
    transition: "transform 120ms ease, filter 120ms ease, opacity 120ms ease",
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
    opacity: disabled ? 0.5 : 1,
  };

  const styles: Record<string, React.CSSProperties> = {
    primary: {
      background: colors.accent,
      color: "#0B0D12",
      filter: "saturate(1.05)",
    },
    ghost: {
      background: "rgba(255,255,255,0.06)",
      color: colors.text,
      border: `1px solid ${colors.border}`,
    },
    danger: {
      background: "rgba(255,92,124,0.18)",
      color: colors.text,
      border: `1px solid rgba(255,92,124,0.35)`,
    },
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      style={{ ...base, ...(styles[variant] || styles.primary) }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.99)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <span style={{ display: "flex", gap: 10, alignItems: "center" }}>
        {icon ? <span style={{ fontSize: 18 }}>{icon}</span> : null}
        <span>{children}</span>
      </span>
      <span style={{ opacity: 0.65 }}>›</span>
    </button>
  );
}

export function Segmented({
  value,
  options,
  onChange,
}: {
  value: string;
  options: Array<{ key: string; label: string }>;
  onChange: (v: string) => void;
}) {
  return (
    <div style={segWrap}>
      {options.map((o) => {
        const active = o.key === value;
        return (
          <button
            key={o.key}
            onClick={() => onChange(o.key)}
            style={{
              ...segBtn,
              background: active ? "rgba(255,255,255,0.10)" : "transparent",
              borderColor: active ? "rgba(255,255,255,0.16)" : "transparent",
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function Pill({
  label,
  tone = "neutral",
}: {
  label: string;
  tone?: "neutral" | "good" | "warn" | "bad";
}) {
  const map = {
    neutral: "rgba(255,255,255,0.10)",
    good: "rgba(46,229,157,0.18)",
    warn: "rgba(255,211,110,0.18)",
    bad: "rgba(255,92,124,0.18)",
  }[tone];

  return (
    <span
      style={{
        padding: "6px 10px",
        borderRadius: 999,
        background: map,
        border: `1px solid ${colors.border}`,
        fontSize: 12,
        color: colors.text,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
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
  gap: 16,
  alignItems: "flex-start",
  marginBottom: 14,
};

const eyebrow: React.CSSProperties = {
  fontSize: 12,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  opacity: 0.6,
  marginBottom: 6,
};

const h1: React.CSSProperties = {
  margin: 0,
  fontSize: 26,
  lineHeight: 1.1,
  letterSpacing: "-0.02em",
};

const sub: React.CSSProperties = {
  margin: "10px 0 0",
  opacity: 0.65,
  lineHeight: 1.4,
  fontSize: 14,
  maxWidth: 46 * 10,
};

const content: React.CSSProperties = {
  display: "grid",
  gap: 12,
};

const segWrap: React.CSSProperties = {
  display: "inline-flex",
  padding: 4,
  borderRadius: 999,
  border: `1px solid rgba(255,255,255,0.14)`,
  background: "rgba(255,255,255,0.06)",
  gap: 2,
};

const segBtn: React.CSSProperties = {
  padding: "8px 10px",
  borderRadius: 999,
  border: "1px solid transparent",
  background: "transparent",
  color: colors.text,
  fontSize: 13,
  cursor: "pointer",
};
