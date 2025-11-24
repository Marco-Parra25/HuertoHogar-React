// src/services/api.js

const AUTH_API = "http://localhost:8080/auth";
const PRODUCT_API = "http://localhost:8081/api/productos";

export const loginRequest = async (username, password) => {
  const res = await fetch(`${AUTH_API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json(); 
};

export const registerRequest = async (username, email, password) => {
  const res = await fetch(`${AUTH_API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.text();
};

// GET PRODUCTOS
export const getProductos = async () => {
  const token = JSON.parse(localStorage.getItem("auth"))?.token;

  const res = await fetch(PRODUCT_API, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!res.ok) throw new Error("Error obteniendo productos");
  return res.json();
};

// ADD PRODUCT (FormData)
export const addProductRequest = async (formData) => {
  const token = JSON.parse(localStorage.getItem("auth"))?.token;

  const res = await fetch(`${PRODUCT_API}/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

// GET BY ID
export const getProductByIdRequest = async (id) => {
  const token = JSON.parse(localStorage.getItem("auth"))?.token;

  const res = await fetch(`${PRODUCT_API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

// UPDATE PRODUCT (FormData)
export const updateProductRequest = async (id, formData) => {
  const token = JSON.parse(localStorage.getItem("auth"))?.token;

  const res = await fetch(`${PRODUCT_API}/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

// DELETE PRODUCT
export const deleteProductRequest = async (id) => {
  const token = JSON.parse(localStorage.getItem("auth"))?.token;

  const res = await fetch(`${PRODUCT_API}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error(await res.text());
  return true;
};
