import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function RedirectIfLoggedIn({ children }) {
  const { user } = useAuth();

  if (user) {
    if (user.role === "customer") {
      return <Navigate to="/dashboard/customer" />;
    } else if (user.role === "provider") {
      return <Navigate to="/dashboard/provider" />;
    } else if (user.role === "delivery") {
      return <Navigate to="/dashboard/delivery" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  return children;
}

export default RedirectIfLoggedIn;
