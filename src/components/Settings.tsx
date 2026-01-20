import React from "react";
import { TinyIconButton, Card } from "../ui/Primitives";
import { resetAllAppData, resetWorkoutDataOnly, resetPlansOnly } from "../engine/storage";

async function repairAppCaches() {
  // Unregister service workers
  if ("serviceWorker" in navigator) {
    const regs = await navigator.serviceWorker.getRegistrations();
    await Promise.all(regs.map((r) => r.unregister()));
  }

  // Clear Cache Storage (where PWA keeps old JS/assets)
  if ("caches" in window) {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));
  }
}

function firstLS(keys: string[]) {
  for (const k of keys) {
    const v = localStorage.getItem(k);
    if (v && v.trim()) return { key: k, value: v };
  }
  return null;
}

function scanLSForHints() {
  try {
    const out: Array<{ key: string; value: string }> = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i) || "";
      const lower = k.toLowerCase();
      if (
        lower.includes("plan") ||
        lower.includes("mode") ||
        lower.includes("program") ||
        lower.includes("workout") ||
        lower.includes("selected")
      ) {
        const v = localStorage.getItem(k) ?? "";
        if (v && v.length < 140) out.push({ key: k, value: v });
      }
    }
    return out.slice(0, 12);
  } catch {
    return [];
  }
}

export default function Settings({ onBack }: { onBack: () => void }) {
  const Row = ({
    title,
    desc,
    action,
    danger,
  }: {
    title: string;
    desc: string;
    action: () => void | Promise<void>;
    danger?: boolean;
  }) => (
    <button
      onClick={action}
      style={{
        width: "100%",
        textAlign: "left",
        padding: 14,
        borderRadius: 12,
        border: danger ? "1px solid rgba(231,76,60,0.55)" : "1px solid var(--border)",
        background: danger ? "rgba(231,76,60,0.08)" : "var(--card2)",
        marginBottom: 10,
        cursor: "pointer",
        color: "var(--text)",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
      }}
    >
      <div style={{ fontWeight: 900, fontSize: 16 }}>{title}</div>
      <div style={{ opacity: 0.8, marginTop: 4, lineHeight: 1.35 }}>{desc}</div>
    </button>
  );

  const confirmAnd = async (msg: string, fn: () => void | Promise<void>) => {
    if (!confirm(msg)) return;
    await fn();
    location.reload();
  };

  const planGuess =
    firstLS(["selectedPlanId", "selected_plan_id", "activePlanId", "active_plan_id", "planId", "plan_id"]) ??
    null;

  const modeGuess =
    firstLS(["selectedMode", "selected_mode", "mode", "workoutMode", "workout_mode"]) ?? null;

  const hints = scanLSForHints();

  return (
    <div
      style={{
        padding: 14,
        color: "var(--text)",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <div style={{ fontWeight: 950, fontSize: 18 }}>Settings</div>
        <TinyIconButton label="←" onClick={onBack} />
      </div>

      {/* Plan info restored */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 8 }}>Plan & Mode</div>
        <div
          style={{
            border: "1px solid var(--border)",
            background: "var(--card)",
            borderRadius: 14,
            padding: 12,
          }}
        >
          <div style={{ display: "grid", gap: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
              <div style={{ fontWeight: 900 }}>Plan</div>
              <div style={{ opacity: 0.85, fontWeight: 900 }}>
                {planGuess ? planGuess.value : "—"}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
              <div style={{ fontWeight: 900 }}>Mode</div>
              <div style={{ opacity: 0.85, fontWeight: 900 }}>
                {modeGuess ? modeGuess.value : "—"}
              </div>
            </div>

            {(planGuess || modeGuess) ? (
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
                Source keys: {planGuess?.key ?? "—"} · {modeGuess?.key ?? "—"}
              </div>
            ) : (
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
                (If this shows —, your plan/mode is likely stored under a different key. The hints below help us locate it.)
              </div>
            )}

            {hints.length ? (
              <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 6 }}>Detected storage hints</div>
                <div style={{ display: "grid", gap: 6 }}>
                  {hints.map((h) => (
                    <div
                      key={h.key}
                      style={{
                        border: "1px solid var(--border)",
                        background: "var(--card2)",
                        borderRadius: 12,
                        padding: 10,
                        fontSize: 12,
                        lineHeight: 1.25,
                      }}
                    >
                      <div style={{ fontWeight: 900 }}>{h.key}</div>
                      <div style={{ opacity: 0.8, marginTop: 2, wordBreak: "break-word" }}>{h.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 14, opacity: 0.8 }}>
        If the app looks “stuck” on an older version after you deploy, use <b>Repair App</b>.
      </div>

      <Row
        title="Repair App (fix caching)"
        desc="Unregisters the service worker + clears cached files, then reloads. Use this if you deployed changes but the UI didn’t update."
        action={() =>
          confirmAnd("Repair App? This clears cached files (recommended after updates). Continue?", repairAppCaches)
        }
      />

      <Row
        title="Reset workout history only"
        desc="Clears last day, soreness, and calendar logs. Keeps your uploaded plans."
        action={() => confirmAnd("Reset workout history (keep plans)?", () => resetWorkoutDataOnly())}
      />

      <Row
        title="Reset plans only"
        desc="Clears uploaded plans and plan selection. Keeps your workout history."
        action={() => confirmAnd("Reset plans (keep workout history)?", () => resetPlansOnly())}
      />

      <Row
        title="Factory reset (fixes everything)"
        desc="Clears ALL saved data for this site (localStorage + cached files will be fixed by Repair App)."
        danger
        action={() =>
          confirmAnd(
            "Factory reset: this will clear all saved data for this site. Continue?",
            () => resetAllAppData()
          )
        }
      />
    </div>
  );
}
