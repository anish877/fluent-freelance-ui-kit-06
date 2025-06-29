-- AlterTable
ALTER TABLE "users" ADD COLUMN     "availabilityStatus" TEXT,
ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "employmentHistory" JSONB,
ADD COLUMN     "hourlyRateRange" TEXT,
ADD COLUMN     "isOnline" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "portfolioProjects" JSONB,
ADD COLUMN     "workHistory" JSONB;
