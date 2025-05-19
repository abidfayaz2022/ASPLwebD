// src/routes/adminRoutes.js
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
  inviteUserByEmail
} from '../controllers/adminController.js';

import { checkRole } from '../middleware/roleMiddleware.js';
import { Roles } from '../constants/roles.js';

const router = express.Router();

//  Protect all routes — Admin only
router.use(passport.authenticate('jwt', { session: false }), checkRole([Roles.ADMIN]));

// ─── Core Dashboard ────────────────────────────────────────────────
router.get('/dashboard', getAdminDashboard);
router.get('/summary', getSystemSummary);
router.get('/summary/export', exportSystemSummary);

// ─── User Management ───────────────────────────────────────────────
router.get('/users', getAllUsers);
router.get('/user/:userId/dashboard', getUserDashboard);
router.post('/users', createUser); // ✅ Create user
router.put('/users/:userId', updateUser); // ✅ Update user details
router.put('/users/:userId/role', updateUserRole);
router.put('/users/:userId/block', blockUser);
router.delete('/users/:userId', deleteUser);
router.post('/users/invite', inviteUserByEmail);

// ─── Role Assignments ──────────────────────────────────────────────
router.post('/assign-approver', assignApproverToPreparer);   // { preparerId, approverId }
router.post('/assign-preparer', assignPreparerToClient);     // { clientId, preparerId }
router.delete('/role-assignment/:id', removeRoleAssignment); // roleId

// ─── Document Management ───────────────────────────────────────────
router.get('/documents/signed', getSignedDocuments);
router.get('/documents', getCompanyDocuments);                      // filter with query: ?companyId=...&userId=...
router.post('/documents/:docId/approve', approveDocumentVerifiedByPreparer);
router.post('/documents/:docId/reject', rejectDocumentVerifiedByPreparer); // { reason }

// ─── Insights & Recommendations ────────────────────────────────────
router.put('/insight-recommendation/:userId', updateInsightRecommendations);
router.get('/insight-recommendation/:userId/history', getInsightHistory);

// ─── Notifications & Chat ──────────────────────────────────────────
router.post('/notify-all', sendGlobalNotification);
router.get('/notifications/broadcasts', getBroadcastMessages);
router.get('/notifications', getNotifications);
router.put('/notifications/:id/read', markNotificationAsRead);
router.get('/chats', getAllChats);

// ─── Calendar Actions ──────────────────────────────────────────────
router.get('/calendar-actions', getCalendarActions);
router.get('/calendar-actions/today', getTodaysCalendarActions);
router.put('/calendar-actions/:actionId', updateCalendarActions);

// ─── Incorporation Flow ────────────────────────────────────────────
router.get('/incorporations', getIncorporationsForReview);
router.put('/incorporation/:incorporationId/status', updateIncorporationStatus);
router.post('/incorporation/:incorporationId/generate-invoice', generateInvoice);

// ─── Audit Trail & Company Monitoring ──────────────────────────────
router.get('/company/:companyId/activity', getCompanyActivityLog);
router.put('/company/:companyId/lock', lockCompanyDashboard);
router.get('/audit-logs', getAuditLogs);

export default router;
