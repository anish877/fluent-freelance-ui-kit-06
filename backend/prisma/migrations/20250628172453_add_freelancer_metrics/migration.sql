-- AlterTable
ALTER TABLE "users" ADD COLUMN     "completedJobs" INTEGER,
ADD COLUMN     "lastActive" TEXT,
ADD COLUMN     "onTime" INTEGER,
ADD COLUMN     "successRate" INTEGER,
ADD COLUMN     "topRatedPlus" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "totalEarnings" TEXT,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;
