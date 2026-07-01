import { Link } from "react-router-dom";

function Landing() {
  return (
    <main className="landing-page">
      <div className="landing-content">
        <h1>Welcome to Defence System Insight</h1>
        <p>
          AI-powered defence analytics, deployment visualization, and force recommendation platform.
        </p>

        <Link to="/home" className="landing-btn">
          Enter Dashboard
        </Link>
      </div>
    </main>
  );
}

export default Landing;