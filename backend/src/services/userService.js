import prisma from '../lib/prismaClient.js';

export const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      email: true,
      mobile: true,
      country: true,
      profilePic: true,
      profileThumbnail: true,
      lastLogin: true,
      isVerified: true,
      isDeactivated: true,
      isSuspended: true,
      suspendMessage: true,
      createdAt: true,
    },
  });
};

export const updateUser = async (id, data) => {
  const allowedFields = ['username', 'email', 'mobile', 'country', 'profilePic', 'profileThumbnail'];
  const updateData = {};

  allowedFields.forEach((field) => {
    if (data[field] !== undefined) {
      updateData[field] = data[field];
    }
  });

  return await prisma.user.update({
    where: { id },
    data: updateData,
  });
};

export const softDeleteUser = async (id) => {
  return await prisma.user.update({
    where: { id },
    data: {
      isDeleted: true,
      isDeactivated: true,
    },
  });
};
