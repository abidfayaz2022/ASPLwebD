import * as approverService from '../services/approverService.js';

export const getApproverDashboard = async (req, res) => {
  try {
    const dashboard = await approverService.getApproverDashboardData(req.user.id);
    res.json({ success: true, dashboard });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard', error: err.message });
  }
};

export const getUserAndPreparerDashboards = async (req, res) => {
  try {
    const data = await approverService.getAllDashboards();
    res.json({ success: true, dashboards: data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch dashboards', error: err.message });
  }
};

export const assignAgentToUser = async (req, res) => {
  try {
    const { userId, agentId, role } = req.body;
    const result = await approverService.assignAgent(userId, agentId, role);
    res.json({ success: true, message: 'Agent assigned successfully', result });
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
