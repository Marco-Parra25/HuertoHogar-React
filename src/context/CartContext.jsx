// Contexto de carrito con persistencia en localStorage
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const CART_KEY = "cart_items";

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // Cargar carrito almacenado
  useEffect(() => {
    const stored = localStorage.getItem(CART_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        setItems([]);
      }
    }
  }, []);

  // Persistir cambios
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product) => {
    if (!product?.id) return;

    setItems((prev) => {
      const precio = Number(product.precio) || 0;
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          nombre: product.nombre,
          precio,
          unidad: product.unidad,
          imagen: product.imagen,
          cantidad: 1,
        },
      ];
    });
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQuantity = (id, nuevaCantidad) => {
    setItems((prev) => {
      if (nuevaCantidad <= 0) return prev.filter((p) => p.id !== id);
      return prev.map((p) => (p.id === id ? { ...p, cantidad: nuevaCantidad } : p));
    });
  };

  const clearCart = () => setItems([]);

  const totals = useMemo(() => {
    const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0);
    const totalPrice = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    return { totalItems, totalPrice };
  }, [items]);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, ...totals }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

