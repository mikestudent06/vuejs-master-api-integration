import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.freeapi.app/api/v1"
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(
      localStorage.getItem("currentUserCredentials") || "{}"
    );

    if (token) {
      config.headers = config.headers || {};
      const unprotectedUrls = ["users/login", "users/register"];
      if (config.url && !unprotectedUrls.includes(config.url)) {
        config.headers.Authorization = token
          ? `Bearer ${token.accessToken}`
          : "";
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
