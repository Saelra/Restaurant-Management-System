import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import EditMenuItem from "../components/EditMenuItem";

const mockOnSave = jest.fn();

describe("EditMenuItem Component", () => {
  const menuItem = {
    id: 1,
    name: "Burger",
    price: 5.99,
    description: "A delicious beef burger",
  };

  beforeEach(() => {
    mockOnSave.mockReset();
  });

  it("renders with the correct initial values", () => {
    render(<EditMenuItem item={menuItem} onSave={mockOnSave} />);
    expect(screen.getByDisplayValue("Burger")).toBeInTheDocument();
    expect(screen.getByDisplayValue("5.99")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("A delicious beef burger")
    ).toBeInTheDocument();
  });

  it("updates the name, price, and description fields on user input", () => {
    render(<EditMenuItem item={menuItem} onSave={mockOnSave} />);

    fireEvent.change(screen.getByDisplayValue("Burger"), {
      target: { value: "Cheeseburger" },
    });
    expect(screen.getByDisplayValue("Cheeseburger")).toBeInTheDocument();

    fireEvent.change(screen.getByDisplayValue("5.99"), {
      target: { value: "6.99" },
    });
    expect(screen.getByDisplayValue("6.99")).toBeInTheDocument();

    fireEvent.change(screen.getByDisplayValue("A delicious beef burger"), {
      target: { value: "A cheesy burger with bacon" },
    });
    expect(
      screen.getByDisplayValue("A cheesy burger with bacon")
    ).toBeInTheDocument();
  });

  it("calls the onSave function with the correct updated data when the form is submitted", () => {
    render(<EditMenuItem item={menuItem} onSave={mockOnSave} />);

    fireEvent.change(screen.getByDisplayValue("Burger"), {
      target: { value: "Cheeseburger" },
    });
    fireEvent.change(screen.getByDisplayValue("5.99"), {
      target: { value: "6.99" },
    });
    fireEvent.change(screen.getByDisplayValue("A delicious beef burger"), {
      target: { value: "A cheesy burger with bacon" },
    });

    fireEvent.click(screen.getByText("Save Changes"));

    expect(mockOnSave).toHaveBeenCalledWith({
      ...menuItem,
      name: "Cheeseburger",
      price: 6.99,
      description: "A cheesy burger with bacon",
    });
  });

  it("only allows valid price input with up to two decimal places", () => {
    render(<EditMenuItem item={menuItem} onSave={mockOnSave} />);

    fireEvent.change(screen.getByDisplayValue("5.99"), {
      target: { value: "7.45" },
    });
    expect(screen.getByDisplayValue("7.45")).toBeInTheDocument();

    fireEvent.change(screen.getByDisplayValue("7.45"), {
      target: { value: "7.456" },
    });
    expect(screen.getByDisplayValue("7.45")).toBeInTheDocument();
  });
});
