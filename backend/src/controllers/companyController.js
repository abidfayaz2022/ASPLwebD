import * as companyService from '../services/companyService.js';
import prisma from '../lib/prismaClient.js';




/**
 * Admin toggles canEdit flag for a company
 * PUT /admin/company/:id/edit-lock
 */
export const toggleCompanyEditPermissions = async (req, res) => {
  try {
    const companyId = parseInt(req.params.id);
    const { canEditC, canEditD, canEditS } = req.body;

    // Validate input
    const invalidKeys = [canEditC, canEditD, canEditS].filter(
      val => val !== undefined && typeof val !== 'boolean'
    );
    if (invalidKeys.length > 0) {
      return res.status(400).json({ success: false, message: 'All flags must be boolean if provided' });
    }

    const updatePayload = {};
    if (typeof canEditC === 'boolean') updatePayload.canEditC = canEditC;
    if (typeof canEditD === 'boolean') updatePayload.canEditD = canEditD;
    if (typeof canEditS === 'boolean') updatePayload.canEditS = canEditS;

    if (Object.keys(updatePayload).length === 0) {
      return res.status(400).json({ success: false, message: 'No valid flags provided for update' });
    }

    const updated = await prisma.company.update({
      where: { companyId },
      data: updatePayload
    });

    res.json({
      success: true,
      message: 'Edit flags updated successfully',
      updated
    });
  } catch (err) {
    console.error('Toggle company edit flags error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};









/**
 * Get all companies with pagination and filtering
 * @route GET /api/companies
 * @access Authenticated
 */
export const getAllCompanies = async (req, res) => {
  try {
    // Admin can see all companies, regular users only see their own
    const userId = req.user.role === 'Admin' ? null : req.user.id;
    const result = await companyService.getAllCompanies(req.query, userId);
    
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching companies',
      error: error.message
    });
  }
};

/**
 * Get a company by ID
 * @route GET /api/companies/:companyId
 * @access Authenticated
 */
export const getCompanyById = async (req, res) => {
  try {
    const { companyId } = req.params;
    
    try {
      const company = await companyService.getCompanyById(
        companyId, 
        req.user.id, 
        req.user.role
      );
      
      res.json({
        success: true,
        company
      });
    } catch (error) {
      if (error.message === 'Company not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      } else if (error.message === 'Unauthorized access to company data') {
        return res.status(403).json({
          success: false,
          message: error.message
        });
      }
      throw error;
    }
  } catch (error) {
    console.error('Error fetching company:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching company',
      error: error.message
    });
  }
};

/**
 * Create a new company
 * @route POST /api/companies
 * @access Authenticated
 */
export const createCompany = async (req, res) => {
  try {
    const companyData = req.body;
    
    // Validate required fields
    const requiredFields = [
      'companyName', 
      'registrationDate', 
      'addressLine1', 
      'country', 
      'postalCode',
      'proposedShares',
      'currency',
      'proposedShareCapital',
      'businessActivity1',
      'businessActivity1Desc'
    ];
    
    const missingFields = requiredFields.filter(field => !companyData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        fields: missingFields
      });
    }
    
    try {
      const newCompany = await companyService.createCompany(companyData, req.user.id);
      
      res.status(201).json({
        success: true,
        message: 'Company created successfully',
        company: newCompany
      });
    } catch (error) {
      if (error.message === 'Company name already registered') {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      throw error;
    }
  } catch (error) {
    console.error('Error creating company:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating company',
      error: error.message
    });
  }
};

/**
 * Update a company
 * @route PUT /api/companies/:companyId
 * @access Authenticated
 */
export const updateCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const companyData = req.body;
    
    try {
      const updatedCompany = await companyService.updateCompany(
        companyId, 
        companyData, 
        req.user.id,
        req.user.role
      );
      
      res.json({
        success: true,
        message: 'Company updated successfully',
        company: updatedCompany
      });
    } catch (error) {
      if (error.message === 'Company not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      } else if (error.message === 'Unauthorized to update company data') {
        return res.status(403).json({
          success: false,
          message: error.message
        });
      } else if (error.message === 'Company name already registered') {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      throw error;
    }
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating company',
      error: error.message
    });
  }
};

/**
 * Delete a company
 * @route DELETE /api/companies/:companyId
 * @access Authenticated
 */
export const deleteCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    
    try {
      await companyService.deleteCompany(
        companyId, 
        req.user.id,
        req.user.role
      );
      
      res.json({
        success: true,
        message: 'Company deleted successfully'
      });
    } catch (error) {
      if (error.message === 'Company not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      } else if (error.message === 'Unauthorized to delete company') {
        return res.status(403).json({
          success: false,
          message: error.message
        });
      }
      throw error;
    }
  } catch (error) {
    console.error('Error deleting company:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting company',
      error: error.message
    });
  }
};

