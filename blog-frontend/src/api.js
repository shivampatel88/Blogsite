import axios from "axios";

const API_URL = axios.create({
  baseURL: "http://localhost:5000/api",
});

// attach token if available
API_URL.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API_URL;
