import { useEffect, useState } from "react";
import { loadCSV } from "../utils/csvReader";
import ForceCard from "../components/ForceCard";

function Home() {
  const [forces, setForces] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await loadCSV("/data/indian_defence_forces.csv");
      setForces(data);
    }

    fetchData();
  }, []);

  return (
    <main className="page-container">
      <section className="hero-section">
        <h1 className="page-title">Defence System Insight</h1>

        <p className="page-subtitle">
          Indian Armed Forces Dashboard
        </p>
      </section>

      <div className="force-grid">
        {forces.map((force, index) => (
          <ForceCard key={index} force={force} />
        ))}
      </div>
    </main>
  );
}

export default Home;