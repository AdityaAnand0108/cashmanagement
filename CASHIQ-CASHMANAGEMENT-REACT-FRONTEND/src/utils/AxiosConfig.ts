import axios from 'axios';

/**
 * Shared Axios instance used across all services.
 * - baseURL is read from the VITE_API_BASE_URL environment variable so the
 *   backend URL never needs to be hardcoded in individual service files.
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

/**
 * Request interceptor — attaches the JWT token stored in localStorage to every
 * outgoing request as a Bearer Authorization header.
 */
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

/**
 * Response interceptor — handles token expiry globally.
 * On a 401 Unauthorized response the token and userId are cleared from
 * localStorage and the user is redirected to the login page automatically,
 * so individual service files don't need to handle this case themselves.
 */
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
