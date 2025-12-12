import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Login from "../pages/Login";

const mockLogin = vi.fn();
const mockNavigate = vi.fn();

vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({ login: mockLogin }),
}));

vi.mock("../services/api", () => ({
  loginRequest: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Login page", () => {
  it("renderiza formulario de inicio de sesión", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Iniciar Sesión" })).toBeInTheDocument();
    expect(screen.getByLabelText("Usuario:")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Iniciar Sesión" })).toBeInTheDocument();
  });

  it("envía credenciales y llama login + navigate", async () => {
    const { loginRequest } = await import("../services/api");
    loginRequest.mockResolvedValue({
      token: "fake-token",
      username: "user",
      role: "ROLE_USER",
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByLabelText("Usuario:"), "user");
    await userEvent.type(screen.getByLabelText("Contraseña:"), "12345678");
    await userEvent.click(screen.getByRole("button", { name: "Iniciar Sesión" }));

    await waitFor(() => {
      expect(loginRequest).toHaveBeenCalledWith("user", "12345678");
    });
    expect(mockLogin).toHaveBeenCalledWith("fake-token", {
      username: "user",
      role: "ROLE_USER",
    });
    expect(mockNavigate).toHaveBeenCalledWith("/catalogo");
  });
});

