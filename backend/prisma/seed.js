/* eslint-disable no-unused-vars */
import { PrismaClient } from '../generated/prisma/index.js';
import { hashPassword } from '../src/utils/passwordUtils.js';

const prisma = new PrismaClient();


async function main() {
  const defaultPassword = await hashPassword('password123');

  // Create Admin User
  const admin = await prisma.user.create({
    data: {
      username: 'adminuser',
      email: 'admin@example.com',
      password: defaultPassword,
      mobile: '9999999999',
      country: 'India',
      role: 'Admin',
      isVerified: true,
    },
  });

  // Create Client User
  const client = await prisma.user.create({
    data: {
      username: 'clientuser',
      email: 'client@example.com',
      password: defaultPassword,
      mobile: '8888888888',
      country: 'Singapore',
      role: 'client',
      isVerified: true,
    },
  });

  // Create Services
  const service1 = await prisma.service.create({
    data: {
      serviceName: 'Company Incorporation',
      serviceDescription: 'Help with incorporation.',
      cost: 200.0,
      status: 'Active',
    },
  });

  const service2 = await prisma.service.create({
    data: {
      serviceName: 'Registered Office Address',
      serviceDescription: 'Virtual address service.',
      cost: 100.0,
      status: 'Active',
    },
  });

  // StagingCompany
  const staging = await prisma.stagingCompany.create({
    data: {
      companyName: 'TechNova Pte Ltd',
      contactEmail: 'founder@technova.com',
      contactNumber: '812345678',
      step: 4,
      isEmailVerified: true,
      isPaid: true,
      servicesSelected: JSON.stringify([service1.id, service2.id]),
      directorData: JSON.stringify([
        {
          directorName: 'John Doe',
          email: 'john@example.com',
          addressLine1: '123 Tech Street',
          addressLine2: '',
          country: 'Singapore',
          postalCode: '123456',
          contactNumber: '91234567',
          nationality: 'Singaporean',
          idType: 'NRIC',
          idNumber: 'S1234567A',
          idExpiryDate: new Date('2030-12-31'),
          isShareholder: true,
          identityProof: 'path/to/id.jpg',
          addressProof: 'path/to/address.jpg',
          dateOfBirth: new Date('1990-01-01'),
        },
      ]),
      shareholderData: JSON.stringify([
        {
          shareholderName: 'Alice Smith',
          email: 'alice@example.com',
          type: 'Individual',
          addressLine1: '456 Business Rd',
          addressLine2: '',
          country: 'Singapore',
          postalCode: '654321',
          contactNumber: '81234567',
          nationality: 'Singaporean',
          idType: 'NRIC',
          idNumber: 'S7654321A',
          idExpiryDate: new Date('2030-12-31'),
          dateOfBirth: new Date('1988-06-15'),
          numberOfShares: 100,
          shareCapitalAllocation: 1000.0,
        },
      ]),
    },
  });

  // Create Registered Company Name
  await prisma.registeredCompanyName.create({
    data: {
      companyName: staging.companyName,
    },
  });

  // Create actual company from staging
  const company = await prisma.company.create({
    data: {
      userId: client.id,
      companyName: staging.companyName,
      registrationDate: new Date(),
      addressLine1: '123 Startup Lane',
      addressLine2: '',
      country: 'Singapore',
      postalCode: '543210',
      proposedShares: 1000,
      currency: 'SGD',
      proposedShareCapital: 10000.0,
      businessActivity1: 'Technology',
      businessActivity1Desc: 'Software Solutions',
      businessActivity2: 'Consulting',
      businessActivity2Desc: 'IT Consulting',
      status: 'Draft',
    },
  });

  // Add CompanyService entries
  await prisma.companyService.createMany({
    data: [
      {
        companyId: company.companyId,
        serviceId: service1.id,
        updateDate: new Date(),
      },
      {
        companyId: company.companyId,
        serviceId: service2.id,
        updateDate: new Date(),
      },
    ],
  });

  // Add Payment
  const payment = await prisma.payment.create({
    data: {
      companyId: company.companyId,
      userId: client.id,
      stagingCompanyId: staging.id,
      paymentDate: new Date(),
      amount: 300.0,
      currency: 'INR',
      paymentMethod: 'Razorpay',
      paymentStatus: 'Completed',
      paymentReference: 'RZP_TEST_REF',
      services: 'Company Incorporation, Registered Office',
    },
  });

  // Add Refund
  await prisma.refund.create({
    data: {
      paymentId: payment.id,
      refundId: 'RZP_REFUND_123',
      amount: 100.0,
      status: 'processed',
    },
  });

  // Articles
  await prisma.article.create({
    data: {
      title: 'Benefits of Incorporating in Singapore',
      content: 'Detailed guide...',
      status: 'Published',
      publishedAt: new Date(),
      imagePath: '/images/sg-benefits.jpg',
      views: 125,
      hashtag: '#Incorporation',
    },
  });

  // FAQ
  await prisma.fAQ.createMany({
    data: [
      { question: 'How long does incorporation take?', answer: 'Typically 1–2 days.' },
      { question: 'Do I need a local director?', answer: 'Yes, at least one.' },
    ],
  });

  console.log('✅ Seed completed successfully');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });