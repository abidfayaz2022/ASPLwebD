-- AlterTable
ALTER TABLE "StagingCompany" ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "razorpayOrderId" SET DATA TYPE TEXT;
