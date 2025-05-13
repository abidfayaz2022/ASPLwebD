import prisma from '../lib/prismaClient.js';
import { CompanyStatus } from '../constants/companyStatus.js';
import { Roles } from '../constants/roles.js';
import { uploadFilesToS3 } from '../utils/s3Uploader.js';

export const getPreparerDashboardData = async (userId) => {
  const assignedCompanies = await prisma.roleAssignment.findMany({
    where: { agentId: userId, role: Roles.PREPARER },
    include: {
      company: {
        select: {
          companyId: true,
          companyName: true,
          status: true,
          createdAt: true
        }
      }
    }
  });

  return {
    assignedCount: assignedCompanies.length,
    companies: assignedCompanies.map(c => c.company)
  };
};

export const getAssignedUsers = async (preparerId) => {
  const assignments = await prisma.roleAssignment.findMany({
    where: { agentId: preparerId, role: Roles.PREPARER },
    include: {
      company: {
        include: {
          user: {
            select: { id: true, username: true, email: true }
          }
        }
      }
    }
  });

  return assignments.map(a => a.company.user);
};

export const receiveKyc = async (userId, formType, filePath, preparerId) => {
  const company = await prisma.company.findFirst({
    where: { userId: parseInt(userId) }
  });
  if (!company) throw new Error('Company not found for user');

  return prisma.companyDocument.create({
    data: {
      companyId: company.companyId,
      documentLabel: formType,
      documentType: 'PDF',
      documentPath: filePath,
      purpose: 'KYC',
      uploadedBy: preparerId,
      uploadedRole: Roles.PREPARER,
      uploadedFor: parseInt(userId),
      uploadedAt: new Date()
    }
  });
};


/**
 * Creates an insight recommendation and optionally uploads sample docs to S3.
 * @param {Number} userId - Target user ID
 * @param {String} content - Insight text content
 * @param {Array} files - Uploaded files from multer
 * @param {String} folder - S3 folder path (defaults to per-user path)
 */
export const updateRecommendations = async (userId, content, files = [], folder = null) => {
  const safeUserId = parseInt(userId);
  const uploadFolder = folder || `users/${safeUserId}/insights`;

  const uploadedUrls = files.length > 0 ? await uploadFilesToS3(files, uploadFolder) : [];

  return prisma.insightRecommendation.create({
    data: {
      userId: safeUserId,
      content,
      sampleDocUrls: uploadedUrls
    }
  });
};

export const notifyUser = async (userId, title, message) => {
  return prisma.notification.create({
    data: {
      userId: parseInt(userId),
      title,
      message,
      isRead: false
    }
  });
};


export const updateCalendar = async (userId, { title, dueDate, notes }, preparerId) => {
  const company = await prisma.company.findFirst({
    where: { userId: parseInt(userId) }
  });

  if (!company) throw new Error('Company not found');

  const validDueDate = new Date(dueDate);
  if (isNaN(validDueDate.getTime())) {
    throw new Error('Invalid due date');
  }

  return prisma.calendarAction.create({
    data: {
      title,
      dueDate: validDueDate,
      notes,
      userId: parseInt(userId),
      companyId: company.companyId,
      status: 'Pending',
      createdBy: preparerId,
      createdByRole: Roles.PREPARER
    }
  });
};


export const sendFormToApprover = async (companyId, remarks, preparerId) => {
  return prisma.$transaction(async (tx) => {
    const company = await tx.company.update({
      where: { companyId: parseInt(companyId) },
      data: { status: CompanyStatus.PreparerApproved, statusRemarks: remarks }
    });

    await tx.companyStatusMessage.create({
      data: {
        companyId: company.companyId,
        senderId: preparerId,
        senderRole: Roles.PREPARER,
        fromStatus: CompanyStatus.Submitted,
        toStatus: CompanyStatus.PreparerApproved,
        message: remarks
      }
    });

    await tx.notification.create({
      data: {
        userId: company.userId,
        title: 'Form Sent to Approver',
        message: 'Your form has been verified by the Preparer and sent for approval.',
        isRead: false
      }
    });

    return company;
  });
};


export const verifyClientDocument = async (docId, preparerId) => {
  const doc = await prisma.companyDocument.findUnique({
    where: { id: docId },
    include: {
      company: {
        include: {
          roleAssignments: true // to validate preparer
        }
      }
    }
  });

  if (!doc) throw new Error('Document not found');

  const isAssignedPreparer = doc.company.roleAssignments.some(
    (assignment) => assignment.agentId === preparerId && assignment.role === Roles.PREPARER
  );

  if (!isAssignedPreparer) {
    throw new Error('You are not assigned as the preparer for this company');
  }

  if (doc.isVerified) {
    throw new Error('Document is already verified');
  }

  return prisma.companyDocument.update({
    where: { id: docId },
    data: {
      isVerified: true
    }
  });
};
