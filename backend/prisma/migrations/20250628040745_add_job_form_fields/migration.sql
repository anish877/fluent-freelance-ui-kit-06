-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "applicationDeadline" TIMESTAMP(3),
ADD COLUMN     "communicationPreferences" TEXT[],
ADD COLUMN     "experienceLevel" TEXT,
ADD COLUMN     "isUrgent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "projectType" TEXT,
ADD COLUMN     "subcategory" TEXT,
ADD COLUMN     "timezone" TEXT,
ADD COLUMN     "visibility" TEXT NOT NULL DEFAULT 'public',
ADD COLUMN     "workingHours" TEXT;
