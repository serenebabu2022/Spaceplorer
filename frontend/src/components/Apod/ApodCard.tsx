import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApodData } from "../../types/interfaces";

interface ApodProps extends ApodData {}

const ApodCard: React.FC<ApodProps> = ({ title, url, explanation, date }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleExploreMore = () => {
    navigate("/exploreAPOD");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 rounded-lg shadow-lg text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">{title}</h1>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <img
          src={url}
          alt={title}
          className="md:w-1/2 w-full object-cover rounded-lg shadow-md max-h-[500px]"
        />
        <div className="md:w-1/2 w-full flex flex-col">
          <p
            className={`text-base transition-all duration-300 ease-in-out overflow-hidden ${
              expanded ? "max-h-none" : "max-h-[15rem]" /* ~5 lines */
            }`}
            style={{ lineHeight: "1.5rem" }}
          >
            {explanation}
          </p>
          <button
            className="mt-4 text-blue-400 hover:text-blue-600 self-start"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        </div>
      </div>
      <p className="mt-6 text-sm text-gray-400 text-right">📅 {date}</p>
      <div className="flex justify-center mt-8">
        <button
          className="px-6 py-3 bg-gray-700 hover:bg-blue-900 rounded-md text-white font-semibold transition"
          onClick={handleExploreMore}
        >
          Explore More
        </button>
      </div>
    </div>
  );
};

export default ApodCard;
