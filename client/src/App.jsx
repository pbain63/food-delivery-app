import { Routes, Route, Link } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MealsPage from "./pages/MealsPage";
import { useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { user, logout } = useAuth();

  return (
    <div>
      <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/meals">Meals</Link>
        {user && (
          <>
            <span>
              Logged in as: {user.name} ({user.role})
            </span>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/meals"
          element={
            <ProtectedRoute>
              <MealsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
