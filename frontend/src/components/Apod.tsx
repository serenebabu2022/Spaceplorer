import React, { useEffect, useState } from "react";
import { fetchApod } from "../api/api";
import { ApodData } from "../api/interfaces";

function Apod() {
  const [data, setData] = useState<ApodData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApod()
      .then((res) => setData(res.data))
      .catch(() => setError("Failed to load APOD"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return null;

  return (
    <div>
      <h1>{data.title}</h1>
      <img src={data.url} alt={data.title} style={{ maxWidth: "100%" }} />
      <p>{data.explanation}</p>
    </div>
  );
}

export default Apod;
