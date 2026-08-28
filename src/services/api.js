import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});


// =========================================
// Add access token to every request
// =========================================

api.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem("access_token");

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;

        }

        return config;

    },

    (error) => Promise.reject(error)

);


// =========================================
// Handle expired access token
// =========================================

api.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest = error.config;


        // =========================================
        // Do NOT handle login 401 here
        // Let Login.jsx handle it
        // =========================================

        if (
            originalRequest?.url?.includes("accounts/login/")
        ) {

            return Promise.reject(error);

        }


        // =========================================
        // Handle expired access token
        // =========================================

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true;


            const refreshToken =
                localStorage.getItem("refresh_token");


            // No refresh token
            if (!refreshToken) {

                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("role");

                window.location.href = "/";

                return Promise.reject(error);

            }


            try {

                const response = await axios.post(

                    `${API_URL}accounts/refresh/`,

                    {
                        refresh: refreshToken,
                    }

                );


                const newAccessToken =
                    response.data.access;


                localStorage.setItem(
                    "access_token",
                    newAccessToken
                );


                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;


                return api(originalRequest);

            }


            catch (refreshError) {

                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("role");

                window.location.href = "/";

                return Promise.reject(refreshError);

            }

        }


        return Promise.reject(error);

    }

);


export default api;