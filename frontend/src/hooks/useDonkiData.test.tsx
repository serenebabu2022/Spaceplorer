import { renderHook, act } from "@testing-library/react";
import { useDonkiData } from "./useDonkiData";
import { waitFor } from "@testing-library/react";

describe("useDonkiData hook", () => {
  const mockFetchFn = jest.fn();

  const sampleResponse = [
    {
      eventTime: "2023-01-15T12:00:00Z",
      instruments: [
        { displayName: "Instrument1" },
        { displayName: "Instrument2" },
      ],
      location: "L1",
    },
    {
      eventTime: "2023-01-20T12:00:00Z",
      instruments: [{ displayName: "Instrument2" }],
      location: "L1",
    },
    {
      eventTime: "2023-02-05T12:00:00Z",
      instruments: [{ displayName: "Instrument3" }],
      location: "L2",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {}); // Suppress console.error
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore original console.error after each test
  });

  it("should initialize with loading=true and empty data", () => {
    mockFetchFn.mockReturnValue(new Promise(() => {})); // never resolves

    const { result } = renderHook(() => useDonkiData(mockFetchFn, 2023));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe(false);
  });

  it("fetches data and formats it correctly", async () => {
    mockFetchFn.mockResolvedValue(sampleResponse);

    const { result } = renderHook(() => useDonkiData(mockFetchFn, 2023));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(false);

    expect(result.current.data).toEqual([
      {
        month: "2023-01",
        count: 2,
        instruments: "Instrument1, Instrument2",
        location: "L1",
      },
      {
        month: "2023-02",
        count: 1,
        instruments: "Instrument3",
        location: "L2",
      },
    ]);
  });

  it("sets error=true when fetch fails", async () => {
    mockFetchFn.mockRejectedValue(new Error("Fetch error"));

    const { result } = renderHook(() => useDonkiData(mockFetchFn, 2023));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(true);
    expect(result.current.data).toEqual([]);
  });

  it("updates data when selectedYear changes", async () => {
    mockFetchFn.mockResolvedValueOnce(sampleResponse);

    const { result, rerender } = renderHook(
      ({ year }) => useDonkiData(mockFetchFn, year),
      { initialProps: { year: 2023 } }
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data.length).toBe(2);

    // Prepare different data for new year
    const newYearData = [
      {
        eventTime: "2022-03-10T12:00:00Z",
        instruments: [{ displayName: "InstrumentX" }],
        location: "L3",
      },
    ];
    mockFetchFn.mockResolvedValueOnce(newYearData);

    rerender({ year: 2022 });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual([
      {
        month: "2022-03",
        count: 1,
        instruments: "InstrumentX",
        location: "L3",
      },
    ]);
  });
});
