import * as clientService from '../services/clientService.js';

export const getClientDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const dashboard = await clientService.fetchClientDashboard(userId);
    res.status(200).json({ success: true, dashboard });
  } catch (error) {
    console.error('Error fetching client dashboard:', error);
    res.status(500).json({ success: false, message: 'Failed to load dashboard' });
  }
};

export const getClientCompanyDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const company = await clientService.fetchCompanyDetails(userId);
    res.status(200).json({ success: true, company });
  } catch (error) {
    console.error('Error fetching company details:', error);
    res.status(500).json({ success: false, message: 'Failed to load company details' });
  }
};

export const getClientDocuments = async (req, res) => {
  try {
    const userId = req.user.id;
    const docs = await clientService.fetchUserDocuments(userId);
    res.status(200).json({ success: true, documents: docs });
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ success: false, message: 'Failed to load documents' });
  }
};

export const getClientNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const notes = await clientService.fetchNotifications(userId);
    res.status(200).json({ success: true, notifications: notes });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ success: false, message: 'Failed to load notifications' });
  }
};

export const getClientInvoices = async (req, res) => {
  try {
    const userId = req.user.id;
    const invoices = await clientService.fetchInvoices(userId);
    res.status(200).json({ success: true, invoices });
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ success: false, message: 'Failed to load invoices' });
  }
};

export const getClientTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const calendar = await clientService.fetchCalendarActions(userId);
    res.status(200).json({ success: true, calendar });
  } catch (error) {
    console.error('Error fetching calendar:', error);
    res.status(500).json({ success: false, message: 'Failed to load calendar' });
  }
};

export const getClientInsights = async (req, res) => {
  try {
    const userId = req.user.id;
    const insights = await clientService.fetchInsights(userId);
    res.status(200).json({ success: true, insights });
  } catch (error) {
    console.error('Error fetching insights:', error);
    res.status(500).json({ success: false, message: 'Failed to load insights' });
  }
};

export const getClientChatAgents = async (req, res) => {
  try {
    const userId = req.user.id;
    const agents = await clientService.fetchAssignedAgents(userId);
    res.status(200).json({ success: true, agents });
  } catch (error) {
    console.error('Error fetching chat agents:', error);
    res.status(500).json({ success: false, message: 'Failed to load chat agents' });
  }
};

export const uploadClientDocument = async (req, res) => {
    try {
      const userId = req.user.id;
      const { purpose, label } = req.body;
      const files = req.files;
  
      if (!files || files.length === 0) {
        return res.status(400).json({ success: false, message: 'No files uploaded' });
      }
  
      const uploaded = await clientService.uploadDocuments(userId, purpose, label, files);
      res.status(200).json({ success: true, message: 'Documents uploaded', uploaded });
    } catch (error) {
      console.error('Error uploading documents:', error);
      res.status(500).json({ success: false, message: 'Upload failed', error: error.message });
    }
  };

  export const uploadFinalCompanyDocuments = async (req, res) => {
    try {
      const userId = req.user.id;
      const files = req.files;
  
      if (!files || files.length === 0) {
        return res.status(400).json({ success: false, message: 'No files uploaded' });
      }
  
      const result = await clientService.uploadFinalDocs(userId, files);
      res.status(200).json({ success: true, uploaded: result });
    } catch (error) {
      console.error('Error uploading final docs:', error);
      res.status(500).json({ success: false, message: 'Upload failed' });
    }
  };
  
  export const updateDirectorDetails = async (req, res) => {
    try {
      const directorId = parseInt(req.params.id);
      const userId = req.user.id;
  
      // Check director edit permission
      await clientService.verifyCompanyEditAccess(userId, 'director');
  
      const updated = await clientService.editDirector(directorId, userId, req.body);
      res.json({ success: true, updated });
    } catch (err) {
      res.status(403).json({ success: false, message: err.message });
    }
  };
  
  export const updateShareholderDetails = async (req, res) => {
    try {
      const shareholderId = parseInt(req.params.id);
      const userId = req.user.id;
  
      // Check shareholder edit permission
      await clientService.verifyCompanyEditAccess(userId, 'shareholder');
  
      const updated = await clientService.editShareholder(shareholderId, userId, req.body);
      res.json({ success: true, updated });
    } catch (err) {
      res.status(403).json({ success: false, message: err.message });
    }
  };
  
  export const updateCompanyOtherFields = async (req, res) => {
    try {
      const userId = req.user.id;
  
      // Check company field edit permission
      await clientService.verifyCompanyEditAccess(userId, 'company');
  
      const updated = await clientService.editCompanyOtherDetails(userId, req.body);
      res.json({ success: true, updated });
    } catch (err) {
      res.status(403).json({ success: false, message: err.message });
    }
  };


export const replaceUploadedDocument = async (req, res) => {
  try {
    const userId = req.user.id;
    const docId = parseInt(req.params.id);
    const file = req.file;

    if (!file) {
      return res.status(400).json({ success: false, message: 'No file provided' });
    }

    const updated = await clientService.replaceDocument(userId, docId, file);

    res.json({
      success: true,
      message: 'Document replaced successfully',
      document: updated
    });
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
};

  
  export const markNotificationRead = async (req, res) => {
    try {
      const notificationId = parseInt(req.params.id);
      const userId = req.user.id;
  
      const result = await clientService.markNotificationAsRead(notificationId, userId);
  
      res.json({
        success: true,
        message: 'Notification marked as read',
        notification: result
      });
    } catch (error) {
      res.status(403).json({ success: false, message: error.message });
    }
  };

  export const deleteClientDocument = async (req, res) => {
    try {
      const docId = parseInt(req.params.id);
      const userId = req.user.id;
  
      const result = await clientService.deleteDocument(docId, userId);
      res.json({ success: true, message: 'Document deleted', result });
    } catch (error) {
      console.error('Delete failed:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
