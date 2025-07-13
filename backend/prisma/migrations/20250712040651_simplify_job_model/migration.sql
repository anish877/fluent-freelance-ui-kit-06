/*
  Warnings:

  - You are about to drop the column `applicationDeadline` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `communicationPreferences` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `hourlyRate` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `isRemote` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `isUrgent` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `requirements` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `subcategory` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `timezone` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `workingHours` on the `jobs` table. All the data in the column will be lost.
  - Made the column `duration` on table `jobs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `experienceLevel` on table `jobs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `projectType` on table `jobs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "applicationDeadline",
DROP COLUMN "communicationPreferences",
DROP COLUMN "hourlyRate",
DROP COLUMN "isRemote",
DROP COLUMN "isUrgent",
DROP COLUMN "location",
DROP COLUMN "requirements",
DROP COLUMN "subcategory",
DROP COLUMN "timezone",
DROP COLUMN "workingHours",
ADD COLUMN     "attachments" TEXT[],
ADD COLUMN     "hideBudget" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "duration" SET NOT NULL,
ALTER COLUMN "experienceLevel" SET NOT NULL,
ALTER COLUMN "projectType" SET NOT NULL;
