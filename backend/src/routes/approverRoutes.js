import express from 'express';
import passport from 'passport';
import { checkRole } from '../middleware/roleMiddleware.js';
import {
  getApproverDashboard,
  assignAgentToUser,
  approveCompanyDocuments,
  sendNotificationToAll,
  updateRecommendationsForUser,
  getUserAndPreparerDashboards
} from '../controllers/approverController.js';
import { Roles } from '../constants/roles.js';

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.get('/dashboard', checkRole([Roles.APPROVER]), getApproverDashboard);
router.get('/dashboards', checkRole([Roles.APPROVER]), getUserAndPreparerDashboards);
router.post('/assign-agent', checkRole([Roles.APPROVER]), assignAgentToUser);
router.post('/approve-documents/:companyId', checkRole([Roles.APPROVER]), approveCompanyDocuments);
router.post('/notify-all', checkRole([Roles.APPROVER]), sendNotificationToAll);
router.put('/user/:userId/recommendations', checkRole([Roles.APPROVER]), updateRecommendationsForUser);

export default router;