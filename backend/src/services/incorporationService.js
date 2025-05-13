import prisma from '../lib/prismaClient.js';
import { generateInvoicePdf } from './invoiceService.js';
import { generateUniqueUsername } from '../utils/usernameGenerator.js'; // ✅ Corrected here
import { generateRandomPassword } from '../utils/passwordGenerator.js';
import { hashPassword } from '../utils/passwordUtils.js';
import crypto from 'crypto';
import sendEmail from '../utils/email.js';


/**
 * Check if a company name is available
 */
export const checkNameAvailability = async (companyName) => {
  const existing = await prisma.registeredCompanyName.findUnique({
    where: { companyName: companyName }
  });
  return !existing;
};

export const sendStagingOtp = async (email, sessionId) => {
  const otp = crypto.randomInt(100000, 999999).toString();
  const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

  await prisma.stagingCompany.update({
    where: { id: sessionId },
    data: {
      emailOtp: otp,
      emailOtpExpires: expiry
    }
  });

  const message = `Your OTP for verification is: ${otp}\n\nIt will expire in 10 minutes.`;

  await sendEmail({
    to: email,
    subject: 'Verify your email',
    text: message
  });

  return true;
};

export const verifyStagingOtp = async (sessionId, otp) => {
  const session = await prisma.stagingCompany.findUnique({ where: { id: sessionId } });

  if (
    !session ||
    !session.emailOtp ||
    session.emailOtp !== otp ||
    new Date() > session.emailOtpExpires
  ) {
    return false;
  }

  // Mark email as verified
  await prisma.stagingCompany.update({
    where: { id: sessionId },
    data: {
      isEmailVerified: true,
      emailOtp: null,
      emailOtpExpires: null
    }
  });

  // Send confirmation email with session ID
  await sendEmail({
    to: session.contactEmail,
    subject: 'Email Verified - Incorporation Session ID',
    text: `Your email has been successfully verified.\n\nSession ID: ${sessionId}\n\nYou may resume the incorporation process using this session ID if needed.`
  });

  return true;
};

/**
 * Start a new incorporation session
 */

export const initSession = async (data) => {
  const isAvailable = await checkNameAvailability(data.companyName);

  if (!isAvailable) {
    throw new Error('Company name is already taken.');
  }

  return await prisma.stagingCompany.create({
    data: {
      companyName: data.companyName,
      step: 1,
      contactEmail: data.contactEmail || null,
    }
  });
};
export const getSessionById = async (sessionId) => {
  return await prisma.stagingCompany.findUnique({
    where: { id: sessionId }
  });
};  
/**
 * Save progress of incorporation
 */
export const saveStepData = async (sessionId, data) => {
  return await prisma.stagingCompany.update({
    where: { id: sessionId },
    data: {
      step: data.step,
      registrationDate: data.registrationDate || undefined,
      directorData: data.directorData ? JSON.stringify(data.directorData) : undefined,
      shareholderData: data.shareholderData ? JSON.stringify(data.shareholderData) : undefined,
      servicesSelected: data.servicesSelected ? JSON.stringify(data.servicesSelected) : undefined,
      contactEmail: data.contactEmail || undefined,
      contactNumber: data.contactNumber || undefined
    }
  });
};

/**
 * Complete the incorporation process
 */
