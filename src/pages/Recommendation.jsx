import { useState } from "react";

function Recommendation() {
  const [terrain, setTerrain] = useState("");
  const [threat, setThreat] = useState("");
  const [severity, setSeverity] = useState("");
  const [weather, setWeather] = useState("");
  const [result, setResult] = useState(null);

  function recommendForce() {
    let force = "Indian Army";
    let secondaryForce = "CRPF";
    let reason = "General land-based response is suitable for this situation.";
    let confidence = 75;
    let riskLevel = "Medium";

    if (terrain === "Mountain") {
      force = "ITBP";
      secondaryForce = "Indian Army";
      reason = "ITBP is specialized for mountain and high-altitude border areas.";
      confidence = 88;
    } else if (terrain === "Coastal" || threat === "Sea Intrusion") {
      force = "Indian Coast Guard";
      secondaryForce = "Indian Navy";
      reason = "Coastal and sea-based threats require maritime surveillance and response.";
      confidence = 90;
    } else if (threat === "Terror Attack") {
      force = "NSG";
      secondaryForce = "CRPF";
      reason = "NSG is specialized for counter-terrorism and hostage-rescue scenarios.";
      confidence = 92;
    } else if (threat === "Riot") {
      force = "CRPF";
      secondaryForce = "State Police";
      reason = "CRPF is suitable for internal security and riot-control situations.";
      confidence = 85;
    } else if (threat === "Border Intrusion") {
      force = "BSF";
      secondaryForce = "Indian Army";
      reason = "BSF is suitable for border security and intrusion response.";
      confidence = 89;
    } else if (threat === "Air Threat") {
      force = "Indian Air Force";
      secondaryForce = "Indian Army Air Defence";
      reason = "Air threats require aerial response and air defence capability.";
      confidence = 91;
    }

    if (severity === "High") {
      riskLevel = "High";
      confidence += 3;
    } else if (severity === "Low") {
      riskLevel = "Low";
      confidence -= 5;
    }

    if (weather === "Storm" || weather === "Snow") {
      confidence -= 4;
      reason += " Weather conditions may slow deployment and reduce operational confidence.";
    }

    if (confidence > 95) confidence = 95;
    if (confidence < 60) confidence = 60;

    setResult({
      force,
      secondaryForce,
      reason,
      confidence,
      riskLevel,
    });
  }

  return (
    <main className="page-container">
      <section className="hero-section">
        <h1 className="page-title">Force Recommendation System</h1>
        <p className="page-subtitle">
          Rule-based prototype for recommending a suitable Indian force.
        </p>
      </section>

      <div className="chart-card" style={{ maxWidth: "750px", margin: "0 auto" }}>
        <select className="search-input" value={terrain} onChange={(e) => setTerrain(e.target.value)}>
          <option value="">Select Terrain</option>
          <option value="Mountain">Mountain</option>
          <option value="Coastal">Coastal</option>
          <option value="Urban">Urban</option>
          <option value="Desert">Desert</option>
          <option value="Airspace">Airspace</option>
        </select>

        <br /><br />

        <select className="search-input" value={threat} onChange={(e) => setThreat(e.target.value)}>
          <option value="">Select Threat Type</option>
          <option value="Border Intrusion">Border Intrusion</option>
          <option value="Terror Attack">Terror Attack</option>
          <option value="Riot">Riot</option>
          <option value="Sea Intrusion">Sea Intrusion</option>
          <option value="Air Threat">Air Threat</option>
        </select>

        <br /><br />

        <select className="search-input" value={severity} onChange={(e) => setSeverity(e.target.value)}>
          <option value="">Select Severity</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <br /><br />

        <select className="search-input" value={weather} onChange={(e) => setWeather(e.target.value)}>
          <option value="">Select Weather</option>
          <option value="Clear">Clear</option>
          <option value="Rain">Rain</option>
          <option value="Snow">Snow</option>
          <option value="Storm">Storm</option>
        </select>

        <br /><br />

        <button className="filter-btn active" onClick={recommendForce}>
          Recommend Force
        </button>
      </div>

      {result && (
        <div className="chart-card" style={{ maxWidth: "750px", margin: "30px auto" }}>
          <h2>Recommended Force: {result.force}</h2>

          <p>
            <strong>Secondary Support:</strong> {result.secondaryForce}
          </p>

          <p>
            <strong>Confidence:</strong> {result.confidence}%
          </p>

          <p>
            <strong>Risk Level:</strong> {result.riskLevel}
          </p>

          <p>
            <strong>Reason:</strong> {result.reason}
          </p>
        </div>
      )}
    </main>
  );
}

export default Recommendation;