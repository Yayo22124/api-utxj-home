import { Router } from "express"
import { roomsController } from "../controllers/rooms.controller.js"

const roomsRouter = Router(); 

roomsRouter.get('/', roomsController.getAllNames);

export default roomsRouter