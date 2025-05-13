/* eslint-disable no-unused-vars */
import { PrismaClient } from '../generated/prisma/index.js';
import { hashPassword } from '../src/utils/passwordUtils.js';

const prisma = new PrismaClient();

async function main() {
  const defaultPassword = await hashPassword('password123');
  // Create Users
  const adminUser = await prisma.user.create({
    data: {
      username: 'adminuser',
      email: 'admin@example.com',
      password: defaultPassword,
      mobile: '1234567890',
      country: 'USA',
      role: 'Admin',
    },
  });

  const clientUser = await prisma.user.create({
    data: {
      username: 'clientuser',
      email: 'client@example.com',
      password: defaultPassword,
      mobile: '9876543210',
      country: 'Canada',
      role: 'client',
    },
  });

  // Create Company
  const company = await prisma.company.create({
    data: {
      companyName: 'Example Corp',
      registrationDate: new Date(),
      addressLine1: '123 Main St',
      addressLine2: 'Suite 100',
      country: 'USA',
      postalCode: '10001',
      proposedShares: 1000,
      currency: 'USD',
      proposedShareCapital: 100000.00,
      businessActivity1: 'Tech',
      businessActivity1Desc: 'Software Development',
      businessActivity2: 'Consulting',
      businessActivity2Desc: 'IT Consulting',
      userId: clientUser.id,
    },
  });

  // Create a Director
  await prisma.director.create({
    data: {
      companyId: company.companyId,
      directorName: 'John Doe',
      email: 'john@example.com',
      addressLine1: '456 Tech Ave',
      addressLine2: 'Apt 12',
      country: 'USA',
      postalCode: '90210',
      contactNumber: '5551234567',
      nationality: 'American',
      idType: 'Passport',
      idExpiryDate: new Date('2030-12-31'),
      idNumber: 'A1234567',
      isShareholder: true,
      identityProof: '/path/to/id.jpg',
      addressProof: '/path/to/address.jpg',
      dateOfBirth: new Date('1980-05-20'),
    },
  });

  // Create a Shareholder
  await prisma.shareholder.create({
    data: {
      companyId: company.companyId,
      shareholderName: 'Jane Smith',
      email: 'jane@example.com',
      type: 'Individual',
      addressLine1: '789 Market Rd',
      addressLine2: 'Floor 2',
      country: 'Canada',
      postalCode: 'M5V 3L9',
      contactNumber: '4447778888',
      nationality: 'Canadian',
      idType: 'Driver License',
      idExpiryDate: new Date('2028-08-15'),
      idNumber: 'D9876543',
      dateOfBirth: new Date('1990-10-15'),
      numberOfShares: 500,
      shareCapitalAllocation: 50000.00,
    },
  });

  // Create a Service and assign it to the company
  const service = await prisma.service.create({
    data: {
      serviceName: 'Incorporation',
      serviceDescription: 'Complete business registration',
      cost: 300.00,
      status: 'Available',
    },
  });

  await prisma.companyService.create({
    data: {
      companyId: company.companyId,
      serviceId: service.id,
      updateDate: new Date(),
    },
  });

  // Create Payment and Refund
  const payment = await prisma.payment.create({
    data: {
      userId: clientUser.id,
      companyId: company.companyId,
      paymentDate: new Date(),
      amount: 300.00,
      currency: 'USD',
      paymentMethod: 'Credit Card',
      paymentReference: 'REF123456',
      services: 'Incorporation',
    },
  });

  await prisma.refund.create({
    data: {
      paymentId: payment.id,
      refundId: 'RFD987654',
      amount: 50.00,
    },
  });

  // Create Notification
  await prisma.notification.create({
    data: {
      userId: clientUser.id,
      title: 'Welcome!',
      message: 'Your company profile has been created.',
    },
  });
}

main()
  .then(() => {
    console.log('Seeding completed.');
  })
  .catch((e) => {
    console.error('Seeding failed:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });