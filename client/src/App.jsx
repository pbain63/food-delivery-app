// client/src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MealsPage from "./pages/MealsPage";
import HomePage from "./pages/HomePage";
import CustomerDashboard from "./pages/CustomerDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import DeliveryDashboard from "./pages/DeliveryDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectIfLoggedIn from "./components/RedirectIfLoggedIn";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* ✅ Wrapped with redirect logic */}
        <Route
          path="/register"
          element={
            <RedirectIfLoggedIn>
              <RegisterPage />
            </RedirectIfLoggedIn>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectIfLoggedIn>
              <LoginPage />
            </RedirectIfLoggedIn>
          }
        />

        {/* ✅ Role Dashboards */}
        <Route
          path="/dashboard/customer"
          element={
            <ProtectedRoute>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/provider"
          element={
            <ProtectedRoute>
              <ProviderDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/delivery"
          element={
            <ProtectedRoute>
              <DeliveryDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/meals"
          element={
            <ProtectedRoute>
              <MealsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
