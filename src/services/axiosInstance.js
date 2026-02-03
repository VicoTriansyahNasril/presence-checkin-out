import axios from "axios";

// Kita kosongkan baseURL agar tidak mengarah ke server mana pun
const axiosInstance = axios.create({
  baseURL: "", // KOSONGKAN INI
});

// Request Interceptor (Hanya log, tidak kirim token asli)
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`[MOCK MODE] Request blocked: ${config.url}`);
    // Kita batalkan request agar tidak pernah keluar dari browser
    const controller = new AbortController();
    config.signal = controller.signal;
    controller.abort();
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn("Axios request was blocked because you are in Mock Mode.");
    return Promise.reject(error);
  }
);

export default axiosInstance;