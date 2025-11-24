// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginRequest(form.username, form.password);

      login(data.token, { username: data.username, role: data.role });

      navigate("/catalogo");
    } catch (err) {
      console.error(err);
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <main>
      <div className="form-card">
        <h1>Iniciar Sesión</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            value={form.username}
            onChange={handleChange}
          />

          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
          />

          <button type="submit" className="btn-form">
            Iniciar Sesión
          </button>
        </form>

        {error && <p className="mensaje">{error}</p>}
      </div>
    </main>
  );
};

export default Login;
