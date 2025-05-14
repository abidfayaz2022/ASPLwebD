import { createSlice } from '@reduxjs/toolkit';
import {
    loginUser,
    fetchProfile,
    logoutUser,
    sendOtp,
    verifyOtp,
    requestPasswordReset,
    resetPassword,
    refreshToken,
} from './authActions';

const initialState = {
    user: null,
    loading: false,
    error: null,
    successMessage: null,
    isAuthenticated: false,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSuccessMessage: (state) => {
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // LOGIN
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            })


            // FETCH PROFILE
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.error = action.payload; // only set error if not null
                }
            })

            // LOGOUT
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.token = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.payload;
            })

            // SEND OTP
            .addCase(sendOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(sendOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload;
            })
            .addCase(sendOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // VERIFY OTP
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // REQUEST RESET
            .addCase(requestPasswordReset.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(requestPasswordReset.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload;
            })
            .addCase(requestPasswordReset.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // RESET PASSWORD
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // REFRESH TOKEN
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.token = action.payload;
                state.error = null;
            })
            .addCase(refreshToken.rejected, (state, action) => {
                state.token = null;
                state.error = action.payload;
            });

    },
});

export const { clearError, clearSuccessMessage } = authSlice.actions;
export default authSlice.reducer;
