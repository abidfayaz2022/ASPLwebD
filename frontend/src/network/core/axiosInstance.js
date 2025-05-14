import axios from 'axios';
import config from '../config/config';
import { handleRequest, handleResponse, handleError } from './interceptors';
import axiosRetry from 'axios-retry';


const axiosInstance = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: config.API_TIMEOUT,
  headers: config.DEFAULT_HEADERS,
  withCredentials: true 
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

// Enable retry on network error & 5xx server errors
axiosRetry(axiosInstance, {
  retries: config.MAX_RETRIES,            // e.g., 3
  retryDelay: (retryCount) => {
    return retryCount * config.RETRY_DELAY; // exponential backoff: 1s, 2s, 3s
  },
  retryCondition: (error) => {
    // Retry only if network error or 5xx error
    return axiosRetry.isNetworkOrIdempotentRequestError(error);
  }
});

export default axiosInstance; 