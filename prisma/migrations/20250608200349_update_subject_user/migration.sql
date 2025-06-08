-- AlterTable
ALTER TABLE "User" ALTER COLUMN "approvedSubjects" SET DEFAULT ARRAY[]::INTEGER[],
ALTER COLUMN "regularizedSubjects" SET DEFAULT ARRAY[]::INTEGER[];
