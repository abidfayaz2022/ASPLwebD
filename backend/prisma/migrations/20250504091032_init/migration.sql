-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Admin', 'preparer', 'approver', 'client');

-- CreateEnum
CREATE TYPE "DocumentPurpose" AS ENUM ('MOA', 'AOA', 'ID_PROOF', 'ADDRESS_PROOF', 'BOARD_RESOLUTION', 'INVOICE', 'OTHER');

-- CreateEnum
CREATE TYPE "ShareholderType" AS ENUM ('Individual', 'Corporate');

-- CreateEnum
CREATE TYPE "CompanyStatus" AS ENUM ('Draft', 'Submitted', 'PreparerApproved', 'ApproverApproved', 'AdminApproved', 'RevertedToClient', 'RevertedToPreparer', 'Completed');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('Pending', 'Completed', 'Failed', 'Refunded', 'Disputed');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('PDF', 'DOCX', 'XLSX', 'JPG', 'PNG');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "mobile" VARCHAR(20) NOT NULL,
    "country" VARCHAR(100) NOT NULL,
    "role" "UserRole" NOT NULL,
    "profilePic" VARCHAR(255),
    "profileThumbnail" VARCHAR(255),
    "lastLogin" TIMESTAMP(3),
    "resetPasswordToken" VARCHAR(255),
    "resetPasswordExpires" TIMESTAMP(3),
    "otp" VARCHAR(10),
    "otpExpires" TIMESTAMP(3),
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isDeactivated" BOOLEAN NOT NULL DEFAULT false,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "isSuspended" BOOLEAN NOT NULL DEFAULT false,
    "suspendMessage" TEXT NOT NULL DEFAULT 'Account is not suspended',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "companyId" SERIAL NOT NULL,
    "companyName" VARCHAR(255) NOT NULL,
    "registrationDate" TIMESTAMP(3) NOT NULL,
    "addressLine1" VARCHAR(255) NOT NULL,
    "addressLine2" VARCHAR(255) NOT NULL,
    "country" VARCHAR(100) NOT NULL,
    "postalCode" VARCHAR(20) NOT NULL,
    "proposedShares" INTEGER NOT NULL,
    "currency" VARCHAR(10) NOT NULL,
    "proposedShareCapital" DECIMAL(15,2) NOT NULL,
    "businessActivity1" VARCHAR(255) NOT NULL,
    "businessActivity1Desc" VARCHAR(255) NOT NULL,
    "businessActivity2" VARCHAR(255) NOT NULL,
    "businessActivity2Desc" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "CompanyStatus" NOT NULL DEFAULT 'Draft',
    "statusRemarks" VARCHAR(500),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("companyId")
);

