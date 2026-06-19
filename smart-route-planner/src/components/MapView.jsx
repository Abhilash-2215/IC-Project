import { MapContainer, TileLayer, Polyline, Marker, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// ✅ Auto zoom to route
function FitBounds({ routes }) {
  const map = useMap();

  useEffect(() => {
    if (!routes.length) return;

    const points = routes[0].coords
      .map((c) => [c[1], c[0]])
      .filter(([lat, lng]) => !isNaN(lat) && !isNaN(lng));

    if (points.length) {
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds);
    }
  }, [routes]);

  return null;
}

export default function MapView({ routes }) {
  const center = routes[0]?.start
    ? [routes[0].start.lat, routes[0].start.lon]
    : [20.5937, 78.9629];

  return (
    <MapContainer center={center} zoom={6} className="map">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {routes[0] && (
        <>
          <Marker position={[routes[0].start.lat, routes[0].start.lon]} />
          <Marker position={[routes[0].end.lat, routes[0].end.lon]} />

          <Polyline
            positions={routes[0].coords.map((c) => [c[1], c[0]])}
            color="blue"
          />
        </>
      )}

      <FitBounds routes={routes} />
    </MapContainer>
  );
}