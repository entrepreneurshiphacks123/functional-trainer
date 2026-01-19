return (
  <Screen title="Calendar" right={<TinyIconButton label="←" onClick={onBack} />}>
    <Card>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
        {days.map((d) => {
          const done = doneSet.has(d.dateISO);
          const isToday = d.dateISO === todayISO;

          return (
            <div
              key={d.dateISO}
              style={{
                aspectRatio: "1 / 1",
                borderRadius: 12,
                border: `1px solid var(--border)`,
                background: done ? "var(--card2)" : "transparent",
                opacity: d.inMonth ? 1 : 0.35,
                display: "grid",
                placeItems: "center",
                fontWeight: isToday ? 850 : 650,
              }}
              title={done ? "Workout done" : ""}
            >
              {Number(d.dateISO.slice(-2))}
            </div>
          );
        })}
      </div>
    </Card>
  </Screen>
);
