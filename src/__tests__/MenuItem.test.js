import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MenuItem from "../components/MenuItem";

describe("MenuItem Component", () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  const menuItem = {
    id: 1,
    name: "Burger",
    price: 5.99,
    description: "Delicious beef burger",
  };

  beforeEach(() => {
    mockOnEdit.mockClear();
    mockOnDelete.mockClear();
  });

  it("should display the menu item details", () => {
    render(
      <MenuItem item={menuItem} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    expect(
      screen.getByRole("heading", { name: /Burger/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Price: \$5.99/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Description: Delicious beef burger/i)
    ).toBeInTheDocument();
  });

  it("should call onEdit when the Edit button is clicked", () => {
    render(
      <MenuItem item={menuItem} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    fireEvent.click(screen.getByText(/Edit/i));

    expect(mockOnEdit).toHaveBeenCalledWith(menuItem);
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  it("should call onDelete when the Delete button is clicked", () => {
    render(
      <MenuItem item={menuItem} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    fireEvent.click(screen.getByText(/Delete/i));

    expect(mockOnDelete).toHaveBeenCalledWith(menuItem.id);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});
