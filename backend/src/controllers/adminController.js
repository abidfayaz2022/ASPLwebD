import * as adminService from "../services/adminService.js";
import { hashPassword } from '../utils/passwordUtils.js';
import { generateRandomPassword } from '../utils/passwordGenerator.js';
import prisma from '../lib/prismaClient.js';


export const getAdminDashboard = async (req, res) => {
  try {
    const dashboardData = await adminService.getAdminDashboardData();
    
    res.json({
      success: true,
      dashboard: dashboardData
    });
  } catch (error) {
    console.error('Error getting admin dashboard:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting admin dashboard',
      error: error.message
    });
  }
};

/**
 * Get all users (with pagination)
 * @route GET /api/admin/users
 * @access Admin only
 */
//2. Get all users (with pagination)
export const getAllUsers = async (req, res) => {
  try {
    const result = await adminService.getAllUsers(req.query);
    
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};

/**
 * Create a new user account with a generated password
 * @route POST /api/admin/users
 * @access Admin only
 */
export const createUser = async (req, res) => {
  try {
    const { username, email, mobile, country, role } = req.body;

    // Validate required fields
    if (!username || !email || !mobile || !country || !role) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User with this email or username already exists' 
      });
    }

    // Generate a random password
    const generatedPassword = generateRandomPassword(10);
    
    // Hash the password
    const hashedPassword = await hashPassword(generatedPassword);

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        mobile,
        country,
        role,
      },
    });

    // Return success with the generated credentials
    // (In a production app, you would send this via email instead)
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
      credentials: {
        userId: newUser.id,
        password: generatedPassword // Only send this in the response for testing purposes
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      success: false, 
      message: 'Error creating user',
      error: error.message
    });
  }
};

/**
 * Delete a user
 * @route DELETE /api/admin/users/:id
 * @access Admin only
 */
//4. Delete a user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    
    // Delete user
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    
    res.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message,
    });
  }
};

/**
 * Update a user's role
 * @route PUT /api/admin/users/:userId/role
 * @access Admin only
 */
//5. Update a user's role
export const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;
    
    try {
      const updatedUser = await adminService.updateUserRoleById(userId, role);
      
      res.json({
        success: true,
        message: 'User role updated successfully',
        user: updatedUser
      });
    } catch (error) {
      if (error.message === 'Invalid role specified') {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      } else if (error.message === 'User not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      throw error;
    }
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user role',
      error: error.message
    });
  }
};

/**
 * Get incorporations for review
 * @route GET /api/admin/incorporations
 * @access Admin, Preparer, Approver
 */
//6. Get incorporations for review
export const getIncorporationsForReview = async (req, res) => {
  try {
    const result = await adminService.getIncorporationsForReviewData(req.query);
    
    return res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Error fetching incorporations for review:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching incorporations for review',
      error: error.message
    });
  }
};

/**
 * Update incorporation status
 * @route PUT /api/admin/incorporation/:incorporationId/status
 * @access Admin, Preparer, Approver
 */
export const updateIncorporationStatus = async (req, res) => {
  try {
    const { incorporationId } = req.params;
    const { status, notes } = req.body;
    
    // Role-based permission checking - for specific status updates that should be restricted by role
    // This is still needed as the middleware only restricts route access, not specific actions
    if (req.user.role === 'preparer' && (status === 'Approved' || status === 'Completed')) {
      return res.status(403).json({
        success: false,
        message: 'Preparers cannot approve or complete incorporations'
      });
    }
    
    try {
      const result = await adminService.updateCompanyIncorporationStatus(
        incorporationId, 
        status, 
        notes, 
        req.user.id, 
        req.user.username
      );
      
      return res.json({
        success: true,
        message: 'Incorporation status updated successfully',
        incorporation: {
          companyId: result.companyId,
          companyName: result.companyName,
          status: result.status
        }
      });
    } catch (error) {
      if (error.message === 'Invalid incorporation ID' || error.message === 'Invalid status specified') {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      } else if (error.message === 'Incorporation not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      throw error;
    }
  } catch (error) {
    console.error('Error updating incorporation status:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating incorporation status',
      error: error.message
    });
  }
};

/**
 * Generate invoice for incorporation
 * @route POST /api/admin/incorporation/:incorporationId/generate-invoice
 * @access Admin only
 */
//8. Generate invoice for incorporation
export const generateInvoice = async (req, res) => {
  try {
    const { incorporationId } = req.params;
    
    try {
      const invoice = await adminService.generateCompanyInvoice(incorporationId);
      
      res.json({
        success: true,
        message: 'Invoice generated successfully',
        invoice
      });
    } catch (error) {
      if (error.message === 'Incorporation not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      throw error;
    }
  } catch (error) {
    console.error('Error generating invoice:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating invoice',
      error: error.message
    });
  }
};

/**
 * Get preparer dashboard data
 * @route GET /api/admin/preparer/dashboard
 * @access Preparer
 */
//9. Get preparer dashboard data
export const getPreparerDashboard = async (req, res) => {
  try {
    const dashboardData = await adminService.getPreparerDashboardData(req.user.id);
    
    res.json({
      success: true,
      dashboard: dashboardData
    });
  } catch (error) {
    console.error('Error getting preparer dashboard:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting preparer dashboard',
      error: error.message
    });
  }
};

/**
 * Get approver dashboard data
 * @route GET /api/admin/approver/dashboard
 * @access Approver
 */
//10. Get approver dashboard data
export const getApproverDashboard = async (req, res) => {
  try {
    const dashboardData = await adminService.getApproverDashboardData();
    
    res.json({
      success: true,
      dashboard: dashboardData
    });
  } catch (error) {
    console.error('Error getting approver dashboard:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting approver dashboard',
      error: error.message
    });
  }
};