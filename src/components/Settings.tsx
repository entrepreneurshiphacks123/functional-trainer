import { TinyIconButton } from "../ui/Primitives";
import { resetAllAppData, resetWorkoutDataOnly, resetPlansOnly } from "../engine/storage";

export default function Settings({ onBack }: { onBack: () => void }) {
  const Row = ({
    title,
    desc,
    action,
  }: {
    title: string;
    desc: string;
    action: () => void;
  }) => (
    <button
      onClick={action}
      style={{
        width: "100%",
        textAlign: "left",
        padding: 14,
        borderRadius: 12,
        border: "1px solid rgba(0,0,0,0.12)",
        background: "rgba(255,255,255,0.02)",
        marginBottom: 10,
        cursor: "pointer",
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 16 }}>{title}</div>
      <div style={{ opacity: 0.75, marginTop: 4, lineHeight: 1.35 }}>{desc}</div>
    </button>
  );

  const confirmAnd = (msg: string, fn: () => void) => {
    if (confirm(msg)) {
      fn();
      location.reload();
    }
  };

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontWeight: 800, fontSize: 18 }}>Settings</div>
        <TinyIconButton label="←" onClick={onBack} />
      </div>

      <div style={{ marginBottom: 14, opacity: 0.75 }}>
        If the app ever “breaks” after an update, use these resets (works on mobile too).
      </div>

      <Row
        title="Reset workout history only"
        desc="Clears last day, soreness, and calendar logs. Keeps your uploaded plans."
        action={() =>
          confirmAnd(
            "Reset workout history (keep plans)?",
            resetWorkoutDataOnly
          )
        }
      />

      <Row
        title="Reset plans only"
        desc="Clears uploaded plans and plan selection. Keeps your workout history."
        action={() =>
          confirmAnd(
            "Reset plans (keep workout history)?",
            resetPlansOnly
          )
        }
      />

      <Row
        title="Factory reset (fixes everything)"
        desc="Clears ALL saved data for this site. Use if the app won’t load or keeps crashing."
        action={() =>
          confirmAnd(
            "Factory reset: this will clear all saved data for this site. Continue?",
            resetAllAppData
          )
        }
      />
    </div>
  );
}
