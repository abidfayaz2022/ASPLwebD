import prisma from "../lib/prismaClient.js";

/**
 * Get all companies with optional filtering and pagination
 * @param {Object} query - Query parameters for pagination and filtering
 * @param {number} userId - User ID for filtering (optional)
 * @returns {Object} - Companies with pagination info
 */
export const getAllCompanies = async (query, userId = null) => {
  const { page = 1, limit = 10, status, search } = query;
  const skip = (page - 1) * parseInt(limit);

  // Build where conditions based on filters
  let whereCondition = {};
  
  // Filter by user if provided
  if (userId) {
    whereCondition.userId = parseInt(userId);
  }
  
  // Filter by status if provided
  if (status && status !== 'all') {
    whereCondition.status = status;
  }
  
  // Search by company name
  if (search) {
    whereCondition.companyName = {
      contains: search,
      mode: 'insensitive',
    };
  }

  // Run queries in parallel for better performance
  const [companies, totalCompanies] = await Promise.all([
    prisma.company.findMany({
      where: whereCondition,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        directors: {
          select: {
            directorName: true,
            email: true,
          },
        },
        shareholders: {
          select: {
            shareholderName: true,
            numberOfShares: true,
          },
        },
        companyServices: {
          include: {
            service: true,
          },
        },
      },
      skip,
      take: parseInt(limit),
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.company.count({
      where: whereCondition,
    }),
  ]);

  return {
    companies,
    pagination: {
      total: totalCompanies,
      pages: Math.ceil(totalCompanies / parseInt(limit)),
      page: parseInt(page),
      limit: parseInt(limit),
    },
  };
};

/**
 * Get a company by ID
 * @param {number} companyId - Company ID
 * @param {number} userId - User ID (for permission checking)
 * @param {string} userRole - User role (for permission checking)
 * @returns {Object} - Company data with related entities
 */
export const getCompanyById = async (companyId, userId, userRole) => {
  const company = await prisma.company.findUnique({
    where: { companyId: parseInt(companyId) },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true,
        },
      },
      directors: true,
      shareholders: true,
      companyServices: {
        include: {
          service: true,
        },
      },
      documents: true,
      payments: true,
      dashboardState: true,
      roleAssignments: {
        include: {
          agent: {
            select: {
              id: true,
              username: true,
              email: true,
              role: true,
            },
          },
        },
      },
    },
  });

  if (!company) {
    throw new Error('Company not found');
  }

  // Check permissions
  const isOwner = company.userId === userId;
  const isAdmin = userRole === 'Admin';
  const isAgent = company.roleAssignments.some(
    (assignment) => assignment.agentId === userId
  );

  if (!isOwner && !isAdmin && !isAgent) {
    throw new Error('Unauthorized access to company data');
  }

  return company;
};

/**
 * Create a new company
 * @param {Object} companyData - Company data
 * @param {number} userId - ID of the user creating the company
 * @returns {Object} - Created company
 */
export const createCompany = async (companyData, userId) => {
  // Start a transaction to ensure all operations succeed or fail together
  return await prisma.$transaction(async (prisma) => {
    // Check if company name is already registered
    const existingCompany = await prisma.registeredCompanyName.findUnique({
      where: { companyName: companyData.companyName },
    });

    if (existingCompany) {
      throw new Error('Company name already registered');
    }

    // Create the company
    const company = await prisma.company.create({
      data: {
        ...companyData,
        userId: parseInt(userId),
        // Set default values
        status: 'Pending',
        createdAt: new Date(),
      },
    });

    // Register the company name
    await prisma.registeredCompanyName.create({
      data: {
        companyName: companyData.companyName,
      },
    });

    // Create initial dashboard state
    await prisma.dashboardState.create({
      data: {
        companyId: company.companyId,
        step: 'registration',
      },
    });

    // Create notification for the user
    await prisma.notification.create({
      data: {
        userId: parseInt(userId),
        title: 'Company Registration Initiated',
        message: `Your company "${company.companyName}" has been registered and is pending approval.`,
        isRead: false,
      },
    });

    return company;
  });
};

/**
 * Update a company
 * @param {number} companyId - Company ID
 * @param {Object} companyData - Company data to update
 * @param {number} userId - ID of the user updating the company
 * @param {string} userRole - Role of the user
 * @returns {Object} - Updated company
 */
