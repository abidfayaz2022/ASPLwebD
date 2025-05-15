import { createAsyncThunk } from '@reduxjs/toolkit';
import callApi from '../../network/core/apiCaller';
import authApi from './authApi';

// Login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await callApi(authApi.login, credentials);
      return res.user; 
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || 'Login failed';
      return rejectWithValue(message);
    }
  }
);


// Fetch Profile
export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const res = await callApi(authApi.profile);
      return res.user;
    } catch (err) {
      if (err?.response?.status === 401) {
        return rejectWithValue(null);
      }
      return rejectWithValue(err?.response?.data?.message || 'Profile fetch failed');
    }
  }
);


// Request Password Reset
export const requestPasswordReset = createAsyncThunk('auth/requestPasswordReset', async (data, { rejectWithValue }) => {
  try {
    const res = await callApi(authApi.requestReset, data);
    return res.data.message;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Reset request failed');
  }
});

// Reset Password
export const resetPassword = createAsyncThunk('auth/resetPassword', async (data, { rejectWithValue }) => {
  try {
    const res = await callApi(authApi.resetPassword, data);
    return res.data.message;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Password reset failed');
  }
});

// Send OTP
export const sendOtp = createAsyncThunk('auth/sendOtp', async (data, { rejectWithValue }) => {
  try {
    const res = await callApi(authApi.sendOtp, data);
    return res.data.message;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Sending OTP failed');
  }
});

// Verify OTP
export const verifyOtp = createAsyncThunk('auth/verifyOtp', async (data, { rejectWithValue }) => {
  try {
    const res = await callApi(authApi.verifyOtp, data);
    return res.data.message;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'OTP verification failed');
  }
});

// Logout
export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
  try {
    const res = await callApi(authApi.logout);
    return res.message;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Logout failed');
  }
});

// Refresh Token
export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, { rejectWithValue }) => {
  try {
    const res = await callApi(authApi.refreshToken);
    return res.data.token;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Token refresh failed');
  }
});
