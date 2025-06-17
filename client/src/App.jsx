// client/src/App.jsx
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MealsPage from "./pages/MealsPage";
import OrdersPage from "./pages/OrdersPage";
import HomePage from "./pages/HomePage";
import { useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { user, logout } = useAuth();

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
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
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
