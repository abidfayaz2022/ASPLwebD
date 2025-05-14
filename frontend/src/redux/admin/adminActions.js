// src/redux/admin/adminActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import callApi from '../../network/core/apiCaller';
import adminApi from './adminApi';

// Fetch all users
export const fetchAllUsers = createAsyncThunk(
  'admin/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await callApi(adminApi.fetchUsers);
      return res.users || [];
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to load users');
    }
  }
);

// Create a new user
export const createNewUser = createAsyncThunk(
  'admin/createNewUser',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await callApi(adminApi.createUser, userData);
      return res.data || {};
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'User creation failed');
    }
  }
);


