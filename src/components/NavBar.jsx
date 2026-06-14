import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "20px", padding: "20px", backgroundColor: "#1e293b" }}>
      <Link to="/" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>
        Home
      </Link>

      <Link to="/analytics" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>
        Analytics
      </Link>

      <Link to="/equipment" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>
        Equipment
      </Link>

      <Link to="/operations" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>
        Operations
      </Link>
    </nav>
  );
}

export default Navbar;