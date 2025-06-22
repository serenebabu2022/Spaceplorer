import React from "react";

interface DateFilterProps {
  startDate: string;
  endDate: string;
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
  loading,
  error,
}) => {
  const today = new Date().toISOString().split("T")[0];

  // Calculate max end date as 30 days after start
  const maxEndDate = startDate
    ? new Date(new Date(startDate).getTime() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]
    : today;

  const handleSearch = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInDays = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);

    if (diffInDays > 30) {
      alert("Please select a date range of 30 days or less.");
      return;
    }

    onDateRangeChange(startDate, endDate);
  };

  return (
    <div className="flex justify-center gap-4 mb-8 flex-wrap">
      <label className="text-white">
        Start Date:{" "}
        <input
          type="date"
          value={startDate}
          max={today}
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
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Loading..." : "Fetch"}
      </button>
      {error && <p className="text-red-400 w-full text-center mt-2">{error}</p>}
    </div>
  );
};

export default DateFilter;
