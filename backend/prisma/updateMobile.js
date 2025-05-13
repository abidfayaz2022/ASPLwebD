import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

async function updateMobiles() {
  const users = await prisma.user.findMany();

  for (const user of users) {
    if (!user.mobile.startsWith('+91')) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          mobile: `+91-${user.mobile}`,
        },
      });
    }
  }

  console.log('✅ Mobile numbers updated with +91 prefix');
}

updateMobiles()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
