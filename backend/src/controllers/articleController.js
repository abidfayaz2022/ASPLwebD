import * as articleService from '../services/articleService.js';

// Admin: Create or save draft
export const createArticle = async (req, res) => {
  try {
    const article = await articleService.createArticle(req.user.id, req.body, req.file);
    res.status(201).json({ success: true, article });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Admin: Update article (draft or published)
export const updateArticle = async (req, res) => {
  try {
    const articleId = parseInt(req.params.id);
    const article = await articleService.updateArticle(articleId, req.body, req.file, req.user.id);
    res.json({ success: true, article });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Admin: Publish article
export const publishArticle = async (req, res) => {
  try {
    const articleId = parseInt(req.params.id);
    const article = await articleService.publishArticle(articleId, req.user.id);
    res.json({ success: true, article });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Admin: Delete article
export const deleteArticle = async (req, res) => {
  try {
    const articleId = parseInt(req.params.id);
    await articleService.deleteArticle(articleId, req.user.id);
    res.json({ success: true, message: 'Article deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Public: View published articles
export const getPublishedArticles = async (_req, res) => {
  try {
    const articles = await articleService.fetchPublishedArticles();
    res.json({ success: true, articles });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Admin: Resume draft
export const getDraftArticles = async (req, res) => {
  try {
    const articles = await articleService.fetchDraftsByAuthor(req.user.id);
    res.json({ success: true, articles });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
