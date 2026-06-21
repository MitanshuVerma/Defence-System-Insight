import { useState } from "react";

function Recommendation() {
  const [terrain, setTerrain] = useState("Mountain");
  const [threat, setThreat] = useState("Mountain Border Intrusion");
  const [weather, setWeather] = useState("Snow");
  const [severity, setSeverity] = useState("High");
  const [civilianDensity, setCivilianDensity] = useState("Low");
  const [timeOfDay, setTimeOfDay] = useState("Night");
  const [locationType, setLocationType] = useState("Mountain Pass");
  const [targetType, setTargetType] = useState("Border Post");
  const [enemyStrength, setEnemyStrength] = useState("Medium");
  const [urgency, setUrgency] = useState("High");
  const [communicationStatus, setCommunicationStatus] = useState("Good");
  const [medicalSupport, setMedicalSupport] = useState("Available");
  const [availableAirSupport, setAvailableAirSupport] = useState("Limited");
  const [availableNavalSupport, setAvailableNavalSupport] = useState("No");

  const [result, setResult] = useState(null);

  async function recommendForce() {
    const inputData = {
      Terrain: terrain,
      Threat_Type: threat,
      Weather: weather,
      Severity: severity,
      Civilian_Density: civilianDensity,
      Time_Of_Day: timeOfDay,
      Location_Type: locationType,
      Target_Type: targetType,
      Enemy_Strength: enemyStrength,
      Urgency: urgency,
      Communication_Status: communicationStatus,
      Medical_Support: medicalSupport,
      Available_Air_Support: availableAirSupport,
      Available_Naval_Support: availableNavalSupport,
    };

    const response = await fetch("http://127.0.0.1:8000/predict", {
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
  }

  return (
    <main className="page-container">
      <section className="hero-section">
        <h1 className="page-title">Force Recommendation System</h1>
        <p className="page-subtitle">
          AI-powered recommendation using your trained ML model.
        </p>
      </section>

      <div className="chart-card" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <select className="search-input" value={terrain} onChange={(e) => setTerrain(e.target.value)}>
          <option value="Mountain">Mountain</option>
          <option value="Coastal">Coastal</option>
          <option value="Urban">Urban</option>
          <option value="Desert">Desert</option>
          <option value="Airspace">Airspace</option>
          <option value="Sea">Sea</option>
          <option value="Industrial">Industrial</option>
          <option value="Hills">Hills</option>
        </select>

        <br /><br />

        <select className="search-input" value={threat} onChange={(e) => setThreat(e.target.value)}>
          <option value="Mountain Border Intrusion">Mountain Border Intrusion</option>
          <option value="Border Intrusion">Border Intrusion</option>
          <option value="Terror Attack">Terror Attack</option>
          <option value="Riot">Riot</option>
          <option value="Sea Intrusion">Sea Intrusion</option>
          <option value="Air Threat">Air Threat</option>
          <option value="Smuggling">Smuggling</option>
          <option value="Sabotage">Sabotage</option>
          <option value="Hostage Crisis">Hostage Crisis</option>
        </select>

        <br /><br />

        <select className="search-input" value={weather} onChange={(e) => setWeather(e.target.value)}>
          <option value="Clear">Clear</option>
          <option value="Rain">Rain</option>
          <option value="Snow">Snow</option>
          <option value="Storm">Storm</option>
          <option value="Fog">Fog</option>
        </select>

        <br /><br />

        <select className="search-input" value={severity} onChange={(e) => setSeverity(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>

        <br /><br />

        <select className="search-input" value={civilianDensity} onChange={(e) => setCivilianDensity(e.target.value)}>
          <option value="Low">Low Civilian Density</option>
          <option value="Medium">Medium Civilian Density</option>
          <option value="High">High Civilian Density</option>
        </select>

        <br /><br />

        <select className="search-input" value={timeOfDay} onChange={(e) => setTimeOfDay(e.target.value)}>
          <option value="Day">Day</option>
          <option value="Night">Night</option>
          <option value="Dawn">Dawn</option>
          <option value="Evening">Evening</option>
        </select>

        <br /><br />

        <select className="search-input" value={locationType} onChange={(e) => setLocationType(e.target.value)}>
          <option value="Mountain Pass">Mountain Pass</option>
          <option value="Border Area">Border Area</option>
          <option value="Metro City">Metro City</option>
          <option value="Coastal Zone">Coastal Zone</option>
          <option value="Airport">Airport</option>
          <option value="Port">Port</option>
          <option value="Industrial Area">Industrial Area</option>
          <option value="Northeast Region">Northeast Region</option>
        </select>

        <br /><br />

        <select className="search-input" value={targetType} onChange={(e) => setTargetType(e.target.value)}>
          <option value="Border Post">Border Post</option>
          <option value="Military Installation">Military Installation</option>
          <option value="Civilian Area">Civilian Area</option>
          <option value="Airport">Airport</option>
          <option value="Port">Port</option>
          <option value="Strategic Asset">Strategic Asset</option>
        </select>

        <br /><br />

        <select className="search-input" value={enemyStrength} onChange={(e) => setEnemyStrength(e.target.value)}>
          <option value="Small">Small Enemy Strength</option>
          <option value="Medium">Medium Enemy Strength</option>
          <option value="Large">Large Enemy Strength</option>
          <option value="Unknown">Unknown Enemy Strength</option>
        </select>

        <br /><br />

        <select className="search-input" value={urgency} onChange={(e) => setUrgency(e.target.value)}>
          <option value="Low">Low Urgency</option>
          <option value="Medium">Medium Urgency</option>
          <option value="High">High Urgency</option>
          <option value="Immediate">Immediate Urgency</option>
        </select>

        <br /><br />

        <select className="search-input" value={communicationStatus} onChange={(e) => setCommunicationStatus(e.target.value)}>
          <option value="Good">Good Communication</option>
          <option value="Moderate">Moderate Communication</option>
          <option value="Poor">Poor Communication</option>
          <option value="Down">Communication Down</option>
        </select>

        <br /><br />

        <select className="search-input" value={medicalSupport} onChange={(e) => setMedicalSupport(e.target.value)}>
          <option value="Available">Medical Support Available</option>
          <option value="Limited">Medical Support Limited</option>
          <option value="Unavailable">Medical Support Unavailable</option>
        </select>

        <br /><br />

        <select className="search-input" value={availableAirSupport} onChange={(e) => setAvailableAirSupport(e.target.value)}>
          <option value="Yes">Air Support Yes</option>
          <option value="Limited">Air Support Limited</option>
          <option value="No">Air Support No</option>
        </select>

        <br /><br />

        <select className="search-input" value={availableNavalSupport} onChange={(e) => setAvailableNavalSupport(e.target.value)}>
          <option value="Yes">Naval Support Yes</option>
          <option value="Limited">Naval Support Limited</option>
          <option value="No">Naval Support No</option>
        </select>

        <br /><br />

        <button className="filter-btn active" onClick={recommendForce}>
          Predict Recommended Force
        </button>
      </div>

      {result && (
        <div className="chart-card" style={{ maxWidth: "800px", margin: "30px auto" }}>
          <h2>Recommended Force: {result.force}</h2>
          <p>
            <strong>Model Confidence:</strong> {result.confidence}%
          </p>
        </div>
      )}
    </main>
  );
}

export default Recommendation;