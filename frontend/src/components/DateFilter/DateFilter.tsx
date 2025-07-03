import React from "react";

interface DateFilterProps {
  startDate: string;
  endDate: string;
  maxEndDate?: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onDateRangeChange: (start: string, end: string) => void;
  loading: boolean;
  error?: string;
}

const DateFilter: React.FC<DateFilterProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onDateRangeChange,
  maxEndDate,
  loading,
  error,
}) => {
  const handleSearch = () => {
    if (!startDate || !endDate) return;
    onDateRangeChange(startDate, endDate);
  };

  return (
    <div className="flex justify-center gap-4 flex-wrap">
      <label className="text-white">
        Start Date:{" "}
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="text-black rounded p-1"
          disabled={loading}
        />
      </label>
      <label className="text-white">
        End Date:{" "}
        <input
          type="date"
          value={endDate}
          min={startDate}
          max={maxEndDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="text-black rounded p-1"
          disabled={loading || !startDate}
        />
      </label>
      <button
        onClick={handleSearch}
        name="filter"
        className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Loading..." : "Submit"}
      </button>
      {error && <p className="text-red-400 w-full text-center mt-2">{error}</p>}
    </div>
  );
};

export default DateFilter;
