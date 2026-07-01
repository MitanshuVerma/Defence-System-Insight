import IndiaDeploymentMap from "../components/IndiaDeploymentMap";

function Deployments() {
  return (
    <main className="page-container">
      <section className="hero-section">
        <h1 className="page-title">Deployment Map</h1>
        <p className="page-subtitle">
          Live deployment status across strategic regions.
        </p>
      </section>

      <IndiaDeploymentMap />
    </main>
  );
}

export default Deployments;