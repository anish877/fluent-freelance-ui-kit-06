/*
  Warnings:

  - Made the column `jobId` on table `conversations` required. This step will fail if there are existing NULL values in that column.

*/

-- First, delete conversations with NULL jobId (they are invalid anyway)
DELETE FROM "conversations" WHERE "jobId" IS NULL;

-- DropForeignKey
ALTER TABLE "conversations" DROP CONSTRAINT "conversations_jobId_fkey";

-- AlterTable
ALTER TABLE "conversations" ALTER COLUMN "jobId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
