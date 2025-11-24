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
    <main className="center-page">
      <section className="cuenta">
        <h1>CREAR CUENTA</h1>
        <form id="signup-form" onSubmit={handleSubmit}>
          <p>
            <label htmlFor="nombre-usuario">Nombre de Usuario:</label>
            <input
              type="text"
              id="nombre-usuario"
              name="username"
              required
              value={form.username}
              onChange={handleChange}
            />
          </p>
          <p>
            <label htmlFor="correo-electronico">Correo Electrónico:</label>
            <input
              type="email"
              id="correo-electronico"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
            />
          </p>
          <p>
            <label htmlFor="contrasena">Contraseña:</label>
            <input
              type="password"
              id="contrasena"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
            />
          </p>
          <p>
            <label htmlFor="confirmar-contrasena">Confirmar Contraseña:</label>
            <input
              type="password"
              id="confirmar-contrasena"
              name="confirmPassword"
              required
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </p>
          <button type="submit" className="submit">
            Crear Cuenta de Usuario
          </button>
        </form>
        <div id="signup-error-message" style={{ marginTop: 10, color: "red" }}>
          {message}
        </div>
      </section>
    </main>
  );
};

export default Register;
