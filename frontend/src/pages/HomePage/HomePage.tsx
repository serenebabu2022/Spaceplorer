import React, { useEffect, useState } from "react";
import { ApodData } from "../../types/interfaces";
import { fetchApod } from "../../api/api";
import ApodCard from "../../components/Apod/ApodCard";
import IPSBarGraph from "../../components/IPSBarGraph/IPSBarGraph";
import SEPLineChart from "../../components/SEPLineChart/SEPLineChart";
import AsteroidsData from "../../components/AsteroidData/AsteroidData";

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
    <main className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 mt-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          🌌 Welcome to Your Space Exploration Hub!
        </h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Discover daily NASA images, monitor solar activity, and explore
          asteroids approaching us. All in one fun, educational dashboard!
        </p>
      </div>
      {loading && <p className="text-center text-white">Loading...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}
      <div className="flex flex-col lg:flex-row gap-10 mb-12 items-start">
        <div className="lg:w-1/2 w-full text-white">
          <h2 className="text-4xl font-semibold mb-4">What's Inside?</h2>
          <ul
            className="list-disc list-inside space-y-2 text-gray-200 text-base"
            style={{ lineHeight: "1.5rem" }}
          >
            <li>
              <strong>Astronomy Picture of the Day:</strong> See today’s
              featured cosmic wonder. Developed by NASA astronomers, the
              Astronomy Picture of the Day (APOD) features the largest online
              collection of annotated astronomical images. Since 1995, APOD has
              shared a new image each day, often visually striking.
            </li>
            <li>
              <strong>Interplanetary Shocks:</strong> Imagine a massive ripple
              blasting through the solar system. That's what an Interplanetary
              Shock (IPS) is. These shockwaves are triggered by powerful bursts
              of solar energy, like solar flares or coronal mass ejections
              (CMEs), erupting from the Sun. As they barrel through space, they
              can shake up the solar wind, rattle Earth’s magnetic field, and
              sometimes lead to dazzling auroras
            </li>
            <li>
              <strong>Solar Energetic Particle Events:</strong> Sometimes, the
              Sun throws tantrums — and when it does, it hurls out bursts of
              super-fast particles called Solar Energetic Particles (SEPs).
              These particles travel at nearly the speed of light and can zip
              through space, reaching Earth in minutes! While invisible to our
              eyes, they can disrupt satellites, GPS, and even airline
              communications. Scientists track these wild solar storms to help
              protect our tech and astronauts in space!
            </li>
            <li>
              <strong>Asteroids Near Earth:</strong> Explore close approaches
              and track potential hazards. Learn about past and future asteroid
              encounters with Earth.
            </li>
          </ul>
          <p className="mt-6 text-blue-300 italic">
            All data is powered by NASA’s open APIs
          </p>
        </div>

        <div className="lg:w-1/2 w-full">
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
      <section id="about" className="my-16 text-white text-center px-4">
        <h2 className="text-3xl font-bold mb-4">About Spaceplorer</h2>
        <p className="max-w-3xl mx-auto text-gray-300 text-lg">
          Spaceplorer is your fun, educational gateway to space data. We
          simplify complex NASA APIs into beautiful, interactive visuals, from
          stunning astronomy images to real-time asteroid tracking.
        </p>
      </section>
      <section id="features" className="my-16 px-4 text-white">
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
                Track nearby asteroids, potential hazards, and close approaches.
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
      <section id="contact" className="my-16 px-4 text-white text-center">
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
  );
};

export default Home;
