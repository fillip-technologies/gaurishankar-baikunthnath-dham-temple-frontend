import axios from "axios";

// Single source of truth for Base URL across the entire application
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

export default api;
