import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001",
});

// Attach JWT token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("tripToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProxyImageUrl = (url) => {
  if (!url) return "";
  return `http://localhost:5001/api/proxy-image?url=${encodeURIComponent(url)}`;
};

export default API;
