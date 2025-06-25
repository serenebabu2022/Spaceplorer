import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { act } from "react";
import ApodGallery from "./ApodGallery";
import * as api from "../../api/api";
import { ApodData } from "../../types/interfaces";

// Mock fetchApodRange
jest.mock("../../api/api", () => ({
  fetchApodRange: jest.fn(),
}));
const mockFetchApodRange = api.fetchApodRange as jest.Mock;

const mockPhotos: ApodData[] = [
  {
    date: "2025-06-18",
    title: "Nebula",
    url: "https://example.com/image1.jpg",
    explanation: "A stunning nebula in space.",
  },
  {
    date: "2025-06-19",
    title: "Galaxy",
    url: "https://example.com/image2.jpg",
    explanation: "A beautiful galaxy.",
  },
];

describe("ApodGallery", () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockFetchApodRange.mockClear();
  });

  it("renders loading state initially", async () => {
    mockFetchApodRange.mockImplementation(
      () => new Promise(() => {}) // Keep it in loading state
    );

    render(<ApodGallery />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders fetched photos", async () => {
    mockFetchApodRange.mockResolvedValue({ data: mockPhotos });

    render(<ApodGallery />);

    await screen.findByText("Nebula");

    expect(screen.getByText("Galaxy")).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(2);
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  it("shows error message on fetch failure", async () => {
    mockFetchApodRange.mockRejectedValue(new Error("Network error"));

    render(<ApodGallery />);

    await waitFor(() => {
      expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
    });
  });

  it("opens and closes modal on image click", async () => {
    mockFetchApodRange.mockResolvedValue({ data: mockPhotos });

    render(<ApodGallery />);
    await screen.findByText("Nebula");
    fireEvent.click(screen.getByText("Nebula"));

    await waitFor(() => {
      expect(screen.getByText(mockPhotos[0].explanation)).toBeInTheDocument();
    });
    // Close modal
    fireEvent.click(screen.getByLabelText("Close"));
    expect(
      screen.queryByText(mockPhotos[0].explanation)
    ).not.toBeInTheDocument();
  });
});
it("handles empty photo list", async () => {
  mockFetchApodRange.mockResolvedValueOnce({ data: [] });

  render(<ApodGallery />);

  await waitFor(() => {
    expect(screen.getByText(/no photos available/i)).toBeInTheDocument();
  });
});
