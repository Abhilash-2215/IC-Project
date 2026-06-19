import { useState } from "react";
import { CITIES } from "./utils/routes.js";


export default function RouteForm({ onSearch }) {

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  function submit(e) {
    e.preventDefault();

    if (start && end && start !== end) {
      onSearch(start, end);
    }
  }


  return (
    <form onSubmit={submit}>

      <div className="form-row">
        <label>Start City</label>

        <select value={start} onChange={(e) => setStart(e.target.value)}>
          <option value="">Select...</option>
          {CITIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <label>Destination City</label>

        <select value={end} onChange={(e) => setEnd(e.target.value)}>
          <option value="">Select...</option>
          {CITIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

      </div>

      <button className="btn">Find Routes</button>

    </form>
  );
}
