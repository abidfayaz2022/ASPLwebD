import React, { useState, useEffect } from 'react';
import BlogForm from '../components/admin-blog/BlogForm';
import BlogList from '../components/admin-blog/BlogList';

const AdminBlogPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('/api/admin/blogs')
      .then(res => res.json())
      .then(data => setBlogs(data.articles || []));
  }, []);

  const addNewBlog = (newBlog) => {
    setBlogs([newBlog, ...blogs]);
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftPanel}>
        <BlogList blogs={blogs} />
      </div>
      <div style={styles.rightPanel}>
        <BlogForm onSubmit={addNewBlog} />
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
    minWidth: '300px',
  },
  rightPanel: {
    flex: '2',
  },
};

export default AdminBlogPage;