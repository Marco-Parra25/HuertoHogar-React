import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import AddProduct from "../pages/AddProduct";

const mockNavigate = vi.fn();

vi.mock("../services/api", () => ({
  addProductRequest: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("AddProduct page", () => {
  it("renderiza formulario para agregar producto", () => {
    render(
      <MemoryRouter>
        <AddProduct />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Agregar Producto" })).toBeInTheDocument();
    expect(screen.getByText("Nombre:")).toBeInTheDocument();
    expect(screen.getByText("Descripción:")).toBeInTheDocument();
    expect(screen.getByText("Precio:")).toBeInTheDocument();
    expect(screen.getByText("Unidad:")).toBeInTheDocument();
    expect(screen.getByText("Imagen:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Guardar" })).toBeInTheDocument();
  });

  it("envía datos y llama al API", async () => {
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
    const { addProductRequest } = await import("../services/api");
    addProductRequest.mockResolvedValue({});

    render(
      <MemoryRouter>
        <AddProduct />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByLabelText("Nombre:"), "Manzana");
    await userEvent.type(screen.getByLabelText("Descripción:"), "Rica");
    await userEvent.type(screen.getByLabelText("Precio:"), "1000");
    await userEvent.type(screen.getByLabelText("Unidad:"), "kg");

    const file = new File(["img"], "foto.png", { type: "image/png" });
    const inputFile = screen.getByLabelText("Imagen:");
    await userEvent.upload(inputFile, file);
    await waitFor(() => {
      expect(inputFile.files?.length).toBe(1);
    });

    const submitButton = screen.getByRole("button", { name: "Guardar" });
    fireEvent.submit(submitButton.closest("form") ?? submitButton);

    await waitFor(() => {
      expect(addProductRequest).toHaveBeenCalledTimes(1);
    }, { timeout: 3000 });
    expect(mockNavigate).toHaveBeenCalledWith("/catalogo");
    setTimeoutSpy.mockRestore();
  });
});

