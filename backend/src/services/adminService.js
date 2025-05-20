import prisma from '../lib/prismaClient.js';
// import CompanyStatus from '../constants/companyStatus.js'; // adjust import path if needed
// import { Roles  } from '../constants/roles.js';

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