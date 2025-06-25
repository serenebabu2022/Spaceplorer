// src/pages/Home/Home.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./HomePage";
import * as api from "../../api/api";
import { MemoryRouter } from "react-router-dom";

// Mock the fetchApod function
jest.mock("../../api/api", () => ({
  fetchApod: jest.fn(),
}));
const mockFetchApod = api.fetchApod as jest.Mock;

describe("Home Component", () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockFetchApod.mockClear();
  });

  it("renders loading state initially", async () => {
    // Set up the mock to return a promise that never resolves (to keep it in loading)
    mockFetchApod.mockImplementation(() => new Promise(() => {}));

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("renders data after successful fetch", async () => {
    const mockApodData = {
      title: "Test APOD",
      explanation: "This is a test explanation.",
      url: "test-url.jpg",
      date: "2023-01-01",
    };

    mockFetchApod.mockResolvedValue({ data: mockApodData });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Wait for the loading text to disappear and the card content to appear
    expect(await screen.findByText("Test APOD")).toBeInTheDocument();
    expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
  });

  it("renders error message on fetch failure", async () => {
    mockFetchApod.mockRejectedValue(new Error("Network error"));

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(await screen.findByText(/Error fetching data/i)).toBeInTheDocument();
    expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
  });
});
