import { Router } from "express";
import { usersController } from "../controllers/index.js";

//! Express Router instance.
export const usersRouter = Router();

// Users Routes
usersRouter.get("/", usersController.getAllUsers);
usersRouter.get("/:id", usersController.getUserById);
