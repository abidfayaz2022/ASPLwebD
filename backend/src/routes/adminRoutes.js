import express from 'express';
import passport from 'passport';
import {
  getAdminDashboard,
  getAllUsers,
  getUserDashboard,
  updateUserRole,
  blockUser,
  deleteUser,
  createUser,
  updateUser,
  assignApproverToPreparer,
  assignPreparerToClient,
  removeRoleAssignment,
  getSystemSummary,
  exportSystemSummary,
  getSignedDocuments,
  approveDocumentVerifiedByPreparer,
  rejectDocumentVerifiedByPreparer,
  getCompanyDocuments,
  updateInsightRecommendations,
  getInsightHistory,
  sendGlobalNotification,
  getBroadcastMessages,
  getAllChats,
  getNotifications,
  markNotificationAsRead,
  getCalendarActions,
  updateCalendarActions,
  getTodaysCalendarActions,
  getIncorporationsForReview,
  updateIncorporationStatus,
  generateInvoice,
  getCompanyActivityLog,
  lockCompanyDashboard,
  getAuditLogs,

  //  Recommended Controllers
  getSystemHealthMetrics,
  exportAuditLogs,
  getAllUploadedDocuments,
  suspendUser,
  unsuspendUser,
  previewCompany,
  reassignPreparer,
  resetCompanyStatus
} from '../controllers/adminController.js';

import { checkRole } from '../middleware/roleMiddleware.js';
import { Roles } from '../constants/roles.js';

const router = express.Router();

// Protect all routes — Admin only
router.use(passport.authenticate('jwt', { session: false }), checkRole([Roles.ADMIN]));

// ─── Dashboard & Summary ─────────────────────────────────────────────
router.get('/dashboard', getAdminDashboard);
router.get('/summary', getSystemSummary);
router.get('/summary/export', exportSystemSummary);
router.get('/metrics', getSystemHealthMetrics); // 🔍

router.get('/audit-logs', getAuditLogs);
router.get('/audit-logs/export', exportAuditLogs); // 📄 export with ?companyId or ?userId

// ─── User Management ─────────────────────────────────────────────────
router.get('/users', getAllUsers);
router.get('/user/:userId/dashboard', getUserDashboard);
router.post('/users', createUser);
router.put('/users/:userId', updateUser);
router.put('/users/:userId/role', updateUserRole);
router.put('/users/:userId/block', blockUser);
router.delete('/users/:userId', deleteUser);

// ─── User Suspension (Soft) ───────────────────────────────────────────
router.put('/users/:userId/suspend', suspendUser);   // { message }
router.put('/users/:userId/unsuspend', unsuspendUser);

// ─── Role Assignments ────────────────────────────────────────────────
router.post('/assign-approver', assignApproverToPreparer);
router.post('/assign-preparer', assignPreparerToClient);
router.delete('/role-assignment/:id', removeRoleAssignment);

// ─── Document Management ─────────────────────────────────────────────
router.get('/documents/signed', getSignedDocuments);
router.get('/documents', getCompanyDocuments); // ?companyId=&userId=
router.post('/documents/:docId/approve', approveDocumentVerifiedByPreparer);
router.post('/documents/:docId/reject', rejectDocumentVerifiedByPreparer);

//  All file uploads for inspection
router.get('/files', getAllUploadedDocuments); // ?companyId=...&userId=...

// ─── Insights & Recommendations ──────────────────────────────────────
router.put('/insight-recommendation/:userId', updateInsightRecommendations);
router.get('/insight-recommendation/:userId/history', getInsightHistory);

// ─── Notifications & Chat ────────────────────────────────────────────
router.post('/notify-all', sendGlobalNotification);
router.get('/notifications/broadcasts', getBroadcastMessages);
router.get('/notifications', getNotifications);
router.put('/notifications/:id/read', markNotificationAsRead);
router.get('/chats', getAllChats);

// ─── Calendar Management ─────────────────────────────────────────────
router.get('/calendar-actions', getCalendarActions);
router.get('/calendar-actions/today', getTodaysCalendarActions);
router.put('/calendar-actions/:actionId', updateCalendarActions);

// ─── Incorporation Workflow ──────────────────────────────────────────
router.get('/incorporations', getIncorporationsForReview);
router.put('/incorporation/:incorporationId/status', updateIncorporationStatus);
router.post('/incorporation/:incorporationId/generate-invoice', generateInvoice);

// ─── Company Oversight & Security ────────────────────────────────────
router.get('/company/:companyId/activity', getCompanyActivityLog);
router.put('/company/:companyId/lock', lockCompanyDashboard);
router.get('/company/:companyId/preview', previewCompany); //  View as client/preparer

router.put('/company/:companyId/reassign-preparer', reassignPreparer);     // { newPreparerId }
router.put('/company/:companyId/reset-status', resetCompanyStatus);       // { newStatus }

export default router;
