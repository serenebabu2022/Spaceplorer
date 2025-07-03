import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

describe("Header", () => {
  it("renders logo text", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText(/Space/i)).toBeInTheDocument();
    expect(screen.getByText(/plorer/i)).toBeInTheDocument();
  });
  it("renders navigation links", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Features")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("toggles mobile menu when menu button is clicked", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const button = screen.getByRole("button", { name: /toggle menu/i });

    fireEvent.click(button);

    const mobileMenu = screen.getByRole("navigation", { hidden: true });
    const { getByText } = within(mobileMenu);
    expect(getByText("About")).toBeInTheDocument();
  });
});
