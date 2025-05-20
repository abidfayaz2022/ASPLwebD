import prisma from '../lib/prismaClient.js';
import { CompanyStatus } from '../constants/companyStatus.js';
import { Roles } from '../constants/roles.js';


export const getApproverDashboardData = async (approverId) => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  // 1. Preparers delegated by this approver
  const preparersUnderApprover = await prisma.roleDelegation.findMany({
    where: {
      delegatorId: approverId,
      delegatedRole: 'preparer'
    },
    include: {
      delegatee: {
        select: { id: true, name: true, email: true }
      }
    }
  });

  const preparerList = preparersUnderApprover.map(p => p.delegatee);
  const preparerIds = preparerList.map(p => p.id);

  // 2. Companies assigned to these preparers
  const assignments = await prisma.companyAssignment.findMany({
    where: {
      preparerId: { in: preparerIds }
    },
    include: {
      company: {
        select: {
          companyId: true,
          companyName: true,
          status: true,
          createdAt: true,
          user: { select: { id: true, username: true, email: true } }
        }
      }
    }
  });

  const assignedCompanies = assignments.map(a => a.company);
  const companyIds = assignedCompanies.map(c => c.companyId);

  // 3. Companies to review (PreparerApproved only from this scope)
  const companiesToReview = assignedCompanies.filter(
    c => c.status === CompanyStatus.PreparerApproved
  );

  // 4. Recent approvals from this scope
  const recentApprovals = assignedCompanies
    .filter(c => c.status === CompanyStatus.ApproverApproved)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  // 5. Clients per preparer
  const clientsPerPreparer = {};
  assignments.forEach(a => {
    if (!clientsPerPreparer[a.preparerId]) {
      clientsPerPreparer[a.preparerId] = [];
    }
    clientsPerPreparer[a.preparerId].push(a.company.user);
  });

  // 6. Preparers without assignments
  const preparersWithoutAssignments = preparerList.filter(p => !clientsPerPreparer[p.id]);

  // 7. Company status summary (only from approver’s companies)
  const statusSummaryRaw = await prisma.company.groupBy({
    by: ['status'],
    where: {
      companyId: { in: companyIds }
    },
    _count: { status: true }
  });

  const companyStatusSummary = {};
  statusSummaryRaw.forEach(s => {
    companyStatusSummary[s.status] = s._count.status;
  });

  // 8. Audit logs (only on relevant companies)
  const recentAuditLogs = await prisma.auditLog.findMany({
    where: {
      actorId: approverId,
      companyId: { in: companyIds }
    },
    orderBy: { timestamp: 'desc' },
    take: 10
  });

  // 9. Unread notifications for this approver
  const unreadNotificationCount = await prisma.notification.count({
    where: {
      userId: approverId,
      isRead: false
    }
  });

  // 10. Preparer performance (companies approved under this approver’s preparers)
  const performanceRaw = await prisma.company.findMany({
    where: {
      companyId: { in: companyIds },
      status: CompanyStatus.ApproverApproved,
      createdAt: { gte: startOfMonth }
    },
    include: {
      companyAssignments: {
        where: { preparerId: { in: preparerIds } },
        select: { preparerId: true }
      }
    }
  });

  const preparerPerformance = {};
  performanceRaw.forEach(c => {
    c.companyAssignments.forEach(a => {
      if (!preparerPerformance[a.preparerId]) {
        preparerPerformance[a.preparerId] = 0;
      }
      preparerPerformance[a.preparerId]++;
    });
  });

  // 11. Upcoming deadlines
  const upcomingDeadlines = await prisma.calendarAction.findMany({
    where: {
      companyId: { in: companyIds },
      dueDate: { gt: now }
    },
    orderBy: { dueDate: 'asc' },
    take: 10,
    select: {
      companyId: true,
      title: true,
      dueDate: true,
      status: true
    }
  });

  return {
    preparersUnderApprover: preparerList,
    clientsPerPreparer,
    preparersWithoutAssignments,
    companiesToReview,
    recentApprovals,
    companyStatusSummary,
    recentAuditLogs,
    unreadNotificationCount,
    preparerPerformance,
    upcomingDeadlines
  };
};

