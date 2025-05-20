// src/redux/blog/blogActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import callApi from '../../network/core/apiCaller';
import blogApi from './blogApi';

export const fetchPublishedBlogs = createAsyncThunk('blog/fetchPublished', async (_, { rejectWithValue }) => {
  try {
    const res = await callApi(blogApi.getPublished);
    return res.articles || [];
  } catch (err) {
    return rejectWithValue(err?.response?.data?.message || 'Failed to fetch published blogs');
  }
});

export const fetchDraftBlogs = createAsyncThunk('blog/fetchDrafts', async (_, { rejectWithValue }) => {
  try {
    const res = await callApi(blogApi.getDrafts);
    return res.articles || [];
  } catch (err) {
    return rejectWithValue(err?.response?.data?.message || 'Failed to fetch draft blogs');
  }
});

export const createBlog = createAsyncThunk(
  'blog/create',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await callApi(blogApi.create, formData);
      return res.article; // ✅ Important
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to create blog');
    }
  }
);

export const updateBlog = createAsyncThunk(
  'blog/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await callApi(blogApi.update(id), data);
      return res.article; // ✅ Important
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to update blog');
    }
  }
);

export const publishBlog = createAsyncThunk('blog/publish', async (id, { rejectWithValue }) => {
  try {
    const res = await callApi(blogApi.publish(id));
    return res.article;
  } catch (err) {
    return rejectWithValue(err?.response?.data?.message || 'Failed to publish blog');
  }
});

export const deleteBlog = createAsyncThunk('blog/delete', async (id, { rejectWithValue }) => {
  try {
    await callApi(blogApi.delete(id));
    return id;
  } catch (err) {
    return rejectWithValue(err?.response?.data?.message || 'Failed to delete blog');
  }
});

export const fetchArticleById = createAsyncThunk(
  'blog/fetchArticleById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await callApi(blogApi.getById(id));
      return res.article;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to fetch article');
    }
  }
);