export const updateCompany = async (companyId, companyData, userId, userRole) => {
  // Check if company exists and user has permission
  const company = await prisma.company.findUnique({
    where: { companyId: parseInt(companyId) },
    include: {
      roleAssignments: true,
    },
  });

  if (!company) {
    throw new Error('Company not found');
  }

  // Check permissions
  const isOwner = company.userId === parseInt(userId);
  const isAdmin = userRole === 'Admin';
  const isAgent = company.roleAssignments.some(
    (assignment) => assignment.agentId === parseInt(userId)
  );

  if (!isOwner && !isAdmin && !isAgent) {
    throw new Error('Unauthorized to update company data');
  }

  // If company name is being changed, check if new name is available
  if (companyData.companyName && companyData.companyName !== company.companyName) {
    const existingCompany = await prisma.registeredCompanyName.findUnique({
      where: { 
        companyName: companyData.companyName 
      },
    });

    if (existingCompany) {
      throw new Error('Company name already registered');
    }

    // Update registered company name in transaction
    await prisma.$transaction([
      prisma.registeredCompanyName.delete({
        where: { companyName: company.companyName },
      }),
      prisma.registeredCompanyName.create({
        data: { companyName: companyData.companyName },
      }),
    ]);
  }

  // Update the company
  const updatedCompany = await prisma.company.update({
    where: { companyId: parseInt(companyId) },
    data: companyData,
  });

  // Create notification about the update
  await prisma.notification.create({
    data: {
      userId: company.userId,
      title: 'Company Information Updated',
      message: `Your company "${updatedCompany.companyName}" information has been updated.`,
      isRead: false,
    },
  });

  return updatedCompany;
};

/**
 * Delete a company
 * @param {number} companyId - Company ID
 * @param {number} userId - ID of the user deleting the company
 * @param {string} userRole - Role of the user
 * @returns {Object} - Deleted company
 */
export const deleteCompany = async (companyId, userId, userRole) => {
  // Check if company exists and user has permission
  const company = await prisma.company.findUnique({
    where: { companyId: parseInt(companyId) },
  });

  if (!company) {
    throw new Error('Company not found');
  }

  // Check permissions - only owner or admin can delete
  const isOwner = company.userId === parseInt(userId);
  const isAdmin = userRole === 'Admin';

  if (!isOwner && !isAdmin) {
    throw new Error('Unauthorized to delete company');
  }

  // Delete related entities first using a transaction
  return await prisma.$transaction(async (prisma) => {
    // Delete dashboard state
    await prisma.dashboardState.deleteMany({
      where: { companyId: parseInt(companyId) },
    });
    
    // Delete directors
    await prisma.director.deleteMany({
      where: { companyId: parseInt(companyId) },
    });
    
    // Delete shareholders
    await prisma.shareholder.deleteMany({
      where: { companyId: parseInt(companyId) },
    });
    
    // Delete documents
    await prisma.companyDocument.deleteMany({
      where: { companyId: parseInt(companyId) },
    });
    
    // Delete company services
    await prisma.companyService.deleteMany({
      where: { companyId: parseInt(companyId) },
    });
    
    // Delete role assignments
    await prisma.roleAssignment.deleteMany({
      where: { companyId: parseInt(companyId) },
    });
    
    // Delete tasks
    await prisma.calendarAction.deleteMany({
      where: { companyId: parseInt(companyId) },
    });
    
    // Delete registered company name
    await prisma.registeredCompanyName.deleteMany({
      where: { companyName: company.companyName },
    });

    // Delete the company
    const deletedCompany = await prisma.company.delete({
      where: { companyId: parseInt(companyId) },
    });

    // Create notification about deletion
    await prisma.notification.create({
      data: {
        userId: parseInt(userId),
        title: 'Company Deleted',
        message: `The company "${company.companyName}" has been deleted.`,
        isRead: false,
      },
    });

    return deletedCompany;
  });
};

/**
 * Add a director to a company
 * @param {number} companyId - Company ID
 * @param {Object} directorData - Director data
 * @returns {Object} - Created director
 */
export const addDirector = async (companyId, directorData) => {
  const company = await prisma.company.findUnique({
    where: { companyId: parseInt(companyId) },
  });

  if (!company) {
    throw new Error('Company not found');
  }

  // Create the director
  const director = await prisma.director.create({
    data: {
      ...directorData,
      companyId: parseInt(companyId),
    },
  });

  return director;
};

/**
 * Update a director
 * @param {number} directorId - Director ID
 * @param {Object} directorData - Director data to update
 * @returns {Object} - Updated director
 */
export const updateDirector = async (directorId, directorData) => {
  const director = await prisma.director.findUnique({
    where: { id: parseInt(directorId) },
  });

  if (!director) {
    throw new Error('Director not found');
  }

  // Update the director
  const updatedDirector = await prisma.director.update({
    where: { id: parseInt(directorId) },
    data: directorData,
  });

  return updatedDirector;
};

/**
 * Delete a director
 * @param {number} directorId - Director ID
 * @returns {Object} - Deleted director
 */
export const deleteDirector = async (directorId) => {
  const director = await prisma.director.findUnique({
    where: { id: parseInt(directorId) },
  });

  if (!director) {
    throw new Error('Director not found');
  }

  // Delete the director
  const deletedDirector = await prisma.director.delete({
    where: { id: parseInt(directorId) },
  });

  return deletedDirector;
};

/**
 * Add a shareholder to a company
 * @param {number} companyId - Company ID
 * @param {Object} shareholderData - Shareholder data
 * @returns {Object} - Created shareholder
 */
