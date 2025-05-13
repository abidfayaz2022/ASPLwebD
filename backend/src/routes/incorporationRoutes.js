import express from 'express';
import passport from 'passport';
import {
  checkCompanyName,
  startIncorporation,
  updateIncorporationStep,
  completeIncorporation,
  deleteStagingCompany,
  getAllStagingCompanies,
  getStagingCompanyById,
  updateStagingCompanyByAdmin,
  resumeIncorporation,
  sendOtpToEmail,
  verifyOtpForEmail,
} from '../controllers/incorporationController.js';
import { checkRole } from '../middleware/roleMiddleware.js';

const router = express.Router();
router.post('/check-name', checkCompanyName);
router.post('/start', startIncorporation);
router.put('/update/:sessionId', updateIncorporationStep);
router.get('/resume/:sessionId', resumeIncorporation);
router.post('/send-otp/:sessionId', sendOtpToEmail);
router.post('/verify-otp/:sessionId', verifyOtpForEmail);

// Admin-only staging routes

router.post('/complete', passport.authenticate('jwt', { session: false }),
  checkRole(['Admin']),
  completeIncorporation);

router.get(
  '/admin/staging',
  passport.authenticate('jwt', { session: false }),
  checkRole(['Admin']),
  getAllStagingCompanies
);

router.get(
  '/admin/staging/:sessionId',
  passport.authenticate('jwt', { session: false }),
  checkRole(['Admin']),
  getStagingCompanyById
);

router.put(
  '/admin/staging/:sessionId',
  passport.authenticate('jwt', { session: false }),
  checkRole(['Admin']),
  updateStagingCompanyByAdmin
);
router.delete(
  '/delete/:sessionId',
  passport.authenticate('jwt', { session: false }),
  checkRole(['Admin']),
  deleteStagingCompany
);

export default router;

/**
 * @swagger
 * tags:
 *   name: Incorporation
 *   description: APIs for starting and managing incorporation flow
 */

/**
 * @swagger
 * /api/incorporation/check-name:
 *   post:
 *     summary: Check if a company name is available
 *     tags: [Incorporation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Name availability result
 */

/**
 * @swagger
 * /api/incorporation/start:
 *   post:
 *     summary: Start a new incorporation session
 *     tags: [Incorporation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *               contactEmail:
 *                 type: string
 *     responses:
 *       200:
 *         description: Session started successfully
 */

/**
 * @swagger
 * /api/incorporation/update/{sessionId}:
 *   put:
 *     summary: Update incorporation step data
 *     tags: [Incorporation]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Updated incorporation data
 *     responses:
 *       200:
 *         description: Step updated
 */



/**
 * @swagger
 * /api/incorporation/resume/{sessionId}:
 *   get:
 *     summary: Resume an existing incorporation session
 *     tags: [Incorporation]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session data returned
 */

/**
 * @swagger
 * /api/incorporation/send-otp/{sessionId}:
 *   post:
 *     summary: Send email OTP for verification
 *     tags: [Incorporation]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OTP sent to email
 */

/**
 * @swagger
 * /api/incorporation/verify-otp/{sessionId}:
 *   post:
 *     summary: Verify OTP sent to email
 *     tags: [Incorporation]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email verified
 */
/**
/**
 * @swagger
 * /api/incorporation/complete:
 *   post:
 *     summary: Complete the incorporation after payment and email verification (Admin only)
 *     tags: [Incorporation]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sessionId
 *             properties:
 *               sessionId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Incorporation completed successfully
 *       403:
 *         description: Email not verified or payment incomplete
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/incorporation/admin/staging:
 *   get:
 *     summary: Get all staging incorporation sessions (Admin only)
 *     tags: [Incorporation]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of sessions
 */

/**
 * @swagger
 * /api/incorporation/admin/staging/{sessionId}:
 *   get:
 *     summary: Get a specific staging session by ID (Admin only)
 *     tags: [Incorporation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session details
 */

/**
 * @swagger
 * /api/incorporation/admin/staging/{sessionId}:
 *   put:
 *     summary: Update a specific staging session (Admin only)
 *     tags: [Incorporation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Staging session updated
 */

/**
 * @swagger
 * /api/incorporation/delete/{sessionId}:
 *   delete:
 *     summary: Delete a staging incorporation session (Admin only)
 *     tags: [Incorporation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Staging session deleted
 */