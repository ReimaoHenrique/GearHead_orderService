import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

export const getVehicleById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const rawId = req.params.id;

    // 1. Remove espaços e decodifica URL
    const id = decodeURIComponent(rawId).trim();

    // 2. Validação básica de CUID (opcional, mas ajuda)
    if (!id || id.length < 10 || id.length > 30) {
      return res.status(400).json({ error: "ID inválido" });
    }

    console.log("Buscando veículo com ID:", id);

    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
    });

    if (!vehicle) {
      return res.status(404).json({ error: "Veículo não encontrado" });
    }

    return res.json(vehicle);
  } catch (error) {
    console.error("Erro ao buscar veículo:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};
