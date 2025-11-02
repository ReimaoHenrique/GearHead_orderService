import express, { Request, Response } from "express";
import cors from "cors";
// CRUD Vehicle
import { getVehicleByPlate } from "./api/vehicles/getByPlaca";
import { createVehicle } from "./api/vehicles/create";
import { getVehicleById } from "./api/vehicles/getById";
import { deleteByPlaca } from "./api/vehicles/deleteByPlaca";
import { updateVehicleByPlaca } from "./api/vehicles/updateByPlaca";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rotas
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "API funcionando!" });
});

// Rotas de Veículos
app.get("/api/vehicles/placa/:placa", getVehicleByPlate);
app.delete("/api/vehicles/:placa", deleteByPlaca);
app.put("/api/vehicles/placa/:placa", updateVehicleByPlaca);

app.get("/api/vehicles/:id", getVehicleById);
app.post("/api/vehicles", createVehicle);

export default app;