export const addShareholder = async (companyId, shareholderData) => {
  const company = await prisma.company.findUnique({
    where: { companyId: parseInt(companyId) },
  });

  if (!company) {
    throw new Error('Company not found');
  }

  // Create the shareholder
  const shareholder = await prisma.shareholder.create({
    data: {
      ...shareholderData,
      companyId: parseInt(companyId),
    },
  });

  return shareholder;
};

/**
 * Update a shareholder
 * @param {number} shareholderId - Shareholder ID
 * @param {Object} shareholderData - Shareholder data to update
 * @returns {Object} - Updated shareholder
 */
export const updateShareholder = async (shareholderId, shareholderData) => {
  const shareholder = await prisma.shareholder.findUnique({
    where: { id: parseInt(shareholderId) },
  });

  if (!shareholder) {
    throw new Error('Shareholder not found');
  }

  // Update the shareholder
  const updatedShareholder = await prisma.shareholder.update({
    where: { id: parseInt(shareholderId) },
    data: shareholderData,
  });

  return updatedShareholder;
};

/**
 * Delete a shareholder
 * @param {number} shareholderId - Shareholder ID
 * @returns {Object} - Deleted shareholder
 */
export const deleteShareholder = async (shareholderId) => {
  const shareholder = await prisma.shareholder.findUnique({
    where: { id: parseInt(shareholderId) },
  });

  if (!shareholder) {
    throw new Error('Shareholder not found');
  }

  // Delete the shareholder
  const deletedShareholder = await prisma.shareholder.delete({
    where: { id: parseInt(shareholderId) },
  });

  return deletedShareholder;
};

/**
 * Add a service to a company
 * @param {number} companyId - Company ID
 * @param {number} serviceId - Service ID
 * @returns {Object} - Created company service
 */
export const addCompanyService = async (companyId, serviceId) => {
  const company = await prisma.company.findUnique({
    where: { companyId: parseInt(companyId) },
  });

  if (!company) {
    throw new Error('Company not found');
  }

  const service = await prisma.service.findUnique({
    where: { id: parseInt(serviceId) },
  });

  if (!service) {
    throw new Error('Service not found');
  }

  // Check if service is already added
  const existingService = await prisma.companyService.findFirst({
    where: {
      companyId: parseInt(companyId),
      serviceId: parseInt(serviceId),
    },
  });

  if (existingService) {
    throw new Error('Service already added to company');
  }

  // Create the company service
  const companyService = await prisma.companyService.create({
    data: {
      companyId: parseInt(companyId),
      serviceId: parseInt(serviceId),
      updateDate: new Date(),
    },
    include: {
      service: true,
    },
  });

  return companyService;
};

/**
 * Remove a service from a company
 * @param {number} companyId - Company ID
 * @param {number} serviceId - Service ID
 * @returns {Object} - Deleted company service
 */
export const removeCompanyService = async (companyId, serviceId) => {
  const companyService = await prisma.companyService.findFirst({
    where: {
      companyId: parseInt(companyId),
      serviceId: parseInt(serviceId),
    },
  });

  if (!companyService) {
    throw new Error('Service not associated with company');
  }

  // Delete the company service
  const deletedCompanyService = await prisma.companyService.delete({
    where: { id: companyService.id },
  });

  return deletedCompanyService;
};

/**
 * Get company dashboard summary
 * @param {number} companyId - Company ID
 * @returns {Object} - Dashboard summary data
 */
export const getCompanyDashboard = async (companyId) => {
  const company = await prisma.company.findUnique({
    where: { companyId: parseInt(companyId) },
  });

  if (!company) {
    throw new Error('Company not found');
  }

  // Get dashboard data in parallel for efficiency
  const [
    directors,
    shareholders,
    services,
    documents,
    payments,
    tasks
  ] = await Promise.all([
    prisma.director.count({ where: { companyId: parseInt(companyId) } }),
    prisma.shareholder.count({ where: { companyId: parseInt(companyId) } }),
    prisma.companyService.findMany({
      where: { companyId: parseInt(companyId) },
      include: { service: true },
    }),
    prisma.companyDocument.findMany({
      where: { companyId: parseInt(companyId) },
      orderBy: { uploadedAt: 'desc' },
      take: 5,
    }),
    prisma.payment.findMany({
      where: { companyId: parseInt(companyId) },
      orderBy: { paymentDate: 'desc' },
      take: 5,
    }),
    prisma.calendarAction.findMany({
      where: { companyId: parseInt(companyId) },
      orderBy: { dueDate: 'asc' },
      take: 5,
    }),
  ]);

  // Calculate total service cost
  const totalServiceCost = services.reduce(
    (total, item) => total + parseFloat(item.service.cost),
    0
  );

  return {
    status: company.status,
    directors: directors,
    shareholders: shareholders,
    services: {
      count: services.length,
      total: totalServiceCost,
      items: services,
    },
    recentDocuments: documents,
    recentPayments: payments,
    upcomingTasks: tasks,
  };
}; 