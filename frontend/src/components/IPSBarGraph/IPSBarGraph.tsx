import React, { useState } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";

import { fetchIPSEvents } from "../../api/api";
import { useDonkiData } from "../../hooks/useDonkiData";

const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    const { count, location, instruments } = payload[0].payload;
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow text-sm text-blue-900">
        <p className="font-semibold">Month: {label}</p>
        <p>Events: {count}</p>
        <p>Location: {location}</p>
        <p>Instrument: {instruments}</p>
      </div>
    );
  }

  return null;
};

const IPSBarGraph = () => {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const { data, loading, error } = useDonkiData(
    (start, end) => fetchIPSEvents(start, end).then((res) => res.data),
    selectedYear
  );
  const today = new Date();

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Inter Planetory Shock</h1>
      <p>
        Check out the chart below to see data of actual IPS events captured in
        real time. The bar graph shows the number of IPS events recorded each
        month, along with the instruments used to detect them and their
        locations.
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
            <BarChart data={data}>
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar yAxisId="left" dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default IPSBarGraph;
