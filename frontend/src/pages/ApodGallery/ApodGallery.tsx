import React, { useState, useEffect } from "react";
import { fetchApodRange } from "../../api/api";
import { ApodData } from "../../types/interfaces";
import DateFilter from "../../components/DateFilter/DateFilter";

interface Photo {
  date: string;
  title: string;
  url: string;
  explanation: string;
}

const ApodGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [data, setData] = useState<ApodData[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  const fetchAPODForDateRange = async (startStr: string, endStr: string) => {
    setError(""); // Reset error state
    const startTime = new Date(startStr).getTime();
    const endTime = new Date(endStr).getTime();
    const diffDays = (endTime - startTime) / (1000 * 60 * 60 * 24);

    if (diffDays > 30) {
      setError("Please select a date range of 30 days or less.");
      return;
    }
    if (diffDays < 0) {
      setError("End date must be after start date.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetchApodRange(startStr, endStr);
      if (res.data.length === 0) {
        setError("No photos available for this date range.");
        setData([]);
      } else {
        setData(res.data);
      }
    } catch {
      setError("Failed to load recent images.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 7); // last 8 days including today

    const startStr = start.toISOString().split("T")[0];
    const endStr = end.toISOString().split("T")[0];

    fetchAPODForDateRange(startStr, endStr); // assuming this takes (startDate, endDate)
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto pt-[96px]">
      <h1 className="text-4xl font-bold mb-8 text-center">Explore Gallery</h1>
      <DateFilter
        startDate={startDate}
        endDate={endDate}
        maxEndDate={today}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onDateRangeChange={fetchAPODForDateRange}
        loading={loading}
        error={error}
      />
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
        {data.map((photo) => (
          <div
            key={photo.date}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:scale-105 transform transition"
            onClick={() => setSelectedPhoto(photo)}
          >
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-white">
                {photo.title}
              </h2>
            </div>
            <p className="text-sm text-gray-400 text-right">📅 {photo.date}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedPhoto(null)} // Close on background click
        >
          <div
            className="bg-white rounded-lg overflow-hidden max-w-2xl w-full relative"
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-2 right-2 bg-black text-white hover:bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold"
              aria-label="Close"
            >
              ×
            </button>

            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              className="w-full h-96 object-cover"
            />
            <div className="p-6 text-black">
              <h2 className="text-2xl font-bold mb-2">{selectedPhoto.title}</h2>
              <p className="text-sm">{selectedPhoto.explanation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApodGallery;
