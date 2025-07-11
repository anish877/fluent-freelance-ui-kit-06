/*
  Warnings:

  - You are about to drop the column `description` on the `offers` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `offers` table. All the data in the column will be lost.
  - Made the column `jobId` on table `offers` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "offers" DROP CONSTRAINT "offers_jobId_fkey";

-- AlterTable
ALTER TABLE "offers" DROP COLUMN "description",
DROP COLUMN "title",
ALTER COLUMN "jobId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
