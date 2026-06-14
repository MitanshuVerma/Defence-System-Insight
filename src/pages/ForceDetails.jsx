import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadCSV } from "../utils/csvReader";
import PersonnelPieChart from "../components/PersonnelPieChart";

function ForceDetails() {
  const { forceName } = useParams();
  const [force, setForce] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await loadCSV(
        "/data/indian_defence_forces.csv"
      );

      const selectedForce = data.find(
        (f) => f.Force === forceName
      );

      setForce(selectedForce);
    }

    fetchData();
  }, [forceName]);

  if (!force) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>{force.Force}</h1>

      <p>
        <strong>Type:</strong> {force.Type}
      </p>

      <p>
        <strong>Personnel:</strong> {force.Personnel}
      </p>

      <p>
        <strong>Reserve:</strong> {force.Reserve}
      </p>

      <p>
        <strong>Budget:</strong> {force.Budget_Billion_INR}
      </p>

      <p>
        <strong>Terrain:</strong> {force.Terrain}
      </p>
      <h2>Personnel Distribution</h2>

      <PersonnelPieChart
        personnel={force.Personnel}
        reserve={force.Reserve}
      />
    </div>
  );
}

export default ForceDetails;