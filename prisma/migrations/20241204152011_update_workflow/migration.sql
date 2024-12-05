-- AlterTable
ALTER TABLE "Workflow" ADD COLUMN "lastRunAt" DATETIME;
ALTER TABLE "Workflow" ADD COLUMN "lastRunId" TEXT;
ALTER TABLE "Workflow" ADD COLUMN "lastRunStatus" TEXT;
ALTER TABLE "Workflow" ADD COLUMN "nextRunAt" DATETIME;
