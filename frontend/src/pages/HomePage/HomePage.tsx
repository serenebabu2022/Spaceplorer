import React, { useEffect, useState } from "react";
import { ApodData } from "../../types/interfaces";
import { fetchApod } from "../../api/api";
import ApodCard from "../../components/Apod/ApodCard";
import Chart from "../../components/Chart/Chart";

const Home = () => {
  const [data, setData] = useState<ApodData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApod()
      .then((res) => {
        if (!res || !res.data) {
          setError("No data available.");
        } else {
          setData(res.data);
        }
      })
      .catch(() => setError("Error fetching data"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
      {loading && <p className="text-center text-white">Loading...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}
      {data && <ApodCard {...data} />}
      {!loading && !error && !data && (
        <p className="text-center text-white">No data available.</p>
      )}
      <div className="flex justify-center mt-8">
        <Chart />
      </div>
    </main>
  );
};

export default Home;
