import prisma from '../lib/prismaClient.js';
import { CompanyStatus } from '../constants/companyStatus.js';
import { Roles } from '../constants/roles.js';
import { deleteFileFromS3, extractS3Key, uploadFilesToS3,uploadFileToS3 } from '../utils/s3Uploader.js';

export const fetchUserDashboard = async (userId) => {
  const [company, notifications, insights, tasks] = await Promise.all([
    fetchCompanyDetails(userId),
    fetchNotifications(userId),
    fetchInsights(userId),
    fetchCalendarActions(userId)
  ]);

  return {
    companyName: company?.companyName,
    status: company?.status,
    taskCount: tasks.length,
    newNotifications: notifications.filter(n => !n.isRead).length,
    insightsCount: insights.length
  };
};

export const fetchCompanyDetails = async (userId) => {
  return prisma.company.findFirst({
    where: { userId },
    include: {
      directors: true,
      shareholders: true,
      companyServices: {
        include: { service: true }
      }
    }
  });
};

export const fetchUserDocuments = async (userId) => {
  return prisma.companyDocument.findMany({
    where: { uploadedFor: userId },
    orderBy: { uploadedAt: 'desc' }
  });
};

export const fetchNotifications = async (userId) => {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });
};

export const fetchInvoices = async (userId) => {
  return prisma.payment.findMany({
    where: { userId },
    include: { refunds: true },
    orderBy: { paymentDate: 'desc' }
  });
};

export const fetchCalendarActions = async (userId) => {
  return prisma.calendarAction.findMany({
    where: { userId },
    orderBy: { dueDate: 'asc' },
    include: {
      company: { select: { companyName: true } }
    }
  });
};

export const fetchInsights = async (userId) => {
  return prisma.insightRecommendation.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });
};

export const fetchAssignedAgents = async (userId) => {
  const company = await prisma.company.findFirst({ where: { userId } });
  if (!company) return [];

  return prisma.roleAssignment.findMany({
    where: { companyId: company.companyId },
    include: {
      agent: {
        select: { id: true, username: true, email: true, role: true }
      }
    }
  });
};


/**
 * Upload documents for a client if the status allows it
 */
export const uploadDocuments = async (userId, purpose, label, files) => {
  const company = await prisma.company.findFirst({ where: { userId } });

  if (!company) throw new Error('Company not found');
  if (![CompanyStatus.Submitted, CompanyStatus.RevertedToClient].includes(company.status)) {
    throw new Error(`Uploading not permitted at current status: ${company.status}`);
  }

  const uploadedUrls = await uploadFilesToS3(files, `users/${userId}/company-${company.companyId}/uploads`);

  const createdDocs = await Promise.all(
    uploadedUrls.map((url, index) =>
      prisma.companyDocument.create({
        data: {
          companyId: company.companyId,
          documentLabel: label || files[index].originalname,
          documentType: files[index].mimetype.includes('pdf') ? 'PDF' : 'OTHER',
          purpose,
          documentPath: url,
          uploadedBy: userId,
          uploadedRole: Roles.CLIENT,
          uploadedAt: new Date()
        }
      })
    )
  );

  return createdDocs;
};

export const uploadFinalDocs = async (userId, files) => {
  const company = await prisma.company.findFirst({ where: { userId } });
  if (!company) throw new Error('Company not found');

  const uploadedUrls = await uploadFilesToS3(files, `users/${userId}/final-docs`);

  return Promise.all(
    uploadedUrls.map((url, i) =>
      prisma.companyDocument.create({
        data: {
          companyId: company.companyId,
          documentLabel: files[i].originalname,
          documentType: files[i].mimetype.includes('pdf') ? 'PDF' : 'OTHER',
          purpose: 'OTHER',
          documentPath: url,
          uploadedBy: userId,
          uploadedRole: Roles.CLIENT
        }
      })
    )
  );
};


/**
 * Check if company editing is allowed
 */
