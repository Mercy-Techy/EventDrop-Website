import axios from "axios";
const base_url = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: base_url,
});

// runs before every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
