// client/src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
      {!user && (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/orders">Orders</Link>
        </>
      )}

      {user && (
        <>
          <Link to="/meals">Meals</Link>
          <span>
            Logged in as: {user.name} ({user.role})
          </span>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
