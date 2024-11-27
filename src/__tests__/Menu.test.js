import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Menu from "../components/Menu";

beforeEach(() => {
  jest
    .spyOn(global.Storage.prototype, "getItem")
    .mockImplementation(() => null);
  localStorage.clear();
});

describe("Menu Component", () => {
  it("should display a message when there are no menu items in localStorage", () => {
    localStorage.getItem.mockReturnValueOnce(JSON.stringify([]));
    render(<Menu />);
    expect(screen.getByText(/no menu items available/i)).toBeInTheDocument();
  });

  it("should display a list of menu items when they exist in localStorage", () => {
    const mockMenuItems = [
      { name: "Burger", description: "Delicious beef burger", price: "5.99" },
      {
        name: "Pizza",
        description: "Cheesy pizza with pepperoni",
        price: "8.99",
      },
    ];
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(mockMenuItems));
    render(<Menu />);

    expect(
      screen.getByRole("heading", { name: /burger/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /pizza/i })).toBeInTheDocument();
    expect(screen.getByText(/Delicious beef burger/i)).toBeInTheDocument();
    expect(screen.getByText(/\$5.99/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Cheesy pizza with pepperoni/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/\$8.99/i)).toBeInTheDocument();
  });

  it("should render a message when localStorage is empty or doesn't contain menu items", () => {
    localStorage.removeItem("menuItems");
    render(<Menu />);
    expect(
      screen.getByText(/No menu items available. Please add some./i)
    ).toBeInTheDocument();
  });
});
