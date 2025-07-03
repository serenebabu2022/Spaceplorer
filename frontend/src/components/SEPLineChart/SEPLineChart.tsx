import React, { useState } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
  LineChart,
  Line,
} from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";

import { fetchSEPEvents } from "../../api/api";
import { useDonkiData } from "../../hooks/useDonkiData";

const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    const { count, instruments } = payload[0].payload;
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow text-sm text-blue-900">
        <p className="font-semibold">Month: {label}</p>
        <p>Events: {count}</p>
        <p>Instrument: {instruments}</p>
      </div>
    );
  }

  return null;
};

const SEPLineChart = () => {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const { data, loading, error } = useDonkiData(
    (start, end) => fetchSEPEvents(start, end).then((res) => res.data),
    selectedYear
  );
  const today = new Date();

  return (
    <div className="max-w-3xl bg-black shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">
        Solar Energetic Particle Events
      </h1>
      <p>
        The chart below shows the number of SEP events captured by NASA's Deep
        Space Network (DSN) over the years. Each line represents the number of
        SEP events recorded in a month
      </p>
      <label htmlFor="year-select" className="mr-2 font-semibold">
        Select Year:
      </label>
      <select
        id="year-select"
        value={selectedYear}
        onChange={(e) => setSelectedYear(Number(e.target.value))}
        className="mb-4 p-2 border rounded text-gray-800 min-w-[80px]"
      >
        {Array.from({ length: 16 }).map((_, i) => {
          const year = today.getFullYear() - i;
          return (
            <option key={year} value={year}>
              {year}
            </option>
          );
        })}
      </select>
      <div style={{ height: 300 }}>
        {loading ? (
          <p className="text-blue-500">Loading data...</p>
        ) : error ? (
          <p className="text-red-500">Failed to load data.</p>
        ) : data.length === 0 ? (
          <p className="text-blue-500">
            No data available for the selected year.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line yAxisId="left" dataKey="count" fill="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
export default SEPLineChart;
