import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import adminReducer from './admin/adminSlice';
import blogReducer from './blog/blogSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
     blog: blogReducer,
  },
});

export default store;
