import prisma from '../lib/prismaClient.js';

/**
 * Generate a unique username based on the company name.
 * Replaces spaces with underscores and appends a number if the name already exists.
 */
export const generateUniqueUsername = async (baseName) => {
  const baseUsername = baseName.trim().toLowerCase().replace(/\s+/g, '_');
  let username = baseUsername;
  let count = 0;

  while (true) {
    const existing = await prisma.user.findUnique({ where: { username } });
    if (!existing) break;
    count += 1;
    username = `${baseUsername}${count}`;
  }

  return username;
};
