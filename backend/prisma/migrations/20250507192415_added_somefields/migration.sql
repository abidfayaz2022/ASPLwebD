/*
  Warnings:

  - Added the required column `uploadedBy` to the `CompanyDocument` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uploadedRole` to the `CompanyDocument` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CompanyDocument" DROP CONSTRAINT "CompanyDocument_companyId_fkey";

-- AlterTable
ALTER TABLE "CompanyDocument" ADD COLUMN     "uploadedBy" INTEGER NOT NULL,
ADD COLUMN     "uploadedFor" INTEGER,
ADD COLUMN     "uploadedRole" "UserRole" NOT NULL,
ALTER COLUMN "uploadedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" SERIAL NOT NULL,
    "actorId" INTEGER NOT NULL,
    "role" "UserRole" NOT NULL,
    "action" VARCHAR(255) NOT NULL,
    "target" VARCHAR(255) NOT NULL,
    "companyId" INTEGER,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CompanyDocument" ADD CONSTRAINT "CompanyDocument_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("companyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyDocument" ADD CONSTRAINT "CompanyDocument_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyDocument" ADD CONSTRAINT "CompanyDocument_uploadedFor_fkey" FOREIGN KEY ("uploadedFor") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("companyId") ON DELETE SET NULL ON UPDATE CASCADE;
