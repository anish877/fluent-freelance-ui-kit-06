-- CreateEnum
CREATE TYPE "JobInvitationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- AlterEnum
ALTER TYPE "NotificationType" ADD VALUE 'JOB_INVITATION';

-- CreateTable
CREATE TABLE "job_invitations" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "freelancerEmail" TEXT NOT NULL,
    "message" TEXT,
    "status" "JobInvitationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_invitations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "job_invitations_jobId_freelancerEmail_key" ON "job_invitations"("jobId", "freelancerEmail");

-- AddForeignKey
ALTER TABLE "job_invitations" ADD CONSTRAINT "job_invitations_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_invitations" ADD CONSTRAINT "job_invitations_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_invitations" ADD CONSTRAINT "job_invitations_freelancerEmail_fkey" FOREIGN KEY ("freelancerEmail") REFERENCES "users"("email") ON DELETE CASCADE ON UPDATE CASCADE;
