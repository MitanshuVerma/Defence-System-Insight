import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ForceDetails from "./pages/ForceDetails";
import Analytics from "./pages/Analytics";
import Equipment from "./pages/Equipment";
import Operations from "./pages/Operations";
import Recommendation from "./pages/Recommendation";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/force/:forceName" element={<ForceDetails />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/operations" element={<Operations />} />
        <Route path="/recommendation" element={<Recommendation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;