// routes/paymentRoutes.js
import express from 'express';
import passport from 'passport';
import { checkRole } from '../middleware/roleMiddleware.js';
import {
    createPaymentOrder,
    verifyRazorpayWebhook,
    refundPaymentById,
    getPaymentById,
    getPaymentsBySessionId,
    getAllPayments,
    previewPaymentAmount
} from '../controllers/paymentController.js';

const router = express.Router();

// Public Routes
router.get('/preview-payment/:sessionId', previewPaymentAmount);
router.post('/create-order', createPaymentOrder);
router.post('/verify-webhook', verifyRazorpayWebhook);

// Admin-only Routes
router.get(
    '/admin/payments',
    passport.authenticate('jwt', { session: false }),
    checkRole(['Admin']),
    getAllPayments
);

router.get(
    '/admin/payment/:paymentId',
    passport.authenticate('jwt', { session: false }),
    checkRole(['Admin']),
    getPaymentById
);

router.get(
    '/admin/session/:sessionId/payments',
    passport.authenticate('jwt', { session: false }),
    checkRole(['Admin']),
    getPaymentsBySessionId
);

router.post(
    '/admin/payment/:paymentId/refund',
    passport.authenticate('jwt', { session: false }),
    checkRole(['Admin']),
    refundPaymentById
);

export default router;


/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Razorpay payment management endpoints
 */

/**
 * @swagger
 * /api/payment/preview-payment/{sessionId}:
 *   get:
 *     summary: Preview total payment amount for selected services
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the staging company session
 *     responses:
 *       200:
 *         description: Successfully retrieved payment preview
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 preview:
 *                   type: object
 *                   properties:
 *                     totalAmount:
 *                       type: number
 *                       format: float
 *                       example: 2499.00
 *                     currency:
 *                       type: string
 *                       example: INR
 *                     services:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: Incorporation Filing
 *                           cost:
 *                             type: number
 *                             format: float
 *                             example: 1499.00
 *       404:
 *         description: Session or services not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/payment/create-order:
 *   post:
 *     summary: Create a Razorpay payment order
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionId:
 *                 type: string
 *                 example: stg_abc123xyz
 *     responses:
 *       200:
 *         description: Razorpay order created successfully
 *       400:
 *         description: Missing or invalid sessionId
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/payment/verify-webhook:
 *   post:
 *     summary: Handle Razorpay webhook for payment status
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             event: payment.captured
 *             payload:
 *               payment:
 *                 entity:
 *                   id: pay_xyz123
 *                   amount: 100000
 *                   currency: INR
 *                   status: captured
 *                   method: card
 *                   notes:
 *                     sessionId: stg_abc123xyz
 *                     services: "1,2"
 *     responses:
 *       200:
 *         description: Webhook processed
 *       400:
 *         description: Invalid Razorpay signature
 */

/**
 * @swagger
 * /api/payment/admin/payments:
 *   get:
 *     summary: Get all payments (Admin only)
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all payment records
 */

/**
 * @swagger
 * /api/payment/admin/payment/{paymentId}:
 *   get:
 *     summary: Get details of a payment by ID (Admin only)
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     responses:
 *       200:
 *         description: Payment found
 *       404:
 *         description: Payment not found
 */

/**
 * @swagger
 * /api/payment/admin/session/{sessionId}/payments:
 *   get:
 *     summary: Get all payments linked to a session (Admin only)
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         example: stg_abc123xyz
 *     responses:
 *       200:
 *         description: List of session payments
 *       404:
 *         description: Session not found or has no payments
 */

/**
 * @swagger
 * /api/payment/admin/payment/{paymentId}/refund:
 *   post:
 *     summary: Issue refund for a payment (Admin only)
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 10
 *     responses:
 *       200:
 *         description: Refund processed
 *       400:
 *         description: Refund not allowed
 *       500:
 *         description: Refund error
 */

