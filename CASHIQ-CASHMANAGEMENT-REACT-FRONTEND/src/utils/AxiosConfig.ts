import axios from 'axios';

/**
 * Axios instance with default configuration and interceptors.
 * Automatically adds the JWT token from localStorage to the Authorization header.
 */
const api = axios.create();

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
