/*
  Warnings:

  - You are about to drop the column `pro_id` on the `vehicles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "pro_id",
ADD COLUMN     "proprietario_id" TEXT;
