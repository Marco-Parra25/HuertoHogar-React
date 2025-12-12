import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import EditProduct from "../pages/EditProduct";

const mockNavigate = vi.fn();

vi.mock("../services/api", () => ({
  getProductByIdRequest: vi.fn().mockResolvedValue({
    nombre: "Pera",
    descripcion: "Dulce",
    precio: 500,
    unidad: "kg",
    imagen: "/fotos/peras.webp",
  }),
  updateProductRequest: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("EditProduct page", () => {
  it("carga datos y muestra el formulario", async () => {
    render(
      <MemoryRouter initialEntries={["/editar-producto/1"]}>
        <Routes>
          <Route path="/editar-producto/:id" element={<EditProduct />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Editar Producto")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByDisplayValue("Pera")).toBeInTheDocument();
    });
  });

  it("envía cambios y llama al API", async () => {
    const realSetTimeout = global.setTimeout;
    const setTimeoutSpy = vi
      .spyOn(global, "setTimeout")
      .mockImplementation((fn, ms, ...args) => {
        if (ms === 1200) {
          fn(...args);
          return 0;
        }
        return realSetTimeout(fn, ms, ...args);
      });
    const { updateProductRequest } = await import("../services/api");
    updateProductRequest.mockResolvedValue({});

    render(
      <MemoryRouter initialEntries={["/editar-producto/1"]}>
        <Routes>
          <Route path="/editar-producto/:id" element={<EditProduct />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue("Pera")).toBeInTheDocument();
    });

    await userEvent.clear(screen.getByLabelText("Nombre:"));
    await userEvent.type(screen.getByLabelText("Nombre:"), "Pera Roja");
    await userEvent.click(screen.getByRole("button", { name: "Guardar cambios" }));

    await waitFor(() => {
      expect(updateProductRequest).toHaveBeenCalledTimes(1);
    });
    expect(mockNavigate).toHaveBeenCalledWith("/catalogo");
    setTimeoutSpy.mockRestore();
  });
});

