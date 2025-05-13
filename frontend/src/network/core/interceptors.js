import { logRequest, logResponse, logError } from '../utils/logger';
import { handleApiError } from '../utils/exceptions';
import axiosInstance from './axiosInstance'; // required for retrying original request

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// Request interceptor
export const handleRequest = (config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Cache-Control'] = 'no-cache';
    config.headers['Pragma'] = 'no-cache';
    logRequest(config);
    return config;
};

// Response interceptor
export const handleResponse = (response) => {
    logResponse(response);

    if (response.data) {
        if (response.data.success !== undefined) {
            return response.data;
        }
        return {
            success: true,
            data: response.data,
            status: response.status
        };
    }

    return response;
};

// Error interceptor with refresh logic
export const handleError = async (error) => {
    logError(error);
    const originalRequest = error.config;

    // If unauthorized & request not retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            }).then((newToken) => {
                originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
                return axiosInstance(originalRequest);
            }).catch((err) => Promise.reject(err));
        }

        isRefreshing = true;

        try {
            const response = await axiosInstance.post('/api/auth/refresh-token', null, {
                withCredentials: true // ⬅️ sends the cookie
            });

            const newToken = response.data.token;
            localStorage.setItem('token', newToken);

            axiosInstance.defaults.headers['Authorization'] = `Bearer ${newToken}`;
            processQueue(null, newToken);

            originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
            return axiosInstance(originalRequest);

        } catch (refreshError) {
            processQueue(refreshError, null);
            localStorage.removeItem('token');
            window.location.href = '/login';
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }

    if (error.response) {
        return Promise.reject(handleApiError(error.response));
    } else if (error.request) {
        return Promise.reject({
            success: false,
            status: 0,
            message: 'No response from server',
            data: null
        });
    } else {
        return Promise.reject({
            success: false,
            status: 0,
            message: error.message || 'Request setup failed',
            data: null
        });
    }
};
