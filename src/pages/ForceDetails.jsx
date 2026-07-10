import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { loadCSV } from "../utils/csvReader";
import PersonnelPieChart from "../components/PersonnelPieChart";

function ForceDetails() {
  const { forceName } = useParams();
  const [force, setForce] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await loadCSV("/data/indian_defence_forces.csv");

      const selectedForce = data.find((f) => f.Force === forceName);

      setForce(selectedForce);
    }

    fetchData();
  }, [forceName]);

  function formatNumber(value) {
    if (!value) return "Not Available";

    const number = Number(String(value).replace(/,/g, ""));

    if (Number.isNaN(number)) return value;

    return number.toLocaleString("en-IN");
  }

  function formatBudget(value) {
    if (!value) return "Not Available";

    const budgetInBillion = Number(String(value).replace(/,/g, ""));

    if (Number.isNaN(budgetInBillion)) return value;

    const budgetInCrore = budgetInBillion * 100;

    return `₹${budgetInCrore.toLocaleString("en-IN")} crore approx.`;
  }

  function getTotalPersonnel() {
    const active = Number(String(force.Personnel).replace(/,/g, ""));
    const reserve = Number(String(force.Reserve).replace(/,/g, ""));

    return active + reserve;
  }

  if (!force) {
    return (
      <main className="page-container">
        <h2>Loading...</h2>
      </main>
    );
  }

  return (
    <main className="page-container force-details-page">
      <section className="force-hero-card">
        <div>
          <p className="force-badge">{force.Type}</p>
          <h1>{force.Force}</h1>
          <p>
            Detailed overview of personnel strength, reserve capacity, budget allocation,
            terrain suitability and operational role.
          </p>
        </div>

        <Link to="/home" className="back-btn">
          Back to Dashboard
        </Link>
      </section>

      <section className="force-stats-grid">
        <div className="force-stat-card">
          <span>Active Personnel</span>
          <h2>{formatNumber(force.Personnel)}</h2>
        </div>

        <div className="force-stat-card">
          <span>Reserve Personnel</span>
          <h2>{formatNumber(force.Reserve)}</h2>
        </div>

        <div className="force-stat-card">
          <span>Total Strength</span>
          <h2>{formatNumber(getTotalPersonnel())}</h2>
        </div>

        <div className="force-stat-card">
          <span>Budget Allocation</span>
          <h2>{formatBudget(force.Budget_Billion_INR)}</h2>
        </div>
      </section>

      <section className="force-details-layout">
        <div className="chart-card force-info-card">
          <h2>Force Profile</h2>

          <div className="info-row">
            <span>Force Type</span>
            <strong>{force.Type}</strong>
          </div>

          <div className="info-row">
            <span>Operational Terrain</span>
            <strong>{force.Terrain}</strong>
          </div>

          <div className="info-row">
            <span>Primary Role</span>
            <strong>{force.Role || "Operational Defence Support"}</strong>
          </div>

          <div className="info-row">
            <span>Budget Unit</span>
            <strong>Billion INR converted to crore</strong>
          </div>
        </div>

        <div className="chart-card force-chart-card">
          <h2>Personnel Distribution</h2>

          <PersonnelPieChart
            personnel={Number(String(force.Personnel).replace(/,/g, ""))}
            reserve={Number(String(force.Reserve).replace(/,/g, ""))}
          />
        </div>
      </section>
    </main>
  );
}

export default ForceDetails;