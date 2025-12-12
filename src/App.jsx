// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Cart from "./pages/Cart";



const App = () => {
  return (
    <div className="body">
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/catalogo"
            element={
              <ProtectedRoute>
                <Catalog />
              </ProtectedRoute>
            }
          />
          <Route path="/iniciar-sesion" element={<Login />} />
          <Route path="/crear-cuenta" element={<Register />} />
          <Route
            path="/agregar-producto"
            element={
              <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editar-producto/:id"
            element={
              <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
                <EditProduct />
              </ProtectedRoute>
            }
          />
          <Route path="/carrito" element={<Cart />} />

        </Routes>
      </div>
      <footer>
        <p>&copy; 2025 HuertoHogar. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
