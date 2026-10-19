-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "intermediateTitleOnly" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "electiveHoursLevel3" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "electiveHoursLevel4" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "electiveHoursLevel5" INTEGER NOT NULL DEFAULT 0;
