// Log levels
const LOG_LEVELS = {
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
    DEBUG: 'DEBUG'
};

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

// Format the log message
const formatLogMessage = (level, message, data) => ({
    timestamp: new Date().toISOString(),
    level,
    message,
    data,
    environment: process.env.NODE_ENV
});

// Log request details
export const logRequest = (config) => {
    if (!isDevelopment) return;
    
    const logData = {
        url: config.url,
        method: config.method,
        headers: {
            ...config.headers,
            // Don't log sensitive headers
            Authorization: config.headers.Authorization ? '[REDACTED]' : undefined
        },
        data: config.data,
        params: config.params
    };
    
    console.log(formatLogMessage(LOG_LEVELS.INFO, 'API Request', logData));
};

// Log response details
export const logResponse = (response) => {
    if (!isDevelopment) return;
    
    const logData = {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data,
        config: {
            url: response.config.url,
            method: response.config.method
        }
    };
    
    console.log(formatLogMessage(LOG_LEVELS.INFO, 'API Response', logData));
};

// Log error details
export const logError = (error) => {
    if (!isDevelopment) return;
    
    const logData = {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config ? {
            url: error.config.url,
            method: error.config.method,
            headers: {
                ...error.config.headers,
                Authorization: error.config.headers.Authorization ? '[REDACTED]' : undefined
            }
        } : undefined
    };
    
    console.error(formatLogMessage(LOG_LEVELS.ERROR, 'API Error', logData));
}; 