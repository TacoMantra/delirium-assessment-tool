/*
  Warnings:

  - A unique constraint covering the columns `[riskTypeId,ageGroupId,genderId,createdAt]` on the table `DailyResults` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DailyResults_riskTypeId_ageGroupId_genderId_createdAt_key" ON "DailyResults"("riskTypeId", "ageGroupId", "genderId", "createdAt");
