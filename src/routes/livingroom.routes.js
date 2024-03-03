import { Router } from "express"
import { livingroomController } from "../controllers/index.js"

const livingroomRouter = Router(); 

livingroomRouter.get('/', livingroomController.getAll);
livingroomRouter.post('/', livingroomController.createLivingroomData);

export default livingroomRouter