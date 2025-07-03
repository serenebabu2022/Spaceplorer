// AutoAnimateCards.test.tsx
import React from "react";
import { render, screen, act } from "@testing-library/react";
import AutoAnimateCards from "./AnimateCards";

jest.useFakeTimers();

describe("AutoAnimateCards", () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  it("renders first card on load", () => {
    render(<AutoAnimateCards />);
    expect(
      screen.getByText(/Explore today's breathtaking view of the cosmos/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /Astronomy Picture of the Day/i })
    ).toBeInTheDocument();
  });

  it("cycles through cards every 3 seconds", () => {
    render(<AutoAnimateCards />);

    // First card visible
    expect(
      screen.getByText(/Explore today's breathtaking view of the cosmos/i)
    ).toBeVisible();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // After 3 seconds, second card visible
    expect(
      screen.getByText(/Interplanetary Shocks can cause aurora/i)
    ).toBeVisible();
  });

  it("all cards contain redirect links", () => {
    render(<AutoAnimateCards />);
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThanOrEqual(4);
    links.forEach((link) => {
      expect(link).toHaveAttribute("href");
      expect(link.textContent).toMatch(/^→/);
    });
  });
});
