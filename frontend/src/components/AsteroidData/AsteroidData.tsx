import React from "react";
import { useState, useEffect } from "react";
import { AsteroidData } from "../../types/interfaces";
import { fetchAsteroidList, searchAsteroid } from "../../api/api";
import DateFilter from "../DateFilter/DateFilter";
import Pagination from "../Pagination/Pagination";

const ITEMS_PER_PAGE = 10;

const AsteroidsData = () => {
  const [data, setData] = useState<AsteroidData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showOnlyHazardous, setShowOnlyHazardous] = useState(false);

  const fetchData = async (start?: string, end?: string) => {
    if (start && end) {
      const startTime = new Date(start).getTime();
      const endTime = new Date(end).getTime();
      const diffDays = (endTime - startTime) / (1000 * 60 * 60 * 24);

      if (diffDays > 7) {
        setError("Date range cannot exceed 7 days.");
        return;
      }
      if (diffDays < 0) {
        setError("End date must be after start date.");
        return;
      }

      setStartDate(start);
      setEndDate(end);
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetchAsteroidList(start, end);
      const asteroids = Object.values(response.data.near_earth_objects).flat();
      setData(asteroids);
      setCurrentPage(1);
    } catch {
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch default data for one week from the API on mount
    fetchData();
  }, []);

  //Filter hazardous asteroids
  const filteredData = showOnlyHazardous
    ? data.filter((a) => a.is_potentially_hazardous_asteroid)
    : data;

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearchById = async () => {
    if (!searchTerm.trim()) {
      // If search input is empty, reload default data
      fetchData();
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await searchAsteroid(searchTerm.trim());
      const asteroids: AsteroidData = response.data;
      setData([asteroids]);
      setStartDate("");
      setEndDate("");
    } catch (err) {
      setError("Asteroid not found. Please check the SPK-ID.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-auto p-4 bg-black shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-2">
        Asteroids Approaching Earth
      </h2>
      <h6>Find the asteroids coming close to earth for a period of 1 week</h6>
      <div className="flex flex-col md:flex-row md:items-end my-8 justify-between">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by ID of an Asteroid"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded text-gray-800"
          />
          <button
            onClick={handleSearchById}
            className="bg-gray-700 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>
        <DateFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          maxEndDate={
            startDate
              ? new Date(
                  new Date(startDate).getTime() + 7 * 24 * 60 * 60 * 1000
                )
                  .toISOString()
                  .split("T")[0]
              : ""
          }
          onDateRangeChange={fetchData}
          loading={loading}
          error={error}
        />
        <label className="flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            checked={showOnlyHazardous}
            onChange={(e) => setShowOnlyHazardous(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <span className="text-sm md:text-base">
            Potentially hazardous asteroids
          </span>
        </label>
      </div>
      <table className="min-w-full table-auto border border-gray-300">
        <thead className="bg-gray-100 text-gray-800">
          <tr>
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Miss Distance (km)</th>
            <th className="border px-2 py-1">Velocity (km/s)</th>
            <th className="border px-2 py-1">Diameter (m)</th>
            <th className="border px-2 py-1">Hazardous?</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((a) => {
            const approach = a.close_approach_data[0];
            return (
              <tr key={a.id}>
                <td className="border px-2 py-1">
                  <a
                    href={a.nasa_jpl_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 hover:underline transition-colors duration-200"
                  >
                    {a.id}
                  </a>
                </td>
                <td className="border px-2 py-1">
                  <a
                    href={a.nasa_jpl_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 hover:underline transition-colors duration-200"
                  >
                    {a.name}
                  </a>
                </td>
                <td className="border px-2 py-1">
                  {approach.close_approach_date}
                </td>
                <td className="border px-2 py-1">
                  {Number(approach.miss_distance.kilometers).toFixed(0)}
                </td>
                <td className="border px-2 py-1">
                  {Number(
                    approach.relative_velocity.kilometers_per_second
                  ).toFixed(2)}
                </td>
                <td className="border px-2 py-1">
                  {Number(
                    a.estimated_diameter.meters.estimated_diameter_min
                  ).toFixed(1)}{" "}
                  -{" "}
                  {Number(
                    a.estimated_diameter.meters.estimated_diameter_max
                  ).toFixed(1)}
                </td>
                <td className="border px-2 py-1 text-center">
                  {a.is_potentially_hazardous_asteroid ? "✅" : "❌"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default AsteroidsData;
