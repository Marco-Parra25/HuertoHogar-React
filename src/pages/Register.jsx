// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerRequest } from "../services/api";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (form.password !== form.confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    if (form.password.length < 8) {
      setMessage("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    try {
      await registerRequest(form.username, form.email, form.password);
      setMessage("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
      setTimeout(() => navigate("/iniciar-sesion"), 1500);
    } catch (err) {
      console.error(err);
      setMessage("Error al crear la cuenta.");
    }
  };

  return (
    <main>
      <div className="form-card">
        <h1>Crear Cuenta</h1>

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

          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={form.email}
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

          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <button type="submit" className="btn-form">
            Crear Cuenta
          </button>
        </form>

        {message && (
          <p className={`mensaje ${message.includes("éxito") ? "mensaje-exito" : "mensaje-error"}`}>
            {message}
          </p>
        )}
      </div>
    </main>
  );
};

export default Register;
