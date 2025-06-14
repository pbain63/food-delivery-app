// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MealsPage from "./pages/MealsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/meals" element={<MealsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
