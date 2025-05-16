'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../../layouts/MainLayout';
import SEO from '../../components/SEO';
import styles from '../../styles/Blogs.module.css';
import { fetchPublishedBlogs } from '../../redux/blog/blogActions';

export default function BlogsPage() {
  const dispatch = useDispatch();
  const { published } = useSelector((state) => state.blog);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchPublishedBlogs());
  }, [dispatch]);

  const filteredBlogs = published.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    new Date(blog.createdAt).toLocaleDateString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <SEO title="Blogs | The Angel Services" />
      <div className={styles.blogsPage}>
        <h1 className={styles.pageTitle}>Angel Services Blogs</h1>
        <p className={styles.description}>Explore our latest insights and updates.</p>

        <input
          type="text"
          placeholder="Search by title or date..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />

        <div className={styles.blogGrid}>
          {filteredBlogs.map((blog) => (
            <div className={styles.blogCard} key={blog.id}>
              {blog.imagePath && (
                <img
                  src={blog.imagePath}
                  alt="cover"
                  className={styles.blogImage}
                />
              )}
              <div className={styles.blogContent}>
                <h3 className={styles.blogTitle}>{blog.title}</h3>
                <p className={styles.date}>
                  🗓️ {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <div
                  className={styles.blogBody}
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
