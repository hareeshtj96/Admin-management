import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Creating axios instance
const API = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor
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

// Response Interceptor
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // get refresh token
                const refreshToken = localStorage.getItem("refreshToken");
                if (!refreshToken) {
                    throw new Error("No refresh token found");
                };

                // call refresh token api
                const response = await axios.post(`${API_URL}/refreshToken`, {
                    refreshToken
                });

                // save new token in localStorage
                localStorage.setItem("accessToken", response.data.accessToken);

                // retry orginal request
                originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
                return API(originalRequest);
            } catch (refreshError) {
                console.error("Refresh token failed:", refreshError);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "/";
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
)

export default API;

