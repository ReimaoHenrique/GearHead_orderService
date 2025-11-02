import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z } from "zod";

const prisma = new PrismaClient().$extends(withAccelerate());

const deleteSchema = z.object({
  placa: z.string().min(1).max(8),
});

export const deleteByPlaca = async (req: Request, res: Response) => {
  const { placa } = req.params;

  try {
    // Valida a placa
    deleteSchema.parse({ placa });

    // Busca o veículo
    const vehicle = await prisma.vehicle.findFirst({
      where: { placa: { equals: placa, mode: "insensitive" } },
    });

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Veículo não encontrado",
      });
    }

    // Deleta
    await prisma.vehicle.delete({
      where: { placa: vehicle.placa },
    });

    return res.status(200).json({
      success: true,
      message: "Veículo deletado com sucesso",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Placa inválida",
        errors: error.issues,
      });
    }

    console.error("Erro ao deletar:", error);
    return res.status(500).json({
      success: false,
      message: "Erro interno",
    });
  }
};
