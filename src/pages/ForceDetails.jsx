import { useParams } from "react-router-dom";

function ForceDetails() {
  const { forceName } = useParams();

  return (
    <div>
      <h1>{forceName}</h1>
      <h2>Force Details Page</h2>
    </div>
  );
}

export default ForceDetails;