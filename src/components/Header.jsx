import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { isAuthenticated, user, logout, role } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // redirige al inicio
  };

  return (
    <header>
      <Link to="/" id="logo">
        <span style={{ fontWeight: "bold", fontSize: "1.4rem" }}>
          HuertoHogar
        </span>
      </Link>

      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/catalogo">Catálogo</Link>
        <Link to="/carrito" className="cart-link">
          Carrito
          <span className="cart-badge">{totalItems}</span>
        </Link>

        {!isAuthenticated && (
          <>
            <Link to="/iniciar-sesion">Iniciar Sesión</Link>
            <Link to="/crear-cuenta">Crear Cuenta</Link>
          </>
        )}

        {isAuthenticated && (
          <>
            {/* Opciones solo para ADMIN */}
            {role === "ROLE_ADMIN" && (
              <Link to="/agregar-producto">Agregar Producto</Link>
            )}

            {/* Info de usuario */}
            <span style={{ margin: "0 10px" }}>
              {user?.username}
            </span>

            {/* Botón logout */}
            <button
              onClick={handleLogout}
              style={{
                cursor: "pointer",
                background: "none",
                border: "1px solid #ccc",
                padding: "5px 10px",
              }}
            >
              Cerrar Sesión
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
