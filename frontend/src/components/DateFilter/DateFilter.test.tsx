import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DateFilter from "./DateFilter";

describe("DateFilter", () => {
  const mockStartDate = "2023-01-01";
  const mockEndDate = "2023-01-15";
  const mockOnStartDateChange = jest.fn();
  const mockOnEndDateChange = jest.fn();
  const mockOnDateRangeChange = jest.fn();

  it("renders date inputs", () => {
    render(
      <DateFilter
        startDate={mockStartDate}
        endDate={mockEndDate}
        onStartDateChange={mockOnStartDateChange}
        onEndDateChange={mockOnEndDateChange}
        onDateRangeChange={mockOnDateRangeChange}
        loading={false}
      />
    );
    expect(screen.getByLabelText(/start date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/end date/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
  });

  it("calls fetch handler when fetch button is clicked", () => {
    render(
      <DateFilter
        startDate={mockStartDate}
        endDate={mockEndDate}
        onStartDateChange={mockOnStartDateChange}
        onEndDateChange={mockOnEndDateChange}
        onDateRangeChange={mockOnDateRangeChange}
        loading={false}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(mockOnDateRangeChange).toHaveBeenCalled();
  });

  beforeAll(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });
});
afterAll(() => {
  jest.restoreAllMocks();
});
