// components/Pagination.tsx
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const maxVisiblePages = 3;
  const getVisiblePageNumbers = () => {
    const visiblePages: (number | string)[] = [];

    // If total pages are less than or equal to maxVisiblePages, show all pages
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      // Calculate start and end for the visible range
      let startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      // Adjust startPage if endPage hits totalPages limit
      if (endPage === totalPages) {
        startPage = Math.max(1, totalPages - maxVisiblePages + 1);
      }

      // Add first page and ellipsis if needed
      if (startPage > 1) {
        visiblePages.push(1);
        if (startPage > 2) {
          visiblePages.push("...");
        }
      }

      // Add the calculated range of pages
      for (let i = startPage; i <= endPage; i++) {
        visiblePages.push(i);
      }

      // Add last page and ellipsis if needed
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          visiblePages.push("...");
        }
        visiblePages.push(totalPages);
      }
    }
    return visiblePages;
  };
  const visiblePageNumbers = getVisiblePageNumbers();
  return (
    <div className="flex justify-center mt-4 space-x-2">
      <button
        className="px-3 py-1 bg-gray-200 rounded text-gray-700"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {visiblePageNumbers.map((page, index) =>
        typeof page === "number" ? (
          <button
            className={`px-3 py-1 rounded-md transition-colors duration-200 ${
              page === currentPage
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ) : (
          <span className="px-3 py-1 text-gray-700">{page}</span>
        )
      )}

      <button
        className="px-3 py-1 bg-gray-200 rounded text-gray-700"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
