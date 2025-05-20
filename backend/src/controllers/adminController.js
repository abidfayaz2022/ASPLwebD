// src/controllers/adminController.js

import * as adminService from '../services/adminService.js';

export const getAdminDashboard = async (req, res) => {
  try {
    const dashboard = await adminService.getAdminDashboard();
    res.status(200).json({ success: true, dashboard });
  } catch (err) {
    console.error('Error loading admin dashboard:', err);
    res.status(500).json({ success: false, message: 'Failed to load admin dashboard', error: err.message });
  }
};

export const getSystemHealthMetrics = async (req, res) => {
  try {
    const metrics = await adminService.getSystemHealthMetrics();
    res.status(200).json({ success: true, metrics });
  } catch (err) {
    console.error('Error fetching system metrics:', err);
    res.status(500).json({ success: false, message: 'Failed to load metrics', error: err.message });
  }
};

export const getAllUsers = async (_req, res) => {
  try {
    const users = await adminService.getAllUsers();
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch users', error: err.message });
  }
};

export const getUserDashboard = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const data = await adminService.getUserDashboard(userId);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch user dashboard', error: err.message });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const { newRole } = req.body;

    const updated = await adminService.updateUserRole(userId, newRole);
    res.status(200).json({ success: true, message: 'Role updated', user: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const blockUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await adminService.blockUser(userId);
    res.status(200).json({ success: true, message: 'User blocked', user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to block user', error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await adminService.deleteUser(userId);
    res.status(200).json({ success: true, message: 'User marked as deleted', user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete user', error: err.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = await adminService.createUser(req.body);
    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await adminService.updateUser(userId, req.body);
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const exportAuditLogs = async (req, res) => {
  try {
    const { companyId, userId } = req.query;

    if (!companyId && !userId) {
      return res.status(400).json({
        success: false,
        message: 'Either companyId or userId is required for exporting logs'
      });
    }

    const logs = await adminService.exportAuditLogs({ companyId, userId });

    res.status(200).json({
      success: true,
      total: logs.length,
      logs
    });
  } catch (err) {
    console.error('Error exporting audit logs:', err);
    res.status(500).json({ success: false, message: 'Failed to export logs', error: err.message });
  }
};

export const getAllUploadedDocuments = async (req, res) => {
  try {
    const { companyId, userId, purpose, isVerified } = req.query;

    const filters = {
      companyId: companyId ? parseInt(companyId) : undefined,
      uploadedBy: userId ? parseInt(userId) : undefined,
      purpose: purpose || undefined,
      isVerified: isVerified !== undefined ? isVerified === 'true' : undefined
    };

    const documents = await adminService.getAllUploadedDocuments(filters);

    res.status(200).json({ success: true, count: documents.length, documents });
  } catch (err) {
    console.error('Error fetching documents:', err);
    res.status(500).json({ success: false, message: 'Failed to retrieve documents', error: err.message });
  }
};

export const suspendUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { message } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Suspension message is required.' });
    }

    const result = await adminService.suspendUser(parseInt(userId), message);
    res.status(200).json({ success: true, message: 'User suspended successfully.', result });
  } catch (err) {
    console.error('Error suspending user:', err);
    res.status(500).json({ success: false, message: 'Failed to suspend user', error: err.message });
  }
};

export const unsuspendUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await adminService.unsuspendUser(parseInt(userId));
    res.status(200).json({ success: true, message: 'User unsuspended successfully.', result });
  } catch (err) {
    console.error('Error unsuspending user:', err);
    res.status(500).json({ success: false, message: 'Failed to unsuspend user', error: err.message });
  }
};


export const previewCompany = async (req, res) => {
  try {
    const { companyId } = req.params;

    const data = await adminService.previewCompany(parseInt(companyId));
    res.status(200).json({ success: true, company: data });
  } catch (err) {
    console.error('Error previewing company:', err);
    res.status(500).json({ success: false, message: 'Failed to load company preview', error: err.message });
  }
};

export const reassignPreparer = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { newPreparerId } = req.body;

    if (!newPreparerId) {
      return res.status(400).json({ success: false, message: 'New preparer ID is required' });
    }

    const result = await adminService.reassignPreparer(parseInt(companyId), parseInt(newPreparerId), req.user.id);

    res.status(200).json({ success: true, message: 'Preparer reassigned successfully', result });
  } catch (err) {
    console.error('Error reassigning preparer:', err);
    res.status(500).json({ success: false, message: 'Failed to reassign preparer', error: err.message });
  }
};

