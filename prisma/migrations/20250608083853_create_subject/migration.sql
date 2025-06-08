-- CreateEnum
CREATE TYPE "TermType" AS ENUM ('ANNUAL', 'CUATRIMESTRAL');

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "termType" "TermType" NOT NULL,
    "totalHours" INTEGER NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);
