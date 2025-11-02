import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createVehicle = async (req: Request, res: Response) => {
  try {
    const { placa, nome_carro, modelo, ano, quilometragem, proprietario_id } =
      req.body;

    if (!placa || !nome_carro) {
      return res
        .status(400)
        .json({ error: "Placa e nome do carro são obrigatórios" });
    }

    // Verifica se já existe veículo com a mesma placa
    const existingVehicle = await prisma.vehicle.findFirst({
      where: {
        placa: {
          equals: placa,
          mode: "insensitive",
        },
      },
    });

    if (existingVehicle) {
      return res
        .status(400)
        .json({ error: "Já existe um veículo com esta placa" });
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        placa: placa.toUpperCase(),
        nome_carro,
        modelo,
        ano: ano ? parseInt(ano) : null,
        quilometragem: quilometragem ? parseInt(quilometragem) : null,
        proprietario_id: proprietario_id || null,
      },
    });

    return res.status(201).json(vehicle);
  } catch (error) {
    console.error("Erro ao criar veículo:", error);
    return res
      .status(500)
      .json({ error: "Erro interno ao processar a requisição" });
  } finally {
    await prisma.$disconnect();
  }
};
