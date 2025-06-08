/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Subject` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `annualHours` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseYear` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weeklyHours` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "annualHours" INTEGER NOT NULL,
ADD COLUMN     "code" INTEGER NOT NULL,
ADD COLUMN     "courseYear" INTEGER NOT NULL,
ADD COLUMN     "requiredSubjectsToEnroll" INTEGER[],
ADD COLUMN     "requiredSubjectsToPass" INTEGER[],
ADD COLUMN     "weeklyHours" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Subject_code_key" ON "Subject"("code");
