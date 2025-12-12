import { render, screen, fireEvent } from "@testing-library/react";
import { CartProvider, useCart } from "../context/CartContext";

const TestComponent = () => {
  const { addItem, totalItems, totalPrice } = useCart();
  return (
    <div>
      <span data-testid="total-items">{totalItems}</span>
      <span data-testid="total-price">{totalPrice}</span>
      <button
        onClick={() =>
          addItem({ id: 1, nombre: "Manzana", precio: 100, unidad: "kg" })
        }
      >
        add
      </button>
    </div>
  );
};

describe("CartContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("agrega un producto y actualiza totales", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText("add"));

    expect(screen.getByTestId("total-items")).toHaveTextContent("1");
    expect(screen.getByTestId("total-price")).toHaveTextContent("100");
  });

  it("incrementa cantidad si se agrega el mismo producto", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText("add"));
    fireEvent.click(screen.getByText("add"));

    expect(screen.getByTestId("total-items")).toHaveTextContent("2");
    expect(screen.getByTestId("total-price")).toHaveTextContent("200");
  });
});

