import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const cardData = [
  {
    id: 1,
    title: "Astronomy Picture of the Day",
    image: "/images/apod.jpg",
    redirect: "#apod",
    description:
      "Today’s featured cosmic wonder. Developed by NASA, APOD features the largest online collection of annotated astronomical images.",
  },
  {
    id: 2,
    title: "Interplanetary Shocks",
    image: "/images/aurora.jpg",
    redirect: "#IPS",
    description:
      "Shockwaves triggered by powerful bursts of solar energy that shake up solar wind, rattle Earth’s magnetic field, and can even lead to auroras.",
  },
  {
    id: 3,
    title: "Solar Energetic Particle Events",
    image: "/images/SEP.jpg",
    redirect: "#SEP",
    description:
      "They travel at nearly the speed of light, reaching Earth in minutes! While invisible to us, they can disrupt satellites, GPS, and airline communications.",
  },
  {
    id: 4,
    title: "Asteroids Near Earth",
    image: "images/asteroid.jpg",
    redirect: "#asteroids",
    description:
      "These small, rocky, airless remnants can approach close and cause potential hazards. Check out the asteroid encounters with Earth.",
  },
];

const variants = {
  left: { x: -150, scale: 0.8, opacity: 0.7, zIndex: 1 },
  center: { x: 0, scale: 1, opacity: 1, zIndex: 2 },
  right: { x: 150, scale: 0.8, opacity: 0.7, zIndex: 1 },
  hidden: { opacity: 0, x: 0, scale: 0.7, zIndex: 0 },
};

export default function AutoAnimateCards() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cardData.length);
    }, 3000); // change card every 3 sec

    return () => clearInterval(interval);
  }, []);

  // Helper to get card position variant
  function getPosition(index: number) {
    if (index === activeIndex) return "center";

    // left card — circular prev
    if (index === (activeIndex - 1 + cardData.length) % cardData.length)
      return "left";

    // right card — circular next
    if (index === (activeIndex + 1) % cardData.length) return "right";

    return "hidden"; // hide all others
  }

  return (
    <div
      style={{
        position: "relative",
        margin: 0,
        overflow: "hidden",
        height: "100%",
      }}
    >
      {cardData.map((card, i) => (
        <motion.div
          key={card.id}
          variants={variants}
          initial={false}
          animate={getPosition(i)}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{
            position: "absolute",
            top: 0,
            left: "20%",
            width: "60%",
            borderRadius: 15,
            backgroundColor: "#fff",
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#333",
            fontSize: 24,
            userSelect: "none",
            pointerEvents: getPosition(i) === "hidden" ? "none" : "auto",
          }}
        >
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-36 sm:h-44 md:h-52 object-cover rounded-xl mb-4"
          />
          <div className="p-3 sm:p-4 text-center">
            <h2 className="text-base sm:text-lg md:text-xl mb-2">
              {card.title}
            </h2>
            <p className="text-sm sm:text-base text-gray-700">
              {card.description}
            </p>
            <a
              href={card.redirect}
              style={{
                display: "inline-block",
                marginTop: "0.75rem",
                fontSize: "0.95rem",
                color: "#0066cc",
                fontStyle: "italic",
                textDecoration: "none",
                fontWeight: 500,
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#004999")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#0066cc")}
            >
              → Learn more
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
