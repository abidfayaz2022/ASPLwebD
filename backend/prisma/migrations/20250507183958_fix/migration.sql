/*
  Warnings:

  - The `status` column on the `Refund` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `fromStatus` to the `CompanyStatusMessage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toStatus` to the `CompanyStatusMessage` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RefundStatus" AS ENUM ('Requested', 'Processed', 'Failed');

-- AlterTable
ALTER TABLE "CompanyStatusMessage" ADD COLUMN     "fromStatus" "CompanyStatus" NOT NULL,
ADD COLUMN     "toStatus" "CompanyStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Refund" DROP COLUMN "status",
ADD COLUMN     "status" "RefundStatus" NOT NULL DEFAULT 'Requested';
