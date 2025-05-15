/* eslint-disable no-unused-vars */
import { PrismaClient } from '../generated/prisma/index.js';
import { hashPassword } from '../src/utils/passwordUtils.js';

const prisma = new PrismaClient();

async function main() {
  // Seed Users
   const defaultPassword = await hashPassword('password123');
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@example.com',
      name: 'Admin User',
      password: defaultPassword,
      mobile: '+1234567890',
      country: 'India',
      role: 'Admin',
      isVerified: true
    },
  });

  const clientUser = await prisma.user.upsert({
    where: { email: 'client@example.com' },
    update: {},
    create: {
      username: 'clientUser',
      email: 'client@example.com',
      name: 'Client User',
      password: defaultPassword,
      mobile: '+0987654321',
      country: 'India',
      role: 'client',
      isVerified: true
    },
  });

  // Seed a Service
  const service1 = await prisma.service.create({
    data: {
      serviceName: 'Company Registration',
      serviceDescription: 'Complete registration services',
      cost: 5000.00,
      status: 'Available',
    },
  });

  // Seed Company
  const company = await prisma.company.create({
    data: {
      companyName: 'TechNova Pvt Ltd',
      registrationDate: new Date('2023-01-01'),
      addressLine1: '123 Tech Street',
      addressLine2: 'Business Park',
      country: 'India',
      postalCode: '123456',
      proposedShares: 1000,
      currency: 'INR',
      proposedShareCapital: 1000000.00,
      businessActivity1: 'IT Services',
      businessActivity1Desc: 'Software development',
      businessActivity2: 'Consulting',
      businessActivity2Desc: 'Business and IT consulting',
      userId: clientUser.id
    },
  });

  // Assign Service to Company
  await prisma.companyService.create({
    data: {
      companyId: company.companyId,
      serviceId: service1.id,
      updateDate: new Date(),
    },
  });

  // Create a Director
  await prisma.director.create({
    data: {
      companyId: company.companyId,
      directorName: 'John Doe',
      email: 'john.doe@example.com',
      addressLine1: '456 Director St',
      addressLine2: 'Suite 1',
      country: 'India',
      postalCode: '654321',
      contactNumber: '+911234567890',
      nationality: 'Indian',
      idType: 'Passport',
      idExpiryDate: new Date('2030-12-31'),
      idNumber: 'A1234567',
      isShareholder: true,
      identityProof: 'uploads/id.jpg',
      addressProof: 'uploads/address.jpg',
      dateOfBirth: new Date('1980-01-01'),
    }
  });

  // Create Registered Company Name
  await prisma.registeredCompanyName.create({
    data: {
      companyName: 'TechNova Pvt Ltd'
    }
  });

  console.log('✅ Seed complete');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });