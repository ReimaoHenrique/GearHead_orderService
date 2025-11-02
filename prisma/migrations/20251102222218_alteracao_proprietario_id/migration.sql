-- CreateEnum
CREATE TYPE "StatusOrder" AS ENUM ('Atrasado', 'Em_Andamento', 'Concluido', 'Aguardando_Pagamento', 'Aguardando_Pecas');

-- CreateTable
CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "nome_carro" TEXT NOT NULL,
    "modelo" TEXT,
    "ano" INTEGER,
    "quilometragem" INTEGER,
    "proprietario_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "status" "StatusOrder" NOT NULL,
    "fotos_antes" TEXT[] DEFAULT ARRAY['Nenhuma foto antes']::TEXT[],
    "fotos_depois" TEXT[] DEFAULT ARRAY['Nenhuma foto depois']::TEXT[],
    "titulo" TEXT NOT NULL,
    "descricao" VARCHAR(1000),
    "valor_cobrado_amount" DECIMAL(10,2) NOT NULL,
    "valor_cobrado_currency" TEXT NOT NULL DEFAULT 'BRL',
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_prevista" TIMESTAMP(3),
    "data_conclusao" TIMESTAMP(3),
    "oficina_id" TEXT NOT NULL,
    "colaborador_id" TEXT,
    "pecas_usadas" TEXT[] DEFAULT ARRAY['Não informado']::TEXT[],
    "breakdown" JSONB,
    "updated_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_placa_key" ON "vehicles"("placa");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_placa_fkey" FOREIGN KEY ("placa") REFERENCES "vehicles"("placa") ON DELETE RESTRICT ON UPDATE CASCADE;
