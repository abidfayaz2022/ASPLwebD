import * as approverService from '../services/approverService.js';

export const getApproverDashboard = async (req, res) => {
  try {
    const dashboard = await approverService.getApproverDashboardData(req.user.id);
    res.status(200).json({ success: true, dashboard });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard', error: err.message });
  }
};

export const getAllPreparerSummaries = async (req, res) => {
  try {
    const summaries = await approverService.getAllPreparerSummaries();
    res.status(200).json({ success: true, summaries });
  } catch (err) {
    console.error('Failed to fetch preparer summaries:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch preparer summaries',
      error: err.message
    });
  }
};

export const assignPreparerToCompany = async (req, res) => {
  try {
    const { userId, preparerId } = req.body;
    const result = await approverService.assignPreparerToCompany(userId, preparerId, req.user.id);
    res.json({ success: true, message: 'Preparer assigned to company successfully', result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const approveCompanyDocuments = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { remarks } = req.body;
    const result = await approverService.approveDocuments(companyId, req.user.id, remarks);
    res.json({ success: true, message: 'Company approved successfully', result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const sendNotificationToAll = async (req, res) => {
  try {
    const { title, message } = req.body;
    const result = await approverService.notifyAllUsers(title, message);
    res.json({ success: true, message: 'Notifications sent', count: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateRecommendationsForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { content } = req.body;
    const result = await approverService.updateRecommendations(userId, content);
    res.json({ success: true, message: 'Recommendations updated', result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
