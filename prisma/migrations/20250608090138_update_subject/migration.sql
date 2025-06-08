/*
  Warnings:

  - The values [ANNUAL] on the enum `TermType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TermType_new" AS ENUM ('ANUAL', 'CUATRIMESTRAL');
ALTER TABLE "Subject" ALTER COLUMN "termType" TYPE "TermType_new" USING ("termType"::text::"TermType_new");
ALTER TYPE "TermType" RENAME TO "TermType_old";
ALTER TYPE "TermType_new" RENAME TO "TermType";
DROP TYPE "TermType_old";
COMMIT;
