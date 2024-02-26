import { Router } from "express";
import { roomsController } from "../controllers/index.js";

// ! Express Router instance for rooms routes.
export const roomsRouter = Router();

roomsRouter.get("/", roomsController.getAllRooms);
roomsRouter.get("/:_id", roomsController.getRoomById);
roomsRouter.post("/", roomsController.insertRoom);
