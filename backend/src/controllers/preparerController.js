import * as preparerService from '../services/preparerService.js';

export const getPreparerDashboard = async (req, res) => {
  try {
    const dashboard = await preparerService.getPreparerDashboardData(req.user.id);
    res.status(200).json({ success: true, dashboard });
  } catch (err) {
    console.error('Error fetching dashboard:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard', error: err.message });
  }
};


export const getAssignedUsers = async (req, res) => {
  try {
    const users = await preparerService.getAssignedUsers(req.user.id);
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const receiveKycFromSentroweb = async (req, res) => {
  try {
    const { userId } = req.params;
    const { formType, filePath } = req.body;
    const result = await preparerService.receiveKyc(userId, formType, filePath, req.user.id);
    res.json({ success: true, message: 'KYC received and saved', result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const updateRecommendationsForAssignedUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { content } = req.body;
    const files = req.files || [];

    const result = await preparerService.updateRecommendations(
      userId,
      content,
      files,
      `users/${userId}/insight-recommendations`
    );

    res.json({
      success: true,
      message: 'Recommendation and sample docs submitted',
      result
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const sendNotificationToAssignedUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, message } = req.body;
    await preparerService.notifyUser(userId, title, message);
    res.json({ success: true, message: 'Notification sent' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateCalendarForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await preparerService.updateCalendar(userId, req.body, req.user.id);
    res.json({ success: true, message: 'Calendar updated', result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const sendFormToApprover = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { remarks } = req.body;
    const result = await preparerService.sendFormToApprover(companyId, remarks, req.user.id);
    res.json({ success: true, message: 'Form sent to Approver', result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const verifyDocumentAsPreparer = async (req, res) => {
  try {
    const documentId = parseInt(req.params.id);
    const preparerId = req.user.id;

    const verifiedDoc = await preparerService.verifyClientDocument(documentId, preparerId);

    res.json({
      success: true,
      message: 'Document verified successfully',
      document: verifiedDoc
    });
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
};
