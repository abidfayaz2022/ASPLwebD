import { logRequest, logResponse, logError } from '../utils/logger';
import { handleApiError } from '../utils/exceptions';
import axiosInstance from './axiosInstance'; // required for retrying original request
import { safeRedirectToLogin } from '../utils/redirect';

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

// ✅ Updated Error Interceptor with login route-safe fallback
export const handleError = async (error) => {
  logError(error);
  const originalRequest = error.config;

  const isLoginOrRefresh = originalRequest?.url?.includes('/auth/login') ||
                           originalRequest?.url?.includes('/auth/refresh-token');

  // 🔁 Try token refresh for 401s except login/refresh
  if (
    error.response?.status === 401 &&
    !originalRequest._retry &&
    !isLoginOrRefresh
  ) {
    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((newToken) => {
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      }).catch((err) => Promise.reject(err));
    }

    isRefreshing = true;

    try {
      const response = await axiosInstance.post('/api/auth/refresh-token', null, {
        withCredentials: true,
      });

      const newToken = response.data.token;
      localStorage.setItem('token', newToken);

      axiosInstance.defaults.headers['Authorization'] = `Bearer ${newToken}`;
      processQueue(null, newToken);

      originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
      return axiosInstance(originalRequest);

    } catch (refreshError) {
      processQueue(refreshError, null);
      localStorage.removeItem('token');
      safeRedirectToLogin();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }

  // ✅ For login or refresh routes, return raw error so frontend can show proper message
  if (error.response && isLoginOrRefresh) {
    return Promise.reject({
      success: false,
      status: error.response.status,
      message: error.response.data?.message || 'Authentication failed',
      data: error.response.data || null,
    });
  }

  // ✅ General API error transformation
  if (error.response) {
    return Promise.reject(handleApiError(error.response));
  } else if (error.request) {
    return Promise.reject({
      success: false,
      status: 0,
      message: 'No response from server',
      data: null,
    });
  } else {
    return Promise.reject({
      success: false,
      status: 0,
      message: error.message || 'Request setup failed',
      data: null,
    });
  }
};