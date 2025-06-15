// client/src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Don't show navbar on login/register page
  const hideNavbarOn = ["/login", "/register"];
  if (hideNavbarOn.includes(location.pathname)) return null;

  return (
    <nav
      style={{
        display: "flex",
        gap: "1rem",
        padding: "1rem",
        backgroundColor: "#f5f5f5",
        marginBottom: "1rem",
        borderBottom: "1px solid #ccc",
      }}
    >
      <Link to="/">Home</Link>
      <Link to="/meals">Meals</Link>

      {!user ? (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      ) : (
        <>
          <span>
            Logged in as: <strong>{user.name}</strong> ({user.role})
          </span>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
}
