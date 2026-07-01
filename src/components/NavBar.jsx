import { NavLink, Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        Defence System Insight
      </Link>

      <div className="nav-links">
        <NavLink className="nav-link" to="/home">
          Home
        </NavLink>

        <NavLink className="nav-link" to="/analytics">
          Analytics
        </NavLink>

        <NavLink className="nav-link" to="/equipment">
          Equipment
        </NavLink>

        <NavLink className="nav-link" to="/operations">
          Operations
        </NavLink>

        <NavLink className="nav-link" to="/recommendation">
          Recommendation
        </NavLink>

        <NavLink className="nav-link" to="/deployments">
          Deployments
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;  