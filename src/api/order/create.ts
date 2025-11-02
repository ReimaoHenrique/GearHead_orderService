// api/orders/create.ts
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createOrder = async (req: Request, res: Response) => {
  try {
    const {
      placa,
      status,
      titulo,
      descricao,
      valor_cobrado_amount, // ← agora opcional
      data_inicio,
      data_prevista,
      oficina_id,
      colaborador_id,
      pecas_usadas,
      fotos_antes,
      fotos_depois,
      updated_by,
    } = req.body;

    // Validação: campos OBRIGATÓRIOS (valor removido)
    if (!placa || !titulo || !data_inicio || !oficina_id || !updated_by) {
      return res.status(400).json({
        error:
          "Campos obrigatórios: placa, titulo, data_inicio, oficina_id, updated_by",
      });
    }

    const order = await prisma.order.create({
      data: {
        placa: placa.toUpperCase(),
        status: (status || "AGUARDANDO_ORCAMENTO") as any,
        titulo,
        descricao,
        // ← VALOR OPCIONAL: só inclui se vier no body
        ...(valor_cobrado_amount !== undefined && {
          valor_cobrado_amount: parseFloat(valor_cobrado_amount),
        }),
        data_inicio: new Date(data_inicio),
        data_prevista: data_prevista ? new Date(data_prevista) : null,
        oficina_id,
        colaborador_id: colaborador_id || null,
        pecas_usadas: pecas_usadas || ["Não informado"],
        fotos_antes: fotos_antes || ["Nenhuma foto antes"],
        fotos_depois: fotos_depois || ["Nenhuma foto depois"],
        updated_by,
      },
    });

    return res.status(201).json(order);
  } catch (error: any) {
    console.error("Erro ao criar ordem:", error);
    return res
      .status(500)
      .json({ error: "Erro interno", details: error.message });
  } finally {
    await prisma.$disconnect();
  }
};
