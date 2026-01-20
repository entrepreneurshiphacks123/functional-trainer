import { TinyIconButton } from "../ui/Primitives";
import {
  resetAllAppData,
  resetWorkoutDataOnly,
  resetPlansOnly,
} from "../engine/storage";

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
        border: danger ? "1px solid rgba(231,76,60,0.5)" : "1px solid rgba(0,0,0,0.12)",
        background: danger ? "rgba(231,76,60,0.06)" : "rgba(255,255,255,0.02)",
        marginBottom: 10,
        cursor: "pointer",
      }}
    >
      <div style={{ fontWeight: 800, fontSize: 16 }}>{title}</div>
      <div style={{ opacity: 0.75, marginTop: 4, lineHeight: 1.35 }}>{desc}</div>
    </button>
  );

  const confirmAnd = async (msg: string, fn: () => void | Promise<void>) => {
    if (!confirm(msg)) return;
    await fn();
    location.reload();
  };

  return (
    <div style={{ padding: 14 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <div style={{ fontWeight: 900, fontSize: 18 }}>Settings</div>
        <TinyIconButton label="←" onClick={onBack} />
      </div>

      <div style={{ marginBottom: 14, opacity: 0.75 }}>
        If the app looks “stuck” on an older version after you deploy, use <b>Repair App</b>.
      </div>

      <Row
        title="Repair App (fix caching)"
        desc="Unregisters the service worker + clears cached files, then reloads. Use this if you deployed changes but the UI didn’t update."
        action={() =>
          confirmAnd(
            "Repair App? This clears cached files (recommended after updates). Continue?",
            repairAppCaches
          )
        }
      />

      <Row
        title="Reset workout history only"
        desc="Clears last day, soreness, and calendar logs. Keeps your uploaded plans."
        action={() =>
          confirmAnd(
            "Reset workout history (keep plans)?",
            () => resetWorkoutDataOnly()
          )
        }
      />

      <Row
        title="Reset plans only"
        desc="Clears uploaded plans and plan selection. Keeps your workout history."
        action={() =>
          confirmAnd(
            "Reset plans (keep workout history)?",
            () => resetPlansOnly()
          )
        }
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