/**
 * Get company dashboard
 * @route GET /api/companies/:companyId/dashboard
 * @access Authenticated
 */
export const getCompanyDashboard = async (req, res) => {
  try {
    const { companyId } = req.params;
    
    // First validate the user has access to this company
    try {
      // Check access
      await companyService.getCompanyById(
        companyId, 
        req.user.id, 
        req.user.role
      );
      
      // Get dashboard data
      const dashboardData = await companyService.getCompanyDashboard(companyId);
      
      res.json({
        success: true,
        dashboard: dashboardData
      });
    } catch (error) {
      if (error.message === 'Company not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      } else if (error.message === 'Unauthorized access to company data') {
        return res.status(403).json({
          success: false,
          message: error.message
        });
      }
      throw error;
    }
  } catch (error) {
    console.error('Error fetching company dashboard:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching company dashboard',
      error: error.message
    });
  }
};

/**
 * Add a director to a company
 * @route POST /api/companies/:companyId/directors
 * @access Authenticated
 */
export const addDirector = async (req, res) => {
  try {
    const { companyId } = req.params;
    const directorData = req.body;
    
    // Validate required fields
    const requiredFields = [
      'directorName', 
      'email', 
      'addressLine1', 
      'country', 
      'postalCode',
      'contactNumber',
      'nationality',
      'idType',
      'idNumber',
      'idExpiryDate',
      'dateOfBirth'
    ];
    
    const missingFields = requiredFields.filter(field => !directorData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        fields: missingFields
      });
    }
    
    // Check if user has access to this company
    try {
      // First check access
      await companyService.getCompanyById(
        companyId, 
        req.user.id, 
        req.user.role
      );
      
      // Then add the director
      const newDirector = await companyService.addDirector(companyId, directorData);
      
      res.status(201).json({
        success: true,
        message: 'Director added successfully',
        director: newDirector
      });
    } catch (error) {
      if (error.message === 'Company not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      } else if (error.message === 'Unauthorized access to company data') {
        return res.status(403).json({
          success: false,
          message: error.message
        });
      }
      throw error;
    }
  } catch (error) {
    console.error('Error adding director:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding director',
      error: error.message
    });
  }
};

/**
 * Update a director
 * @route PUT /api/companies/:companyId/directors/:directorId
 * @access Authenticated
 */
export const updateDirector = async (req, res) => {
  try {
    const { companyId, directorId } = req.params;
    const directorData = req.body;
    
    // Check if user has access to this company
    try {
      // First check access
      await companyService.getCompanyById(
        companyId, 
        req.user.id, 
        req.user.role
      );
      
      // Then update the director
      const updatedDirector = await companyService.updateDirector(directorId, directorData);
      
      res.json({
        success: true,
        message: 'Director updated successfully',
        director: updatedDirector
      });
    } catch (error) {
      if (error.message === 'Company not found' || error.message === 'Director not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      } else if (error.message === 'Unauthorized access to company data') {
        return res.status(403).json({
          success: false,
          message: error.message
        });
      }
      throw error;
    }
  } catch (error) {
    console.error('Error updating director:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating director',
      error: error.message
    });
  }
};

/**
 * Delete a director
 * @route DELETE /api/companies/:companyId/directors/:directorId
 * @access Authenticated
 */
export const deleteDirector = async (req, res) => {
  try {
    const { companyId, directorId } = req.params;
    
    // Check if user has access to this company
    try {
      // First check access
      await companyService.getCompanyById(
        companyId, 
        req.user.id, 
        req.user.role
      );
      
      // Then delete the director
      await companyService.deleteDirector(directorId);
      
      res.json({
        success: true,
        message: 'Director deleted successfully'
      });
    } catch (error) {
      if (error.message === 'Company not found' || error.message === 'Director not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      } else if (error.message === 'Unauthorized access to company data') {
        return res.status(403).json({
          success: false,
          message: error.message
        });
      }
      throw error;
    }
  } catch (error) {
    console.error('Error deleting director:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting director',
      error: error.message
    });
  }
};

/**
 * Add a shareholder to a company
 * @route POST /api/companies/:companyId/shareholders
 * @access Authenticated
 */
