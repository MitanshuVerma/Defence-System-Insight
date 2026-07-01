import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { loadCSV } from "../utils/csvReader";

function IndiaDeploymentMap() {
  const [deployments, setDeployments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await loadCSV("/data/geographical_deployment_status.csv");
      setDeployments(data);
    }

    fetchData();
  }, []);

  function getColor(level) {
    if (level === "Critical") return "red";
    if (level === "High") return "orange";
    if (level === "Medium") return "yellow";
    return "green";
  }

  return (
    <div className="map-card">
      <h2>Live Deployment Map</h2>
      <p className="map-subtitle">Deployment status across India</p>

      <MapContainer
        center={[22.9734, 78.6569]}
        zoom={5}
        style={{
          height: "520px",
          width: "100%",
          borderRadius: "18px",
          marginTop: "20px",
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {deployments.map((item) => (
          <CircleMarker
            key={item.Deployment_ID}
            center={[Number(item.Latitude), Number(item.Longitude)]}
            radius={10}
            pathOptions={{
              color: getColor(item.Threat_Level),
              fillColor: getColor(item.Threat_Level),
              fillOpacity: 0.8,
            }}
          >
            <Popup>
              <strong>{item.Region}</strong>
              <br />
              Force: {item.Force}
              <br />
              Threat: {item.Threat_Type}
              <br />
              Status: {item.Deployment_Status}
              <br />
              Personnel: {item.Personnel}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}

export default IndiaDeploymentMap;