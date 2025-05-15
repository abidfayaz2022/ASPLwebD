import React from 'react';
import BlogCard from './BlogCard';

const BlogList = ({ blogs }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>📚 Your Blog Posts</h3>
      {blogs.length === 0 ? (
        <p style={styles.empty}>No blogs created yet.</p>
      ) : (
        blogs.map(blog => <BlogCard key={blog.id} blog={blog} />)
      )}
    </div>
  );
};

const styles = {
  card: {
    background: '#fff',
    padding: '20px',
    borderRadius: '14px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.05)',
  },
  title: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1F2A44',
    marginBottom: '15px',
  },
  empty: {
    color: '#777',
    fontStyle: 'italic',
  },
};

export default BlogList;
