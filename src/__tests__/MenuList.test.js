import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MenuList from "../components/MenuList";
describe("MenuList Component", () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  const menuItems = [
    {
      id: 1,
      name: "Burger",
      price: 5.99,
      description: "Delicious beef burger",
    },
    {
      id: 2,
      name: "Pizza",
      price: 8.99,
      description: "Cheesy pizza with pepperoni",
    },
  ];

  beforeEach(() => {
    mockOnEdit.mockClear();
    mockOnDelete.mockClear();
  });

  it("should render a list of menu items when items are provided", () => {
    render(
      <MenuList items={menuItems} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    const burgerItems = screen.getAllByRole("heading", { name: /Burger/i });
    expect(burgerItems.length).toBe(1);
    expect(burgerItems[0]).toBeInTheDocument();

    const pizzaItems = screen.getAllByRole("heading", { name: /Pizza/i });
    expect(pizzaItems.length).toBe(1);
    expect(pizzaItems[0]).toBeInTheDocument();

    expect(screen.getByText(/Price: \$5.99/i)).toBeInTheDocument();
    expect(screen.getByText(/Delicious beef burger/i)).toBeInTheDocument();
    expect(screen.getByText(/Price: \$8.99/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Cheesy pizza with pepperoni/i)
    ).toBeInTheDocument();
  });

  it("should display a fallback message when no menu items are provided", () => {
    render(<MenuList items={[]} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    expect(screen.getByText(/No items in the menu/i)).toBeInTheDocument();
  });

  it("should call onEdit when the Edit button is clicked", () => {
    render(
      <MenuList items={menuItems} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    fireEvent.click(screen.getAllByText(/Edit/i)[0]);

    expect(mockOnEdit).toHaveBeenCalledWith(menuItems[0]);
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  it("should call onDelete when the Delete button is clicked", () => {
    render(
      <MenuList items={menuItems} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    fireEvent.click(screen.getAllByText(/Delete/i)[0]);

    expect(mockOnDelete).toHaveBeenCalledWith(menuItems[0].id);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});
