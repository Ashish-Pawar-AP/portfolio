import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VERCEL_API_URL || import.meta.env.VITE_API_URL,
  withCredentials: true, // IMPORTANT: sends cookies automatically
});

/**
 * RESPONSE INTERCEPTOR
 * Handles global API errors
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";

    console.error("API Error:", message);

    return Promise.reject({
      status: error.response?.status,
      message,
    });
  },
);

export default api;
