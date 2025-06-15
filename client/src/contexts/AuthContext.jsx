import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); //  define token
  const navigate = useNavigate(); //  use navigate

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken) {
      setToken(savedToken);

      try {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser) {
          setUser(parsedUser);
        }
      } catch (err) {
        console.error("Failed to parse savedUser from localStorage", err);
        localStorage.removeItem("user"); // cleanup corrupted data
      }
    }
  }, []);

  async function register(email, password, role, name) {
    const res = await axios.post("http://localhost:5000/api/register", {
      email,
      password,
      role,
      name,
    });

    alert("Registration successful!");
    navigate("/login"); // redirect to login after registration
  }

  async function login(email, password) {
    const res = await axios.post("http://localhost:5000/api/login", {
      email,
      password,
    });

    const { token, user } = res.data;

    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    navigate("/meals");
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    navigate("/login");
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
