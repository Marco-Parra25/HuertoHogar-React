// src/pages/EditProduct.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductByIdRequest, updateProductRequest } from "../services/api";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    unidad: "",
    imagenActual: "",
    imagenNueva: null,
  });

  const [msg, setMsg] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const p = await getProductByIdRequest(id);

        setForm({
          nombre: p.nombre,
          descripcion: p.descripcion,
          precio: p.precio,
          unidad: p.unidad,
          imagenActual: p.imagen,
          imagenNueva: null,
        });
      } catch (err) {
        console.error(err);
      }
    };

    loadProduct();
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === "imagenNueva") {
      setForm({ ...form, imagenNueva: e.target.files[0] });
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

      // SOLO enviamos imagen si se seleccionó una nueva
      if (form.imagenNueva) {
        formData.append("file", form.imagenNueva);
      }

      await updateProductRequest(id, formData);

      setMsg("Cambios guardados ✔");
      setTimeout(() => navigate("/catalogo"), 1200);
    } catch (err) {
      console.error(err);
      setMsg("Error al guardar cambios.");
    }
  };

  return (
    <main>
      <h1>Editar Producto</h1>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <label>Nombre:</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} required />

          <label>Descripción:</label>
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} required />

          <label>Precio:</label>
          <input type="number" name="precio" value={form.precio} onChange={handleChange} required />

          <label>Unidad:</label>
          <input name="unidad" value={form.unidad} onChange={handleChange} required />

          <label>Imagen actual:</label>
          <p style={{ fontSize: "14px", marginBottom: "10px" }}>{form.imagenActual}</p>

          <label>Nueva imagen (opcional):</label>
          <input type="file" name="imagenNueva" accept="image/*" onChange={handleChange} />

          <button type="submit" className="btn-form">Guardar cambios</button>
        </form>

        {msg && <p className="mensaje">{msg}</p>}
      </div>
    </main>
  );
};

export default EditProduct;
