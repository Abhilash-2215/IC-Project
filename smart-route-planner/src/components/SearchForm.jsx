import { useState } from "react";

export default function SearchForm({ onSearch, loading }) {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(source, destination);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        placeholder="Source (e.g. Hyderabad)"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />

      <input
        placeholder="Destination (e.g. Chennai)"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />

      <button disabled={loading}>
        {loading ? "Loading..." : "Find Route"}
      </button>
    </form>
  );
}