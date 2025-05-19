import prisma from "../lib/prismaClient.js";
import { generateInvoicePdf } from "./invoiceService.js";
import { Roles } from "../constants/roles.js";
import { CompanyStatus } from "../constants/companyStatus.js";

/**
 * Get all users with optional filtering by role
 */
export const getAllUsers = async (query) => {
  const { page = 1, limit = 10, role } = query;
  const skip = (page - 1) * parseInt(limit);
  const whereCondition = role ? { role } : {};

  const [users, totalUsers] = await Promise.all([
    prisma.user.findMany({
      where: whereCondition,
      select: {
        id: true,
        username: true,
        email: true,
        mobile: true,
        country: true,
        role: true,
        createdAt: true,
      },
      skip,
      take: parseInt(limit),
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.count({ where: whereCondition }),
  ]);

  return {
    users,
    pagination: {
      total: totalUsers,
      pages: Math.ceil(totalUsers / parseInt(limit)),
      page: parseInt(page),
      limit: parseInt(limit),
    },
  };
};

/**
 * Get dashboard data for administrators
 */
export const getAdminDashboardData = async () => {
  const [userStats, companyStats, recentCompanies, incorporationsThisMonth, taskStats] = await Promise.all([
    prisma.$queryRaw`SELECT COUNT(*) as total, jsonb_agg(jsonb_build_object('role', role, 'count', count)) as by_role FROM (SELECT role, COUNT(*) as count FROM "User" GROUP BY role) as role_counts`,
    prisma.$queryRaw`SELECT COUNT(*) as total, jsonb_agg(jsonb_build_object('status', status, 'count', count)) as by_status FROM (SELECT status, COUNT(*) as count FROM "Company" GROUP BY status) as status_counts`,
    prisma.company.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        companyId: true,
        companyName: true,
        status: true,
        createdAt: true,
        user: { select: { username: true, email: true } }
      }
    }),
    prisma.company.count({
      where: { createdAt: { gte: new Date(new Date().setDate(1)) } }
    }),
    prisma.$queryRaw`SELECT SUM(CASE WHEN status = 'Submitted' THEN 1 ELSE 0 END) as pending, SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) as completed FROM "CalendarAction"`
  ]);

  const userCount = parseInt(userStats[0]?.total || 0);
  const usersByRole = userStats[0]?.by_role || [];

  const companyCount = parseInt(companyStats[0]?.total || 0);
  const companiesByStatus = companyStats[0]?.by_status || [];

  const pendingTasks = parseInt(taskStats[0]?.pending || 0);
  const completedTasks = parseInt(taskStats[0]?.completed || 0);

  return {
    users: { total: userCount, byRole: usersByRole },
    companies: { total: companyCount, byStatus: companiesByStatus, recentRegistrations: recentCompanies, incorporationsThisMonth },
    tasks: { pending: pendingTasks, completed: completedTasks, total: pendingTasks + completedTasks }
  };
};

/**
 * Update a user's role
 */
export const updateUserRoleById = async (userId, role) => {
  const validRoles = Object.values(Roles);
  if (!validRoles.includes(role)) throw new Error('Invalid role specified');

  const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } });
  if (!user) throw new Error('User not found');

  return prisma.user.update({
    where: { id: parseInt(userId) },
    data: { role },
    select: { id: true, username: true, email: true, role: true }
  });
};

/**
 * Get incorporations/companies for review
 */
export const getIncorporationsForReviewData = async (query) => {
  const page = Math.max(1, parseInt(query.page || 1));
  const limit = Math.min(50, Math.max(1, parseInt(query.limit || 10)));
  const skip = (page - 1) * limit;
  const { status } = query;

  const whereCondition = status && status !== 'all' ? { status } : {};

  const [companies, totalIncorporations] = await Promise.all([
    prisma.company.findMany({
      where: whereCondition,
      include: {
        user: { select: { id: true, username: true, email: true } },
        directors: { select: { directorName: true, email: true } },
        shareholders: { select: { shareholderName: true, email: true, numberOfShares: true } }
      },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.company.count({ where: whereCondition })
  ]);

  return {
    incorporations: companies,
    pagination: { total: totalIncorporations, pages: Math.ceil(totalIncorporations / limit), page, limit }
  };
};

/**
 * Update a company's incorporation status
 */
export const updateCompanyIncorporationStatus = async (companyId, newStatus, revertMessage, senderId, senderRole) => {
  companyId = parseInt(companyId);

  const validStatuses = Object.values(CompanyStatus);
  if (!validStatuses.includes(newStatus)) {
    throw new Error('Invalid status specified.');
  }

  if (!revertMessage || revertMessage.trim().length < 5) {
    throw new Error('Message is required for status change.');
  }

  const company = await prisma.company.findUnique({
    where: { companyId }
  });
  if (!company) {
    throw new Error('Company not found.');
  }

  return await prisma.$transaction(async (prisma) => {
    const updatedCompany = await prisma.company.update({
      where: { companyId },
      data: {
        status: newStatus,
        statusRemarks: revertMessage
      }
    });

    await prisma.companyRevertMessage.create({
      data: {
        companyId,
        senderId,
        senderRole,
        message: revertMessage
      }
    });

    await prisma.notification.create({
      data: {
        userId: company.userId,
        title: 'Company Status Updated',
        message: `Status changed to "${newStatus}". Remarks: ${revertMessage}`,
        isRead: false
      }
    });

    return updatedCompany;
  });
};


/**
 * Generate an invoice for a company
 */
export const generateCompanyInvoice = async (incorporationId) => {
  incorporationId = parseInt(incorporationId);

  const company = await prisma.company.findUnique({
    where: { companyId: incorporationId },
    include: {
      user: true,
      companyServices: { include: { service: true } }
    }
  });
  if (!company) throw new Error('Incorporation not found');

  let totalAmount = 0;
  const services = company.companyServices.map(cs => {
    totalAmount += parseFloat(cs.service.cost);
    return cs.service.serviceName;
  });

  const payment = await prisma.payment.create({
    data: {
      companyId: incorporationId,
      userId: company.userId,
      paymentDate: new Date(),
      amount: totalAmount,
      currency: company.currency || 'SGD',
      paymentMethod: 'Invoice',
      paymentStatus: 'Pending',
      paymentReference: `INV-${Date.now()}`,
      services: services.join(', ')
    }
  });

  const invoicePath = await generateInvoicePdf(company, payment);

  await prisma.companyDocument.create({
    data: {
      companyId: incorporationId,
      documentLabel: 'Invoice',
      documentType: 'PDF',
      documentPath: invoicePath,
      uploadedAt: new Date()
    }
  });

  await prisma.notification.create({
    data: {
      userId: company.userId,
      title: 'New Invoice Generated',
      message: `An invoice has been generated for your company "${company.companyName}".`,
      isRead: false
    }
  });

  return {
    companyId: incorporationId,
    paymentId: payment.id,
    amount: payment.amount,
    currency: payment.currency,
    reference: payment.paymentReference,
    documentPath: invoicePath
  };
};
