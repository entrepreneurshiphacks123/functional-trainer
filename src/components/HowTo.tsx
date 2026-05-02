import React from "react";

export default function HowTo({ text, image }: { text: string; image?: string }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div style={{ marginTop: 8 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          background: "none",
          border: "none",
          color: "var(--accent, #7c5cff)",
          fontWeight: 800,
          fontSize: 13,
          cursor: "pointer",
          padding: 0,
          textTransform: "uppercase",
          letterSpacing: "0.03em",
        }}
      >
        {open ? "▾ Hide How-To" : "▸ How To Do This"}
      </button>

      {open && (
        <div
          style={{
            marginTop: 8,
            padding: 12,
            background: "var(--card2, rgba(255,255,255,0.05))",
            border: "1px solid var(--border-light, rgba(255,255,255,0.1))",
            borderRadius: "var(--radius, 0)",
            fontSize: 14,
            lineHeight: 1.6,
            fontWeight: 600,
            whiteSpace: "pre-wrap",
          }}
        >
          {text}
          {image && (
            <img
              src={image}
              alt="Exercise demonstration"
              style={{ width: "100%", marginTop: 12, borderRadius: "var(--radius, 0)" }}
            />
          )}
        </div>
      )}
    </div>
  );
}
