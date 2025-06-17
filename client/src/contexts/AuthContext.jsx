import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//  Context
export const AuthContext = createContext();

//  Custom hook
export function useAuth() {
  return useContext(AuthContext);
}

//  Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken) {
      setToken(savedToken);
      try {
        if (savedUser && savedUser !== "undefined") {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Failed to parse savedUser:", error);
        localStorage.removeItem("user"); // clean up invalid JSON
      }
    }
  }, []);

  function setToken(token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  async function register(email, password, role, name) {
    const res = await axios.post("http://localhost:5000/api/register", {
      email,
      password,
      role,
      name,
    });

    alert("Registration successful!");
    navigate("/login");
  }

  async function login(email, password) {
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      console.log("Login response:", res.data); // Debug

      const { token, user } = res.data;

      if (!token || !user) {
        throw new Error("Missing token or user in response");
      }

      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/meals");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  }

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
