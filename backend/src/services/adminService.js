import prisma from '../lib/prismaClient.js';
// import CompanyStatus from '../constants/companyStatus.js'; // adjust import path if needed
// import { Roles  } from '../constants/roles.js';
import { uploadFileToS3 } from '../utils/s3Uploader.js';

import sendEmail from '../utils/email.js';
import { generateUniqueUsername } from '../utils/usernameGenerator.js';
import { generateRandomPassword } from '../utils/passwordGenerator.js';
import { hashPassword } from '../utils/passwordUtils.js';


export const getAdminDashboard = async () => {
  const [users, companies, docs, logs] = await Promise.all([
    prisma.user.count(),
    prisma.company.count(),
    prisma.companyDocument.count(),
    prisma.auditLog.count()
  ]);

  return {
    totalUsers: users,
    totalCompanies: companies,
    totalDocuments: docs,
    totalAuditLogs: logs
  };
};


export const getSystemHealthMetrics = async () => {
  const [userCounts, companyCounts, documentCount, taskCount] = await Promise.all([
    prisma.user.groupBy({
      by: ['role'],
      _count: { role: true }
    }),

    prisma.company.groupBy({
      by: ['status'],
      _count: { status: true }
    }),

    prisma.companyDocument.count(),

    prisma.calendarAction.count()
  ]);

  const userStats = {};
  userCounts.forEach((u) => {
    userStats[u.role] = u._count.role;
  });

  const companyStats = {};
  companyCounts.forEach((c) => {
    companyStats[c.status] = c._count.status;
  });

  return {
    totalUsers: Object.values(userStats).reduce((sum, val) => sum + val, 0),
    userStats,
    totalCompanies: Object.values(companyStats).reduce((sum, val) => sum + val, 0),
    companyStats,
    totalDocuments: documentCount,
    totalCalendarTasks: taskCount
  };
};

export const getAllUsers = async () => {
  return prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      role: true,
      isVerified: true,
      isSuspended: true,
      isDeleted: true,
      createdAt: true
    }
  });
};

export const getUserDashboard = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      companies: true,
      uploadedDocs: true,
      notifications: true
    }
  });

  if (!user) throw new Error('User not found');

  return user;
};


export const updateUserRole = async (userId, newRole) => {
  return prisma.user.update({
    where: { id: userId },
    data: { role: newRole }
  });
};

export const blockUser = async (userId) => {
  return prisma.user.update({
    where: { id: userId },
    data: { isDeactivated: true }
  });
};

export const deleteUser = async (userId) => {
  return prisma.user.update({
    where: { id: userId },
    data: { isDeleted: true }
  });
};


export const createUser = async ({ email, mobile, country, role, name }) => {
  const username = await generateUniqueUsername(email);
  const plainPassword = generateRandomPassword();

  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] }
  });

  if (existingUser) throw new Error('User with this email or username already exists');

  const hashed = await hashPassword(plainPassword);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashed,
      mobile: String(mobile),
      country,
      role: role,
      name
    }
  });

  // Send welcome email with credentials
  await sendEmail({
    to: email,
    subject: 'Your account has been created',
    html: `
      <h2>Welcome to the Platform!</h2>
      <p>Here are your login credentials:</p>
      <ul>
        <li><strong>Username:</strong> ${username}</li>
        <li><strong>Password:</strong> ${plainPassword}</li>
      </ul>
      <p>Please log in and change your password after first login.</p>
    `
  });

  return user;
};


export const updateUser = async (userId, updates) => {
  const notifyFields = ['username', 'password'];
  const shouldNotify = notifyFields.some((f) => f in updates);

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error('User not found');

  const updateData = { ...updates };

  if (updates.password) {
    updateData.password = await hashPassword(updates.password);
  }

  if (updates.mobile) {
    updateData.mobile = String(updates.mobile);
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: updateData
  });

  if (shouldNotify) {
    await sendEmail({
      to: updatedUser.email,
      subject: 'Your account has been updated',
      html: `
        <p>Your account information has been updated.</p>
        <ul>
          ${updates.username ? `<li><strong>New Username:</strong> ${updates.username}</li>` : ''}
          ${updates.password ? `<li><strong>Password:</strong> (Your password has been reset)</li>` : ''}
        </ul>
        <p>If you did not request this, please contact support immediately.</p>
      `
    });
  }

  return updatedUser;
};



export const exportAuditLogs = async ({ companyId, userId }) => {
  const where = {};

  if (companyId) {
    where.companyId = parseInt(companyId);
  }

  if (userId) {
    where.actorId = parseInt(userId);
  }

  const logs = await prisma.auditLog.findMany({
    where,
    orderBy: { timestamp: 'desc' },
    select: {
      id: true,
      action: true,
      target: true,
      role: true,
      timestamp: true,
      companyId: true,
      actor: {
        select: { id: true, name: true, email: true }
      }
    }
  });

  return logs;
};


