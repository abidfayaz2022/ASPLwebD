import prisma from '../lib/prismaClient.js';

export const checkPreparerUserCompanyLink = async (userId, preparerId, companyId) => {
  const exists = await prisma.preparerUserAssignment.findFirst({
    where: { userId, preparerId, companyId }
  });
  if (!exists) throw new Error('Unauthorized relationship');
};
