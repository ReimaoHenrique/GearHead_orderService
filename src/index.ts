import express, { Request, Response } from "express";
import cors from "cors";
// CRUD Vehicle
import { getVehicles, getVehicleByPlate } from "./api/vehicles/getAll";
import { createVehicle } from "./api/vehicles/create";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rotas
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "API funcionando!" });
});

// Rotas de Veículos
app.get("/api/vehicles", getVehicles);
app.get("/api/vehicles/:placa", getVehicleByPlate);
app.post("/api/createVehicle", createVehicle);
export default app;
