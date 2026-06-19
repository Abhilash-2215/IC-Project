import { useState } from "react";

function Dora() {
  const [name, getName] = useState("");

  const cooking = (e) => {
    e.preventDefault();
    alert(`Welcome ${name}`);
  };

  return (
    <form onSubmit={cooking}>
      <label>Name</label>
      <input 
        type="text" 
        onChange={(e) => getName(e.target.value)} 
       
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Dora;
