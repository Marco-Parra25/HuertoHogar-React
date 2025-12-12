import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Register from "../pages/Register";

vi.mock("../services/api", () => ({
  registerRequest: vi.fn(),
}));

describe("Register page", () => {
  it("renderiza formulario de registro", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Crear Cuenta" })).toBeInTheDocument();
    expect(screen.getByLabelText("Usuario:")).toBeInTheDocument();
    expect(screen.getByLabelText("Correo Electrónico:")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña:")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirmar Contraseña:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Crear Cuenta" })).toBeInTheDocument();
  });

  it("muestra error si las contraseñas no coinciden", async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByLabelText("Usuario:"), "user");
    await userEvent.type(screen.getByLabelText("Correo Electrónico:"), "a@a.com");
    await userEvent.type(screen.getByLabelText("Contraseña:"), "12345678");
    await userEvent.type(screen.getByLabelText("Confirmar Contraseña:"), "1234");
    await userEvent.click(screen.getByRole("button", { name: "Crear Cuenta" }));

    expect(
      screen.getByText("Las contraseñas no coinciden.")
    ).toBeInTheDocument();
  });
});

