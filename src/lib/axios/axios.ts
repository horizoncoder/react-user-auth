import axios from "axios";
import {getCookie} from "../../utils/cookies.util";

const API_BASE_URL: string | undefined = process.env.REACT_APP_BASE_URL;

const api = axios.create({
    withCredentials: true,
    baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getCookie('accessToken')}`;
    return config;
});

let isRefreshing = false;

const REFRESH_ENDPOINT = '/auth/refresh-tokens';

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && originalRequest && !isRefreshing) {
            isRefreshing = true;
            try {
                await refreshToken();
                originalRequest.headers.Authorization = `Bearer ${getCookie('accessToken')}`;
                return api.request(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        // If it's not a 401 error or refresh fails, throw the original error
        throw error;
    }
);

async function refreshToken() {
    try {
        await api.post(REFRESH_ENDPOINT);
    } catch (error) {
        console.error('Refresh token request failed:', error);
        throw error;
    }
}


export default api;
