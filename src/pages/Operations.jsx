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
    <div
      style={{
        width: "95%",
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "30px",
      }}
    >
      <h1>Historical Operations</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {operations.map((operation, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#1e293b",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <h2>{operation.Operation}</h2>
            <p><strong>Year:</strong> {operation.Year}</p>
            <p><strong>Force:</strong> {operation.Force}</p>
            <p><strong>Region:</strong> {operation.Region}</p>
            <p><strong>Category:</strong> {operation.Category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Operations;