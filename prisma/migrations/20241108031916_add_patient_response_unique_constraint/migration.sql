/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `AnswerFormat` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[gender]` on the table `Gender` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[patientId,questionId]` on the table `PatientResponse` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Question` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `QuestionCategory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[responsevalue]` on the table `ResponseOption` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `RiskType` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_genderId_fkey";

-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "genderId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AnswerFormat_name_key" ON "AnswerFormat"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Gender_gender_key" ON "Gender"("gender");

-- CreateIndex
CREATE UNIQUE INDEX "PatientResponse_patientId_questionId_key" ON "PatientResponse"("patientId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "Question_title_key" ON "Question"("title");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionCategory_name_key" ON "QuestionCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ResponseOption_responsevalue_key" ON "ResponseOption"("responsevalue");

-- CreateIndex
CREATE UNIQUE INDEX "RiskType_name_key" ON "RiskType"("name");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "Gender"("id") ON DELETE SET NULL ON UPDATE CASCADE;
