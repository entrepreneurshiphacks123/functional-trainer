export default function WorkoutPlayer({ onFinish }: { onFinish: () => void }) {
  return (
    <section>
      <h2>Today's Workout</h2>
      <p>(Workout engine placeholder)</p>
      <button onClick={onFinish}>Finish Workout</button>
    </section>
  );
}
