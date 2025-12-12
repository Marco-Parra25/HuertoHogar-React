// src/pages/AddProduct.jsx
import React, { useState } from "react";
import { addProductRequest } from "../services/api";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    unidad: "",
    imagen: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "imagen") {
      setForm({ ...form, imagen: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const formData = new FormData();
      formData.append("nombre", form.nombre);
      formData.append("descripcion", form.descripcion);
      formData.append("precio", form.precio);
      formData.append("unidad", form.unidad);
      formData.append("file", form.imagen);   // campo correcto para tu API

      await addProductRequest(formData);

      setMsg("Producto agregado con éxito ✔");
      setTimeout(() => navigate("/catalogo"), 1200);
    } catch (err) {
      console.error(err);
      setMsg("Error al agregar producto.");
    }
  };

  return (
    <main>
      <h1>Agregar Producto</h1>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre:</label>
          <input id="nombre" name="nombre" value={form.nombre} onChange={handleChange} required />

          <label htmlFor="descripcion">Descripción:</label>
          <textarea id="descripcion" name="descripcion" value={form.descripcion} onChange={handleChange} required />

          <label htmlFor="precio">Precio:</label>
          <input id="precio" type="number" name="precio" value={form.precio} onChange={handleChange} required />

          <label htmlFor="unidad">Unidad:</label>
          <input id="unidad" name="unidad" value={form.unidad} onChange={handleChange} required />

          <label htmlFor="imagen">Imagen:</label>
          <input id="imagen" type="file" name="imagen" accept="image/*" onChange={handleChange} required />

          <button type="submit" className="btn-form">Guardar</button>
        </form>

        {msg && (
          <p className={`mensaje ${msg.includes("✔") || msg.includes("éxito") ? "mensaje-exito" : "mensaje-error"}`}>
            {msg}
          </p>
        )}
      </div>
    </main>
  );
};

export default AddProduct;
