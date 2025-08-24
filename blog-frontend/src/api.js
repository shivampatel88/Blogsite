import axios from "axios";

const baseURL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"; // fallback for local dev

const API_URL = axios.create({baseURL});

API_URL.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API_URL;
