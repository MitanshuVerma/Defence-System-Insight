import { Link } from "react-router-dom";

function ForceCard({ force }) {
  return (
    <Link to={`/force/${force.Force}`} className="force-card">
      <span className="force-badge">{force.Type}</span>

      <h2>{force.Force}</h2>

      <p>
        <strong>Personnel:</strong>{" "}
        {Number(force.Personnel).toLocaleString()}
      </p>

      <p>
        <strong>Terrain:</strong> {force.Terrain}
      </p>

      <p>
        <strong>Role:</strong> {force.Primary_Role}
      </p>
    </Link>
  );
}

export default ForceCard;