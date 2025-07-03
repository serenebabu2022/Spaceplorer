import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const cardData = [
  {
    id: 1,
    title: "Astronomy Picture of the Day",
    image: "/images/apod.jpg",
    redirect: "#apod",
    redirectContent: "Explore today's breathtaking view of the cosmos",
    description:
      "See today’s featured cosmic wonder. Developed by NASA astronomers, the Astronomy Picture of the Day (APOD) features the largest online collection of annotated astronomical images.",
  },
  {
    id: 2,
    title: "Interplanetary Shocks can cause aurora",
    image: "/images/aurora.jpg",
    redirect: "#IPS",
    redirectContent: "Look at the IPS data over this year",
    description:
      "Shockwaves triggered by powerful bursts of solar energy that can shake up the solar wind, rattle Earth’s magnetic field, and sometimes lead to dazzling auroras.",
  },
  {
    id: 3,
    title: "Solar Energetic Particle Events",
    image: "/images/SEP.jpg",
    redirect: "#SEP",
    redirectContent: "Look at the SEP Events data over this year",
    description:
      "These particles travel at nearly the speed of light, reaching Earth in minutes! While invisible to our eyes, they can disrupt satellites, GPS, and even airline communications.",
  },
  {
    id: 4,
    title: "Asteroids Near Earth",
    image: "images/asteroid.jpg",
    redirect: "#asteroids",
    redirectContent:
      "Learn about the asteroids that are approaching Earth over this week",
    description:
      "Explore close approaches and track potential hazards. Learn about past and future asteroid encounters with Earth.",
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
        overflow: "visible",
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
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: "12px",
              marginBottom: "1rem",
            }}
          />
          <div className="p-4" style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
              {card.title}
            </h2>
            <p style={{ fontSize: "0.95rem", color: "#333" }}>
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
              → {card.redirectContent}
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