export const addShareholder = async (req, res) => {
  try {
    const { companyId } = req.params;
    const shareholderData = req.body;
    
    // Validate required fields
    const requiredFields = [
      'shareholderName', 
      'email', 
      'type',
      'addressLine1', 
      'country', 
      'postalCode',
      'contactNumber',
      'nationality',
      'idType',
      'idNumber',
      'idExpiryDate',
      'dateOfBirth',
      'numberOfShares',
      'shareCapitalAllocation'
    ];
    
    const missingFields = requiredFields.filter(field => !shareholderData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        fields: missingFields
      });
    }
    
    // Check if user has access to this company
    try {
      // First check access
      await companyService.getCompanyById(
        companyId, 
        req.user.id, 
        req.user.role
      );
      
      // Then add the shareholder
      const newShareholder = await companyService.addShareholder(companyId, shareholderData);
      
      res.status(201).json({
        success: true,
        message: 'Shareholder added successfully',
        shareholder: newShareholder
      });
    } catch (error) {
      if (error.message === 'Company not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      } else if (error.message === 'Unauthorized access to company data') {
        return res.status(403).json({
          success: false,
          message: error.message
        });
      }
      throw error;
    }
  } catch (error) {
    console.error('Error adding shareholder:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding shareholder',
      error: error.message
    });
  }
};

/**
 * Update a shareholder
 * @route PUT /api/companies/:companyId/shareholders/:shareholderId
 * @access Authenticated
 */
export const updateShareholder = async (req, res) => {
  try {
    const { companyId, shareholderId } = req.params;
    const shareholderData = req.body;
    
    // Check if user has access to this company
    try {
      // First check access
      await companyService.getCompanyById(
        companyId, 
        req.user.id, 
        req.user.role
      );
      
      // Then update the shareholder
      const updatedShareholder = await companyService.updateShareholder(shareholderId, shareholderData);
      
      res.json({
        success: true,
        message: 'Shareholder updated successfully',
        shareholder: updatedShareholder
      });
    } catch (error) {
      if (error.message === 'Company not found' || error.message === 'Shareholder not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      } else if (error.message === 'Unauthorized access to company data') {
        return res.status(403).json({
          success: false,
          message: error.message
        });
      }
      throw error;
    }
  } catch (error) {
    console.error('Error updating shareholder:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating shareholder',
      error: error.message
    });
  }
};

/**
 * Delete a shareholder
 * @route DELETE /api/companies/:companyId/shareholders/:shareholderId
 * @access Authenticated
 */
export const deleteShareholder = async (req, res) => {
  try {
    const { companyId, shareholderId } = req.params;
    
    // Check if user has access to this company
    try {
      // First check access
      await companyService.getCompanyById(
        companyId, 
        req.user.id, 
        req.user.role
      );
      
      // Then delete the shareholder
      await companyService.deleteShareholder(shareholderId);
      
      res.json({
        success: true,
        message: 'Shareholder deleted successfully'
      });
    } catch (error) {
      if (error.message === 'Company not found' || error.message === 'Shareholder not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      } else if (error.message === 'Unauthorized access to company data') {
        return res.status(403).json({
          success: false,
          message: error.message
        });
      }
      throw error;
    }
  } catch (error) {
    console.error('Error deleting shareholder:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting shareholder',
      error: error.message
    });
  }
};

/**
 * Add a service to a company
 * @route POST /api/companies/:companyId/services/:serviceId
 * @access Authenticated
 */
export const addCompanyService = async (req, res) => {
  try {
    const { companyId, serviceId } = req.params;
    
    // Check if user has access to this company
    try {
      // First check access
      await companyService.getCompanyById(
        companyId, 
        req.user.id, 
        req.user.role
      );
      
      // Then add the service
      const newCompanyService = await companyService.addCompanyService(companyId, serviceId);
      
      res.status(201).json({
        success: true,
        message: 'Service added to company successfully',
        service: newCompanyService
      });
    } catch (error) {
      if (error.message === 'Company not found' || error.message === 'Service not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      } else if (error.message === 'Unauthorized access to company data') {
        return res.status(403).json({
          success: false,
          message: error.message
        });
      } else if (error.message === 'Service already added to company') {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      throw error;
    }
  } catch (error) {
    console.error('Error adding service to company:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding service to company',
      error: error.message
    });
  }
};

/**
 * Remove a service from a company
 * @route DELETE /api/companies/:companyId/services/:serviceId
 * @access Authenticated
 */
export const removeCompanyService = async (req, res) => {
  try {
    const { companyId, serviceId } = req.params;
    
    // Check if user has access to this company
    try {
      // First check access
      await companyService.getCompanyById(
        companyId, 
        req.user.id, 
        req.user.role
      );
      
      // Then remove the service
      await companyService.removeCompanyService(companyId, serviceId);
      
      res.json({
        success: true,
        message: 'Service removed from company successfully'
      });
    } catch (error) {
      if (error.message === 'Company not found' || error.message === 'Service not associated with company') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      } else if (error.message === 'Unauthorized access to company data') {
        return res.status(403).json({
          success: false,
          message: error.message
        });
      }
      throw error;
    }
  } catch (error) {
    console.error('Error removing service from company:', error);
    res.status(500).json({
      success: false,
      message: 'Error removing service from company',
      error: error.message
    });
  }
}; 