import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Catalog from "../pages/Catalog";

vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({ isAuthenticated: true, role: "ROLE_ADMIN" }),
}));

vi.mock("../context/CartContext", () => ({
  useCart: () => ({ addItem: vi.fn() }),
}));

vi.mock("../services/api", () => ({
  getProductos: vi.fn().mockResolvedValue([
    { id: 1, nombre: "Pera", descripcion: "Dulce", precio: 500, unidad: "kg", imagen: "/fotos/peras.webp" },
  ]),
  deleteProductRequest: vi.fn(),
}));

describe("Catalog page", () => {
  it("muestra el título y un producto", async () => {
    render(
      <MemoryRouter>
        <Catalog />
      </MemoryRouter>
    );

    expect(screen.getByText("Catálogo de Productos")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Pera")).toBeInTheDocument();
    });

    expect(screen.getByText("Agregar al carrito")).toBeInTheDocument();
  });
});

