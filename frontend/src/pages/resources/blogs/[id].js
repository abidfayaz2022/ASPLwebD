'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import MainLayout from '../../../layouts/MainLayout';
import SEO from '../../../components/SEO';
import styles from '../../../styles/BlogDetail.module.css';
import { fetchArticleById } from '../../../redux/blog/blogActions';

export default function ArticleDetailPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const article = useSelector((state) => state.blog.currentArticle);

  useEffect(() => {
    if (id) {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id]);

  if (!article) {
    return (
      <MainLayout>
        <div className={styles.loading}>Loading...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <SEO title={`${article.title} | The Angel Services`} />
      <div className={styles.articlePage}>
        <button 
          className={styles.backButton}
          onClick={() => router.back()}
        >
          ← Back to Blogs
        </button>
        
        <article className={styles.article}>
          {article.imagePath && (
            <img
              src={article.imagePath}
              alt={article.title}
              className={styles.articleImage}
            />
          )}
          
          <h1 className={styles.articleTitle}>{article.title}</h1>
          
          <div className={styles.articleMeta}>
            <span className={styles.date}>
              🗓️ {new Date(article.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            {article.author && (
              <span className={styles.author}>
                👤 {article.author.username}
              </span>
            )}
          </div>

          <div 
            className={styles.articleContent}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </div>
    </MainLayout>
  );
} 