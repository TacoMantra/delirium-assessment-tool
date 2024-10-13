/*
  Warnings:

  - A unique constraint covering the columns `[order]` on the table `Question` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `responseOptionId` to the `PatientResponse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gender" ALTER COLUMN "gender" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "PatientResponse" ADD COLUMN     "responseOptionId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Question_order_key" ON "Question"("order");

-- AddForeignKey
ALTER TABLE "PatientResponse" ADD CONSTRAINT "PatientResponse_responseOptionId_fkey" FOREIGN KEY ("responseOptionId") REFERENCES "ResponseOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
