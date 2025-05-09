// Common error messages
const ERROR_MESSAGES = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
};

// Handle API errors
export const handleApiError = (error) => {
    const status = error.status || 500;
    const message = error.data?.message || ERROR_MESSAGES[status] || 'An error occurred';
    
    // Handle specific status codes
    switch (status) {
        case 401:
            // Handle unauthorized error (e.g., redirect to login)
            handleUnauthorized();
            break;
        case 403:
            // Handle forbidden error
            handleForbidden();
            break;
        case 404:
            // Handle not found error
            handleNotFound();
            break;
        case 500:
            // Handle server error
            handleServerError();
            break;
    }
    
    // Return error object
    return {
        success: false,
        status,
        message,
        data: error.data || null,
    };
};

// Handle unauthorized error
const handleUnauthorized = () => {
    // Clear auth data
    localStorage.removeItem('token');
    // Redirect to login page
    window.location.href = '/login';
};

// Handle forbidden error
const handleForbidden = () => {
    // You can implement custom logic here
    console.warn('Access forbidden');
};

// Handle not found error
const handleNotFound = () => {
    // You can implement custom logic here
    console.warn('Resource not found');
};

// Handle server error
const handleServerError = () => {
    // You can implement custom logic here
    console.error('Server error occurred');
}; 