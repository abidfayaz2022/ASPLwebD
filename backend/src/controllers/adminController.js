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