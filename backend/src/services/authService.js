import prisma from '../lib/prismaClient.js';
import { hashPassword, comparePassword, generateToken ,generateRefreshToken} from '../utils/passwordUtils.js';
import crypto from 'crypto';
import sendEmail from '../utils/email.js';
import jwt from 'jsonwebtoken';




export const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) throw new Error('Refresh token missing');

  let payload;
  try {
    payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch {
    throw new Error('Invalid or expired refresh token');
  }

  const user = await prisma.user.findUnique({ where: { id: payload.userId } });

  if (!user || user.refreshToken !== refreshToken) {
    throw new Error('Invalid session or user');
  }

  const newAccessToken = generateToken(user.id);
  return { token: newAccessToken };
};

// export const registerUser = async ({ username, email, password, mobile, country, role }) => {
//   const existingUser = await prisma.user.findFirst({
//     where: { OR: [{ email }, { username }] },
//   });

//   if (existingUser) throw new Error('User already exists');

//   const hashedPassword = await hashPassword(password);

//   return await prisma.user.create({
//     data: {
//       username,
//       email,
//       password: hashedPassword,
//       mobile: String(mobile),
//       country,
//       role: role || 'client',
//     },
//   });
// };

export const loginUser = async ({ emailOrUsername, password }) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: emailOrUsername }, { username: emailOrUsername }]
    }
  });

  if (!user) throw new Error('Invalid credentials');

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = generateToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken }
  });

  return {
    token,
    refreshToken,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  };
};



export const generateResetToken = async (email) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const token = crypto.randomBytes(32).toString('hex');
  const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min

  await prisma.user.update({
    where: { email },
    data: {
      resetPasswordToken: token,
      resetPasswordExpires: expiry
    }
  });

  const resetLink = `${process.env.CLIENT_BASE_URL}/reset-password?token=${token}`;
  const message = `You requested a password reset.\n\nClick the link below to reset your password:\n\n${resetLink}\n\nThis link will expire in 5 minutes.`;

  await sendEmail({
    to: email,
    subject: 'Reset Your Password',
    text: message
  });

  return token;
};

export const resetPassword = async (token, newPassword) => {
  const user = await prisma.user.findFirst({
    where: {
      resetPasswordToken: token,
      resetPasswordExpires: { gt: new Date() }
    }
  });
  if (!user) return null;

  const hashedPassword = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null
    }
  });

  return true;
};

export const generateOtp = async (email) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  // Use crypto for a more secure OTP
  const otp = crypto.randomInt(100000, 999999).toString();
  const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

  await prisma.user.update({
    where: { email },
    data: {
      otp,
      otpExpires: expiry
    }
  });

  const message = `Your OTP code is: ${otp}\nThis will expire in 5 minutes.`;

  await sendEmail({
    to: email,
    subject: 'Your OTP Code',
    text: message
  });

  return otp;
};

export const verifyOtp = async (email, otp) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
      otp,
      otpExpires: { gt: new Date() }
    }
  });
  if (!user) return false;

  await prisma.user.update({
    where: { id: user.id },
    data: {
      otp: null,
      otpExpires: null
    }
  });

  return true;
};

export const fetchProfile = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};