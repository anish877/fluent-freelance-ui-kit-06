-- AlterTable
ALTER TABLE "proposals" ADD COLUMN     "clientNotes" TEXT,
ADD COLUMN     "clientViewed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "interview" JSONB,
ADD COLUMN     "isShortlisted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "milestones" JSONB,
ADD COLUMN     "originalBudget" DOUBLE PRECISION,
ADD COLUMN     "questionResponses" JSONB,
ADD COLUMN     "rating" INTEGER;
