import { Router } from "express"
import { livingroomController } from "../controllers/index.js"

const livingroomRouter = Router(); 

livingroomRouter.get('/', livingroomController.getAll);
livingroomRouter.get('/last/', livingroomController.getLastRecords);
livingroomRouter.get('/sensor/', livingroomController.getSensorRecords);
livingroomRouter.get('/actuator/', livingroomController.getActuatorRecords);
livingroomRouter.post('/', livingroomController.createLivingroomData);

export default livingroomRouter