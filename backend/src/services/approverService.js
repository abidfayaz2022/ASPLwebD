import prisma from '../lib/prismaClient.js';
import { CompanyStatus } from '../constants/companyStatus.js';
import { Roles } from '../constants/roles.js';


export const getApproverDashboardData = async () => {
  const companiesToReview = await prisma.company.findMany({
    where: { status: CompanyStatus.PreparerApproved },
    orderBy: { createdAt: 'desc' },
    select: {
      companyId: true,
      companyName: true,
      status: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          username: true,
          email: true
        }
      }
    }
  });

  const recentApprovals = await prisma.company.findMany({
    where: { status: CompanyStatus.ApproverApproved },
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: {
      companyId: true,
      companyName: true,
      status: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          username: true,
          email: true
        }
      }
    }
  });

  return {
    companiesToReview,
    recentApprovals
  };
};

export const getAllDashboards = async () => {
  const users = await prisma.user.findMany({
    where: { role: Roles.CLIENT },
    select: { id: true, username: true, email: true }
  });
  const preparers = await prisma.user.findMany({
    where: { role: Roles.PREPARER },
    select: { id: true, username: true, email: true }
  });

  return { users, preparers };
};

export const assignAgent = async (userId, agentId, role) => {
  const existing = await prisma.roleAssignment.findFirst({
    where: { company: { userId: parseInt(userId) }, role }
  });

  if (existing) {
    throw new Error('Agent already assigned');
  }

  const company = await prisma.company.findFirst({ where: { userId: parseInt(userId) } });
  if (!company) throw new Error('Company not found for user');

  return prisma.roleAssignment.create({
    data: {
      companyId: company.companyId,
      agentId: parseInt(agentId),
      role
    }
  });
};

export const approveDocuments = async (companyId, approverId, remarks) => {
  return prisma.$transaction(async (tx) => {
    const company = await tx.company.update({
      where: { companyId: parseInt(companyId) },
      data: { status: CompanyStatus.ApproverApproved, statusRemarks: remarks }
    });

    await tx.companyStatusMessage.create({
      data: {
        companyId: company.companyId,
        senderId: approverId,
        senderRole: Roles.APPROVER,
        message: remarks,
        fromStatus: CompanyStatus.PreparerApproved,
        toStatus: CompanyStatus.ApproverApproved
      }
    });

    await tx.notification.create({
      data: {
        userId: company.userId,
        title: 'Company Approved',
        message: `Your company ${company.companyName} has been approved by the Approver.`,
        isRead: false
      }
    });

    return company;
  });
};

export const notifyAllUsers = async (title, message) => {
  const users = await prisma.user.findMany({ where: { role: Roles.CLIENT } });
  const notifications = users.map((user) => ({
    userId: user.id,
    title,
    message,
    isRead: false
  }));

  await prisma.notification.createMany({ data: notifications });
  return notifications.length;
};

export const updateRecommendations = async (userId, content) => {
  return prisma.insightRecommendation.create({
    data: {
      userId: parseInt(userId),
      content
    }
  });
};
