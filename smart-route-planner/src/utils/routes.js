const citiesList = [
  { name: "New Delhi", lat: 28.6139, lon: 77.2090 },
  { name: "Mumbai", lat: 19.0760, lon: 72.8777 },
  { name: "Bengaluru", lat: 12.9716, lon: 77.5946 },
  { name: "Chennai", lat: 13.0827, lon: 80.2707 },
  { name: "Kolkata", lat: 22.5726, lon: 88.3639 },
  { name: "Hyderabad", lat: 17.3850, lon: 78.4867 },
  { name: "Pune", lat: 18.5204, lon: 73.8567 },
  { name: "Jaipur", lat: 26.9124, lon: 75.7873 },
  { name: "Lucknow", lat: 26.8467, lon: 80.9462 },
  { name: "Ahmedabad", lat: 23.0225, lon: 72.5714 },
];

export const CITIES = citiesList.map(c => c.name);

export const CITY_COORDS = Object.fromEntries(
  citiesList.map(c => [c.name, [c.lat, c.lon]])
);

function distance(a, b) {
  const R = 6371;
  const toRad = x => x * Math.PI / 180;

  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);

  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) *
    Math.cos(toRad(b.lat)) *
    Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

export function buildGraph() {
  const graph = {};

  citiesList.forEach(a => {
    graph[a.name] = {};

    citiesList.forEach(b => {
      if (a.name !== b.name) {
        graph[a.name][b.name] = distance(a, b);
      }
    });
  });

  return graph;
}

function shortest(graph, start, end) {
  const dist = {};
  const prev = {};
  const open = new Set(Object.keys(graph));

  Object.keys(graph).forEach(n => {
    dist[n] = Infinity;
    prev[n] = null;
  });

  dist[start] = 0;

  while (open.size) {
    let current = [...open].sort((a,b)=>dist[a]-dist[b])[0];

    if (!current) break;
    open.delete(current);

    if (current === end) break;

    Object.entries(graph[current]).forEach(([next, cost]) => {
      const alt = dist[current] + cost;

      if (alt < dist[next]) {
        dist[next] = alt;
        prev[next] = current;
      }
    });
  }

  const path = [];
  let cur = end;

  while (cur) {
    path.unshift(cur);
    cur = prev[cur];
  }

  if (path[0] !== start) return null;

  return {
    nodes: path,
    distance: dist[end],
    totalTime: dist[end] / 60
  };
}

export function kShortestPaths(graph, start, end, k = 4) {
  const results = [];
  const used = new Set();

  const first = shortest(graph, start, end);

  if (!first) return [];

  results.push(first);
  used.add(first.nodes.join("-"));

  for (let i = 1; i < k; i++) {
    const copy = JSON.parse(JSON.stringify(graph));

    const last = results[i - 1].nodes;

    if (last[i - 1] && last[i]) {
      delete copy[last[i - 1]][last[i]];
    }

    const alt = shortest(copy, start, end);

    if (alt && !used.has(alt.nodes.join("-"))) {
      results.push(alt);
      used.add(alt.nodes.join("-"));
    }
  }

  return results;
}

export function formatTime(hours) {
  const mins = Math.round(hours * 60);
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}