export const getAllUploadedDocuments = async ({ companyId, uploadedBy, purpose, isVerified }) => {
  const where = {};

  if (companyId) where.companyId = companyId;
  if (uploadedBy) where.uploadedBy = uploadedBy;
  if (purpose) where.purpose = purpose;
  if (isVerified !== undefined) where.isVerified = isVerified;

  return prisma.companyDocument.findMany({
    where,
    orderBy: { uploadedAt: 'desc' },
    include: {
      company: {
        select: { companyId: true, companyName: true }
      },
      uploader: {
        select: { id: true, name: true, email: true }
      },
      forUser: {
        select: { id: true, username: true, email: true }
      }
    }
  });
};



export const suspendUser = async (userId, suspendMessage) => {
  return prisma.user.update({
    where: { id: userId },
    data: {
      isSuspended: true,
      suspendMessage
    }
  });
};

export const unsuspendUser = async (userId) => {
  return prisma.user.update({
    where: { id: userId },
    data: {
      isSuspended: false,
      suspendMessage: 'Account is not suspended'
    }
  });
};

export const previewCompany = async (companyId) => {
  const company = await prisma.company.findUnique({
    where: { companyId },
    include: {
      user: {
        select: { id: true, username: true, email: true, name: true }
      },
      companyAssignments: {
        include: {
          preparer: { select: { id: true, name: true, email: true } }
        }
      },
      directors: true,
      shareholders: true,
      documents: {
        orderBy: { uploadedAt: 'desc' }
      },
      revertMessage: {
        orderBy: { createdAt: 'desc' }
      },
      auditLogs: {
        orderBy: { timestamp: 'desc' },
        take: 10,
        include: {
          actor: { select: { id: true, name: true, email: true } }
        }
      }
    }
  });

  if (!company) throw new Error('Company not found');

  return {
    companyId: company.companyId,
    companyName: company.companyName,
    status: company.status,
    statusRemarks: company.statusRemarks,
    createdAt: company.createdAt,
    client: company.user,
    assignedPreparers: company.companyAssignments.map(a => a.preparer),
    directors: company.directors,
    shareholders: company.shareholders,
    documents: company.documents,
    statusHistory: company.revertMessage,
    recentAuditLogs: company.auditLogs
  };
};



export const reassignPreparer = async (companyId, newPreparerId, adminId) => {
  return prisma.$transaction(async (tx) => {
    const existingAssignment = await tx.companyAssignment.findFirst({
      where: { companyId }
    });

    if (existingAssignment) {
      await tx.companyAssignment.delete({
        where: { id: existingAssignment.id }
      });
    }

    const newAssignment = await tx.companyAssignment.create({
      data: {
        companyId,
        preparerId: newPreparerId,
        assignedById: adminId
      }
    });

    await tx.auditLog.create({
      data: {
        actorId: adminId,
        role: 'Admin',
        action: 'Reassigned Preparer',
        target: `Company ID ${companyId} → Preparer ID ${newPreparerId}`,
        companyId
      }
    });

    return newAssignment;
  });
};

export const resetCompanyStatus = async (companyId, newStatus, reason, adminId) => {
  return prisma.$transaction(async (tx) => {
    const company = await tx.company.update({
      where: { companyId },
      data: {
        status: newStatus,
        statusRemarks: reason
      }
    });

    await tx.companyStatusMessage.create({
      data: {
        companyId,
        senderId: adminId,
        senderRole: 'Admin',
        message: reason,
        fromStatus: company.status,
        toStatus: newStatus
      }
    });

    await tx.auditLog.create({
      data: {
        actorId: adminId,
        role: 'Admin',
        action: `Manually changed status to ${newStatus}`,
        target: `Company ID ${companyId}`,
        companyId
      }
    });

    return company;
  });
};

export const removeRoleAssignment = async (assignmentId, adminId) => {
  const assignment = await prisma.companyAssignment.findUnique({
    where: { id: assignmentId },
    include: {
      preparer: true,
      company: true
    }
  });

  if (!assignment) {
    throw new Error('Assignment not found');
  }

  await prisma.auditLog.create({
    data: {
      actorId: adminId,
      role: 'Admin',
      action: 'Removed preparer assignment',
      target: `Preparer ${assignment.preparer.name} from Company ${assignment.company.companyName}`,
      companyId: assignment.companyId
    }
  });

  return prisma.companyAssignment.delete({
    where: { id: assignmentId }
  });
};


