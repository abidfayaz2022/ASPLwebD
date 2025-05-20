import { createSlice } from '@reduxjs/toolkit';
import {
  fetchPublishedBlogs,
  fetchDraftBlogs,
  createBlog,
  updateBlog,
  publishBlog,
  deleteBlog,
  fetchArticleById
} from './blogActions';

const initialState = {
  published: [],
  drafts: [],
  currentArticle: null,
  loading: false,
  error: null,
  successMessage: null,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    clearBlogError: (state) => {
      state.error = null;
    },
    clearBlogSuccess: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchPublishedBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublishedBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.published = action.payload;
      })
      .addCase(fetchPublishedBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchDraftBlogs.fulfilled, (state, action) => {
        state.drafts = action.payload;
      })

      // CREATE
      .addCase(createBlog.fulfilled, (state, action) => {
        state.drafts.unshift(action.payload);
        state.successMessage = 'Blog created';
      })

      // UPDATE
      .addCase(updateBlog.fulfilled, (state, action) => {
        const index = state.drafts.findIndex((b) => b.id === action.payload.id);
        if (index !== -1) state.drafts[index] = action.payload;
        state.successMessage = 'Blog updated';
      })

      // PUBLISH
      .addCase(publishBlog.fulfilled, (state, action) => {
        // remove from drafts, add to published
        state.drafts = state.drafts.filter((b) => b.id !== action.payload.id);
        state.published.unshift(action.payload);
        state.successMessage = 'Blog published';
      })
      
      


      // DELETE
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.drafts = state.drafts.filter((b) => b.id !== action.payload);
        state.published = state.published.filter((b) => b.id !== action.payload);
        state.successMessage = 'Blog deleted';
      })
      
      // Handle fetchArticleById
      .addCase(fetchArticleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentArticle = action.payload;
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

  },
});

export const { clearBlogError, clearBlogSuccess } = blogSlice.actions;
export default blogSlice.reducer;
