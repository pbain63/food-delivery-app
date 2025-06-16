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
      if (savedUser) {
        setUser(JSON.parse(savedUser));
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
    const res = await axios.post("http://localhost:5000/api/login", {
      email,
      password,
    });

    const { token, user } = res.data;

    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    //  Role-based redirect
    if (user.role === "customer") {
      navigate("/dashboard/customer");
    } else if (user.role === "provider") {
      navigate("/dashboard/provider");
    } else if (user.role === "delivery") {
      navigate("/dashboard/delivery");
    } else {
      navigate("/"); // fallback
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