export const getCompanyDocuments = async ({ companyId, uploadedFor }) => {
  const where = {};
  if (companyId) where.companyId = companyId;
  if (uploadedFor) where.uploadedFor = uploadedFor;

  return prisma.companyDocument.findMany({
    where,
    orderBy: { uploadedAt: 'desc' },
    include: {
      uploader: { select: { id: true, name: true, email: true } },
      forUser: { select: { id: true, username: true, email: true } }
    }
  });
};

export const approveDocument = async (docId, adminId) => {
  const document = await prisma.companyDocument.findUnique({ where: { id: docId } });
  if (!document) throw new Error('Document not found');

  if (!document.isVerified) throw new Error('Document must be verified by preparer first');

  const updated = await prisma.companyDocument.update({
    where: { id: docId },
    data: { isVerified: true } // Already verified, so might be redundant
  });

  await prisma.auditLog.create({
    data: {
      actorId: adminId,
      role: 'Admin',
      action: 'Approved verified document',
      target: `Document ID ${docId}`,
      companyId: document.companyId
    }
  });

  return updated;
};

export const rejectDocument = async (docId, adminId, reason) => {
  const document = await prisma.companyDocument.findUnique({
    where: { id: docId }
  });

  if (!document) throw new Error('Document not found');

  await Promise.all([
    prisma.notification.create({
      data: {
        userId: document.uploadedFor || document.uploadedBy,
        title: 'Document Rejected',
        message: `Your uploaded document "${document.documentLabel}" was rejected. Reason: ${reason}`,
        isRead: false
      }
    }),

    prisma.auditLog.create({
      data: {
        actorId: adminId,
        role: 'Admin',
        action: 'Rejected Document',
        target: `Document ID ${docId} (${document.documentLabel})`,
        companyId: document.companyId
      }
    })
  ]);

  return prisma.companyDocument.update({
    where: { id: docId },
    data: { isVerified: false }
  });
};




export const updateInsightRecommendations = async (userId, content, files = []) => {
  const urls = files.length ? await uploadFileToS3(files, `users/${userId}/insight-recommendations`) : [];

  return prisma.insightRecommendation.create({
    data: {
      userId,
      content,
      sampleDocUrls: urls
    }
  });
};

export const getInsightHistory = async (userId) => {
  return prisma.insightRecommendation.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });
};

export const sendGlobalNotification = async (title, message) => {
  const users = await prisma.user.findMany({
    where: { role: 'client', isDeleted: false }
  });

  const notifications = users.map(user => ({
    userId: user.id,
    title,
    message,
    isRead: false
  }));

  await prisma.notification.createMany({ data: notifications });
  return notifications.length;
};

export const getBroadcastMessages = async () => {
  return prisma.notification.findMany({
    where: {
      user: { role: 'client' }
    },
    orderBy: { createdAt: 'desc' },
    take: 50
  });
};

export const getAllChats = async () => {
  return prisma.chatMessage.findMany({
    orderBy: { sentAt: 'desc' },
    take: 100,
    include: {
      sender: { select: { id: true, name: true, email: true } },
      receiver: { select: { id: true, name: true, email: true } }
    }
  });
};

export const getAdminNotifications = async () => {
  return prisma.notification.findMany({
    where: {
      user: {
        role: 'Admin'
      }
    },
    orderBy: { createdAt: 'desc' }
  });
};
export const markNotificationAsRead = async (id) => {
  return prisma.notification.update({
    where: { id },
    data: { isRead: true }
  });
};


