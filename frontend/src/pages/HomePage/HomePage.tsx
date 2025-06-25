import React, { useEffect, useState } from "react";
import { ApodData } from "../../types/interfaces";
import { fetchApod } from "../../api/api";
import ApodCard from "../../components/Apod/ApodCard";

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
    <main className="min-h-screen">
      {loading && <p className="text-center text-white">Loading...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}
      {data && <ApodCard {...data} />}
    </main>
  );
};

export default Home;
