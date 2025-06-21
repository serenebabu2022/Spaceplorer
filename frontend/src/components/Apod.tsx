// src/components/ApodCard.tsx
import React from "react";
import { ApodData } from "../types/interfaces";

interface ApodProps extends ApodData {}
const ApodCard: React.FC<ApodProps> = ({ title, url, explanation }) => {
  return (
    <div className="text-white max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-4 text-center">{title}</h1>
      <img src={url} alt={title} className="rounded-lg w-full mb-4" />
      <p className="text-gray-300">{explanation}</p>
    </div>
  );
};

export default ApodCard;
