-- AlterTable
ALTER TABLE "DailyResults" ADD COLUMN     "ageGroupId" INTEGER,
ADD COLUMN     "genderId" INTEGER;

-- CreateTable
CREATE TABLE "AgeGroup" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "minAge" INTEGER NOT NULL,
    "maxAge" INTEGER,

    CONSTRAINT "AgeGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AgeGroup_name_key" ON "AgeGroup"("name");

-- AddForeignKey
ALTER TABLE "DailyResults" ADD CONSTRAINT "DailyResults_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "Gender"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyResults" ADD CONSTRAINT "DailyResults_ageGroupId_fkey" FOREIGN KEY ("ageGroupId") REFERENCES "AgeGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
