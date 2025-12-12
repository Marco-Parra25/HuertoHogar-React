import React, { useEffect, useState } from "react";
import { getProductos, deleteProductRequest } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Catalog = () => {
  const [productos, setProductos] = useState([]);
  const [toast, setToast] = useState("");
  const { role, isAuthenticated } = useAuth();
  const { addItem } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getProductos();
        setProductos(data);
      } catch (err) {
        console.error("Error cargando productos", err);
      }
    };
    fetchProductos();
  }, []);

  const lista = productos.length
    ? productos
    : [
        {
          id: 1,
          nombre: "Peras",
          descripcion: "Nuestras peras son las más frescas y ricas de todo el mercado nacional.",
          precio: 800,
          unidad: "kg",
          imagen: "/fotos/peras.webp",
        },
        {
          id: 2,
          nombre: "Limones",
          descripcion:
            "Nuestros limones son los más jugosos del mercado. Excelente calidad garantizada.",
          precio: 700,
          unidad: "kg",
          imagen: "/fotos/limones.webp",
        },
        {
          id: 3,
          nombre: "Lechugas",
          descripcion: "Lechugas cosechadas frescas para tu hogar.",
          precio: 500,
          unidad: "unidad",
          imagen: "/fotos/lechuga.webp",
        },
      ];

  const handleDelete = async (id) => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este producto?");
    if (!confirmar) return;

    try {
      await deleteProductRequest(id);
      alert("Producto eliminado correctamente");
      window.location.reload();
    } catch (err) {
      alert("Error eliminando: " + err.message);
    }
  };

  const resolveImage = (img) => {
    if (!img) return "/fotos/default.webp";

    if (img.startsWith("http")) return img;

    if (img.startsWith("/uploads")) return `http://localhost:8081${img}`;

    if (img.startsWith("uploads")) return `http://localhost:8081/${img}`;

    return img;
  };

  return (
    <main>
      <h1>Catálogo de Productos</h1>

      <div className="catalogo">
        {lista.map((p) => (
          <div className="producto-horizontal" key={p.id}>
            <img src={resolveImage(p.imagen)} alt={p.nombre} className="producto-img" />

            <div className="producto-info">
              <h3>{p.nombre}</h3>
              <p>{p.descripcion}</p>

              <div className="precio">
                ${p.precio} pesos{" "}
                {p.unidad === "unidad" ? "cada una" : `el ${p.unidad}`}
              </div>

              <button
                className="btn-form"
                style={{ width: "150px", margin: "10px auto" }}
                onClick={() => {
                  addItem({
                    id: p.id,
                    nombre: p.nombre,
                    precio: p.precio,
                    unidad: p.unidad,
                    imagen: resolveImage(p.imagen),
                  });
                  setToast(`"${p.nombre}" añadido al carrito`);
                  setTimeout(() => setToast(""), 1500);
                }}
              >
                Agregar al carrito
              </button>

              {isAuthenticated && role === "ROLE_ADMIN" && (
                <div className="admin-buttons">
                  <button
                    onClick={() => navigate(`/editar-producto/${p.id}`)}
                    className="btn-edit"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="btn-delete"
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {toast && (
        <div className="toast toast-success">
          {toast}
        </div>
      )}
    </main>
  );
};

export default Catalog;
