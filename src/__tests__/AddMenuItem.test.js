import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddMenuItem from "../components/AddMenuItem";

describe("AddMenuItem", () => {
  let onAddMock;

  beforeEach(() => {
    onAddMock = jest.fn();
  });

  const fillForm = (name, price, description) => {
    fireEvent.change(screen.getByPlaceholderText(/name/i), {
      target: { value: name },
    });
    fireEvent.change(screen.getByPlaceholderText(/price/i), {
      target: { value: price },
    });
    fireEvent.change(screen.getByPlaceholderText(/description/i), {
      target: { value: description },
    });
  };

  test("should update form inputs on change", () => {
    render(<AddMenuItem onAdd={onAddMock} />);
    fillForm("Burger", "9.99", "A delicious beef burger.");
    expect(screen.getByPlaceholderText(/name/i).value).toBe("Burger");
    expect(screen.getByPlaceholderText(/price/i).value).toBe("9.99");
    expect(screen.getByPlaceholderText(/description/i).value).toBe(
      "A delicious beef burger."
    );
  });

  test("should call onAdd with correct values after form submission", () => {
    render(<AddMenuItem onAdd={onAddMock} />);
    fillForm("Pizza", "12.99", "Cheesy and delicious pizza.");
    fireEvent.click(screen.getByRole("button", { name: /add item/i }));
    expect(onAddMock).toHaveBeenCalledWith({
      name: "Pizza",
      price: 12.99,
      description: "Cheesy and delicious pizza.",
    });
    expect(screen.getByPlaceholderText(/name/i).value).toBe("");
    expect(screen.getByPlaceholderText(/price/i).value).toBe("");
    expect(screen.getByPlaceholderText(/description/i).value).toBe("");
  });

  test("should reset form after successful submission", () => {
    render(<AddMenuItem onAdd={onAddMock} />);
    fillForm("Sushi", "19.99", "Fresh fish and rice.");
    fireEvent.click(screen.getByRole("button", { name: /add item/i }));
    expect(screen.getByPlaceholderText(/name/i).value).toBe("");
    expect(screen.getByPlaceholderText(/price/i).value).toBe("");
    expect(screen.getByPlaceholderText(/description/i).value).toBe("");
  });

  test("handles price input correctly", () => {
    render(<AddMenuItem onAdd={jest.fn()} />);
    const priceInput = screen.getByPlaceholderText(/price/i);

    fireEvent.change(priceInput, { target: { value: "10" } });
    expect(priceInput.value).toBe("10");

    fireEvent.change(priceInput, { target: { value: "10.5" } });
    expect(priceInput.value).toBe("10.5");

    fireEvent.change(priceInput, { target: { value: "10.99" } });
    expect(priceInput.value).toBe("10.99");

    fireEvent.change(priceInput, { target: { value: "10.999" } });
    expect(priceInput.value).toBe("10.99");

    fireEvent.change(priceInput, { target: { value: "" } });
    expect(priceInput.value).toBe("");
  });
});
