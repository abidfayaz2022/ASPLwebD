import axios from 'axios';
import config from '../config/config';
import { handleRequest, handleResponse, handleError } from './interceptors';

// Create axios instance with default config
const axiosInstance = axios.create({
    baseURL: config.API_BASE_URL,
    timeout: config.API_TIMEOUT,
    headers: config.DEFAULT_HEADERS,
});

// Add request interceptor
axiosInstance.interceptors.request.use(
    handleRequest,
    (error) => Promise.reject(error)
);

// Add response interceptor
axiosInstance.interceptors.response.use(
    handleResponse,
    handleError
);

export default axiosInstance; 