// src/pages/ProviderDashboard.jsx
import { useAuth } from "../contexts/AuthContext";

function ProviderDashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <p>This is your Provider Dashboard. Here you will manage your meals.</p>
    </div>
  );
}

export default ProviderDashboard;
