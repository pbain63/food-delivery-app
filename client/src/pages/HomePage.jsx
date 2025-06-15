import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome to FoodieHub</h1>
      <p>
        Craving home-cooked meals? You're at the right place. Order from local
        women-led kitchens and get it delivered fast.
      </p>

      {!user ? (
        <div style={{ marginTop: "1rem" }}>
          <Link to="/register">
            <button style={{ marginRight: "1rem" }}>Register</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      ) : (
        <div style={{ marginTop: "1rem" }}>
          <h3>Hello, {user.name}!</h3>
          <p>
            Go to <Link to="/meals">Meals</Link> to explore today's menu.
          </p>
        </div>
      )}
    </div>
  );
}
