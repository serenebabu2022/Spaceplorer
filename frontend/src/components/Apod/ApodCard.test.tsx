import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ApodCard from "./ApodCard";
import { MemoryRouter, useNavigate } from "react-router-dom";

// Mock useNavigate
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: jest.fn(),
    MemoryRouter: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
  };
});

describe("ApodCard", () => {
  const mockData = {
    title: "Astronomy Picture of the Day",
    url: "https://testpic.com/image.jpg",
    explanation: "This is a long explanation about the astronomical event.",
    date: "2025-06-24",
  };

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <ApodCard {...mockData} />
      </MemoryRouter>
    );
  it("renders title, image, and date", () => {
    renderComponent();

    expect(
      screen.getByText(/Today's Astronomy Picture of the Day:/i)
    ).toBeInTheDocument();
    expect(screen.getByAltText(mockData.title)).toHaveAttribute(
      "src",
      mockData.url
    );
    expect(screen.getByText(/2025-06-24/)).toBeInTheDocument();
    expect(screen.getByText(mockData.explanation)).toBeInTheDocument();
  });

  it("navigates to /exploreAPOD when 'Explore More' is clicked", () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: /explore more/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/exploreAPOD");
  });
});