export const getCalendarActions = async () => {
  return prisma.calendarAction.findMany({
    orderBy: { dueDate: 'asc' },
    include: {
      user: { select: { id: true, username: true, email: true } },
      company: { select: { companyId: true, companyName: true } }
    }
  });
};
export const updateCalendarAction = async (id, data) => {
  return prisma.calendarAction.update({
    where: { id },
    data
  });
};
export const getTodaysCalendarActions = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  return prisma.calendarAction.findMany({
    where: {
      dueDate: {
        gte: today,
        lt: tomorrow
      }
    },
    include: {
      company: { select: { companyId: true, companyName: true } },
      user: { select: { id: true, name: true } }
    }
  });
};
export const getIncorporationsForReview = async () => {
  return prisma.company.findMany({
    where: {
      status: 'ApproverApproved'
    },
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { id: true, username: true, email: true } },
      companyAssignments: {
        include: {
          preparer: { select: { id: true, name: true } }
        }
      }
    }
  });
};
export const updateIncorporationStatus = async (companyId, newStatus, remarks, adminId) => {
  return prisma.$transaction(async (tx) => {
    const updated = await tx.company.update({
      where: { companyId },
      data: {
        status: newStatus,
        statusRemarks: remarks
      }
    });

    await tx.companyStatusMessage.create({
      data: {
        companyId,
        senderId: adminId,
        senderRole: 'Admin',
        fromStatus: updated.status,
        toStatus: newStatus,
        message: remarks
      }
    });

    await tx.auditLog.create({
      data: {
        actorId: adminId,
        role: 'Admin',
        action: `Changed incorporation status to ${newStatus}`,
        target: `Company ID ${companyId}`,
        companyId
      }
    });

    return updated;
  });
};
  export const generateInvoice = async (companyId, adminId) => {
  const company = await prisma.company.findUnique({
    where: { companyId },
    include: { companyServices: { include: { service: true } } }
  });

  if (!company || company.companyServices.length === 0) {
    throw new Error('No services assigned to company');
  }

  const total = company.companyServices.reduce((sum, item) => {
    return sum + parseFloat(item.service.cost);
  }, 0);

  const invoice = await prisma.payment.create({
    data: {
      companyId,
      paymentDate: new Date(),
      amount: total,
      currency: 'INR',
      paymentMethod: 'Manual (Generated)',
      paymentStatus: 'Pending',
      paymentReference: `MANUAL_${companyId}_${Date.now()}`,
      services: company.companyServices.map(cs => cs.service.serviceName).join(', ')
    }
  });

  await prisma.auditLog.create({
    data: {
      actorId: adminId,
      role: 'Admin',
      action: 'Generated invoice manually',
      target: `Invoice ID ${invoice.id}`,
      companyId
    }
  });

  return invoice;
};
export const getCompanyActivityLog = async (companyId) => {
  return prisma.auditLog.findMany({
    where: { companyId },
    orderBy: { timestamp: 'desc' },
    include: {
      actor: { select: { id: true, name: true, role: true } }
    }
  });
};
export const lockCompanyDashboard = async (companyId, adminId) => {
  const company = await prisma.company.update({
    where: { companyId },
    data: {
      canEditC: false,
      canEditD: false,
      canEditS: false
    }
  });

  await prisma.auditLog.create({
    data: {
      actorId: adminId,
      role: 'Admin',
      action: 'Locked company dashboard',
      target: `Company ID ${companyId}`,
      companyId
    }
  });

  return company;
};

export const assignApproverToPreparer = async (preparerId, approverId, adminId) => {
  const existing = await prisma.roleDelegation.findFirst({
    where: {
      delegatorId: approverId,
      delegateeId: preparerId,
      delegatedRole: 'preparer'
    }
  });

  if (existing) throw new Error('Preparer is already assigned to this approver');

  return prisma.$transaction(async (tx) => {
    const delegation = await tx.roleDelegation.create({
      data: {
        delegatorId: approverId,
        delegateeId: preparerId,
        delegatedRole: 'preparer'
      }
    });

    await tx.auditLog.create({
      data: {
        actorId: adminId,
        role: 'Admin',
        action: `Assigned Approver ${approverId} to Preparer ${preparerId}`,
        target: `Delegation ID ${delegation.id}`,
      }
    });

    return delegation;
  });
};

export const assignPreparerToClient = async (clientUserId, preparerId, adminId) => {
  const company = await prisma.company.findFirst({
    where: { userId: clientUserId }
  });

  if (!company) throw new Error('No company found for this client');

  const existing = await prisma.companyAssignment.findFirst({
    where: {
      companyId: company.companyId,
      preparerId
    }
  });

  if (existing) throw new Error('Preparer already assigned to this company');

  return prisma.$transaction(async (tx) => {
    const assignment = await tx.companyAssignment.create({
      data: {
        companyId: company.companyId,
        preparerId,
        assignedById: adminId
      }
    });

    await tx.auditLog.create({
      data: {
        actorId: adminId,
        role: 'Admin',
        action: `Assigned Preparer ${preparerId} to Company ${company.companyName}`,
        target: `Company ID ${company.companyId}`,
        companyId: company.companyId
      }
    });

    return assignment;
  });
};

export const getSignedDocuments = async () => {
  return prisma.companyDocument.findMany({
    where: { isVerified: true },
    orderBy: { uploadedAt: 'desc' },
    include: {
      company: { select: { companyId: true, companyName: true } },
      uploader: { select: { id: true, name: true } }
    }
  });
};

export const getAuditLogs = async () => {
  return prisma.auditLog.findMany({
    orderBy: { timestamp: 'desc' },
    take: 100,
    include: {
      actor: { select: { id: true, name: true, role: true } }
    }
  });
};
export const getSystemSummary = async () => {
  const [users, companies, payments, docs] = await Promise.all([
    prisma.user.count(),
    prisma.company.count(),
    prisma.payment.count(),
    prisma.companyDocument.count()
  ]);

  return {
    totalUsers: users,
    totalCompanies: companies,
    totalPayments: payments,
    totalDocuments: docs
  };
};
