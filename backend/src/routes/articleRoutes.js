import express from 'express';
import passport from 'passport';
import upload from '../middleware/upload.js';
import { checkRole } from '../middleware/roleMiddleware.js';
import { Roles } from '../constants/roles.js';
import {
  createArticle,
  updateArticle,
  publishArticle,
  deleteArticle,
  getPublishedArticles,
  getDraftArticles,
  getPublishedArticleById,
  getAllDraftArticles
} from '../controllers/articleController.js';

const router = express.Router();

// Public
router.get('/published', getPublishedArticles);
router.get('/published/:id',getPublishedArticleById)

// Admin-only routes
router.use(passport.authenticate('jwt', { session: false }), checkRole([Roles.ADMIN]));

router.post('/', upload.single('image'), createArticle);
router.put('/:id', upload.single('image'), updateArticle);
router.put('/:id/publish', publishArticle);
router.delete('/:id', deleteArticle);
router.get('/all-drafts',getAllDraftArticles);
router.get('/drafts', getDraftArticles);

export default router;
