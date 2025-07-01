import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useDonkiData } from "../../hooks/useDonkiData";
import SEPLineChart from "./SEPLineChart";
import * as api from "../../api/api";

// Mock the useDonkiData hook
jest.mock("../../hooks/useDonkiData");

// Mock the fetchApod function
jest.mock("../../api/api", () => ({
  fetchIPSEvents: jest.fn(),
}));
const mockFetchApod = api.fetchIPSEvents as jest.Mock;

const mockUseDonkiData = useDonkiData as jest.Mock;
jest.mock("recharts", () => {
  const original = jest.requireActual("recharts");
  return {
    ...original,
    ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
  };
});

describe("SEPLineChart", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state", () => {
    mockUseDonkiData.mockReturnValue({
      data: [],
      loading: true,
      error: null,
    });

    render(<SEPLineChart />);

    expect(screen.getByText(/Loading data.../i)).toBeInTheDocument();
  });

  test("renders error state", () => {
    mockUseDonkiData.mockReturnValue({
      data: [],
      loading: false,
      error: true,
    });

    render(<SEPLineChart />);

    expect(screen.getByText(/Failed to load data./i)).toBeInTheDocument();
  });

  test("renders no data available state", () => {
    mockUseDonkiData.mockReturnValue({
      data: [],
      loading: false,
      error: false,
    });

    render(<SEPLineChart />);

    expect(
      screen.getByText(/No data available for the selected year./i)
    ).toBeInTheDocument();
  });

  test("changes year and updates chart", () => {
    const mockData = [
      { month: "January", count: 5, instruments: "Instrument A" },
      { month: "February", count: 10, instruments: "Instrument B" },
    ];

    mockUseDonkiData.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    render(<SEPLineChart />);

    // Check initial year selection
    expect(
      screen.getByDisplayValue(new Date().getFullYear().toString())
    ).toBeInTheDocument();

    // Change year
    fireEvent.change(screen.getByLabelText(/Select Year:/i), {
      target: { value: (new Date().getFullYear() - 1).toString() },
    });

    // Verify that the year has changed
    expect(
      screen.getByDisplayValue((new Date().getFullYear() - 1).toString())
    ).toBeInTheDocument();
  });
});
