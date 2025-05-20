// middlewares/checkPreparerUserAccess.js
import prisma from '../lib/prismaClient.js';

export const checkPreparerUserAccess = async (req, res, next) => {
  try {
    const preparerId = req.user.id; // Must be set via authentication middleware
    const { userId, companyId } = req.body;

    if (!userId || !companyId) {
      return res.status(400).json({
        success: false,
        message: 'Missing userId or companyId in request'
      });
    }

    const assignment = await prisma.preparerUserAssignment.findFirst({
      where: {
        userId: parseInt(userId),
        preparerId,
        companyId: parseInt(companyId)
      }
    });

    if (!assignment) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: You are not assigned to this user for this company'
      });
    }

    next(); // Allow route to proceed
  } catch (err) {
    console.error('Access check error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
