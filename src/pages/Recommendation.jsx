import { useState } from "react";
import jsPDF from "jspdf";

function Recommendation() {
  const [terrain, setTerrain] = useState("");
  const [threat, setThreat] = useState("");
  const [severity, setSeverity] = useState("");
  const [weather, setWeather] = useState("");
  const [urgency, setUrgency] = useState("");

  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

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

    const inputData = {
      Terrain: terrain,
      Threat_Type: threat,
      Weather: weather,
      Severity: severity,
      Urgency: urgency,
      ...getAutoValues(),
    };

    try {
      setLoading(true);
      setResult(null);

      const response = await fetch("https://defence-system-insight.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData),
      });

      const data = await response.json();

      const predictionResult = {
        force: data.recommended_force,
        confidence: data.confidence,
        secondaryForce: data.secondary_force,
        riskLevel: data.risk_level,
        reason: data.reason,
      };

      setResult(predictionResult);

      const newHistoryItem = {
        time: new Date().toLocaleTimeString(),
        terrain,
        threat,
        severity,
        weather,
        urgency,
        force: data.recommended_force,
        confidence: data.confidence,
      };

      setHistory((prev) => [newHistoryItem, ...prev].slice(0, 5));
    } catch (error) {
      alert("Backend API is not reachable. Please check the deployed API.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function generateMissionReport() {
    if (!result) {
      alert("Please generate a recommendation first.");
      return;
    }

    const doc = new jsPDF();
    const date = new Date().toLocaleString();

    doc.setFontSize(18);
    doc.text("Defence System Insight", 20, 20);
    doc.setFontSize(14);
    doc.text("AI Mission Recommendation Report", 20, 32);
    doc.setFontSize(11);
    doc.text(`Generated On: ${date}`, 20, 42);
    doc.line(20, 48, 190, 48);

    doc.setFontSize(13);
    doc.text("Incident Details", 20, 60);
    doc.setFontSize(11);
    doc.text(`Terrain: ${terrain}`, 20, 72);
    doc.text(`Threat Type: ${threat}`, 20, 82);
    doc.text(`Severity: ${severity}`, 20, 92);
    doc.text(`Weather: ${weather}`, 20, 102);
    doc.text(`Urgency: ${urgency}`, 20, 112);

    doc.setFontSize(13);
    doc.text("AI Recommendation", 20, 130);
    doc.setFontSize(11);
    doc.text(`Recommended Force: ${result.force}`, 20, 142);
    doc.text(`Secondary Support: ${result.secondaryForce}`, 20, 152);
    doc.text(`Model Confidence: ${result.confidence}%`, 20, 162);
    doc.text(`Risk Level: ${result.riskLevel}`, 20, 172);

    doc.setFontSize(13);
    doc.text("Reason", 20, 190);
    doc.setFontSize(11);
    const reasonLines = doc.splitTextToSize(result.reason, 165);
    doc.text(reasonLines, 20, 202);

    doc.save("mission_report.pdf");
  }

  return (
    <main className="page-container">
      <section className="hero-section">
        <h1 className="page-title">AI Force Recommendation</h1>
        <p className="page-subtitle">
          Select core incident details. The system infers operational factors and predicts the suitable force.
        </p>
      </section>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", alignItems: "start" }}>
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

          <button className="filter-btn active" onClick={recommendForce} disabled={loading}>
            {loading ? "Analyzing..." : "Analyze Incident"}
          </button>
        </div>

        {loading ? (
          <div className="chart-card">
            <h2>Analyzing Incident...</h2>
            <div className="loader"></div>
            <div className="analysis-steps">
              <p>✓ Reading incident details</p>
              <p>✓ Evaluating terrain and weather</p>
              <p>✓ Checking threat pattern</p>
              <p>✓ Running Random Forest model</p>
              <p>✓ Generating recommendation</p>
            </div>
          </div>
        ) : result ? (
          <div className="chart-card">
            <h2>Recommended Force: {result.force}</h2>
            <p><strong>Secondary Support:</strong> {result.secondaryForce}</p>
            <p><strong>Model Confidence:</strong> {result.confidence}%</p>
            <p><strong>Risk Level:</strong> {result.riskLevel}</p>
            <p><strong>Reason:</strong> {result.reason}</p>

            <button className="filter-btn active" onClick={generateMissionReport}>
              Download Mission Report
            </button>
          </div>
        ) : (
          <div className="chart-card">
            <h2>Awaiting Analysis</h2>
            <p>Select incident details and click Analyze Incident.</p>
          </div>
        )}

        {history.length > 0 && (
          <div className="chart-card" style={{ gridColumn: "1 / -1" }}>
            <h2>Recent AI Recommendations</h2>
            <div className="history-list">
              {history.map((item, index) => (
                <div className="history-item" key={index}>
                  <div>
                    <strong>{item.force}</strong>
                    <p>{item.terrain} | {item.threat} | {item.severity}</p>
                  </div>
                  <div>
                    <span>{item.confidence}%</span>
                    <small>{item.time}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Recommendation;