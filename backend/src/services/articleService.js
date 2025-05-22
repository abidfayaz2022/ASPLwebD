import prisma from '../lib/prismaClient.js';
import { uploadFileToS3, deleteFileFromS3, extractS3Key } from '../utils/s3Uploader.js';

export const createArticle = async (authorId, data, file) => {
  const imagePath = file ? await uploadFileToS3(file, `articles/${authorId}`) : null;
  return prisma.article.create({
    data: {
      title: data.title || 'Untitled Post',
      content: data.content || '',
      status: data.status,
      authorId,
      imagePath,
      hashtag: data.hashtags || null,
      createdAt: new Date(),
    }
  });
};

export const updateArticle = async (articleId, data, file, authorId) => {
  const article = await prisma.article.findUnique({ where: { id: articleId } });
  if (!article || article.authorId !== authorId) throw new Error('Unauthorized or not found');

  let imagePath = article.imagePath;

  if (file) {
    if (imagePath) {
      const oldKey = extractS3Key(imagePath);
      if (oldKey) await deleteFileFromS3(oldKey);
    }
    imagePath = await uploadFileToS3(file, `articles/${authorId}`);
  }

  return prisma.article.update({
    where: { id: articleId },
    data: {
      title: data.title || article.title,
      content: data.content || article.content,
      hashtag: data.hashtags || null,
      status: data.status,
      imagePath,
    }
  });
};

export const publishArticle = async (articleId, authorId) => {
  const article = await prisma.article.findUnique({ where: { id: articleId } });
  if (!article || article.authorId !== authorId) throw new Error('Unauthorized or not found');

  return prisma.article.update({
    where: { id: articleId },
    data: {
      status: 'published',
      publishedAt: new Date()
    }
  });
};

export const deleteArticle = async (articleId) => {
  const article = await prisma.article.findUnique({ where: { id: articleId } });
  if (!article) throw new Error('Article not found');

  if (article.imagePath) {
    const key = extractS3Key(article.imagePath);
    if (key) {
      try {
        await deleteFileFromS3(key);
      } catch (error) {
        console.warn(`S3 image deletion failed or image not found: ${key}`, error.message);
        // Proceeding with article deletion regardless of S3 image status
      }
    }
  }

  return prisma.article.delete({ where: { id: articleId } });
};


export const fetchPublishedArticles = async () => {
  return prisma.article.findMany({
    where: { status: 'published' },
    orderBy: { publishedAt: 'desc' },
    select: {
      id: true,
      title: true,
      content: true,
      imagePath: true,
      publishedAt: true,
      views: true,
      author: { select: { username: true } }
    }
  });
};
export const fetchPublishedArticleById = async (articleId) => {
 return prisma.article.findFirst({
  where: { id: articleId, status: 'published' },
  select: {
    id: true,
    title: true,
    content: true,
    imagePath: true,
    publishedAt: true,
    views: true,
    author: { select: { username: true } }
  }
});
};

export const fetchAllDrafts = async () => {
  return prisma.article.findMany({
    where: { status: 'draft' },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      content: true,
      imagePath: true,
      createdAt: true,
      author: { select: { username: true } }
    }
  });
};

export const fetchDraftsByAuthor = async (authorId) => {
  return prisma.article.findMany({
    where: { authorId, status: 'draft' },
    orderBy: { createdAt: 'desc' }
  });
};
