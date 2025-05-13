import express from 'express';
import passport from 'passport';
import { checkRole } from '../middleware/roleMiddleware.js';
import { Roles } from '../constants/roles.js';
import {
  getClientDashboard,
  getClientCompanyDetails,
  getClientDocuments,
  getClientNotifications,
  getClientInvoices,
  getClientTasks,
  getClientInsights,
  getClientChatAgents,
  uploadClientDocument,
  uploadFinalCompanyDocuments,
  deleteClientDocument,
  updateDirectorDetails,
  updateShareholderDetails,
  updateCompanyOtherFields,
  markNotificationRead,
  replaceUploadedDocument
} from '../controllers/clientController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));
router.use(checkRole([Roles.CLIENT]));

// Routes
router.get('/dashboard', getClientDashboard);
router.get('/company', getClientCompanyDetails);
router.get('/documents', getClientDocuments);
router.get('/notifications', getClientNotifications);
router.get('/invoices', getClientInvoices);
router.get('/calendar', getClientTasks);
router.get('/insights', getClientInsights);
router.get('/chat-agents', getClientChatAgents);


  // POST routes
router.post('/upload-document', upload.array('documents'), uploadClientDocument);
router.post(
    '/upload-final-docs',
    checkRole([Roles.CLIENT]),
    upload.array('finalDocs'),
    uploadFinalCompanyDocuments
  );
  


// PUT routes
  router.put('/director/:id', checkRole([Roles.CLIENT]), updateDirectorDetails);
  router.put('/shareholder/:id', checkRole([Roles.CLIENT]), updateShareholderDetails);
  router.put('/company-other-details', checkRole([Roles.CLIENT]), updateCompanyOtherFields);
  router.put('/notification/:id/read', markNotificationRead);

  router.put(
    '/replace-document/:id',
    checkRole([Roles.CLIENT]),
    upload.single('file'),
    replaceUploadedDocument
  );

//DELETE routes
router.delete('/document/:id', checkRole([Roles.CLIENT]), deleteClientDocument);
export default router;