export const getAllPreparerSummaries = async () => {
  // Get all preparers
  const preparers = await prisma.user.findMany({
    where: { role: Roles.PREPARER },
    select: {
      id: true,
      name: true,
      email: true
    }
  });

  const preparerSummaries = [];

  for (const preparer of preparers) {
    const assignments = await prisma.companyAssignment.findMany({
      where: { preparerId: preparer.id },
      include: {
        company: {
          select: {
            companyId: true,
            companyName: true,
            status: true,
            user: {
              select: { id: true, username: true, email: true }
            }
          }
        }
      }
    });

    const clients = assignments.map(a => a.company.user);
    const companyCount = assignments.length;

    const approver = await prisma.roleDelegation.findFirst({
      where: {
        delegatedRole: Roles.PREPARER,
        delegateeId: preparer.id
      },
      include: {
        delegator: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    preparerSummaries.push({
      preparer,
      assignedCompanyCount: companyCount,
      clients,
      approver: approver?.delegator || null
    });
  }

  return preparerSummaries;
};


export const assignPreparerToCompany = async (userId, preparerId, assignedById) => {
  const company = await prisma.company.findFirst({
    where: { userId: parseInt(userId) }
  });

  if (!company) throw new Error('Company not found for user');

  const existing = await prisma.companyAssignment.findFirst({
    where: {
      companyId: company.companyId,
      preparerId: parseInt(preparerId)
    }
  });

  if (existing) {
    throw new Error('Preparer already assigned to this company');
  }

  return prisma.$transaction(async (tx) => {
    const assignment = await tx.companyAssignment.create({
      data: {
        companyId: company.companyId,
        preparerId: parseInt(preparerId),
        assignedById
      }
    });

    await tx.auditLog.create({
      data: {
        actorId: assignedById,
        role: 'Admin',
        action: `Assigned preparer ${preparerId} to company ${company.companyName}`,
        target: `Company ID ${company.companyId}`,
        companyId: company.companyId
      }
    });

    return assignment;
  });
};

export const approveDocuments = async (companyId, approverId, remarks) => {
  const company = await prisma.company.findUnique({
    where: { companyId: parseInt(companyId) },
    include: {
      companyAssignments: {
        select: { preparerId: true }
      }
    }
  });

  if (!company) throw new Error('Company not found');

  const assignedPreparerId = company.companyAssignments[0]?.preparerId;
  if (!assignedPreparerId) throw new Error('No preparer assigned to this company');

  const isAuthorized = await prisma.roleDelegation.findFirst({
    where: {
      delegatedRole: Roles.PREPARER,
      delegateeId: assignedPreparerId,
      delegatorId: approverId
    }
  });

  if (!isAuthorized) {
    throw new Error('You are not authorized to approve this company');
  }

  // ✅ Use transaction for update + messaging + audit
  return prisma.$transaction(async (tx) => {
    const updatedCompany = await tx.company.update({
      where: { companyId: parseInt(companyId) },
      data: {
        status: CompanyStatus.ApproverApproved,
        statusRemarks: remarks
      }
    });

    await tx.companyStatusMessage.create({
      data: {
        companyId: updatedCompany.companyId,
        senderId: approverId,
        senderRole: Roles.APPROVER,
        message: remarks,
        fromStatus: CompanyStatus.PreparerApproved,
        toStatus: CompanyStatus.ApproverApproved
      }
    });

    await tx.notification.create({
      data: {
        userId: updatedCompany.userId,
        title: 'Company Approved',
        message: `Your company ${updatedCompany.companyName} has been approved by the Approver.`,
        isRead: false
      }
    });

    await tx.auditLog.create({
      data: {
        actorId: approverId,
        role: Roles.APPROVER,
        action: 'Approved company incorporation',
        target: `Company ID ${companyId}`,
        companyId: updatedCompany.companyId
      }
    });

    return updatedCompany;
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
