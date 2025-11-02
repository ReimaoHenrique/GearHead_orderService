import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateVehicleByPlaca = async (req: Request, res: Response) => {
  try {
    const { placa } = req.params;
    const { nome_carro, modelo, ano, quilometragem, dono_id } = req.body;

    if (!placa) {
      return res.status(400).json({ error: "Placa é obrigatória na URL" });
    }

    // Busca veículo pela placa
    const vehicle = await prisma.vehicle.findFirst({
      where: {
        placa: {
          equals: placa.toUpperCase(),
          mode: "insensitive",
        },
      },
    });

    if (!vehicle) {
      return res.status(404).json({ error: "Veículo não encontrado" });
    }

    // Atualiza apenas o que foi enviado
    const updatedVehicle = await prisma.vehicle.update({
      where: { id: vehicle.id }, // usa o ID interno
      data: {
        nome_carro: nome_carro || vehicle.nome_carro,
        modelo: modelo !== undefined ? modelo : vehicle.modelo,
        ano: ano !== undefined ? (ano ? parseInt(ano) : null) : vehicle.ano,
        quilometragem:
          quilometragem !== undefined
            ? quilometragem
              ? parseInt(quilometragem)
              : null
            : vehicle.quilometragem,
        proprietario_id:
          dono_id !== undefined ? dono_id || null : vehicle.proprietario_id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Veículo atualizado com sucesso",
      vehicle: updatedVehicle,
    });
  } catch (error) {
    console.error("Erro ao atualizar veículo:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  } finally {
    await prisma.$disconnect();
  }
};
