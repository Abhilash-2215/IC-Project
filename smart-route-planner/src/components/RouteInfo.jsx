export default function RouteInfo({ routes }) {
  if (!routes.length) {
    return <div className="info">Enter locations to see route</div>;
  }

  const r = routes[0];

  return (
    <div className="info">
      <h3>{r.label}</h3>

      <p>📏 Distance: {(r.distance / 1000).toFixed(2)} km</p>
      <p>⏱ Duration: {(r.duration / 60).toFixed(0)} min</p>

      <p>📍 From: {r.start.display}</p>
      <p>📍 To: {r.end.display}</p>
    </div>
  );
}