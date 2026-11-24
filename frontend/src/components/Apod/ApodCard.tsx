import React from "react";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import { ApodData } from "../../types/interfaces";

interface ApodProps extends ApodData {}

const ApodCard: React.FC<ApodProps> = ({
  title,
  hdurl,
  explanation,
  date,
  copyright,
}) => {
  // const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleExploreMore = () => {
    navigate("/exploreAPOD");
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 bg-black shadow-xl rounded-xl text-white">
      <h3 className="text-2xl text-center mb-6">
        Today's Astronomy Picture of the Day: {title}
      </h3>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="lg:w-2/3 w-full">
          <img
            src={hdurl}
            alt={title}
            className="w-full h-full object-cover rounded-lg shadow-md max-h-[500px]"
          />
        </div>
        <div className="md:w-1/3 w-full flex flex-col justify-between">
          <div
            className="text-gray-200 text-base leading-relaxed text-justify [&_a]:text-blue-400 [&_a]:underline"
            style={{ lineHeight: "1.5rem" }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(explanation),
            }}
          />

          {copyright && (
            <p className="text-sm text-gray-400 italic text-right mt-4">
              📷 Credits: {copyright}
            </p>
          )}

          <p className="mt-6 text-sm text-gray-400 text-right">📅 {date}</p>
        </div>
      </div>

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
