import axios from "axios";

// const baseURL = "https://ashish-pawar-portfolio.vercel.app/"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
// const api = axios.create({
//   baseURL: `${baseURL}/api`,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

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
