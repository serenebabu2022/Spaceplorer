import axios from "axios";
import {
  ApodData,
  AsteroidData,
  AsteroidListResponse,
  SEPData,
} from "../types/interfaces";
import { IPSData } from "../types/interfaces";

const API_BASE =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

export const fetchApod = () => axios.get<ApodData>(`${API_BASE}/apod`);

export const fetchApodRange = (start: string, end: string) =>
  axios.get<ApodData[]>(`${API_BASE}/apod/range`, {
    params: { start, end },
  });

export const fetchIPSEvents = (startDate: string, endDate: string) => {
  return axios.get<IPSData[]>(`${API_BASE}/DONKI/IPS`, {
    params: { startDate, endDate },
  });
};

export const fetchSEPEvents = (startDate: string, endDate: string) => {
  return axios.get<SEPData[]>(`${API_BASE}/DONKI/SEP`, {
    params: { startDate, endDate },
  });
};

export const fetchAsteroidList = (start_date?: string, end_date?: string) => {
  return axios.get<AsteroidListResponse>(`${API_BASE}/asteroidList`, {
    params: { start_date, end_date },
  });
};

export const searchAsteroid = (asteroidID: string) => {
  return axios.get<AsteroidData>(`${API_BASE}/asteroid:${asteroidID}`);
};
