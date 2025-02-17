import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const logoutWithoutNavigate = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("guest");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);

      try {
        const decodedUser = jwtDecode(storedToken);
        setUser(decodedUser);
      } catch (error) {
        console.error("Invalid token:", error);
        logoutWithoutNavigate();
      }
    } else {
      const guestUser = JSON.parse(localStorage.getItem("guest"));
      if (guestUser) setUser(guestUser);
    }
  }, []);

  const login = async (email, password) => {
    try {
      console.log("Attempting Login with:", { email, password }); // ✅ Debugging log
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Login Response:", response.data);
      if (!response.data.token) {
        throw new Error("No token received from the server");
      }

      // ✅ Store token & update state
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);

      // ✅ Decode JWT to get user info
      const decodedUser = jwtDecode(response.data.token);
      setUser(decodedUser);
      return "success";
    } catch (error) {
      console.error("Login Error:", error);
      throw new Error(error.response?.data?.message || "Login failed.");
    }
  };

  const guestLogin = (navigate) => {
    const guestUser = { role: "guest", name: "Guest User" };
    localStorage.setItem("guest", JSON.stringify(guestUser));
    setUser(guestUser);
    navigate("/dashboard"); // Redirect guest user
  };

  const logout = (navigate) => {
    localStorage.removeItem("token");
    localStorage.removeItem("guest");
    setToken(null); // ✅ Clear token state
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, guestLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
