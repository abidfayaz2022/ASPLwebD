-- AlterTable
ALTER TABLE "CalendarAction" ADD COLUMN     "createdBy" INTEGER;

-- AddForeignKey
ALTER TABLE "CalendarAction" ADD CONSTRAINT "CalendarAction_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
