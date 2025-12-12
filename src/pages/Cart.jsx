import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { items, updateQuantity, removeItem, clearCart, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  if (!items.length) {
    return (
      <main className="cart-page">
        <h1>Carrito</h1>
        <div className="cart-empty">
          <p>Tu carrito está vacío.</p>
          <button className="btn-form" onClick={() => navigate("/catalogo")}>
            Ver catálogo
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <h1>Carrito</h1>
      <div className="cart-content">
        <div className="cart-items">
          {items.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item-image">
                {item.imagen ? (
                  <img src={item.imagen} alt={item.nombre} />
                ) : (
                  <div className="cart-placeholder" />
                )}
              </div>

              <div className="cart-item-info">
                <h3>{item.nombre}</h3>
                <p className="cart-unit">Precio: ${item.precio} {item.unidad ? `(${item.unidad})` : ""}</p>
                <div className="cart-quantity">
                  <button onClick={() => updateQuantity(item.id, item.cantidad - 1)}>-</button>
                  <span>{item.cantidad}</span>
                  <button onClick={() => updateQuantity(item.id, item.cantidad + 1)}>+</button>
                </div>
              </div>

              <div className="cart-item-actions">
                <div className="cart-subtotal">
                  ${(item.precio * item.cantidad).toFixed(0)}
                </div>
                <button className="btn-delete" onClick={() => removeItem(item.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Resumen</h2>
          <p>Cantidad de productos: <strong>{totalItems}</strong></p>
          <p>Total a pagar: <strong>${totalPrice.toFixed(0)}</strong></p>

          <button className="btn-form" onClick={() => alert("Checkout no implementado aún")}>
            Finalizar compra
          </button>
          <button className="btn-form cart-secondary" onClick={clearCart}>
            Vaciar carrito
          </button>
          <button className="btn-form cart-secondary" onClick={() => navigate("/catalogo")}>
            Seguir comprando
          </button>
        </aside>
      </div>
    </main>
  );
};

export default Cart;

