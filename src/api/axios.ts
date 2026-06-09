// lib/axios.ts
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export const api = axios.create({
  baseURL,
  withCredentials: true, // this makes the browser seand the httpOnly cookie
});

export const setupInterceptors = (
  updateToken: (t: string) => void,
  logOut: () => void,
) => {
  // Attach access token to every request
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Handle 401s
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // No body needed — browser sends the httpOnly cookie automatically
          const { data } = await axios.post(
            `${baseURL}/auth/refresh`,
            {},
            { withCredentials: true },
          );

          const newToken = data.data.data;
          updateToken(newToken);

          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } catch {
          logOut();
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    },
  );
};
