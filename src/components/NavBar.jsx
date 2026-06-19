import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">Defence System Insight</div>

      <div className="nav-links">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/analytics">Analytics</Link>
        <Link className="nav-link" to="/equipment">Equipment</Link>
        <Link className="nav-link" to="/operations">Operations</Link>
        <Link className="nav-link" to="/recommendation">Recommendation</Link>
      </div>
    </nav>
  );
}

export default Navbar;