export const complete = async (sessionId) => {
  const staging = await prisma.stagingCompany.findUnique({ where: { id: sessionId } });

  if (!staging) throw new Error("Session not found");
  
  // ✅ Prevent duplicate completion
  if (staging.isCompleted) {
    throw new Error("Incorporation already completed for this Company.");
  }
  const rawPassword = generateRandomPassword(12);
  const hashedPassword = await hashPassword(rawPassword);
  const username = await generateUniqueUsername(staging.companyName);

  const directors = JSON.parse(staging.directorData || '[]');
  const shareholders = JSON.parse(staging.shareholderData || '[]');
  const selectedServices = JSON.parse(staging.servicesSelected || '[]');

  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        username,
        email: staging.contactEmail,
        password: hashedPassword,
        mobile: staging.contactNumber || '0000000000',
        country: 'N/A',
        role: 'client'
      }
    });

    const company = await tx.company.create({
      data: {
        userId: user.id,
        companyName: staging.companyName,
        registrationDate: staging.registrationDate || new Date(),
        addressLine1: "N/A",
        addressLine2: "N/A",
        country: "N/A",
        postalCode: "000000",
        proposedShares: 1000,
        currency: "SGD",
        proposedShareCapital: 10000.00,
        businessActivity1: "N/A",
        businessActivity1Desc: "N/A",
        businessActivity2: "N/A",
        businessActivity2Desc: "N/A",
        status: "Draft",
      }
    });

    await tx.payment.updateMany({
      where: {
        stagingCompanyId: sessionId
      },
      data: {
        companyId: company.companyId,
        userId: user.id
      }
    });
    

    await tx.registeredCompanyName.create({
      data: { companyName: company.companyName }
    });

    if (directors.length > 0) {
      await tx.director.createMany({
        data: directors.map((d) => ({
          companyId: company.companyId,
          directorName: d.directorName,
          email: d.email,
          addressLine1: d.addressLine1 || 'N/A',
          addressLine2: d.addressLine2 || 'N/A',
          country: d.country || 'N/A',
          postalCode: d.postalCode || '000000',
          contactNumber: d.contactNumber || '0000000000',
          nationality: d.nationality || 'N/A',
          idType: d.idType || 'N/A',
          idExpiryDate: new Date(d.idExpiryDate),
          idNumber: d.idNumber || 'N/A',
          isShareholder: !!d.isShareholder,
          identityProof: d.identityProof || 'N/A',
          addressProof: d.addressProof || 'N/A',
          dateOfBirth: new Date(d.dateOfBirth)
        }))
      });
    }

    if (shareholders.length > 0) {
      await tx.shareholder.createMany({
        data: shareholders.map((s) => ({
          companyId: company.companyId,
          shareholderName: s.shareholderName,
          email: s.email,
          type: s.type,
          addressLine1: s.addressLine1 || 'N/A',
          addressLine2: s.addressLine2 || 'N/A',
          country: s.country || 'N/A',
          postalCode: s.postalCode || '000000',
          contactNumber: s.contactNumber || '0000000000',
          nationality: s.nationality || 'N/A',
          idType: s.idType || 'N/A',
          idExpiryDate: new Date(s.idExpiryDate),
          idNumber: s.idNumber || 'N/A',
          dateOfBirth: new Date(s.dateOfBirth),
          numberOfShares: s.numberOfShares || 0,
          shareCapitalAllocation: parseFloat(s.shareCapitalAllocation || 0)
        }))
      });
    }

    if (selectedServices.length > 0) {
      await tx.companyService.createMany({
        data: selectedServices.map((serviceId) => ({
          companyId: company.companyId,
          serviceId: parseInt(serviceId),
          updateDate: new Date()
        }))
      });
    }


    await generateInvoicePdf(company, {
      id: Date.now(),
      paymentDate: new Date(),
      paymentReference: "DUMMY123",
      amount: 1000,
      currency: "SGD",
      paymentMethod: "DummyPay",
      paymentStatus: "Success"
    });

    // Send login email
    await sendEmail({
      to: user.email,
      subject: 'Incorporation Completed - Your Login Details',
      text: `Congratulations! Your company has been successfully incorporated.\n\nYour login credentials:\nUsername: ${username}\nPassword: ${rawPassword}\n\nPlease log in and update your profile after first login.`
    });

    await tx.stagingCompany.update({
      where: { id: sessionId },
      data: { isCompleted: true }
    });

    return {
      userId: user.id,
      companyId: company.companyId,
      generatedPassword: rawPassword
    };
  },{
    maxWait: 10000,     // time to wait to acquire a connection
    timeout: 15000      // time limit for the transaction
  });
};


export const getAllStagingCompanies = async () => {
  return await prisma.stagingCompany.findMany({
    orderBy: { createdAt: 'desc' }
  });
};

export const getStagingCompanyById = async (sessionId) => {
  return await prisma.stagingCompany.findUnique({
    where: { id: sessionId }
  });
};

export const updateStagingCompanyByAdmin = async (sessionId, updates) => {
  return await prisma.stagingCompany.update({
    where: { id: sessionId },
    data: updates
  });
};
/**
 * Delete a staging company
 */
export const deleteStagingCompanyById = async (id) => {
  const staging = await prisma.stagingCompany.findUnique({ where: { id } });
  if (!staging) return null;

  return await prisma.stagingCompany.delete({ where: { id } });
};