-- CreateTable
CREATE TABLE "CompanyStatusMessage" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "senderId" INTEGER NOT NULL,
    "senderRole" "UserRole" NOT NULL,
    "message" VARCHAR(1000) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompanyStatusMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Director" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "directorName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "addressLine1" VARCHAR(255) NOT NULL,
    "addressLine2" VARCHAR(255) NOT NULL,
    "country" VARCHAR(100) NOT NULL,
    "postalCode" VARCHAR(20) NOT NULL,
    "contactNumber" VARCHAR(20) NOT NULL,
    "nationality" VARCHAR(100) NOT NULL,
    "idType" VARCHAR(50) NOT NULL,
    "idExpiryDate" TIMESTAMP(3) NOT NULL,
    "idNumber" VARCHAR(100) NOT NULL,
    "isShareholder" BOOLEAN NOT NULL,
    "identityProof" VARCHAR(255) NOT NULL,
    "addressProof" VARCHAR(255) NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Director_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shareholder" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "shareholderName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "type" "ShareholderType" NOT NULL,
    "addressLine1" VARCHAR(255) NOT NULL,
    "addressLine2" VARCHAR(255) NOT NULL,
    "country" VARCHAR(100) NOT NULL,
    "postalCode" VARCHAR(20) NOT NULL,
    "contactNumber" VARCHAR(20) NOT NULL,
    "nationality" VARCHAR(100) NOT NULL,
    "idType" VARCHAR(50) NOT NULL,
    "idExpiryDate" TIMESTAMP(3) NOT NULL,
    "idNumber" VARCHAR(100) NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "numberOfShares" INTEGER NOT NULL,
    "shareCapitalAllocation" DECIMAL(15,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Shareholder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyDocument" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "documentLabel" TEXT NOT NULL,
    "documentPath" TEXT NOT NULL,
    "documentType" "DocumentType" NOT NULL,
    "purpose" "DocumentPurpose" NOT NULL DEFAULT 'OTHER',
    "thumbnail" TEXT,
    "uploadedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER,
    "userId" INTEGER,
    "stagingCompanyId" TEXT,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" VARCHAR(10) NOT NULL,
    "paymentMethod" VARCHAR(50) NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'Pending',
    "paymentReference" TEXT NOT NULL,
    "services" VARCHAR(255) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Refund" (
    "id" SERIAL NOT NULL,
    "paymentId" INTEGER NOT NULL,
    "refundId" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Refund_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "serviceName" VARCHAR(255) NOT NULL,
    "serviceDescription" TEXT NOT NULL,
    "cost" DECIMAL(10,2) NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyService" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "updateDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsightRecommendation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InsightRecommendation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CalendarAction" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pending',

    CONSTRAINT "CalendarAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatMessage" (
    "id" SERIAL NOT NULL,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DashboardState" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "step" VARCHAR(100) NOT NULL,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "DashboardState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoleAssignment" (
    "id" SERIAL NOT NULL,
    "agentId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "role" "UserRole" NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoleAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "imagePath" VARCHAR(225) NOT NULL,
    "views" INTEGER NOT NULL,
    "hashtag" VARCHAR(255) NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactUs" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(50) NOT NULL,
    "subject" VARCHAR(225) NOT NULL,
    "details" TEXT NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "ticketUpdate" VARCHAR(225) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactUs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FAQ" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StagingCompany" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "contactEmail" TEXT,
    "contactNumber" TEXT,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "emailOtp" TEXT,
    "emailOtpExpires" TIMESTAMP(3),
    "step" INTEGER NOT NULL,
    "registrationDate" TIMESTAMP(3),
    "directorData" TEXT,
    "shareholderData" TEXT,
    "servicesSelected" TEXT,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "razorpayOrderId" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StagingCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegisteredCompanyName" (
    "id" SERIAL NOT NULL,
    "companyName" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RegisteredCompanyName_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Company_userId_idx" ON "Company"("userId");

-- CreateIndex
CREATE INDEX "CompanyStatusMessage_companyId_idx" ON "CompanyStatusMessage"("companyId");

-- CreateIndex
CREATE INDEX "Director_companyId_idx" ON "Director"("companyId");

-- CreateIndex
CREATE INDEX "Shareholder_companyId_idx" ON "Shareholder"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_paymentReference_key" ON "Payment"("paymentReference");

-- CreateIndex
CREATE UNIQUE INDEX "Refund_refundId_key" ON "Refund"("refundId");

-- CreateIndex
CREATE UNIQUE INDEX "DashboardState_companyId_key" ON "DashboardState"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "RegisteredCompanyName_companyName_key" ON "RegisteredCompanyName"("companyName");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyStatusMessage" ADD CONSTRAINT "CompanyStatusMessage_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("companyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyStatusMessage" ADD CONSTRAINT "CompanyStatusMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Director" ADD CONSTRAINT "Director_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("companyId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shareholder" ADD CONSTRAINT "Shareholder_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("companyId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyDocument" ADD CONSTRAINT "CompanyDocument_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("companyId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("companyId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_stagingCompanyId_fkey" FOREIGN KEY ("stagingCompanyId") REFERENCES "StagingCompany"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refund" ADD CONSTRAINT "Refund_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyService" ADD CONSTRAINT "CompanyService_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("companyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyService" ADD CONSTRAINT "CompanyService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsightRecommendation" ADD CONSTRAINT "InsightRecommendation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalendarAction" ADD CONSTRAINT "CalendarAction_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("companyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalendarAction" ADD CONSTRAINT "CalendarAction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DashboardState" ADD CONSTRAINT "DashboardState_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("companyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleAssignment" ADD CONSTRAINT "RoleAssignment_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleAssignment" ADD CONSTRAINT "RoleAssignment_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("companyId") ON DELETE RESTRICT ON UPDATE CASCADE;