export const resetCompanyStatus = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { newStatus, reason } = req.body;

    if (!newStatus || !reason) {
      return res.status(400).json({
        success: false,
        message: 'Both newStatus and reason are required.'
      });
    }

    const result = await adminService.resetCompanyStatus(
      parseInt(companyId),
      newStatus,
      reason,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: `Company status updated to ${newStatus}`,
      result
    });
  } catch (err) {
    console.error('Error resetting company status:', err);
    res.status(500).json({ success: false, message: 'Failed to reset company status', error: err.message });
  }
};

export const removeRoleAssignment = async (req, res) => {
  try {
    const roleId = parseInt(req.params.id);
    const result = await adminService.removeRoleAssignment(roleId);

    res.status(200).json({ success: true, message: 'Assignment removed', result });
  } catch (err) {
    console.error('Error removing role assignment:', err);
    res.status(500).json({ success: false, message: 'Failed to remove assignment', error: err.message });
  }
};

export const getCompanyDocuments = async (req, res) => {
  try {
    const { companyId, userId } = req.query;

    const filters = {
      companyId: companyId ? parseInt(companyId) : undefined,
      uploadedFor: userId ? parseInt(userId) : undefined
    };

    const documents = await adminService.getCompanyDocuments(filters);

    res.status(200).json({ success: true, count: documents.length, documents });
  } catch (err) {
    console.error('Error fetching documents:', err);
    res.status(500).json({ success: false, message: 'Failed to get documents', error: err.message });
  }
};


export const approveDocumentVerifiedByPreparer = async (req, res) => {
  try {
    const docId = parseInt(req.params.docId);
    const result = await adminService.approveDocument(docId, req.user.id);

    res.status(200).json({ success: true, message: 'Document approved', document: result });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to approve document', error: err.message });
  }
};

