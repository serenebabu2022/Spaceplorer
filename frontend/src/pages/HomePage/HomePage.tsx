import React, { useEffect, useState } from "react";
import { ApodData } from "../../types/interfaces";
import { fetchApod } from "../../api/api";
import ApodCard from "../../components/Apod/ApodCard";
import IPSBarGraph from "../../components/IPSBarGraph/IPSBarGraph";
import SEPLineChart from "../../components/SEPLineChart/SEPLineChart";
import AsteroidsData from "../../components/AsteroidData/AsteroidData";
import AutoAnimateCards from "../../components/AnimateCards/AnimateCards";

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
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[400px] sm:h-[800px] pt-[96px] overflow-hidden z-0">
        <img
          src="/images/hero.jpg"
          alt="Space hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black flex flex-col justify-center items-center text-center px-6">
          <h1
            className="text-4xl font-bold text-white mb-4 drop-shadow-lg"
            style={{ textShadow: "2px 2px 7px rgba(0, 0, 0, 0.8)" }}
          >
            Welcome to Your Space Exploration Hub!
          </h1>
          <p
            className="text-gray-300 text-lg max-w-3xl mx-auto"
            style={{ textShadow: "2px 2px 7px rgba(0, 0, 0, 0.8)" }}
          >
            Discover daily NASA images, monitor solar activity, and explore
            asteroids approaching us. All in one fun, educational dashboard!
          </p>
        </div>
      </section>
      <main className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 mt-16 justify-center">
        <div className="flex flex-col lg:flex-row gap-10 mb-4 items-start sm:mb-12">
          <div className="lg:max-w-[25vw] w-full text-white flex flex-col justify-between mt-4 bg-black shadow-lg rounded-lg p-4">
            <h2 className="text-4xl font-semibold mb-4">
              Explore the Cosmos With Us
            </h2>
            <p className="text-gray-300 mb-6">
              Watch out for the next asteroid or unexpected burst of solar
              energy! Space weather is always changing.
            </p>
            <p className="text-blue-300 italic">
              All data is powered by NASA’s open APIs
            </p>
          </div>
          <div className="px-4 w-full h-[420px] sm:h-[480px] md:h-[500px] lg:h-[520px] overflow-y-auto">
            <AutoAnimateCards />
          </div>
        </div>
        <div className="w-full">
          {loading && <p className="text-center text-white">Loading...</p>}
          {error && <p className="text-center text-red-400">{error}</p>}
          <section id="apod">
            {data ? (
              <ApodCard {...data} />
            ) : (
              <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-2">
                  Astronomy Picture of the Day
                </h2>
                <p className="text-gray-300">
                  Could not load today's image from NASA. Please try again
                  later.
                </p>
              </div>
            )}
          </section>
        </div>

        {!loading && !error && !data && (
          <p className="text-center text-white">No data available.</p>
        )}
        <div className="flex flex-col lg:flex-row justify-center items-start gap-8 mt-8">
          <section id="IPS">
            <div className="flex-1 min-w-[350px]">
              <IPSBarGraph />
            </div>
          </section>
          <section id="SEP">
            <div className="flex-1 min-w-[350px]">
              <SEPLineChart />
            </div>
          </section>
        </div>
        <section id="asteroids">
          <AsteroidsData />
        </section>
        <section
          id="about"
          className="my-16 text-white text-center px-4 bg-black shadow-lg rounded-lg p-6"
        >
          <h2 className="text-3xl font-bold mb-4">About Spaceplorer</h2>
          <p className="max-w-3xl mx-auto text-gray-300 text-lg">
            Spaceplorer is your fun, educational gateway to space data. We
            simplify complex NASA APIs into beautiful, interactive visuals, from
            stunning astronomy images to real-time asteroid tracking.
          </p>
        </section>
        <section
          id="features"
          className="my-16 px-4 text-white bg-black shadow-lg rounded-lg p-6"
        >
          <h2 className="text-3xl font-bold text-center mb-6">Features</h2>
          <div className="max-w-4xl mx-auto grid gap-6 sm:grid-cols-2">
            <div className="bg-gray-800 p-6 rounded-lg shadow">
              <a
                href="#apod"
                className="bg-gray-800 p-6 rounded-lg shadow hover:bg-gray-700 transition cursor-pointer block"
              >
                <h3 className="text-xl font-semibold mb-2 text-blue-300">
                  🌌 Astronomy Picture of the Day
                </h3>
                <p className="text-gray-300">
                  See a breathtaking new cosmic image every day, straight from
                  NASA.
                </p>
              </a>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow">
              {" "}
              <a
                href="#asteroids"
                className="bg-gray-800 p-6 rounded-lg shadow hover:bg-gray-700 transition cursor-pointer block"
              >
                <h3 className="text-xl font-semibold mb-2 text-blue-300">
                  ☄️ Asteroids Near Earth
                </h3>
                <p className="text-gray-300">
                  Track nearby asteroids, potential hazards, and close
                  approaches.
                </p>
              </a>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow">
              <a
                href="#SEP"
                className="bg-gray-800 p-6 rounded-lg shadow hover:bg-gray-700 transition cursor-pointer block"
              >
                <h3 className="text-xl font-semibold mb-2 text-blue-300">
                  🌞 Solar Particle Events
                </h3>
                <p className="text-gray-300">
                  Visualize high-energy particles released by solar flares.
                </p>
              </a>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow">
              <a
                href="#IPS"
                className="bg-gray-800 p-6 rounded-lg shadow hover:bg-gray-700 transition cursor-pointer block"
              >
                <h3 className="text-xl font-semibold mb-2 text-blue-300">
                  💥 Interplanetary Shocks
                </h3>
                <p className="text-gray-300">
                  Explore shockwaves through the solar system caused by solar
                  storms.
                </p>
              </a>
            </div>
          </div>
        </section>
        <section
          id="contact"
          className="my-16 px-4 text-white text-center bg-black shadow-lg rounded-lg p-6"
        >
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-300 mb-4">
            Have questions or suggestions? Reach out at{" "}
            <span className="text-blue-400">spaceplorer@universe.com</span>
          </p>
          <p className="text-gray-500 text-sm">
            We’re always happy to hear from fellow space enthusiasts 🚀
          </p>
        </section>
      </main>
    </>
  );
};

export default Home;
