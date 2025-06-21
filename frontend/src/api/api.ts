import axios from "axios";
import { ApodData } from "./interfaces";

const API_BASE = "http://localhost:5000/api";

export const fetchApod = () => axios.get<ApodData>(`${API_BASE}/apod`);
