require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

const NASA_API_KEY = process.env.NASA_API_KEY;

app.get("/api/apod", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch APOD data" });
  }
});

app.get("/api/apod/range", async (req, res) => {
  const { start, end } = req.query;

  if (!start || !end) {
    return res.status(400).json({ error: "Start and end dates are required" });
  }

  try {
    const response = await axios.get(`https://api.nasa.gov/planetary/apod`, {
      params: {
        api_key: NASA_API_KEY,
        start_date: start,
        end_date: end,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching APOD range:", error.message);
    res.status(500).json({ error: "Failed to fetch APOD range" });
  }
});
app.get("/api/DONKI/IPS", async (req, res) => {
  const { startDate, endDate } = req.query;
  if (!startDate || !endDate) {
    return res.status(400).json({ error: "Start and end dates are required" });
  }

  try {
    const response = await axios.get(`https://api.nasa.gov/DONKI/IPS?`, {
      params: {
        api_key: NASA_API_KEY,
        startDate: startDate,
        endDate: endDate,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching IPS Data:", error.message);
    res.status(500).json({ error: "Failed to fetch IPS Data" });
  }
});

app.get("/api/DONKI/SEP", async (req, res) => {
  const { startDate, endDate } = req.query;
  if (!startDate || !endDate) {
    return res.status(400).json({ error: "Start and end dates are required" });
  }

  try {
    const response = await axios.get(`https://api.nasa.gov/DONKI/SEP?`, {
      params: {
        api_key: NASA_API_KEY,
        startDate: startDate,
        endDate: endDate,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching SEP Data:", error.message);
    res.status(500).json({ error: "Failed to fetch SEP Data" });
  }
});
app.get("/api/asteroidList", async (req, res) => {
  const { start_date, end_date } = req.query;
  try {
    const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/feed?`, {
      params: {
        api_key: NASA_API_KEY,
        start_date: start_date,
        end_date: end_date,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Asteroid Data:", error.message);
    res.status(500).json({ error: "Failed to fetch Asteroid Data" });
  }
});

app.get("/api/asteroid:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Asteroid ID is required" });
  }
  try {
    const response = await axios.get(
      `https://api.nasa.gov/neo/rest/v1/neo/${id}`,
      {
        params: {
          api_key: NASA_API_KEY,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ error: "Asteroid not found." });
    }
    res.status(500).json({ error: "Failed to fetch asteroid data." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
