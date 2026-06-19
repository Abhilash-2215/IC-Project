export default function RouteResults({ routes, formatTime }) {
  if (!routes || routes.length === 0)
    return (
      <div className="empty">No routes found yet</div>
    );

  return (
    <div>
      <h3 className="results-title">Possible Routes ({routes.length})</h3>

      {routes.map((r, i) => (
        <div className={`route-card ${i === 0 ? "best" : ""}`} key={i}>
          <div className="route-head">
            <div className="rank">#{i + 1}</div>
            <div className="time">⏱ {formatTime(r.totalTime)}</div>
          </div>

          <div className="stops">
            {r.nodes.map((n, j) => (
              <span key={j} className="stop">
                {n}
                {j < r.nodes.length - 1 && <span className="arrow"> → </span>}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
