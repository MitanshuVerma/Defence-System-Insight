import { useEffect, useState } from "react";
import { loadCSV } from "../utils/csvReader";

function Operations() {
  const [operations, setOperations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await loadCSV("/data/historical_operations.csv");
      setOperations(data);
    }

    fetchData();
  }, []);

  return (
    <main className="page-container">
      <section className="hero-section">
        <h1 className="page-title">Historical Operations</h1>
        <p className="page-subtitle">
          Real Indian military, evacuation, counter-terror and relief operations.
        </p>
      </section>

      <div className="force-grid">
        {operations.map((operation, index) => (
          <div className="force-card" key={index}>
            <h2>{operation.Operation_Name}</h2>

            <p><strong>Year:</strong> {operation.Year}</p>
            <p><strong>Force:</strong> {operation.Force}</p>
            <p><strong>Location:</strong> {operation.Location}</p>
            <p><strong>Threat:</strong> {operation.Threat_Type}</p>
            <p><strong>Terrain:</strong> {operation.Terrain}</p>
            <p><strong>Status:</strong> {operation.Status}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Operations;