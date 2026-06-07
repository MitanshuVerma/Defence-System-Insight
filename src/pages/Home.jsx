import { useEffect, useState } from "react";
import { loadCSV } from "../utils/csvReader";

function Home() {
  const [forces, setForces] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await loadCSV(
        "/data/indian_defence_forces.csv"
      );
    console.log(data);
      setForces(data);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Defence System Insight</h1>

      <h2>Indian Armed Forces Dashboard</h2>

      {forces.map((force, index) => (
        <div key={index}>
          <h3>{force.Force}</h3>
        </div>
      ))}
    </div>
  );
}

export default Home;