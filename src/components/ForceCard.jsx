import { Link } from "react-router-dom";
function ForceCard({ force }) {
  return (
  <Link
    to={`/force/${force.Force}`}
    style={{
      textDecoration: "none",
      color: "white",
    }}
  >
    <div
      style={{
        backgroundColor: "#1e293b",
        padding: "20px",
        borderRadius: "12px",
        width: "250px",
        margin: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
      }}
    >
      <h2>{force.Force}</h2>

      <p>
        <strong>Type:</strong> {force.Type}
      </p>

      <p>
        <strong>Personnel:</strong> {force.Personnel}
      </p>

      <p>
        <strong>Terrain:</strong> {force.Terrain}
      </p>
    </div>
  </Link>
);
}

export default ForceCard;