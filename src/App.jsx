import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ForceDetails from "./pages/ForceDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/force/:forceName"
          element={<ForceDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;