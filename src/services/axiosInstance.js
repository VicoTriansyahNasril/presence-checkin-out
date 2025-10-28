// src/services/axiosInstance.js
import axios from "axios";
import { authConstants } from "../constants/authConstants"; // Import authConstants
import { handleUnauthorizedLogout } from "../context/AuthContext"; // Import AuthContext

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Set default Content-Type jika tidak ada
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    // Ambil token dari localStorage
    const token = localStorage.getItem(authConstants.TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response, // Jika respon berhasil, lanjutkan
  (error) => {
    // Jika mendapatkan status 401 Unauthorized
    if (error.response?.status === 401) {
      handleUnauthorizedLogout(); // Panggil fungsi handleUnauthorizedLogout
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
