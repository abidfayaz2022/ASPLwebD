/*
  Warnings:

  - You are about to drop the `RoleAssignment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RoleAssignment" DROP CONSTRAINT "RoleAssignment_agentId_fkey";

-- DropForeignKey
ALTER TABLE "RoleAssignment" DROP CONSTRAINT "RoleAssignment_companyId_fkey";

-- DropTable
DROP TABLE "RoleAssignment";

-- CreateTable
CREATE TABLE "RoleDelegation" (
    "id" SERIAL NOT NULL,
    "delegatorId" INTEGER NOT NULL,
    "delegateeId" INTEGER NOT NULL,
    "delegatedRole" "UserRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoleDelegation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyAssignment" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "preparerId" INTEGER NOT NULL,
    "assignedById" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompanyAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RoleDelegation_delegatorId_idx" ON "RoleDelegation"("delegatorId");

-- CreateIndex
CREATE INDEX "RoleDelegation_delegateeId_idx" ON "RoleDelegation"("delegateeId");

-- CreateIndex
CREATE INDEX "CompanyAssignment_companyId_idx" ON "CompanyAssignment"("companyId");

-- CreateIndex
CREATE INDEX "CompanyAssignment_preparerId_idx" ON "CompanyAssignment"("preparerId");

-- CreateIndex
CREATE INDEX "CompanyAssignment_assignedById_idx" ON "CompanyAssignment"("assignedById");

-- AddForeignKey
ALTER TABLE "RoleDelegation" ADD CONSTRAINT "RoleDelegation_delegatorId_fkey" FOREIGN KEY ("delegatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleDelegation" ADD CONSTRAINT "RoleDelegation_delegateeId_fkey" FOREIGN KEY ("delegateeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyAssignment" ADD CONSTRAINT "CompanyAssignment_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("companyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyAssignment" ADD CONSTRAINT "CompanyAssignment_preparerId_fkey" FOREIGN KEY ("preparerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyAssignment" ADD CONSTRAINT "CompanyAssignment_assignedById_fkey" FOREIGN KEY ("assignedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
