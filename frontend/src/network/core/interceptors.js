import { logRequest, logResponse, logError } from '../utils/logger';
import { handleApiError } from '../utils/exceptions';

// Request interceptor
export const handleRequest = (config) => {
    // Get token from localStorage or your auth state management
    const token = localStorage.getItem('token');
    
    // Add token to headers if it exists
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add timestamp to prevent caching
    config.headers['Cache-Control'] = 'no-cache';
    config.headers['Pragma'] = 'no-cache';
    
    // Log the request
    logRequest(config);
    
    return config;
};

// Response interceptor
export const handleResponse = (response) => {
    // Log the response
    logResponse(response);
    
    // Check if response has data property
    if (response.data) {
        // If the response has a success flag, return the data directly
        if (response.data.success !== undefined) {
            return response.data;
        }
        // Otherwise, wrap the data in a success response
        return {
            success: true,
            data: response.data,
            status: response.status
        };
    }
    
    return response;
};

// Error interceptor
export const handleError = async (error) => {
    // Log the error
    logError(error);
    
    // Handle different types of errors
    if (error.response) {
        // Server responded with a status code outside the 2xx range
        const errorResponse = handleApiError(error.response);
        
        // Handle specific error cases
        if (error.response.status === 401) {
            // Clear any stored tokens
            localStorage.removeItem('token');
            // Redirect to login page
            window.location.href = '/login';
        }
        
        return Promise.reject(errorResponse);
    } else if (error.request) {
        // Request was made but no response received
        return Promise.reject({
            success: false,
            status: 0,
            message: 'No response from server',
            data: null
        });
    } else {
        // Something happened in setting up the request
        return Promise.reject({
            success: false,
            status: 0,
            message: error.message || 'Request setup failed',
            data: null
        });
    }
}; 