export const verifyCompanyEditAccess = async (userId, section) => {
  const company = await prisma.company.findFirst({ where: { userId } });
  if (!company) throw new Error('Company not found');

  const accessMap = {
    company: company.canEditC,
    director: company.canEditD,
    shareholder: company.canEditS
  };

  if (!accessMap[section]) {
    throw new Error(`Editing ${section} is currently disabled`);
  }

  return company;
};

/**
 * Update director details
 */
export const editDirector = async (directorId, userId, updates) => {
  const director = await prisma.director.findUnique({
    where: { id: directorId },
    include: { company: true }
  });

  if (!director || director.company.userId !== userId) {
    throw new Error('Unauthorized to update this director');
  }

  return prisma.director.update({
    where: { id: directorId },
    data: updates
  });
};

/**
 * Update shareholder details
 */
export const editShareholder = async (shareholderId, userId, updates) => {
  const shareholder = await prisma.shareholder.findUnique({
    where: { id: shareholderId },
    include: { company: true }
  });

  if (!shareholder || shareholder.company.userId !== userId) {
    throw new Error('Unauthorized to update this shareholder');
  }

  return prisma.shareholder.update({
    where: { id: shareholderId },
    data: updates
  });
};

/**
 * Update company non-sensitive fields
 */
export const editCompanyOtherDetails = async (userId, data) => {
  const company = await prisma.company.findFirst({ where: { userId } });
  if (!company) throw new Error('Company not found');

  const allowedFields = [
    'businessActivity1', 'businessActivity1Desc',
    'businessActivity2', 'businessActivity2Desc'
  ];

  const safeData = Object.fromEntries(
    Object.entries(data).filter(([key]) => allowedFields.includes(key))
  );

  return prisma.company.update({
    where: { companyId: company.companyId },
    data: safeData
  });
};



export const replaceDocument = async (userId, docId, file) => {
  const doc = await prisma.companyDocument.findUnique({ where: { id: docId } });

  if (!doc) throw new Error('Document not found');
  if (doc.uploadedBy !== userId) throw new Error('Unauthorized access to replace this document');
  if (doc.isVerified) {
    throw new Error('Document is already verified, cannot be replaced');
  }
  // Extract and delete old S3 file
  const oldKey = extractS3Key(doc.documentPath);
  if (oldKey) await deleteFileFromS3(oldKey);

  // Upload new file
  const newUrl = await uploadFileToS3(file, `users/${userId}/company-${doc.companyId}/replaced`);

  // Determine document type based on mimetype
  const mime = file.mimetype.toLowerCase();
  let docType = 'OTHER';

  if (mime.includes('pdf')) docType = 'PDF';
  else if (mime.includes('jpeg') || mime.includes('jpg')) docType = 'JPG';
  else if (mime.includes('png')) docType = 'PNG';
  else if (mime.includes('docx')) docType = 'DOCX';
  else if (mime.includes('xls')) docType = 'XLSX';

  // Update document record
  return prisma.companyDocument.update({
    where: { id: docId },
    data: {
      documentPath: newUrl,
      documentLabel: file.originalname,
      documentType: docType,
      uploadedAt: new Date(),
      isVerified: false // reset verification status
    }
  });
};

export const markNotificationAsRead = async (notificationId, userId) => {
  const notification = await prisma.notification.findUnique({ where: { id: notificationId } });

  if (!notification) throw new Error('Notification not found');
  if (notification.userId !== userId) throw new Error('Unauthorized access to this notification');

  return prisma.notification.update({
    where: { id: notificationId },
    data: { isRead: true }
  });
};



/**
 * Delete a document uploaded by the client
 */
export const deleteDocument = async (docId, userId) => {
  const doc = await prisma.companyDocument.findUnique({ where: { id: docId } });
  if (doc.isVerified) {
    throw new Error('Document is already verified  and cannot be deleted, contact support');
  }
  if (!doc) throw new Error('Document not found');
  if (doc.uploadedBy !== userId) throw new Error('Permission denied');

  const s3Key = extractS3Key(doc.documentPath);
  await deleteFileFromS3(s3Key);

  return prisma.companyDocument.delete({ where: { id: docId } });
};

