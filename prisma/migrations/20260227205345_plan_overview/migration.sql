-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "goal" TEXT,
ADD COLUMN     "successMetrics" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "timeframeDays" INTEGER;
