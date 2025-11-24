// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    user: null,      // { username, role }
  });

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, []);

  const login = (token, user) => {
    const newAuth = { token, user };
    setAuth(newAuth);
    localStorage.setItem("auth", JSON.stringify(newAuth));
  };

  const logout = () => {
    setAuth({ token: null, user: null });
    localStorage.removeItem("auth");
  };

  const isAuthenticated = !!auth.token;
  const role = auth.user?.role || null;

  return (
    <AuthContext.Provider value={{ ...auth, isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
