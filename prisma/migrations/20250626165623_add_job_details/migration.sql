-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "benefits" JSONB DEFAULT '[]',
ADD COLUMN     "employmentType" TEXT,
ADD COLUMN     "requirements" JSONB DEFAULT '[]',
ADD COLUMN     "responsibilities" JSONB DEFAULT '[]',
ADD COLUMN     "teamSize" TEXT;
