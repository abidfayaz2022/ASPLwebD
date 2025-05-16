'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import BlogForm from '../components/admin-blog/BlogForm';
import BlogList from '../components/admin-blog/BlogList';

import {
  createBlog,
  updateBlog,
  deleteBlog,
  fetchDraftBlogs,
  fetchPublishedBlogs,
  publishBlog,
} from '../redux/blog/blogActions';
import {
  clearBlogError,
  clearBlogSuccess,
} from '../redux/blog/blogSlice';

const AdminBlogPage = () => {
  const dispatch = useDispatch();
  const { drafts, published, loading, error, successMessage } = useSelector((state) => state.blog);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    dispatch(fetchDraftBlogs());
    dispatch(fetchPublishedBlogs());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearBlogError());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearBlogSuccess());
    }
  }, [error, successMessage, dispatch]);

  const handleBlogSubmit = async (formData) => {
    const id = formData.get('id');
    if (id) {
      await dispatch(updateBlog({ id, data: formData }));
    } else {
      await dispatch(createBlog(formData));
    }
    dispatch(fetchDraftBlogs());
  };

  const handleDeleteBlog = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    await dispatch(deleteBlog(id));
    dispatch(fetchDraftBlogs());
    dispatch(fetchPublishedBlogs());
  };

  return (
    <div style={styles.container}>
      <ToastContainer position="top-center" autoClose={2500} />
      <div style={styles.leftPanel}>
        <h3 style={styles.sectionTitle}>📝 Draft Blogs</h3>
        <BlogList
          blogs={drafts}
          onEdit={(blog) => setSelectedBlog(blog)}
          onDelete={handleDeleteBlog}
          onPublish={(id) => dispatch(publishBlog(id))}
        />

        <h3 style={{ ...styles.sectionTitle, marginTop: '30px' }}>📢 Published Blogs</h3>
        <BlogList
          blogs={published}
          onEdit={(blog) => setSelectedBlog(blog)}
          onDelete={handleDeleteBlog}
          showPublish={false}
        />
      </div>
      <div style={styles.rightPanel}>
        <BlogForm
          onSubmit={handleBlogSubmit}
          loading={loading}
          selected={selectedBlog}
          onReset={() => setSelectedBlog(null)}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    gap: '30px',
    padding: '40px',
    background: '#f9f9f9',
    minHeight: '100vh',
  },
  leftPanel: {
    flex: '1',
    minWidth: '350px',
  },
  rightPanel: {
    flex: '2',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1F2A44',
    marginBottom: '10px',
  },
};

export default AdminBlogPage;
