import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/NavBar";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Analytics from "./pages/Analytics";
import Equipment from "./pages/Equipment";
import Operations from "./pages/Operations";
import Recommendation from "./pages/Recommendation";
import Deployments from "./pages/Deployments";
import ForceDetails from "./pages/ForceDetails";

function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <Navbar />}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/operations" element={<Operations />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/deployments" element={<Deployments />} />
        <Route path="/force/:forceName" element={<ForceDetails />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;