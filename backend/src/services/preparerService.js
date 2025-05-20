import prisma from '../lib/prismaClient.js';
import { CompanyStatus } from '../constants/companyStatus.js';
import { Roles } from '../constants/roles.js';
import { uploadFilesToS3 } from '../utils/s3Uploader.js';



export const getPreparerDashboardData = async (preparerId) => {
  // 1. Assigned companies
  const companyAssignments = await prisma.companyAssignment.findMany({
    where: { preparerId },
    include: {
      company: {
        select: {
          companyId: true,
          companyName: true,
          status: true,
          createdAt: true,
          user: {
            select: { id: true, username: true, email: true }
          }
        }
      }
    }
  });

  const assignedCompanies = companyAssignments.map(a => a.company);

  // 2. Approver info
  const approverDelegation = await prisma.roleDelegation.findFirst({
    where: {
      delegateeId: preparerId,
      delegatedRole: 'preparer'
    },
    include: {
      delegator: {
        select: {
          id: true,
          name: true,
          email: true,
          username: true
        }
      }
    }
  });

  const approverInfo = approverDelegation?.delegator || null;

  // 3. Status counts
  const statusCounts = await prisma.company.groupBy({
    by: ['status'],
    where: {
      companyId: {
        in: assignedCompanies.map(c => c.companyId)
      }
    },
    _count: { status: true }
  });

  const companyStatusSummary = {};
  statusCounts.forEach(s => {
    companyStatusSummary[s.status] = s._count.status;
  });

  // 4. Audit logs by preparer
  const auditLogs = await prisma.auditLog.findMany({
    where: { actorId: preparerId },
    orderBy: { timestamp: 'desc' },
    take: 10,
    select: {
      action: true,
      target: true,
      companyId: true,
      timestamp: true
    }
  });

  // 5. Client users (from companies)
  const clientUsers = assignedCompanies.map(c => ({
    id: c.user.id,
    username: c.user.username,
    email: c.user.email
  }));

  // 6. Calendar stats
  const calendarStats = await prisma.calendarAction.groupBy({
    by: ['status'],
    where: {
      createdBy: preparerId
    },
    _count: true
  });

  const calendarSummary = {};
  calendarStats.forEach(stat => {
    calendarSummary[stat.status] = stat._count;
  });

  // 6.1 Overdue tasks (incomplete + dueDate < now)
  const overdueTasks = await prisma.calendarAction.count({
    where: {
      createdBy: preparerId,
      dueDate: { lt: new Date() },
      status: { not: 'Completed' }
    }
  });

  // 7. Notifications
  const unreadNotifications = await prisma.notification.count({
    where: {
      userId: preparerId,
      isRead: false
    }
  });

  return {
    approver: approverInfo,
    assignedCount: assignedCompanies.length,
    companies: assignedCompanies,
    statusSummary: companyStatusSummary,
    recentAuditLogs: auditLogs,
    clientUsers,
    calendarSummary,
    overdueTaskCount: overdueTasks,
    unreadNotificationCount: unreadNotifications
  };
};

export const getAssignedUsers = async (preparerId) => {
  const assignments = await prisma.companyAssignment.findMany({
    where: { preparerId },
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
          companyAssignments: true
        }
      }
    }
  });

  if (!doc) throw new Error('Document not found');

  const isAssignedPreparer = doc.company.companyAssignments.some(
    (assignment) => assignment.preparerId === preparerId
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
