/*
  Warnings:

  - You are about to drop the column `canEdit` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "canEdit",
ADD COLUMN     "canEditC" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canEditD" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canEditS" BOOLEAN NOT NULL DEFAULT false;
