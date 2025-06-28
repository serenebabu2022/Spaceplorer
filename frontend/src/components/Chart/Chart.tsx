import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
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
import { IPSData } from "../../types/interfaces";
import { start } from "repl";

const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    const { count, location, instruments } = payload[0].payload;
    console.log(payload[0].payload);
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

const Chart = () => {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [data, setData] = useState<
    { month: string; count: number; location: string; instruments: string }[]
  >([]);

  const today = new Date();
  const isCurrentYear = selectedYear === today.getFullYear();

  const startDate = `${selectedYear}-01-01`;
  const endDate = isCurrentYear
    ? today.toISOString().split("T")[0]
    : `${selectedYear}-12-31`;

  useEffect(() => {
    fetchIPSEvents(startDate, endDate)
      .then((response) => {
        const monthlyData: {
          [key: string]: {
            count: number;
            location: string;
            instruments: Set<string>;
          };
        } = {}; //an object to hold counts per month

        response.data.forEach((event: IPSData) => {
          const date = new Date(event.eventTime);
          const month = `${date.getFullYear()}-${String(
            date.getMonth() + 1
          ).padStart(2, "0")}`; //extracting year and month in YYYY-MM format

          if (!monthlyData[month]) {
            monthlyData[month] = {
              count: 0,
              location: event.location || "Unknown",
              instruments: new Set<string>(),
            };
          }

          monthlyData[month].count += 1;
          event.instruments?.forEach((instrument) => {
            monthlyData[month].instruments.add(instrument.displayName);
          });
        });

        const formatted = Object.entries(monthlyData).map(
          ([month, { count, location, instruments }]) => ({
            month,
            count,
            location,
            instruments: Array.from(instruments).join(", "),
          })
        );

        setData(formatted);
      })
      .catch((error) => {
        console.error("Error fetching IPS events:", error);
      });
  }, [selectedYear]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Inter Planetory Shock</h1>
      <p>
        Imagine a massive ripple blasting through the solar system. That's what
        an Interplanetary Shock (IPS) is. These shockwaves are triggered by
        powerful bursts of solar energy, like solar flares or coronal mass
        ejections (CMEs), erupting from the Sun.
      </p>
      <p>
        Check out the chart below to see actual IPS events captured in real time
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
      <div style={{ width: "100%", height: 300, overflowX: "auto" }}>
        <div style={{ width: Math.max(data.length * 60, 500), height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar yAxisId="left" dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Chart;
