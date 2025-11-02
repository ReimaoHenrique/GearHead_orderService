import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

export const getVehicles = async (req: Request, res: Response) => {
  try {
    const vehicles = await prisma.vehicle.findMany();
    res.json(vehicles);
  } catch (error) {
    console.error("Erro ao buscar veículos:", error);
    res.status(500).json({ error: "Erro ao buscar veículos" });
  }
};

export const getVehicleByPlate = async (req: Request, res: Response) => {
  try {
    const { placa } = req.params;
    const vehicle = await prisma.vehicle.findFirst({
      where: {
        placa: {
          equals: placa,
          mode: "insensitive",
        },
      },
    });

    if (!vehicle) {
      return res.status(404).json({ error: "Veículo não encontrado" });
    }

    res.json(vehicle);
  } catch (error) {
    console.error("Erro ao buscar veículo:", error);
    res.status(500).json({ error: "Erro ao buscar veículo" });
  }
};
