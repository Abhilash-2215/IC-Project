// Simple routes data and graph utilities
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

function haversine(a, b) {
  const toRad = (d) => (d * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const sinDlat = Math.sin(dLat / 2);
  const sinDlon = Math.sin(dLon / 2);
  const aa = sinDlat * sinDlat + sinDlon * sinDlon * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1 - aa));
  return R * c;
}

// Build fully connected graph with distances
function buildGraph(excludedCities = []) {
  const nodes = {};
  const allowed = citiesList.filter((c) => !excludedCities.includes(c.name));
  for (let i = 0; i < allowed.length; i++) {
    const a = allowed[i];
    nodes[a.name] = {};
    for (let j = 0; j < allowed.length; j++) {
      if (i === j) continue;
      const b = allowed[j];
      const d = haversine(a, b);
      nodes[a.name][b.name] = d; // km
    }
  }
  return nodes;
}

// Dijkstra's algorithm returns { path: [names], distance }
function dijkstra(graph, start, target) {
  const Q = new Set(Object.keys(graph));
  const dist = {};
  const prev = {};
  for (const v of Q) {
    dist[v] = Infinity;
    prev[v] = null;
  }
  if (!(start in graph) || !(target in graph)) return null;
  dist[start] = 0;

  while (Q.size) {
    let u = null;
    let min = Infinity;
    for (const v of Q) {
      if (dist[v] < min) {
        min = dist[v];
        u = v;
      }
    }
    if (u === null) break;
    Q.delete(u);
    if (u === target) break;
    for (const neighbor in graph[u]) {
      const alt = dist[u] + graph[u][neighbor];
      if (alt < dist[neighbor]) {
        dist[neighbor] = alt;
        prev[neighbor] = u;
      }
    }
  }

  if (dist[target] === Infinity) return null;
  const path = [];
  let u = target;
  while (u) {
    path.unshift(u);
    u = prev[u];
  }
  return { path, distance: dist[target] };
}

// Simple k-shortest: get shortest, then try removing edges in that path to find alternatives
function computeKShortest(start, target, k = 3, excludedCities = []) {
  const results = [];
  const graphOrig = buildGraph(excludedCities);
  const triedSignatures = new Set();

  function signature(path) {
    return path.join("->");
  }

  const first = dijkstra(graphOrig, start, target);
  if (!first) return [];
  results.push(first);
  triedSignatures.add(signature(first.path));

  let idx = 0;
  while (results.length < k && idx < results[0].path.length - 1) {
    const base = results[0].path;
    // remove edge between base[idx] -> base[idx+1]
    const graph = buildGraph(excludedCities);
    const u = base[idx];
    const v = base[idx + 1];
    if (graph[u] && graph[u][v]) delete graph[u][v];

    const alt = dijkstra(graph, start, target);
    if (alt && !triedSignatures.has(signature(alt.path))) {
      triedSignatures.add(signature(alt.path));
      results.push(alt);
    }
    idx++;
    if (idx > 50) break; // safety
  }

  // Map results to include metrics and coordinates
  const mapped = results.map((r) => {
    const stops = r.path;
    const pathCoords = stops.map((s) => {
      const c = citiesList.find((x) => x.name === s) || { lat: 0, lon: 0 };
      return { lat: c.lat, lon: c.lon };
    });
    const distanceKm = r.distance;
    const timeHours = distanceKm / 60; // assume 60 km/h
    return { stops, pathCoords, distanceKm, timeHours };
  });

  return mapped;
}

export { citiesList, computeKShortest };
