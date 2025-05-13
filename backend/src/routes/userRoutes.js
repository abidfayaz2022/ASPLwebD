// routes/userRoutes.js
import express from 'express';
import passport from 'passport';
import {
  getProfile,
  updateProfile,
  deleteAccount,
} from '../controllers/userController.js';

const router = express.Router();

// All routes require Bearer Token (JWT) auth
router.use(passport.authenticate('jwt', { session: false }));

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.delete('/profile', deleteAccount);

export default router;


/**
 * @swagger
 * tags:
 *   name: User
 *   description: User profile management
 */

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get logged-in user's profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 mobile:
 *                   type: string
 *                 country:
 *                   type: string
 *                 profilePic:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/user/profile:
 *   put:
 *     summary: Update logged-in user's profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               mobile:
 *                 type: string
 *               country:
 *                 type: string
 *               profilePic:
 *                 type: string
 *               profileThumbnail:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Bad request or validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/user/profile:
 *   delete:
 *     summary: Deactivate (soft delete) logged-in user's account
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account deactivated successfully
 *       401:
 *         description: Unauthorized
 */