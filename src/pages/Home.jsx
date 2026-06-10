import { useEffect, useState } from "react";
import { loadCSV } from "../utils/csvReader";
import ForceCard from "../components/ForceCard";
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

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {forces.map((force, index) => (
          <ForceCard
            key={index}
            force={force}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;