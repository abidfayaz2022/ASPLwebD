import * as incorporationService from '../services/incorporationService.js';
import prisma from '../lib/prismaClient.js';

export const checkCompanyName = async (req, res) => {
  const { companyName: companyName } = req.body;
  try {
    const isAvailable = await incorporationService.checkNameAvailability(companyName);
    res.json({ available: isAvailable });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const startIncorporation = async (req, res) => {
  try {
    const session = await incorporationService.initSession(req.body);
    res.json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateIncorporationStep = async (req, res) => {
  const { sessionId } = req.params;
  try {
    const session = await incorporationService.getSessionById(sessionId);

    if (!session) {
      return res.status(404).json({ message: 'Session not found.' });
    }

    if (session.isPaid) {
      return res.status(403).json({
        message: 'Cannot update incorporation steps after payment is completed.'
      });
    }

    const updated = await incorporationService.saveStepData(sessionId, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const resumeIncorporation = async (req, res) => {
  try {
    const session = await incorporationService.getSessionById(req.params.sessionId);
    if (!session) return res.status(404).json({ message: 'Session not found' });
    if (session.isCompleted) {
      return res.status(200).json({
      success: true,
      details: {
        id: session.id,
        companyName: session.companyName,
        isPaid: session.isPaid,
        isEmailVerified: session.isEmailVerified,
        completedAt: session.completedAt
      }
      });
    }

    res.json({
      success: true,
      session
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const sendOtpToEmail = async (req, res) => {
  const { sessionId } = req.params;

  const session = await prisma.stagingCompany.findUnique({
    where: { id: sessionId }
  });

  if (!session || !session.contactEmail) {
    return res.status(400).json({ success: false, message: 'Email not available for this session.' });
  }

  try {
    await incorporationService.sendStagingOtp(session.contactEmail, sessionId);
    res.json({ success: true, message: 'OTP sent successfully to email.' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP.' });
  }
};

export const verifyOtpForEmail = async (req, res) => {
  const { sessionId } = req.params;
  const { otp } = req.body;

  try {
    const isValid = await incorporationService.verifyStagingOtp(sessionId, otp);
    if (!isValid) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP.' });
    }

    res.json({ success: true, message: 'Email verified successfully.' });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ success: false, message: 'OTP verification failed.' });
  }
};

export const completeIncorporation = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await incorporationService.getSessionById(sessionId);

    if (!session) {
      return res.status(404).json({ message: 'Session not found.' });
    }

    if (!session.isEmailVerified) {
      return res.status(403).json({ message: 'Email is not verified. Please verify your email before completing incorporation.' });
    }

    if (!session.isPaid) {
      return res.status(403).json({ message: 'Payment not completed. Please complete payment before finalizing incorporation.' });
    }

    const result = await incorporationService.complete(sessionId);
    res.json(result);

  } catch (err) {
    console.error('Error completing incorporation:', err);
    res.status(500).json({ message: err.message });
  }
};


// GET all staging companies
export const getAllStagingCompanies = async (req, res) => {
  try {
    const result = await incorporationService.getAllStagingCompanies();
    res.json({ success: true, stagingCompanies: result });
  } catch (error) {
    console.error('Error fetching staging companies:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET one staging company by sessionId
export const getStagingCompanyById = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const result = await incorporationService.getStagingCompanyById(sessionId);
    if (!result) return res.status(404).json({ success: false, message: 'Session not found' });
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT admin update
export const updateStagingCompanyByAdmin = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const updates = req.body;
    const updated = await incorporationService.updateStagingCompanyByAdmin(sessionId, updates);
    res.json({ success: true, updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const deleteStagingCompany = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const deleted = await incorporationService.deleteStagingCompanyById(parseInt(sessionId));
    if (!deleted) {
      return res.status(404).json({ message: 'Staging company not found' });
    }
    res.json({ message: 'Staging company deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
