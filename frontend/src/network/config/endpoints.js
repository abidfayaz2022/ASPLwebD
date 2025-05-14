const endpoints = {
    // Auth endpoints
    auth: {
        register: {
            url: '/api/auth/register',
            method: 'POST'
        },
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
    },
    

    // Incorporation endpoints
    incorporation: {
        checkName: {
            url: '/api/incorporation/check-name',
            method: 'POST'
        },
        start: {
            url: '/api/incorporation/start',
            method: 'POST'
        },
        update: (sessionId) => ({
            url: `/api/incorporation/update/${sessionId}`,
            method: 'PUT'
        }),
        resume: (sessionId) => ({
            url: `/api/incorporation/resume/${sessionId}`,
            method: 'GET'
        }),
        sendOtp: (sessionId) => ({
            url: `/api/incorporation/send-otp/${sessionId}`,
            method: 'POST'
        }),
        verifyOtp: (sessionId) => ({
            url: `/api/incorporation/verify-otp/${sessionId}`,
            method: 'POST'
        }),
        complete: {
            url: '/api/incorporation/complete',
            method: 'POST'
        },
        delete: (sessionId) => ({
            url: `/api/incorporation/delete/${sessionId}`,
            method: 'DELETE'
        }),
        // Admin endpoints
        admin: {
            getStaging: {
                url: '/api/incorporation/admin/staging',
                method: 'GET'
            },
            getStagingById: (sessionId) => ({
                url: `/api/incorporation/admin/staging/${sessionId}`,
                method: 'GET'
            }),
            updateStaging: (sessionId) => ({
                url: `/api/incorporation/admin/staging/${sessionId}`,
                method: 'PUT'
            })
        }
    },

    // Payment endpoints
    payment: {
        createOrder: {
            url: '/api/payment/create-order',
            method: 'POST'
        },
        verifyWebhook: {
            url: '/api/payment/verify-webhook',
            method: 'POST'
        },
        // Admin endpoints
        admin: {
            getAllPayments: {
                url: '/api/payment/admin/payments',
                method: 'GET'
            },
            getPaymentById: (paymentId) => ({
                url: `/api/payment/admin/payment/${paymentId}`,
                method: 'GET'
            }),
            getSessionPayments: (sessionId) => ({
                url: `/api/payment/admin/session/${sessionId}/payments`,
                method: 'GET'
            }),
            refundPayment: (paymentId) => ({
                url: `/api/payment/admin/payment/${paymentId}/refund`,
                method: 'POST'
            })
        }
    },

    // User endpoints
    user: {
        getProfile: {
            url: '/api/user/profile',
            method: 'GET'
        },
        updateProfile: {
            url: '/api/user/profile',
            method: 'PUT'
        },
        deactivateAccount: {
            url: '/api/user/profile',
            method: 'DELETE'
        }
    }
};

export default endpoints; 