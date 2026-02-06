import axios from "axios";
import { jwtDecode } from "jwt-decode";


const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Check if JWT is expired
 */
const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // seconds
    return decoded.exp < currentTime;
  } catch (error) {
    return true; // invalid token
  }
};

/**
 * REQUEST INTERCEPTOR (runs BEFORE API call)
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return config;
    }

    if (isTokenExpired(token)) {
      console.warn("JWT expired BEFORE request");

      localStorage.removeItem("token");

      // Optional: clear user state / redux / context
      window.location.href = "/login";

      // Cancel request
      return Promise.reject(new axios.Cancel("Token expired"));
    }

   // config.headers["x-access-token"] = `Bearer ${token}`;
    config.headers["x-access-token"] = `${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);


export default apiClient;
