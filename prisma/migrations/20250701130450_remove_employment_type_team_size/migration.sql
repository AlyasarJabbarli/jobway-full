/*
  Warnings:

  - You are about to drop the column `employmentType` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `teamSize` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "employmentType",
DROP COLUMN "teamSize";
