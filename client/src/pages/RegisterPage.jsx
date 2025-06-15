import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [name, setName] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await register(email, password, role, name);
    } catch (err) {
      console.error("Registration failed:", err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <select value={role} onChange={(e) => setRole(e.target.value)} required>
        <option value="customer">Customer</option>
        <option value="provider">Provider</option>
        <option value="delivery">Delivery</option>
      </select>

      <button type="submit">Register</button>
    </form>
  );
}
