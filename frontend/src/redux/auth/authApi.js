const authApi = {
        login: {
            url: '/api/auth/login',
            method: 'POST'
        },
        profile: {
            url: '/api/auth/profile',
            method: 'GET'
        },
        requestReset: {
            url: '/api/auth/request-reset',
            method: 'POST'
        },
        resetPassword: {
            url: '/api/auth/reset-password',
            method: 'POST'
        },
        sendOtp: {
            url: '/api/auth/send-otp',
            method: 'POST'
        },
        verifyOtp: {
            url: '/api/auth/verify-otp',
            method: 'POST'
        },
        logout: {
            url: '/api/auth/logout',
            method: 'POST'
        },
        refreshToken: {
            url: '/api/auth/refresh-token',
            method: 'POST'
        }
};

export default authApi;
