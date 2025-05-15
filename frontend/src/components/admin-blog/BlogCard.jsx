import React from 'react';

const BlogCard = ({ blog }) => {
  return (
    <div style={styles.card}>
      <div style={styles.title}>{blog.title}</div>
      <div style={styles.meta}>
        <span style={styles.status}>{blog.status}</span>
        <span style={styles.date}>{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

const styles = {
  card: {
    padding: '14px',
    borderBottom: '1px solid #eee',
    marginBottom: '8px',
  },
  title: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2a44',
  },
  meta: {
    fontSize: '12px',
    color: '#888',
    display: 'flex',
    justifyContent: 'space-between',
  },
  status: {
    background: '#fcb90033',
    color: '#000',
    padding: '2px 8px',
    borderRadius: '6px',
  },
  date: {
    fontStyle: 'italic',
  },
};

export default BlogCard;
