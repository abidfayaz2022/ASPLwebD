import express from 'express';
import passport from 'passport';
import { checkRole } from '../middleware/roleMiddleware.js';
import {
  getPreparerDashboard,
  getAssignedUsers,
  receiveKycFromSentroweb,
  updateRecommendationsForAssignedUser,
  sendNotificationToAssignedUser,
  updateCalendarForUser,
  sendFormToApprover,
  verifyDocumentAsPreparer
} from '../controllers/preparerController.js';
import { Roles } from '../constants/roles.js';
import upload from '../middleware/upload.js';



const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.get('/dashboard', checkRole([Roles.PREPARER]), getPreparerDashboard);
router.get('/assigned-users', checkRole([Roles.PREPARER]), getAssignedUsers);
router.post('/kyc/:userId', checkRole([Roles.PREPARER]), receiveKycFromSentroweb);

router.put(
  '/recommendations/:userId',
  checkRole([Roles.PREPARER]), // or APPROVER
  upload.array('sampleDocs'),
  updateRecommendationsForAssignedUser
);
router.post('/notify/:userId', checkRole([Roles.PREPARER]), sendNotificationToAssignedUser);
router.put('/calendar/:userId', checkRole([Roles.PREPARER]), updateCalendarForUser);
router.put('/send-to-approver/:companyId', checkRole([Roles.PREPARER]), sendFormToApprover);

router.put(
  '/verify-document/:id',
  checkRole([Roles.PREPARER]),
  verifyDocumentAsPreparer
);

export default router;