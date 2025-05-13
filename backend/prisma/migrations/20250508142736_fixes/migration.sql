/*
  Warnings:

  - Added the required column `createdByRole` to the `CalendarAction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CalendarAction" ADD COLUMN     "createdByRole" "UserRole" NOT NULL;
