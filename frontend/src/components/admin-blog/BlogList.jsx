import React from 'react';
import BlogCard from './BlogCard';

const BlogList = ({ blogs, onEdit, onDelete, onPublish, showPublish = true }) => {
  return (
    <div style={styles.card}>
      {blogs.length === 0 ? (
        <p style={styles.empty}>No blogs found.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog.id} style={styles.blogItem}>
            <BlogCard blog={blog} />
            <div style={styles.actions}>
              <button onClick={() => onEdit(blog)}>✏️ Edit</button>
              <button onClick={() => onDelete(blog.id)}>🗑️ Delete</button>
              {showPublish && <button onClick={() => onPublish(blog.id)}>📢 Publish</button>}
            </div>
          </div>
        ))
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
  empty: {
    color: '#777',
    fontStyle: 'italic',
  },
  blogItem: {
    marginBottom: '15px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
  actions: {
    display: 'flex',
    gap: '10px',
    marginTop: '8px',
  },
};

export default BlogList;
