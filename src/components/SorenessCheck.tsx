import { MovementPattern } from "../../types/MovementPattern";

export default function SorenessCheck({ onDone }: { onDone: () => void }) {
  const patterns: MovementPattern[] = [
    "acceleration",
    "deceleration",
    "rotation",
    "anti_rotation",
    "single_leg",
    "elastic_power",
    "foot_ankle",
    "shoulder_stability",
  ];

  return (
    <section>
      <h2>How do you feel?</h2>
      {patterns.map(p => (
        <div key={p}>
          <span>{p}</span>
          <select>
            <option>green</option>
            <option>yellow</option>
            <option>red</option>
          </select>
        </div>
      ))}
      <button onClick={onDone}>Save & Exit</button>
    </section>
  );
}
