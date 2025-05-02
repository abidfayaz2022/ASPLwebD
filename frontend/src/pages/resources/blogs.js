import { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import SEO from '../../components/SEO';
import styles from '../../styles/Blogs.module.css';

const blogs = [
  {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7309249758286528513?collapsed=1",
    date: "April 1, 2024",
  },
  {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7306616750173736960?collapsed=1",
    date: "March 28, 2024",
  },
  {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7304068620878327808?collapsed=1",
    date: "March 20, 2024",
  },
  {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7301531362715451392?collapsed=1",
    date: "March 14, 2024",
  },
  {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:share:7256609312934899712?collapsed=1",
    date: "February 20, 2024",
  },
  {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:share:7248882199939178496?collapsed=1",
    date: "February 1, 2024",
  },
  {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:share:7245729463135547392?collapsed=1",
    date: "January 22, 2024",
  },
  {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:share:7243460010922385409?collapsed=1",
    date: "January 12, 2024",
  },
  {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:share:7241407716995293184?collapsed=1",
    date: "January 5, 2024",
  },
  {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:share:7238099100171124736?collapsed=1",
    date: "December 25, 2023",
  }
];

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBlogs = blogs.filter(blog =>
    blog.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <SEO title="Blogs | The Angel Services" />
      <div className={styles.blogsPage}>
        <h1 className={styles.pageTitle}>Angel Services Blogs</h1>
        <p className={styles.description}>Explore our latest insights and updates on LinkedIn.</p>

        <input
          type="text"
          placeholder="Search by date..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />

        <div className={styles.blogGrid}>
          {filteredBlogs.map((blog, index) => (
            <div className={styles.blogCard} key={index}>
              <iframe
                src={blog.url}
                height="400"
                width="100%"
                frameBorder="0"
                allowFullScreen
                title={`LinkedIn blog ${index}`}
              ></iframe>
              <p className={styles.date}>🗓️ {blog.date}</p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
