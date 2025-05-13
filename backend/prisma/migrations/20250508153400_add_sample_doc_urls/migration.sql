/*
  Warnings:

  - You are about to drop the column `sampleDocUrl` on the `InsightRecommendation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "InsightRecommendation" DROP COLUMN "sampleDocUrl",
ADD COLUMN     "sampleDocUrls" TEXT[];
