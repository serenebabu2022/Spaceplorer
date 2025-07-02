import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";

/* eslint-disable import/first */
jest.mock("../../hooks/useDonkiData", () => ({
  useDonkiData: jest.fn(),
}));
/* eslint-disable import/first */
import * as useDonkiDataMock from "../../hooks/useDonkiData";
import IPSBarGraph from "./IPSBarGraph";

jest.mock("recharts", () => {
  const original = jest.requireActual("recharts");
  return {
    ...original,
    ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
  };
});
jest.mock("axios", () => ({
  get: jest.fn(),
}));

jest.mock("../../api/api", () => ({
  fetchIPSEvents: jest.fn((start: string, end: string) => {
    // Simulate API response structure that useDonkiData expects
    return Promise.resolve([
      {
        eventTime: "2025-01-15T12:00:00Z",
        instruments: [{ displayName: "SOHO" }],
        location: "L1",
      },
      {
        eventTime: "2025-01-20T12:00:00Z",
        instruments: [{ displayName: "ACE" }],
        location: "L1",
      },
      {
        eventTime: "2025-02-05T12:00:00Z",
        instruments: [{ displayName: "SOHO" }],
        location: "L2",
      },
    ]);
  }),
}));

describe("IPSBarGraph", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    (jest.spyOn(useDonkiDataMock, "useDonkiData") as jest.Mock).mockReturnValue(
      {
        data: [],
        loading: true,
        error: false,
      }
    );

    render(<IPSBarGraph />);
    expect(screen.getByText(/Loading data/i)).toBeInTheDocument();
  });

  it("renders error state", () => {
    (jest.spyOn(useDonkiDataMock, "useDonkiData") as jest.Mock).mockReturnValue(
      {
        data: [],
        loading: false,
        error: true,
      }
    );

    render(<IPSBarGraph />);
    expect(screen.getByText(/Failed to load data/i)).toBeInTheDocument();
  });

  it("renders no data state", () => {
    (jest.spyOn(useDonkiDataMock, "useDonkiData") as jest.Mock).mockReturnValue(
      {
        data: [],
        loading: false,
        error: false,
      }
    );

    render(<IPSBarGraph />);
    expect(
      screen.getByText(/No data available for the selected year/i)
    ).toBeInTheDocument();
  });

  it("changes year and updates chart", () => {
    const mockData = [
      { month: "January", count: 5, instruments: "Instrument A" },
      { month: "February", count: 10, instruments: "Instrument B" },
    ];

    (jest.spyOn(useDonkiDataMock, "useDonkiData") as jest.Mock).mockReturnValue(
      {
        data: mockData,
        loading: false,
        error: false,
      }
    );

    render(<IPSBarGraph />);

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
