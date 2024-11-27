import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import Header from "../components/Header";
import { signOutUser } from "../firebase";

// Mocking signOutUser function
jest.mock("../firebase", () => ({
  signOutUser: jest.fn(),
}));

// Suppress React Router Future Flag Warnings
beforeAll(() => {
  jest.spyOn(console, "warn").mockImplementation((message) => {
    if (message.includes("React Router Future Flag Warning")) return;
    console.warn(message);
  });
});

afterAll(() => {
  console.warn.mockRestore();
});

describe("Header Component", () => {
  it("renders the header and shows user info if user is logged in", () => {
    const mockUser = { username: "JohnDoe", id: "123" };
    global.localStorage.setItem("user", JSON.stringify(mockUser));

    render(
      <Router>
        <Header />
      </Router>
    );

    expect(
      screen.getByText(/restaurant management system/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/add\/edit menu item/i)).toBeInTheDocument();
    expect(screen.getByText(/view menu/i)).toBeInTheDocument();
    expect(screen.getByText(/welcome, johndoe/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  it("calls signOutUser and logs out the user", async () => {
    const mockUser = { username: "JohnDoe", id: "123" };
    global.localStorage.setItem("user", JSON.stringify(mockUser));

    render(
      <Router>
        <Header />
      </Router>
    );

    fireEvent.click(screen.getByText(/logout/i));

    await waitFor(() => expect(signOutUser).toHaveBeenCalledTimes(1));

    expect(localStorage.getItem("user")).toBeNull();
  });

  it("does not show user-related links if no user is logged in", () => {
    global.localStorage.removeItem("user");

    render(
      <Router>
        <Header />
      </Router>
    );

    expect(screen.queryByText(/add\/edit menu item/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/view menu/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/welcome/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
  });

  it("should call window.scrollTo when a navigation link is clicked", () => {
    const scrollToMock = jest.fn();
    global.scrollTo = scrollToMock;

    const mockUser = { username: "JohnDoe", id: "123" };
    global.localStorage.setItem("user", JSON.stringify(mockUser));

    render(
      <Router>
        <Header />
      </Router>
    );

    const addMenuLink = screen.getByText(/add\/edit menu item/i);
    fireEvent.click(addMenuLink);

    expect(scrollToMock).toHaveBeenCalledWith(0, 0);
  });
});
