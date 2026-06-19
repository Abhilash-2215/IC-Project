import { useState } from "react";
import Navbar from "../components/Navbar";
import SearchForm from "../components/SearchForm";
import MapView from "../components/MapView";
import RouteInfo from "../components/RouteInfo";
import axios from "axios";

export default function Home() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ ACCURATE GEOCODING (Photon API)
  const getCoordinates = async (place) => {
    try {
      const res = await axios.get("https://photon.komoot.io/api/", {
        params: { q: place, limit: 1 },
      });

      if (!res.data.features.length) return null;

      const f = res.data.features[0];

      return {
        lat: f.geometry.coordinates[1],
        lon: f.geometry.coordinates[0],
        display: f.properties.name || place,
      };
    } catch (err) {
      return null;
    }
  };

  // ✅ ROUTE FETCH (OSRM)
  const getOSRMRoute = async (start, end) => {
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${start.lon},${start.lat};${end.lon},${end.lat}?overview=full&geometries=geojson`;

      const res = await axios.get(url);

      if (!res.data.routes?.length) return null;

      return res.data.routes[0];
    } catch (err) {
      return null;
    }
  };

  // 🚀 MAIN FUNCTION
  const getRoute = async (source, destination) => {
    setLoading(true);
    setRoutes([]);

    const start = await getCoordinates(source);
    const end = await getCoordinates(destination);

    if (!start || !end) {
      alert("Location not found. Try more specific names.");
      setLoading(false);
      return;
    }

    const route = await getOSRMRoute(start, end);

    if (!route) {
      alert("Route not found. Try different locations.");
      setLoading(false);
      return;
    }

    setRoutes([
      {
        label: "🚀 Best Route",
        coords: route.geometry.coordinates,
        distance: route.distance,
        duration: route.duration,
        start,
        end,
      },
    ]);

    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <SearchForm onSearch={getRoute} loading={loading} />

      <div className="container">
        <MapView routes={routes} />
        <RouteInfo routes={routes} />
      </div>
    </div>
  );
}