export const rejectDocumentVerifiedByPreparer = async (req, res) => {
  try {
    const docId = parseInt(req.params.docId);
    const { reason } = req.body;

    const result = await adminService.rejectDocument(docId, req.user.id, reason);
    res.status(200).json({ success: true, message: 'Document rejected', result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const updateInsightRecommendations = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const { content } = req.body;
    const files = req.files || [];

    const result = await adminService.updateInsightRecommendations(userId, content, files);
    res.status(200).json({ success: true, message: 'Recommendation updated', result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getInsightHistory = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const insights = await adminService.getInsightHistory(userId);
    res.status(200).json({ success: true, insights });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch insight history', error: err.message });
  }
};

export const sendGlobalNotification = async (req, res) => {
  try {
    const { title, message } = req.body;
    const result = await adminService.sendGlobalNotification(title, message);
    res.status(200).json({ success: true, message: 'Notification sent to all users', count: result });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to send notification', error: err.message });
  }
};

export const getBroadcastMessages = async (_req, res) => {
  try {
    const broadcasts = await adminService.getBroadcastMessages();
    res.status(200).json({ success: true, broadcasts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch messages', error: err.message });
  }
};

export const getAllChats = async (_req, res) => {
  try {
    const chats = await adminService.getAllChats();
    res.status(200).json({ success: true, chats });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch chats', error: err.message });
  }
};
export const getNotifications = async (_req, res) => {
  try {
    const notifications = await adminService.getAdminNotifications();
    res.status(200).json({ success: true, notifications });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch notifications', error: err.message });
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updated = await adminService.markNotificationAsRead(id);
    res.status(200).json({ success: true, message: 'Notification marked as read', notification: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update notification', error: err.message });
  }
};
export const getCalendarActions = async (_req, res) => {
  try {
    const actions = await adminService.getCalendarActions();
    res.status(200).json({ success: true, actions });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch calendar actions', error: err.message });
  }
};
export const updateCalendarActions = async (req, res) => {
  try {
    const actionId = parseInt(req.params.actionId);
    const updated = await adminService.updateCalendarAction(actionId, req.body);
    res.status(200).json({ success: true, message: 'Action updated', updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update action', error: err.message });
  }
};
export const getTodaysCalendarActions = async (_req, res) => {
  try {
    const actions = await adminService.getTodaysCalendarActions();
    res.status(200).json({ success: true, actions });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch today\'s tasks', error: err.message });
  }
};
export const getIncorporationsForReview = async (_req, res) => {
  try {
    const list = await adminService.getIncorporationsForReview();
    res.status(200).json({ success: true, companies: list });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch incorporations', error: err.message });
  }
};

export const updateIncorporationStatus = async (req, res) => {
  try {
    const incorporationId = parseInt(req.params.incorporationId);
    const { newStatus, remarks } = req.body;

    const updated = await adminService.updateIncorporationStatus(incorporationId, newStatus, remarks, req.user.id);

    res.status(200).json({ success: true, message: 'Status updated', company: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update status', error: err.message });
  }
};
export const generateInvoice = async (req, res) => {
  try {
    const incorporationId = parseInt(req.params.incorporationId);
    const result = await adminService.generateInvoice(incorporationId, req.user.id);
    res.status(200).json({ success: true, invoice: result });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to generate invoice', error: err.message });
  }
};
export const getCompanyActivityLog = async (req, res) => {
  try {
    const companyId = parseInt(req.params.companyId);
    const logs = await adminService.getCompanyActivityLog(companyId);
    res.status(200).json({ success: true, logs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch activity log', error: err.message });
  }
};
export const lockCompanyDashboard = async (req, res) => {
  try {
    const companyId = parseInt(req.params.companyId);
    const result = await adminService.lockCompanyDashboard(companyId, req.user.id);
    res.status(200).json({ success: true, message: 'Company dashboard locked', result });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to lock dashboard', error: err.message });
  }
};

export const assignApproverToPreparer = async (req, res) => {
  try {
    const { preparerId, approverId } = req.body;
    const result = await adminService.assignApproverToPreparer(preparerId, approverId, req.user.id);
    res.status(200).json({ success: true, message: 'Approver assigned to Preparer', result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
export const assignPreparerToClient = async (req, res) => {
  try {
    const { clientId, preparerId } = req.body;
    const result = await adminService.assignPreparerToClient(clientId, preparerId, req.user.id);
    res.status(200).json({ success: true, message: 'Preparer assigned to client', result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
export const getSignedDocuments = async (_req, res) => {
  try {
    const documents = await adminService.getSignedDocuments();
    res.status(200).json({ success: true, documents });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch signed documents', error: err.message });
  }
};

export const getAuditLogs = async (_req, res) => {
  try {
    const logs = await adminService.getAuditLogs();
    res.status(200).json({ success: true, logs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch logs', error: err.message });
  }
};

export const getSystemSummary = async (_req, res) => {
  try {
    const summary = await adminService.getSystemSummary();
    res.status(200).json({ success: true, summary });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch system summary', error: err.message });
  }
};
export const exportSystemSummary = async (_req, res) => {
  try {
    const summary = await adminService.getSystemSummary();

    const csv = [
      ['Metric', 'Count'],
      ['Total Users', summary.totalUsers],
      ['Total Companies', summary.totalCompanies],
      ['Total Payments', summary.totalPayments],
      ['Total Documents', summary.totalDocuments]
    ]
      .map(row => row.join(','))
      .join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=system-summary.csv');
    res.status(200).send(csv);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to export summary', error: err.message });
  }
};
  