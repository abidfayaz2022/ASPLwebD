/* eslint-disable no-unused-vars */
import { PrismaClient } from '../generated/prisma/index.js';
import { hashPassword } from '../src/utils/passwordUtils.js';

const prisma = new PrismaClient();


async function main() {
  const defaultPassword = await hashPassword('password123');
  

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      username: 'adminuser',
      email: 'admin@example.com',
      name: 'System Admin',
      password:defaultPassword,
      mobile: '9999999999',
      country: 'India',
      role: 'Admin',
      isVerified: true
    },
  });

  // ----- Create Services -----
  const services = await prisma.service.createMany({
    data: [
      {
        serviceName: 'Company Incorporation',
        serviceDescription: 'Register your company legally with expert support.',
        cost: 5000,
        status: 'Active',
      },
      {
        serviceName: 'GST Registration',
        serviceDescription: 'Get your GST Number for taxation purposes.',
        cost: 1500,
        status: 'Active',
      },
      {
        serviceName: 'Annual Compliance',
        serviceDescription: 'Ensure your company complies with regulations.',
        cost: 3000,
        status: 'Active',
      },
    ],
    skipDuplicates: true,
  });

  // ----- Create Registered Company Names -----
  await prisma.registeredCompanyName.createMany({
    data: [
      { companyName: 'TechNest Solutions Pvt Ltd' },
      { companyName: 'BlueWave Innovations LLP' },
      { companyName: 'GreenOrbit Systems' },
    ],
    skipDuplicates: true,
  });


  const client = await prisma.user.upsert({
    where: { email: 'client@example.com' },
    update: {},
    create: {
      username: 'client01',
      email: 'client@example.com',
      name: 'Client User',
      password: defaultPassword,
      mobile: '8888888888',
      country: 'India',
      role: 'client',
      isVerified: true,
    },
  });

  const company = await prisma.company.create({
    data: {
      companyName: 'BrightTech Private Limited',
      registrationDate: new Date('2024-01-01'),
      addressLine1: '123 Corporate Park',
      addressLine2: 'Business Bay',
      country: 'India',
      postalCode: '110001',
      proposedShares: 10000,
      currency: 'INR',
      proposedShareCapital: 1000000,
      businessActivity1: 'Software Development',
      businessActivity1Desc: 'Creating SaaS and enterprise applications',
      businessActivity2: 'Consulting',
      businessActivity2Desc: 'IT and Digital Transformation Consulting',
      userId: client.id,
    },
  });

  // ----- Assign a Service to the Company -----
  const service = await prisma.service.findFirst({ where: { serviceName: 'Company Incorporation' } });

  if (service) {
    await prisma.companyService.create({
      data: {
        companyId: company.companyId,
        serviceId: service.id,
        updateDate: new Date(),
      },
    });
  }

  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
