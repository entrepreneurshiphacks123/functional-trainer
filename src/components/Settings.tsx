import React, { useMemo, useState } from "react";
import { Card, Button, Screen } from "../ui/Primitives";
import { getAllPlans, loadUserPlans, saveUserPlans, upsertUserPlan, validateUploadedPlan } from "../engine/plans";
import { Theme } from "../ui/theme";
import { resetAllAppData, loadState, saveState } from "../engine/storage";

function downloadJson(filename: string, obj: any) {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function Settings({
  theme,
  onThemeToggle,
  onBack
}: {
  theme: Theme,
  onThemeToggle: () => void,
  onBack: () => void
}) {
  const [refresh, setRefresh] = useState(0);
  const plans = useMemo(() => getAllPlans(), [refresh]);
  const userPlans = useMemo(() => loadUserPlans(), [refresh]);

  const onUpload = async (file: File) => {
    const text = await file.text();
    let parsed: any;
    try {
      parsed = JSON.parse(text);
    } catch {
      alert("Invalid JSON file.");
      return;
    }
    const err = validateUploadedPlan(parsed);
    if (err) {
      alert(err);
      return;
    }
    upsertUserPlan(parsed);
    setRefresh((x) => x + 1);
  };

  const exportData = () => {
    const state = loadState();
    downloadJson(`trainer-backup-${new Date().toISOString().split('T')[0]}.json`, state);
  };

  const importData = async (file: File) => {
    const text = await file.text();
    try {
      const parsed = JSON.parse(text);
      if (confirm("This will overwrite your current settings and history. Continue?")) {
        saveState(parsed);
        window.location.reload();
      }
    } catch {
      alert("Invalid backup file.");
    }
  };

  const resetData = () => {
    if (confirm("Are you sure? This will delete all your workout history and custom plans.")) {
      resetAllAppData();
      window.location.reload();
    }
  };

  return (
    <Screen title="Settings">
      <div style={{ display: "grid", gap: 20 }}>

        <Card title="Appearance">
          <Button onClick={onThemeToggle}>
            Switch to {theme === "dark" ? "Light" : "Dark"} Mode
          </Button>
        </Card>

        <Card title="Workout Plans">
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <label style={{
                border: "var(--bw) solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 12,
                fontWeight: 950,
                textTransform: "uppercase",
                fontSize: 14,
                cursor: "pointer"
              }}>
                Upload Plan
                <input type="file" accept="application/json" style={{ display: "none" }} onChange={e => e.target.files?.[0] && onUpload(e.target.files[0])} />
              </label>
              <Button variant="ghost" onClick={() => downloadJson("example-plan.json", { id: "ex", name: "Example" })}>
                Example JSON
              </Button>
            </div>

            <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
              {plans.map((p: any) => (
                <div key={p.id} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 14px",
                  border: "1px solid var(--border-light)",
                  background: "var(--card2)"
                }}>
                  <div style={{ fontWeight: 800 }}>{p.icon} {p.name}</div>
                  <div style={{ fontSize: 11, opacity: 0.6, textTransform: "uppercase" }}>
                    {userPlans.some((u: any) => u.id === p.id) ? "Custom" : "System"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card title="Data Management">
          <div style={{ display: "grid", gap: 12 }}>
            <Button onClick={exportData}>Export History (JSON)</Button>
            <label style={{
              border: "var(--bw) solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 12,
              fontWeight: 950,
              textTransform: "uppercase",
              fontSize: 14,
              cursor: "pointer",
              background: "var(--bg)"
            }}>
              Import Backup
              <input type="file" accept="application/json" style={{ display: "none" }} onChange={e => e.target.files?.[0] && importData(e.target.files[0])} />
            </label>
            <div style={{ height: 8 }} />
            <Button variant="danger" onClick={resetData}>Reset All Data</Button>
          </div>
        </Card>

        <div style={{ padding: "0 12px", opacity: 0.5, fontSize: 12, textAlign: "center", marginBottom: 40 }}>
          Functional Trainer v1.1 • Mobile-Only Block Design
        </div>
      </div>
    </Screen>
  );
}
