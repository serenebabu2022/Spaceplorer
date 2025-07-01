import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import AsteroidsData from "./AsteroidData";
import { fetchAsteroidList, searchAsteroid } from "../../api/api";
import * as api from "../../api/api";

// Mock the API functions
jest.mock("../../api/api", () => ({
  fetchAsteroidList: jest.fn(),
  searchAsteroid: jest.fn(),
}));
const mockFetchAsteroid = api.fetchAsteroidList as jest.Mock;
const mockSearchAsteroid = api.searchAsteroid as jest.Mock;

describe("AsteroidsData Component", () => {
  const mockAsteroids = [
    {
      id: "1",
      name: "Asteroid One",
      close_approach_data: [
        {
          close_approach_date: "2023-01-01",
          miss_distance: { kilometers: "100000" },
          relative_velocity: { kilometers_per_second: "10" },
        },
      ],
      estimated_diameter: {
        meters: {
          estimated_diameter_min: 50,
          estimated_diameter_max: 100,
        },
      },
      is_potentially_hazardous_asteroid: true,
      nasa_jpl_url: "http://nasa.gov/asteroid1",
    },
    {
      id: "2",
      name: "Asteroid Two",
      close_approach_data: [
        {
          close_approach_date: "2023-01-02",
          miss_distance: { kilometers: "200000" },
          relative_velocity: { kilometers_per_second: "15" },
        },
      ],
      estimated_diameter: {
        meters: {
          estimated_diameter_min: 30,
          estimated_diameter_max: 70,
        },
      },
      is_potentially_hazardous_asteroid: false,
      nasa_jpl_url: "http://nasa.gov/asteroid2",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders initial loading state", async () => {
    mockFetchAsteroid.mockImplementation(() => new Promise(() => {})); // Never resolves

    render(<AsteroidsData />);
    expect(
      screen.getByText(/Find the asteroids coming close to earth/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("displays fetched asteroids data", async () => {
    mockFetchAsteroid.mockResolvedValue({
      data: { near_earth_objects: { "2023-01-01": mockAsteroids } },
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<AsteroidsData />);
    });

    await expect(screen.getByText(/Asteroid One/i)).toBeInTheDocument();
    await expect(screen.getByText(/Asteroid Two/i)).toBeInTheDocument();

    expect(screen.getByText(/100000/i)).toBeInTheDocument();
    expect(screen.getByText(/50.0 - 100.0/i)).toBeInTheDocument();
    expect(screen.getByText(/✅/i)).toBeInTheDocument();
  });

  test("handles fetch error", async () => {
    mockFetchAsteroid.mockRejectedValue(new Error("Failed to fetch data"));

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<AsteroidsData />);
    });

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch data/i)).toBeInTheDocument();
    });
  });

  test("searches for asteroid by ID", async () => {
    mockFetchAsteroid.mockResolvedValue({
      data: { near_earth_objects: { "2023-01-01": mockAsteroids } },
    });
    mockSearchAsteroid.mockResolvedValue({ data: mockAsteroids[0] });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<AsteroidsData />);
    });

    fireEvent.change(
      screen.getByPlaceholderText(/Search by ID of an Asteroid/i),
      {
        target: { value: "1" },
      }
    );
    fireEvent.click(screen.getByText(/Search/i));

    await expect(searchAsteroid).toHaveBeenCalledWith("1");
    await waitFor(() => {
      expect(screen.getByText(/Asteroid One/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByText(/Asteroid Two/i)).not.toBeInTheDocument();
    });
  });

  test("filters hazardous asteroids", async () => {
    mockFetchAsteroid.mockResolvedValue({
      data: { near_earth_objects: { "2023-01-01": mockAsteroids } },
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<AsteroidsData />);
    });

    await waitFor(() => {
      expect(screen.getByText(/Asteroid One/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(/Asteroid Two/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText(/Potentially hazardous asteroids/i));

    await waitFor(() => {
      expect(screen.getByText(/Asteroid One/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByText(/Asteroid Two/i)).not.toBeInTheDocument();
    });
  });
});
