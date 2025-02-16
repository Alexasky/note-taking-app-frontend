import axios from 'axios';

export const API_URL_BASE = import.meta.env.API_URL_BASE || 'http://localhost:5000/api'; 

const API = axios.create({
  baseURL: API_URL_BASE,
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("Access token expired, attempting to refresh...");

      try {
        const { data } = await axios.post(`${API_URL_BASE}/auth/refresh`, {}, { withCredentials: true });
        localStorage.setItem("accessToken", data.accessToken);
        error.config.headers.Authorization = `Bearer ${data.accessToken}`;
        return API.request(error.config);
      } catch (refreshError) {
        console.error("Refresh token expired or invalid. Redirecting to login.");
        localStorage.removeItem("accessToken");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default API;