import { useState } from "react";

function Recommendation() {
  const [terrain, setTerrain] = useState("");
  const [threat, setThreat] = useState("");
  const [severity, setSeverity] = useState("");
  const [weather, setWeather] = useState("");
  const [urgency, setUrgency] = useState("");

  const [result, setResult] = useState(null);

  function getAutoValues() {
    let auto = {
      Civilian_Density: "Medium",
      Time_Of_Day: "Day",
      Location_Type: "Border Area",
      Target_Type: "Strategic Asset",
      Enemy_Strength: "Medium",
      Communication_Status: "Good",
      Medical_Support: "Available",
      Available_Air_Support: "Limited",
      Available_Naval_Support: "No",
    };

    if (terrain === "Mountain") {
      auto.Location_Type = "Mountain Pass";
      auto.Target_Type = "Border Post";
      auto.Civilian_Density = "Low";
    }

    if (terrain === "Coastal" || terrain === "Sea" || threat === "Sea Intrusion") {
      auto.Location_Type = "Coastal Zone";
      auto.Target_Type = "Port";
      auto.Available_Naval_Support = "Yes";
    }

    if (terrain === "Urban") {
      auto.Location_Type = "Metro City";
      auto.Target_Type = "Civilian Area";
      auto.Civilian_Density = "High";
    }

    if (terrain === "Industrial") {
      auto.Location_Type = "Industrial Area";
      auto.Target_Type = "Critical Infrastructure";
    }

    if (threat === "Terror Attack" || threat === "Hostage Crisis") {
      auto.Target_Type = "Civilian Area";
      auto.Civilian_Density = "High";
    }

    if (threat === "Air Threat") {
      auto.Location_Type = "Airspace Zone";
      auto.Target_Type = "Air Base";
      auto.Available_Air_Support = "Yes";
    }

    if (severity === "Critical") {
      auto.Enemy_Strength = "Large";
      auto.Time_Of_Day = "Night";
    }

    return auto;
  }

  async function recommendForce() {
    if (!terrain || !threat || !severity || !weather || !urgency) {
      alert("Please select all incident details before analysis.");
      return;
    }

    const autoValues = getAutoValues();

    const inputData = {
      Terrain: terrain,
      Threat_Type: threat,
      Weather: weather,
      Severity: severity,
      Urgency: urgency,
      ...autoValues,
    };

    try {
      const response = await fetch("https://defence-system-insight.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      const data = await response.json();

      setResult({
        force: data.recommended_force,
        confidence: data.confidence,
        secondaryForce: data.secondary_force,
        riskLevel: data.risk_level,
        reason: data.reason,
      });
    } catch (error) {
      alert("Backend API is not running. Start FastAPI first.");
      console.error(error);
    }
  }

  return (
    <main className="page-container">
      <section className="hero-section">
        <h1 className="page-title">AI Force Recommendation</h1>
        <p className="page-subtitle">
          Select core incident details. The system infers operational factors and predicts the suitable force.
        </p>
      </section>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
          alignItems: "start",
        }}
      >
        <div className="chart-card">
          <h2>Incident Details</h2>

          <select className="search-input" value={terrain} onChange={(e) => setTerrain(e.target.value)}>
            <option value="">Select Terrain</option>
            <option value="Mountain">Mountain</option>
            <option value="Coastal">Coastal</option>
            <option value="Urban">Urban</option>
            <option value="Desert">Desert</option>
            <option value="Airspace">Airspace</option>
            <option value="Sea">Sea</option>
            <option value="Industrial">Industrial</option>
            <option value="Hills">Hills</option>
            <option value="Forest">Forest</option>
          </select>

          <br /><br />

          <select className="search-input" value={threat} onChange={(e) => setThreat(e.target.value)}>
            <option value="">Select Threat Type</option>
            <option value="Border Intrusion">Border Intrusion</option>
            <option value="Mountain Border Intrusion">Mountain Border Intrusion</option>
            <option value="Terror Attack">Terror Attack</option>
            <option value="Hostage Crisis">Hostage Crisis</option>
            <option value="Riot">Riot</option>
            <option value="Sea Intrusion">Sea Intrusion</option>
            <option value="Air Threat">Air Threat</option>
            <option value="Smuggling">Smuggling</option>
            <option value="Sabotage">Sabotage</option>
            <option value="Insurgency">Insurgency</option>
          </select>

          <br /><br />

          <select className="search-input" value={severity} onChange={(e) => setSeverity(e.target.value)}>
            <option value="">Select Severity</option>
            <option value="Low">Low Severity</option>
            <option value="Medium">Medium Severity</option>
            <option value="High">High Severity</option>
            <option value="Critical">Critical Severity</option>
          </select>

          <br /><br />

          <select className="search-input" value={weather} onChange={(e) => setWeather(e.target.value)}>
            <option value="">Select Weather</option>
            <option value="Clear">Clear Weather</option>
            <option value="Rain">Rain</option>
            <option value="Snow">Snow</option>
            <option value="Storm">Storm</option>
            <option value="Fog">Fog</option>
            <option value="Extreme Heat">Extreme Heat</option>
          </select>

          <br /><br />

          <select className="search-input" value={urgency} onChange={(e) => setUrgency(e.target.value)}>
            <option value="">Select Urgency</option>
            <option value="Low">Low Urgency</option>
            <option value="Medium">Medium Urgency</option>
            <option value="High">High Urgency</option>
            <option value="Immediate">Immediate Urgency</option>
          </select>

          <br /><br />

          <button className="filter-btn active" onClick={recommendForce}>
            Analyze Incident
          </button>
        </div>

        {result ? (
          <div className="chart-card">
            <h2>Recommended Force: {result.force}</h2>

            <p>
              <strong>Secondary Support:</strong> {result.secondaryForce}
            </p>

            <p>
              <strong>Model Confidence:</strong> {result.confidence}%
            </p>

            <p>
              <strong>Risk Level:</strong> {result.riskLevel}
            </p>

            <p>
              <strong>Reason:</strong> {result.reason}
            </p>
          </div>
        ) : ( 
          <div className="chart-card">
            <h2>Awaiting Analysis</h2>
            <p>Select incident details and click Analyze Incident.</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default Recommendation;