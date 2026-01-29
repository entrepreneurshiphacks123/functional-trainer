import React from "react";

type CSS = React.CSSProperties;

const wrap: CSS = {
  width: "100%",
  background: "var(--bg)",
  color: "var(--text)",
  paddingTop: "max(12px, env(safe-area-inset-top))",
  paddingLeft: 12,
  paddingRight: 12,
  paddingBottom: "calc(100px + env(safe-area-inset-bottom))", // Ensure space for bottom nav
  boxSizing: "border-box",
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
      el.style.transform = "translate(1px, 1px)";
    },
    onPointerUp: (e: React.PointerEvent<HTMLElement>) => {
      const el = e.currentTarget as HTMLElement;
      el.style.transform = "translate(0, 0)";
    },
    onPointerCancel: (e: React.PointerEvent<HTMLElement>) => {
      const el = e.currentTarget as HTMLElement;
      el.style.transform = "translate(0, 0)";
    },
    onPointerLeave: (e: React.PointerEvent<HTMLElement>) => {
      const el = e.currentTarget as HTMLElement;
      el.style.transform = "translate(0, 0)";
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
              marginBottom: 4,
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 950,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                textTransform: "uppercase",
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
  title,
  style,
}: {
  children: React.ReactNode;
  title?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: "var(--card)",
        border: "var(--bw) solid var(--border)",
        borderRadius: "var(--radius)",
        padding: 16,
        ...style,
      }}
    >
      {title && (
        <div style={{ fontSize: 13, fontWeight: 900, textTransform: "uppercase", marginBottom: 12, opacity: 0.8 }}>
          {title}
        </div>
      )}
      {children}
    </div>
  );
}

type ButtonVariant = "primary" | "ghost" | "danger";

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
    borderRadius: "var(--radius)",
    padding: "16px 12px",
    border: "var(--bw) solid var(--border)",
    fontSize: 15,
    fontWeight: 950,
    textTransform: "uppercase",
    letterSpacing: "0.02em",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
    transition: "transform 60ms ease",
    transform: "translateZ(0)",
  };

  const v: CSS =
    variant === "primary"
      ? {
        background: "var(--accent)",
        color: "var(--accent-text)",
      }
      : variant === "danger"
        ? {
          background: "var(--bad)",
          color: "#FFFFFF",
        }
        : {
          background: "transparent",
          color: "var(--text)",
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
        borderRadius: "var(--radius)",
        border: "var(--bw) solid var(--border)",
        background: "var(--card2)",
        color: "var(--text)",
        padding: "10px 10px",
        fontSize: 14,
        fontWeight: 950,
        cursor: "pointer",
        lineHeight: 1,
        WebkitTapHighlightColor: "transparent",
        transition: "transform 60ms ease",
      }}
      {...handlers}
    >
      {label}
    </button>
  );
}

export function BottomNav({
  active,
  onTabChange,
}: {
  active: "workout" | "calendar" | "settings";
  onTabChange: (tab: "workout" | "calendar" | "settings") => void;
}) {
  const tabs = [
    { id: "workout", label: "Workout", icon: "🏋️" },
    { id: "calendar", label: "History", icon: "📅" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ] as const;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "var(--bg)",
        borderTop: "var(--bw) solid var(--border)",
        height: "calc(64px + env(safe-area-inset-bottom))",
        paddingBottom: "env(safe-area-inset-bottom)",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        zIndex: 100,
      }}
    >
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              border: "none",
              background: isActive ? "var(--card2)" : "transparent",
              color: "var(--text)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              fontSize: 11,
              fontWeight: isActive ? 950 : 600,
              textTransform: "uppercase",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <span style={{ fontSize: 20 }}>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function Segmented<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: Array<{
    value?: T;
    key?: T;
    label?: string;
    tone?: "neutral" | "good" | "warn" | "bad";
  }>;
  onChange: (v: T) => void;
}) {
  const toneColor = (tone?: "neutral" | "good" | "warn" | "bad") => {
    if (tone === "good") return "var(--good)";
    if (tone === "warn") return "var(--warn)";
    if (tone === "bad") return "var(--bad)";
    return "var(--text)";
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${options.length}, 1fr)`,
        gap: 0,
        border: "var(--bw) solid var(--border)",
        background: "var(--border)",
      }}
    >
      {options.map((opt, idx) => {
        const optValue = (opt.value ?? opt.key) as T | undefined;
        if (!optValue) return null;
        const active = optValue === value;

        return (
          <button
            key={`${optValue}-${idx}`}
            onClick={() => onChange(optValue)}
            style={{
              border: "none",
              borderRadius: 0,
              padding: "14px 10px",
              background: active ? "var(--accent)" : "var(--bg)",
              color: active ? "var(--accent-text)" : toneColor(opt.tone),
              fontWeight: 950,
              fontSize: 13,
              textTransform: "uppercase",
              cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
              transition: "background 100ms ease",
            }}
          >
            {opt.label ?? ""}
          </button>
        );
      })}
    </div>
  );
}
export function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.8)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        zIndex: 2000, // Very high level
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg)",
          border: "var(--bw) solid var(--border)",
          width: "100%",
          maxWidth: 420,
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: "var(--radius)",
        }}
      >
        <div
          style={{
            padding: "16px",
            borderBottom: "var(--bw) solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "var(--card2)",
          }}
        >
          <div style={{ fontWeight: 950, textTransform: "uppercase", fontSize: 16 }}>{title}</div>
          <button
            onClick={onClose}
            style={{
              padding: "6px 12px",
              border: "var(--bw) solid var(--border)",
              background: "var(--bg)",
              color: "var(--text)",
              fontWeight: 950,
              textTransform: "uppercase",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
        <div
          style={{
            padding: "20px 16px",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            flex: 1,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
