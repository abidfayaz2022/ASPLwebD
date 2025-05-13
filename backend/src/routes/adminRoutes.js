// src/routes/adminRoutes.js
import express from 'express';
import passport from 'passport';
import {
  getAdminDashboard,
  getAllUsers,
  updateUserRole,
  getIncorporationsForReview,
  updateIncorporationStatus,
  generateInvoice,
  getPreparerDashboard,
  getApproverDashboard,
  
} from '../controllers/adminController.js';
import { checkRole } from '../middleware/roleMiddleware.js';
import { Roles } from '../constants/roles.js';

const router = express.Router();


router.use(passport.authenticate('jwt', { session: false }));

// ✅ Admin-only routes
router.get('/dashboard', checkRole([Roles.ADMIN]), getAdminDashboard);
router.get('/users', checkRole([Roles.ADMIN]), getAllUsers);
router.put('/users/:userId/role', checkRole([Roles.ADMIN]), updateUserRole);
router.get('/incorporations', checkRole([Roles.ADMIN]), getIncorporationsForReview);
router.put('/incorporation/:incorporationId/status', checkRole([Roles.ADMIN]), updateIncorporationStatus);
router.post('/incorporation/:incorporationId/generate-invoice', checkRole([Roles.ADMIN]), generateInvoice);

// ✅ Preparer routes
router.get('/preparer/dashboard', checkRole([Roles.PREPARER]), getPreparerDashboard);
router.get('/preparer/incorporations', checkRole([Roles.PREPARER]), getIncorporationsForReview);
router.put('/preparer/incorporation/:incorporationId/status', checkRole([Roles.PREPARER]), updateIncorporationStatus);

// ✅ Approver routes
router.get('/approver/dashboard', checkRole([Roles.APPROVER]), getApproverDashboard);
router.get('/approver/incorporations', checkRole([Roles.APPROVER]), getIncorporationsForReview);
router.put('/approver/incorporation/:incorporationId/status', checkRole([Roles.APPROVER]), updateIncorporationStatus);



export default router;
