import axios from "axios";
import { ApodData } from "../types/interfaces";

const API_BASE = "http://localhost:5000/api";

export const fetchApod = () => axios.get<ApodData>(`${API_BASE}/apod`);

export const fetchApodRange = (start: string, end: string) =>
  axios.get<ApodData[]>(`${API_BASE}/apod/range`, {
    params: { start, end },
  });
