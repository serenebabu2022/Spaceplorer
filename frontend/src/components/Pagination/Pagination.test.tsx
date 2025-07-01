import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination Component", () => {
  const onPageChangeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly with given props", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );
    // Verify navigation buttons
    expect(screen.getByRole("button", { name: /prev/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
    // Verify page buttons
    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
    const currentPageBtn = screen.getByRole("button", { name: "2" });
    expect(currentPageBtn).toBeInTheDocument();
    // expect(currentPageBtn).toHaveClass("bg-blue-500"); // Verify active state
    expect(screen.getByRole("button", { name: "3" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "5" })).toBeInTheDocument();
  });

  test("disables Prev button on the first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );

    const prevButton = screen.getByText("Prev");
    expect(prevButton).toBeDisabled();
  });

  test("disables Next button on the last page", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );

    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
  });

  test("calls onPageChange with the correct page number when a page number is clicked", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );

    fireEvent.click(screen.getByText("2"));
    expect(onPageChangeMock).toHaveBeenCalledWith(2);

    fireEvent.click(screen.getByText("3"));
    expect(onPageChangeMock).toHaveBeenCalledWith(3);
  });

  test("calls onPageChange when Prev button is clicked", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );

    fireEvent.click(screen.getByText("Prev"));
    expect(onPageChangeMock).toHaveBeenCalledWith(1);
  });

  test("calls onPageChange when Next button is clicked", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );

    fireEvent.click(screen.getByText("Next"));
    expect(onPageChangeMock).toHaveBeenCalledWith(3);
  });

  test("shows ellipsis when there are more than 3 pages", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={onPageChangeMock}
      />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("...")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });
});
