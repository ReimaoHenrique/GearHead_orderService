/*
  Warnings:

  - The values [Atrasado,Em_Andamento,Concluido,Aguardando_Pagamento,Aguardando_Pecas] on the enum `StatusOrder` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `placa` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `proprietario_id` on the `vehicles` table. All the data in the column will be lost.
  - Added the required column `vehicle_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusOrder_new" AS ENUM ('AGUARDANDO_ORCAMENTO', 'ATRASADO', 'EM_ANDAMENTO', 'CONCLUIDO', 'AGUARDANDO_PAGAMENTO', 'AGUARDANDO_PECAS');
ALTER TABLE "orders" ALTER COLUMN "status" TYPE "StatusOrder_new" USING ("status"::text::"StatusOrder_new");
ALTER TYPE "StatusOrder" RENAME TO "StatusOrder_old";
ALTER TYPE "StatusOrder_new" RENAME TO "StatusOrder";
DROP TYPE "StatusOrder_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_placa_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "placa",
ADD COLUMN     "vehicle_id" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'AGUARDANDO_ORCAMENTO';

-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "proprietario_id",
ADD COLUMN     "pro_id" TEXT;

-- CreateIndex
CREATE INDEX "orders_vehicle_id_idx" ON "orders"("vehicle_id");
