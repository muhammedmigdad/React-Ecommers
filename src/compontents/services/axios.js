import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/customer/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for auth token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for 401 handling
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      if (!window.location.pathname.includes("login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default instance;