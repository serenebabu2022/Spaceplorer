import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import App from "./App";
import * as api from "./api/api";

// Mock the fetchApod function
jest.mock("./api/api", () => ({
  fetchApod: jest.fn(),
}));
const mockFetchApod = api.fetchApod as jest.Mock;

jest.mock("./components/IPSBarGraph/IPSBarGraph", () => () => (
  <div>Mock IPSBarGraph</div>
));

jest.mock("./components/SEPChart/SEPLineChart", () => () => (
  <div>Mock SEPLineChart</div>
));

describe("App Component", () => {
  const mockApodData = {
    title: "Test APOD",
    explanation: "This is a test explanation.",
    url: "test-url.jpg",
    date: "2023-01-01",
    media_type: "image",
  };

  it("renders without crashing even when API call fails", async () => {
    mockFetchApod.mockRejectedValue(new Error("Network error"));

    // Render the App component wrapped in MemoryRouter
    render(<App />);

    // Check if the header is rendered
    expect(screen.getByRole("banner")).toBeInTheDocument();

    // Check if the home page is rendered
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(await screen.findByText(/Error fetching data/i)).toBeInTheDocument();
  });
  it("renders the home page with APOD data", async () => {
    mockFetchApod.mockResolvedValue({ data: mockApodData });

    // Render the App component wrapped in MemoryRouter
    render(<App />);

    // Check if the header is rendered
    expect(screen.getByRole("banner")).toBeInTheDocument();

    // Check if the home page is rendered
    expect(screen.getByText(/Home/i)).toBeInTheDocument();

    // Wait for the APOD data to be displayed
    expect(await screen.findByText(mockApodData.title)).toBeInTheDocument();
  });
});
