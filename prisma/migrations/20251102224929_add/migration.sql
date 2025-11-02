/*
  Warnings:

  - You are about to drop the column `vehicle_id` on the `orders` table. All the data in the column will be lost.
  - Added the required column `placa` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "orders_vehicle_id_idx";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "vehicle_id",
ADD COLUMN     "placa" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "orders_placa_idx" ON "orders"("placa");
