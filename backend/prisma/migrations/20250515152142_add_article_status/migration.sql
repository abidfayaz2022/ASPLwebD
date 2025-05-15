/*
  Warnings:

  - The `status` column on the `Article` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ArticleStatus" AS ENUM ('draft', 'published');

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "status",
ADD COLUMN     "status" "ArticleStatus" NOT NULL DEFAULT 'draft',
ALTER COLUMN "publishedAt" DROP NOT NULL,
ALTER COLUMN "imagePath" DROP NOT NULL,
ALTER COLUMN "views" SET DEFAULT 0,
ALTER COLUMN "hashtag" DROP NOT NULL;
